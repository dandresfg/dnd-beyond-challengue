import { Box, Group, Stack, Text } from '@mantine/core';
import type { CombatLogEntryVariant } from './types';

interface CombatLogEntryProps {
  timestamp: string;
  round?: string;
  message: React.ReactNode;
  variant?: CombatLogEntryVariant;
}

const variantColors: Record<CombatLogEntryVariant, string> = {
  positive: 'var(--mantine-color-green-6)',
  negative: 'var(--mantine-color-red-6)',
  neutral: 'var(--mantine-color-gray-6)',
  info: 'var(--mantine-color-yellow-6)',
};

export function CombatLogEntry({
  timestamp,
  round,
  message,
  variant = 'neutral',
}: CombatLogEntryProps) {
  const dotColor = variantColors[variant];

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
          {timestamp}
          {round ? ` • ${round}` : ''}
        </Text>
        <Text size="sm" component="div">
          {message}
        </Text>
      </Stack>
    </Group>
  );
}
