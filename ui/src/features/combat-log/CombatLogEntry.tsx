import { Box, Group, Stack, Text } from '@mantine/core';
import type { LogEntry } from '../../types/log';

interface CombatLogEntryProps {
  entry: LogEntry;
}

const variantColors: Record<LogEntry['variant'], string> = {
  positive: 'var(--mantine-color-green-6)',
  negative: 'var(--mantine-color-red-6)',
  neutral: 'var(--mantine-color-gray-6)',
  info: 'var(--mantine-color-yellow-6)',
};

function renderMessage(entry: LogEntry): React.ReactNode {
  switch (entry.type) {
    case 'player_attack':
      return (
        <>
          <strong>{entry.attacker}</strong> attacked for{' '}
          <strong style={{ color: 'var(--mantine-color-red-5)' }}>
            {entry.damage} damage
          </strong>{' '}
          to{' '}
          <em style={{ color: 'var(--mantine-color-gray-5)' }}>
            {entry.target}
          </em>
          .
        </>
      );
    case 'player_defeated_enemy':
      return (
        <>
          <strong>{entry.attacker}</strong> defeated{' '}
          <em style={{ color: 'var(--mantine-color-gray-5)' }}>
            {entry.target}
          </em>
          !
        </>
      );
    case 'player_heal':
      return (
        <>
          <strong>{entry.attacker}</strong> healed for{' '}
          <strong style={{ color: 'var(--mantine-color-green-5)' }}>
            {entry.amount} HP
          </strong>
          .
        </>
      );
    case 'player_temp_hp':
      return (
        <>
          <strong>{entry.attacker}</strong> gained{' '}
          <strong style={{ color: 'var(--mantine-color-blue-5)' }}>
            {entry.amount} Temp HP
          </strong>
          .
        </>
      );
    case 'enemy_attack':
      return (
        <>
          <strong>{entry.target}</strong> took{' '}
          <strong style={{ color: 'var(--mantine-color-red-5)' }}>
            {entry.damage} {entry.damageType} damage
          </strong>{' '}
          from{' '}
          <em style={{ color: 'var(--mantine-color-gray-5)' }}>
            {entry.attacker}
          </em>
          .
        </>
      );
    case 'wave_start':
      return (
        <>
          Wave {entry.wave} Started.{' '}
          <em style={{ color: 'var(--mantine-color-gray-5)' }}>
            {entry.enemyName}
          </em>{' '}
          appears.
        </>
      );
    case 'wave_cleared':
      return (
        <>
          <strong style={{ color: 'var(--mantine-color-yellow-6)' }}>
            Wave Cleared!
          </strong>{' '}
          Enemies defeated. Entering Tactical Phase.
        </>
      );
    default:
      return null;
  }
}

export function CombatLogEntry({ entry }: CombatLogEntryProps) {
  const dotColor = variantColors[entry.variant];
  const message = renderMessage(entry);

  return (
    <Group align="flex-start" gap="sm" wrap="nowrap">
      <Box
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: dotColor,
          flexShrink: 0,
          marginTop: 6,
        }}
      />
      <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
        <Text size="xs" c="dimmed" ff="monospace">
          {entry.timestamp}
          {entry.round ? ` • ${entry.round}` : ''}
        </Text>
        <Text size="sm" component="div">
          {message}
        </Text>
      </Stack>
    </Group>
  );
}
