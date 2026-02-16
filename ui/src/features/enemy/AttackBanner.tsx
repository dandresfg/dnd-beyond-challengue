import { useState } from "react";
import { Enemy, DamageType } from "@/types";
import { ENEMIES } from "./data";
import { Banner } from "@/components/Banner";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import styles from "./AttackBanner.module.css";
import { useBreakpoint } from "@/hooks/useMediaQuery";

interface AttackBannerProps {
    damageType: DamageType;
    amount: number;
    onComplete: () => void;
}

export const AttackBanner = ({ damageType, amount, onComplete }: AttackBannerProps) => {
    const [enemy] = useState<Enemy | null>(ENEMIES.find(e => e.damageType === damageType) || null);
    const { isMobile } = useBreakpoint();

    if (!enemy) return null;


    return (
        <Banner variant="danger" onComplete={onComplete}>
            <Flex direction={isMobile ? "column" : "row"} gap={3} align="center">
                <div className={styles.avatarWrapper}>
                    <img
                        src={enemy.avatarUrl}
                        alt={enemy.name}
                        className={styles.avatar}
                    />
                </div>

                <Flex direction="row" align="center" grow={1}>
                    <Flex direction="column" gap={1}>
                        <Text variant="label" className={styles.label}>Incoming Attack</Text>
                        <Text variant="h2" className={styles.enemyName}>{enemy.name} <span className={styles.castsText}>({damageType})</span></Text>
                    </Flex>
                    <Flex align="center" justify="center" grow={1}>
                        <Flex direction="row" align="center" gap={1}>
                            <span className={styles.castsText}>casts</span>
                            <span className={styles.attackName}>{enemy.attackName}</span>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex direction="row" gap={4} align="center" className={styles.damageInfo}>
                    <Flex direction="column" align="end">
                        <Text variant="label" className={styles.damageLabel}>Damage</Text>
                        <Flex direction="row" align="baseline" gap={1}>
                            <Text variant="h1" className={styles.damageAmount}>{amount}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Banner>
    );
};
