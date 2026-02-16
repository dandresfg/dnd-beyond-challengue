import { Box, Group, Paper, Stack, Text } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

interface ThreatCardProps {
  name: string;
  damageType: string;
  hasResistance: boolean;
  subtitle?: string;
}

export function ThreatCard({
  name,
  damageType,
  hasResistance,
  subtitle,
}: ThreatCardProps) {
  return (
    <Paper p="md" radius="md" withBorder bg="blue.9" pos="relative">
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background:
            'linear-gradient(90deg, var(--mantine-color-red-6), var(--mantine-color-orange-6))',
          borderRadius: 'var(--mantine-radius-md) var(--mantine-radius-md) 0 0',
        }}
      />
      <Text size="xs" fw={700} tt="uppercase" c="dimmed" mb="sm">
        Incoming Threat
      </Text>
      <Group align="flex-start" wrap="nowrap" gap="md">
        <Box
          w={64}
          h={64}
          style={{
            borderRadius: 'var(--mantine-radius-md)',
            backgroundColor: 'var(--mantine-color-blue-8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconAlertTriangle size={32} color="var(--mantine-color-red-5)" />
        </Box>
        <Stack gap="xs" style={{ flex: 1 }}>
          <Text fw={700} size="lg">
            {name}
          </Text>
          {subtitle && (
            <Text size="xs" c="red">
              {subtitle}
            </Text>
          )}
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              Damage Type
            </Text>
            <Text size="sm" fw={500}>
              {damageType}
            </Text>
          </Group>
          {hasResistance && (
            <Text size="xs" c="teal" fw={600}>
              You have Resistance
            </Text>
          )}
        </Stack>
      </Group>
    </Paper>
  );
}
