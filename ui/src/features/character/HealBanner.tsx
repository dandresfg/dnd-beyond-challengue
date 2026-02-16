import { Banner } from "@/components/Banner";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import styles from "./HealBanner.module.css";

interface HealBannerProps {
    type: 'heal' | 'tempHp';
    amount: number;
    onComplete: () => void;
}

export const HealBanner = ({ type, amount, onComplete }: HealBannerProps) => {
    const isHeal = type === 'heal';
    const icon = isHeal ? '❤️' : '🛡️';
    const label = isHeal ? 'Healing' : 'Temporary HP';
    const description = isHeal ? 'Restored health' : 'Added temporary HP';
    const variant = isHeal ? 'success' : 'warning';

    return (
        <Banner variant={variant} onComplete={onComplete}>
            <Flex direction="row" gap={3} align="center" className={styles.content}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon}>{icon}</span>
                </div>

                <Flex direction="column" gap={1} grow={1}>
                    <Text variant="label" className={`${styles.label} ${isHeal ? styles.healLabel : styles.tempLabel}`}>
                        {label}
                    </Text>
                    <Text variant="body" className={styles.description}>{description}</Text>
                </Flex>

                <Flex direction="column" align="end">
                    <Text variant="label" className={styles.amountLabel}>Amount</Text>
                    <Text variant="h1" className={`${styles.amount} ${isHeal ? styles.healAmount : styles.tempAmount}`}>
                        +{amount}
                    </Text>
                </Flex>
            </Flex>
        </Banner>
    );
};
