import { Box, Group, Paper, Stack, Text } from '@mantine/core';
import {
  IconAlertTriangle,
  IconSword,
  IconCircleCheck,
} from '@tabler/icons-react';

const CARD_BG = '#2C2F36';
const ACCENT_RED = '#F05149';
const ICON_BOX_BG = '#3A3F47';
const RESISTANCE_BG = '#2C6A4E';
const RESISTANCE_TEXT = '#6DC28D';

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
  threatLevel = 3,
}: ThreatCardProps) {
  return (
    <Paper
      p="md"
      radius="md"
      pos="relative"
      h="100%"
      style={{
        backgroundColor: CARD_BG,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: ACCENT_RED,
          borderRadius: 'var(--mantine-radius-md) var(--mantine-radius-md) 0 0',
        }}
      />
      <Text
        size="xs"
        fw={500}
        tt="uppercase"
        c="dimmed"
        mb="sm"
        style={{ letterSpacing: '0.02em' }}
      >
        Incoming Threat
      </Text>
      <Group align="flex-start" wrap="nowrap" gap="md" mb="md">
        <Box
          w={64}
          h={64}
          style={{
            borderRadius: 'var(--mantine-radius-md)',
            backgroundColor: ICON_BOX_BG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconAlertTriangle size={32} color={ACCENT_RED} />
        </Box>
        <Stack gap={0} style={{ flex: 1 }}>
          <Text fw={700} size="xl" c="white">
            {name}
          </Text>
          {subtitle && (
            <Text size="xs" style={{ color: ACCENT_RED }}>
              {subtitle}
            </Text>
          )}
        </Stack>
      </Group>
      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap">
          <Text size="sm" c="dimmed">
            Damage Type
          </Text>
          <Group gap={6}>
            <IconSword size={14} color="var(--mantine-color-dark-2)" />
            <Text size="sm" fw={500} c="gray.3">
              {damageType}
            </Text>
          </Group>
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <Text size="sm" c="dimmed">
            Threat Level
          </Text>
          <Group gap={6}>
            {Array.from({ length: MAX_THREAT_DOTS }, (_, i) => (
              <Box
                key={i}
                w={8}
                h={8}
                style={{
                  borderRadius: '50%',
                  backgroundColor: i < threatLevel ? ACCENT_RED : ICON_BOX_BG,
                }}
              />
            ))}
          </Group>
        </Group>
      </Stack>
      {hasResistance && (
        <Group
          gap="xs"
          p="xs"
          mt="md"
          style={{
            backgroundColor: RESISTANCE_BG,
            borderRadius: 'var(--mantine-radius-sm)',
            width: '100%',
          }}
        >
          <IconCircleCheck size={16} color={RESISTANCE_TEXT} />
          <Text size="xs" fw={600} style={{ color: RESISTANCE_TEXT }}>
            You have Resistance
          </Text>
        </Group>
      )}
    </Paper>
  );
}
