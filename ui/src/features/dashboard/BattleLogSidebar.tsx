import { Box, Stack, Text } from '@mantine/core';

interface BattleLogSidebarProps {
  children: React.ReactNode;
}

export function BattleLogSidebar({ children }: BattleLogSidebarProps) {
  return (
    <Stack h="100%" gap={0}>
      <Stack
        p="md"
        gap="xs"
        style={{
          borderBottom: '1px solid var(--mantine-color-default-border)',
          backgroundColor: 'var(--mantine-color-dark-6)',
        }}
      >
        <Text fw={700} size="sm" tt="uppercase" c="dimmed">
          Battle Log
        </Text>
      </Stack>
      <Box style={{ flex: 1, minHeight: 0 }}>{children}</Box>
      <Stack
        p="md"
        style={{
          borderTop: '1px solid var(--mantine-color-default-border)',
          backgroundColor: 'var(--mantine-color-dark-6)',
        }}
      >
        <Text size="xs" c="dimmed" ta="center">
          Made with ❤️ by Diego.
        </Text>
      </Stack>
    </Stack>
  );
}
