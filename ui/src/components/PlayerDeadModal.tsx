import { useRevive } from '@/hooks/useRevive';
import { ICharacter } from '@/types';
import { IconHeartPlus, IconSwords } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { Flex } from './Flex';
import styles from './PlayerDeadModal.module.css';
import { Text } from './Text';
import { Title } from './Title';

interface PlayerDeadModalProps {
  player: ICharacter;
  logs: any[];
}

export const PlayerDeadModal = ({ player, logs }: PlayerDeadModalProps) => {
  const { revive } = useRevive(player.slug);

  const modalRef = useRef<HTMLDivElement>(null);
  const reviveButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      reviveButtonRef.current?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="player-dead-title"
      aria-describedby="player-dead-description"
    >
      <div ref={modalRef} className={styles.modal}>
        <Title
          variant="h2"
          id="player-dead-title"
          className={styles.characterName}
        >
          {player.name}
        </Title>

        <p id="player-dead-description" className={styles.perished}>
          YOU HAVE PERISHED!
        </p>
        <Text variant="body" as="p" className={styles.flavor}>
          Your valiant battle across the arena echoes in eternity. Although
          discord prevailed, your legend will not be forgotten.
        </Text>

        <hr className={styles.separator} />

        <Flex direction="column" gap={2} className={styles.section}>
          <Flex direction="row" align="center" gap={1}>
            <IconSwords className={styles.sectionIcon} aria-hidden />
            <Text variant="label" className={styles.sectionTitle}>
              Enemies Defeated
            </Text>
          </Flex>
          <div className={styles.countBox}>
            <Text variant="value" className={styles.count}>
              {logs.filter((log) => log.type === 'attack').length}
            </Text>
          </div>
        </Flex>

        <button
          ref={reviveButtonRef}
          type="button"
          onClick={revive}
          className={styles.reviveButton}
          aria-label="Revive character and retry"
        >
          <IconHeartPlus className={styles.reviveIcon} aria-hidden />
          Retry!
        </button>
      </div>
    </div>
  );
};
