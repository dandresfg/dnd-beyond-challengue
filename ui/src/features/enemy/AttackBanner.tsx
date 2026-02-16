import { useMemo } from "react";
import { Enemy, DamageType } from "@/types";
import { ENEMIES } from "./data";
import { Banner } from "@/components/Banner";
import { Image } from "@/components/Image";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { useCharacter } from "@/hooks/useCharacter";
import { calculateEffectiveDamage, getDefenseStatus } from "@/utils/damageCalculator";
import styles from "./AttackBanner.module.css";
import { useBreakpoint } from "@/hooks/useMediaQuery";

interface AttackBannerProps {
    damageType: DamageType;
    amount: number;
    onComplete: () => void;
}

export const AttackBanner = ({ damageType, amount, onComplete }: AttackBannerProps) => {
    const enemy = useMemo<Enemy | null>(() => ENEMIES.find(e => e.damageType === damageType) || null, [damageType]);
    const { player } = useCharacter();
    const { isMobile } = useBreakpoint();

    const effectiveDamage = useMemo(() => {
        if (!player) return amount;
        return calculateEffectiveDamage(player, damageType, amount);
    }, [player, damageType, amount]);

    const defenseStatus = useMemo(() => {
        if (!player) return 'normal';
        return getDefenseStatus(player, damageType);
    }, [player, damageType]);

    if (!enemy) {
        console.error(`Enemy not found for damage type: ${damageType}`);
        return null;
    }


    return (
        <Banner variant="danger" onComplete={onComplete}>
            <Flex direction={isMobile ? "column" : "row"} gap={3} align="center">
                <div className={styles.avatarWrapper}>
                    <Image
                        key={enemy.id}
                        src={enemy.avatarUrl}
                        alt={enemy.name}
                        className={styles.avatar}
                    />
                </div>

                <Flex direction={isMobile ? "column" : "row"} align="center" grow={1}>
                    <Flex direction="column" align={isMobile ? "center" : "start"} gap={1}>
                        <Text variant="label" className={styles.label}>Incoming Attack</Text>
                        <Text variant="h2" className={styles.enemyName}>{enemy.name}</Text>
                    </Flex>
                    <Flex align="center" justify="center" grow={1}>
                        <Flex direction="row" align="center" gap={1}>
                            <span className={styles.castsText}>casts</span>
                            <span className={styles.attackName}>{enemy.attackName}</span>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex direction="row" gap={4} align="center" justify="center" className={styles.damageInfo}>
                    <Flex direction="column" align={isMobile ? "center" : "end"}>
                        <Text variant="label" className={styles.damageLabel}>Damage</Text>
                        <Text variant="label" className={styles.defenseLabel}>
                            {defenseStatus === 'immune' ? 'IMMUNE' : 'RESIST'}
                        </Text>
                        <Flex direction="row" align="baseline" gap={1}>
                            {defenseStatus !== 'normal' && amount !== effectiveDamage ? (
                                <>
                                    <Text variant="body" className={styles.originalDamage}>
                                        <span className={styles.strikethrough}>({amount})</span>
                                    </Text>
                                    <Text variant="h1" className={styles.damageAmount}>{effectiveDamage}</Text>
                                </>
                            ) : (
                                <Text variant="h1" className={styles.damageAmount}>{amount}</Text>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Banner>
    );
};
