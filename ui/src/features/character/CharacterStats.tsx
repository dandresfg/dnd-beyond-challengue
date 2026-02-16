import { Box, Group, Text, Tooltip } from '@mantine/core';
import {
  IconBolt,
  IconHeart,
  IconBrain,
  IconEye,
  IconMoodSmile,
  IconBarbell,
  type TablerIcon,
} from '@tabler/icons-react';
import type { CharacterStats as CharacterStatsType } from '../../types/game';

const STAT_CONFIG: Record<
  keyof CharacterStatsType,
  { icon: TablerIcon; color: string; label: string }
> = {
  strength: { icon: IconBarbell, color: '#e74c3c', label: 'Strength' },
  dexterity: { icon: IconBolt, color: '#f1c40f', label: 'Dexterity' },
  constitution: { icon: IconHeart, color: '#27ae60', label: 'Constitution' },
  intelligence: { icon: IconBrain, color: '#3498db', label: 'Intelligence' },
  wisdom: { icon: IconEye, color: '#9b59b6', label: 'Wisdom' },
  charisma: { icon: IconMoodSmile, color: '#e91e8c', label: 'Charisma' },
};

interface CharacterStatsProps {
  stats: CharacterStatsType;
}

export function CharacterStats({ stats }: CharacterStatsProps) {
  return (
    <Group gap="xs" wrap="wrap">
      {(Object.keys(STAT_CONFIG) as (keyof CharacterStatsType)[]).map((key) => {
        const { icon: Icon, color, label } = STAT_CONFIG[key];
        return (
          <Tooltip key={key} label={label} withArrow>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                backgroundColor: 'var(--mantine-color-dark-5)',
                borderRadius: 'var(--mantine-radius-sm)',
                border: '1px solid var(--mantine-color-dark-4)',
                cursor: 'default',
              }}
            >
              <Icon size={18} color={color} />
              <Text fw={700} size="sm" style={{ color }}>
                {stats[key]}
              </Text>
            </Box>
          </Tooltip>
        );
      })}
    </Group>
  );
}
