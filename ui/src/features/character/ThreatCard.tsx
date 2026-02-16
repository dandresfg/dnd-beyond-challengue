import { Box, Group, Paper, Stack, Text } from '@mantine/core';
import {
  IconAlertTriangle,
  IconCut,
  IconCircleCheck,
} from '@tabler/icons-react';

interface ThreatCardProps {
  name: string;
  damageType: string;
  hasResistance: boolean;
  subtitle?: string;
  threatLevel?: number;
}

const MAX_THREAT_DOTS = 3;

export function ThreatCard({
  name,
  damageType,
  hasResistance,
  subtitle,
  threatLevel = 2,
}: ThreatCardProps) {
  return (
    <Paper p="md" radius="md" withBorder bg="dark.7" pos="relative">
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
            backgroundColor: 'var(--mantine-color-dark-5)',
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
            <Text size="xs" c="red.5">
              {subtitle}
            </Text>
          )}
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              Damage Type
            </Text>
            <Group gap={4}>
              <IconCut size={14} />
              <Text size="sm" fw={500}>
                {damageType}
              </Text>
            </Group>
          </Group>
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              Threat Level
            </Text>
            <Group gap={4}>
              {Array.from({ length: MAX_THREAT_DOTS }, (_, i) => (
                <Box
                  key={i}
                  w={8}
                  h={8}
                  style={{
                    borderRadius: '50%',
                    backgroundColor:
                      i < threatLevel
                        ? 'var(--mantine-color-red-5)'
                        : 'var(--mantine-color-dark-5)',
                  }}
                />
              ))}
            </Group>
          </Group>
          {hasResistance && (
            <Group
              gap="xs"
              p="xs"
              mt="xs"
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.5)',
                borderRadius: 'var(--mantine-radius-sm)',
              }}
            >
              <IconCircleCheck size={16} color="var(--mantine-color-teal-5)" />
              <Text size="xs" c="teal.5" fw={600}>
                You have Resistance
              </Text>
            </Group>
          )}
        </Stack>
      </Group>
    </Paper>
  );
}
