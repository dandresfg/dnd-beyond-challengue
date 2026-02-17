import { IStats } from '@/types';
import styles from './StatsBanner.module.css';
import {
  IconBarbell,
  IconBolt,
  IconBrain,
  IconEye,
  IconHeart,
  IconHeartHandshake,
} from '@tabler/icons-react';

const statsList: { label: string; icon: React.ReactNode; key: keyof IStats }[] =
  [
    {
      label: 'Strength',
      icon: <IconBarbell aria-hidden="true" />,
      key: 'strength',
    },
    {
      label: 'Dexterity',
      icon: <IconBolt aria-hidden="true" />,
      key: 'dexterity',
    },
    {
      label: 'Constitution',
      icon: <IconHeart aria-hidden="true" />,
      key: 'constitution',
    },
    {
      label: 'Intelligence',
      icon: <IconBrain aria-hidden="true" />,
      key: 'intelligence',
    },
    { label: 'Wisdom', icon: <IconEye aria-hidden="true" />, key: 'wisdom' },
    {
      label: 'Charisma',
      icon: <IconHeartHandshake aria-hidden="true" />,
      key: 'charisma',
    },
  ];

interface StatsBannerProps {
  stats: IStats;
  isHorizontal?: boolean;
}

export const StatsBanner = ({
  stats,
  isHorizontal = false,
}: StatsBannerProps) => {
  return (
    <ul
      className={`${styles.list} ${isHorizontal ? styles.horizontal : ''}`}
      aria-label="Character statistics"
    >
      {statsList.map((stat) => (
        <BannterItem
          key={stat.key}
          icon={stat.icon}
          label={stat.label}
          value={stats[stat.key]}
        />
      ))}
    </ul>
  );
};

const BannterItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) => {
  return (
    <li className={styles.item}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.value}>
        <span className="sr-only">{label}</span>
        {value}
      </span>
    </li>
  );
};
