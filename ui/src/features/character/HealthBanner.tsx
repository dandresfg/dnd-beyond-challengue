import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import styles from "./HealthBanner.module.css";

interface HealthBannerProps {
    currentHp: number;
    maxHp: number;
    tempHp: number;
}

export const HealthBanner = ({ currentHp, maxHp, tempHp }: HealthBannerProps) => {
    const healthPercentage = (currentHp / maxHp) * 100;

    return (
        <Flex direction="column" gap={1} className={styles.healthSection}>
            <Flex direction="row" justify="between" align="end">
                <Text variant="label" className={styles.healthLabel}>HEALTH POINTS</Text>
            </Flex>
            <Flex direction="row" align="baseline" gap={1}>
                <Text variant="h1" className={styles.currentHp}>{currentHp}</Text>
                <Text variant="mono" className={styles.maxHp}>/ <span className="sr-only">Max HP</span>{maxHp}</Text>
                {tempHp > 0 && (
                    <span className={styles.tempHpBadge}>
                        +{tempHp} Temp
                    </span>
                )}
            </Flex>
            <div className={styles.healthBar}>
                <div
                    className={styles.healthBarFill}
                    style={{ width: `${healthPercentage}%` }}
                ></div>
            </div>
        </Flex>
    );
};
