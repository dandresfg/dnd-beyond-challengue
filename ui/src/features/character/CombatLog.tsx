import { Flex } from '@/components/Flex';
import { Modal } from '@/components/Modal';
import { Text } from '@/components/Text';
import { CombatLogKind, useCombatLog } from '@/hooks/useCombatLog';
import { useRevive } from '@/hooks/useRevive';
import { ICharacter } from '@/types';
import { IconHeartPlus, IconSwords } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import styles from './CombatLog.module.css';

interface CombatLogProps {
  player: ICharacter;
  attacks: number;
  onRetry?: () => void;
}

export const CombatLog = ({ player, attacks, onRetry }: CombatLogProps) => {
  const { revive } = useRevive(player.slug);
  const { logs: deadLogs } = useCombatLog(player.slug, CombatLogKind.DIED);
  const reviveButtonRef = useRef<HTMLButtonElement>(null);

  const handleRetry = () => {
    onRetry?.();
    revive();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      reviveButtonRef.current?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      aria-labelledby="player-dead-title"
      aria-describedby="player-dead-description"
    >
      <p id="player-dead-description" className={styles.perished}>
        YOU HAVE PERISHED {deadLogs.length ? `${deadLogs.length} TIMES!` : ''}
      </p>
      <Text variant="body" as="p" className={styles.flavor}>
        Your valiant battle across the arena echoes in eternity. Although
        discord prevailed, your legend will not be forgotten.
      </Text>

      <hr className={styles.separator} />

      {attacks ?
        <Flex direction="column" gap={2} className={styles.section}>
          <Flex direction="row" align="center" gap={1}>
            <IconSwords className={styles.sectionIcon} aria-hidden />
            <Text variant="label" className={styles.sectionTitle}>
              Attacks Survived This Round:
            </Text>
            <Flex grow={1} align="center" justify="center" className={styles.countBox}>
              <Text variant="value" className={styles.count}>
                {attacks}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        : null}

      <button
        ref={reviveButtonRef}
        type="button"
        onClick={handleRetry}
        className={styles.reviveButton}
        aria-label={`${player.name} is dead. Revive character and retry`}
      >
        <IconHeartPlus className={styles.reviveIcon} aria-hidden />
        Retry!
      </button>
    </Modal>
  );
};
