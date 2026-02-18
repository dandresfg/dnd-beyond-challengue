import { Flex } from '@/components/Flex';
import { Group } from '@/components/Group';
import { Text } from '@/components/Text';
import { Title } from '@/components/Title';
import styles from './HealthBanner.module.css';

interface HealthBannerProps {
  currentHp: number;
  maxHp: number;
  tempHp: number;
}

export const HealthBanner = ({
  currentHp,
  maxHp,
  tempHp,
}: HealthBannerProps) => {
  const healthPercentage = (currentHp / maxHp) * 100;
  const tempHpPercentage = (tempHp / maxHp) * 100;
  const ariaLabel = `Health: ${currentHp} current of ${maxHp} max hit points${tempHp > 0 ? `, ${tempHp} temporary` : ''}`;
  return (
    <Group aria-label={ariaLabel}>
      <Flex direction="column" gap={1} className={styles.healthSection}>
        <Flex direction="row" justify="between" align="end">
          <Text variant="label" className={styles.healthLabel}>
            HEALTH POINTS
          </Text>
        </Flex>
        <Flex direction="row" align="baseline" gap={1}>
          <Title variant="h2" className={styles.currentHp}>
            {currentHp}
          </Title>
          <Text variant="mono" className={styles.maxHp}>
            / <span className="sr-only">Max HP</span>
            {maxHp}
          </Text>
          {tempHp > 0 && (
            <span className={styles.tempHpBadge}>+{tempHp} Temp</span>
          )}
        </Flex>
        <div className={styles.healthBar}>
          <div
            className={styles.healthBarFill}
            style={{ width: `${healthPercentage}%` }}
            role="img"
            aria-label={`Current HP: ${currentHp} (+${tempHp} Temp) out of ${maxHp}`}
          ></div>
          {tempHp > 0 && (
            <div
              className={styles.tempHpBarFill}
              style={{
                left: `${healthPercentage}%`,
                width: `${tempHpPercentage}%`,
              }}
              aria-hidden="true"
            ></div>
          )}
        </div>
      </Flex>
    </Group>
  );
};
