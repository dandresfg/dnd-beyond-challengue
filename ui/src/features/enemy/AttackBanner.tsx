import { Banner } from '@/components/Banner';
import { Flex } from '@/components/Flex';
import { Image } from '@/components/Image';
import { Text } from '@/components/Text';
import { Title } from '@/components/Title';
import { useCharacter } from '@/hooks/useCharacter';
import { useBreakpoint } from '@/hooks/useMediaQuery';
import { DamageType, DefenseType, Enemy } from '@/types';
import {
  calculateEffectiveDamage,
  getDefenseStatus,
} from '@/utils/damageCalculator';
import { useMemo } from 'react';
import styles from './AttackBanner.module.css';
import { ENEMIES, ENEMY_FALLBACK } from './data';

interface AttackBannerProps {
  damageType: DamageType;
  amount: number;
  onComplete: () => void;
}

export const AttackBanner = ({
  damageType,
  amount,
  onComplete,
}: AttackBannerProps) => {
  const enemy = useMemo<Enemy>(
    () => ENEMIES.find((e) => e.damageType === damageType) || ENEMY_FALLBACK,
    [damageType],
  );
  const { player } = useCharacter();
  const { isMobile } = useBreakpoint();

  const effectiveDamage = useMemo(() => {
    if (!player) return amount;
    return calculateEffectiveDamage(player, damageType, amount);
  }, [player, damageType, amount]);

  const defenseStatus = useMemo(() => {
    if (!player) return null;
    return getDefenseStatus(player, damageType);
  }, [player, damageType]);

  return (
    <Banner variant="danger" onComplete={onComplete}>
      <Flex direction={isMobile ? 'column' : 'row'} gap={3} align="center">
        <div className={styles.avatarWrapper}>
          <Image
            key={enemy.id}
            src={enemy.avatarUrl}
            alt={enemy.name}
            className={styles.avatar}
          />
        </div>

        <Flex direction={isMobile ? 'column' : 'row'} align="center" grow={1}>
          <Flex
            direction="column"
            align={isMobile ? 'center' : 'start'}
            gap={1}
          >
            <Text variant="label" className={styles.label}>
              Incoming Attack
            </Text>
            <Title variant="h2" className={styles.enemyName}>
              {enemy.name}
            </Title>
          </Flex>
          <Flex align="center" justify="center" grow={1}>
            <Flex direction="row" align="center" gap={1}>
              <span className={styles.castsText}>casts</span>
              <span className={styles.attackName}>{enemy.attackName}</span>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          direction="row"
          gap={4}
          align="center"
          justify="center"
          className={styles.damageInfo}
        >
          <Flex direction="column" align={isMobile ? 'center' : 'end'}>
            <Text variant="label" className={styles.damageLabel}>
              Damage
            </Text>
            {defenseStatus ? (
              <>
                <Text variant="label" className={styles.defenseLabel}>
                  {defenseStatus === DefenseType.IMMUNITY ? 'IMMUNE' : 'RESIST'}
                </Text>
                <Flex direction="row" align="baseline" gap={1}>
                  {defenseStatus !== DefenseType.IMMUNITY &&
                    amount !== effectiveDamage && (
                      <>
                        <Text variant="body" className={styles.originalDamage}>
                          <span className={styles.strikethrough}>
                            ({amount})
                          </span>
                        </Text>
                        <Title variant="h2" className={styles.damageAmount}>
                          {effectiveDamage}
                        </Title>
                      </>
                    )}
                </Flex>
              </>
            ) : (
              <Title variant="h2" className={styles.damageAmount}>
                {amount}
              </Title>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Banner>
  );
};
