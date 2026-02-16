import { Avatar, Box, Group, Paper, Stack, Text } from '@mantine/core';
import { IconSword, IconCircleCheck } from '@tabler/icons-react';
import type { Enemy } from '../../types/enemies';
import { damageTypeToDisplay } from '../enemies/data';
import { Character } from '../../types/character';

const CARD_BG = '#2C2F36';
const ACCENT_RED = '#F05149';
const RESISTANCE_BG = '#2C6A4E';
const RESISTANCE_TEXT = '#6DC28D';

interface ThreatCardProps {
  enemy: Enemy | null;
  defenses?: Character['defenses'];
}

function hasDefense(
  damageType: string,
  defenses: Character['defenses'] = [],
): boolean {
  return defenses.some(
    (d) => d.type.toLowerCase() === damageType.toLowerCase(),
  );
}

export function ThreatCard({ enemy, defenses = [] }: ThreatCardProps) {
  if (!enemy) return null;

  const damageTypeStr = damageTypeToDisplay(enemy.damageType);

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
        <Avatar
          src={enemy.avatarUrl}
          alt={enemy.name}
          size={64}
          radius="md"
          style={{ flexShrink: 0 }}
        >
          {enemy.name.slice(0, 2).toUpperCase()}
        </Avatar>
        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
          <Text fw={700} size="xl" c="white" lineClamp={2}>
            {enemy.name}
          </Text>
          <Text size="xs" c="dimmed">
            {enemy.attackName}
          </Text>
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
              {damageTypeStr}
            </Text>
          </Group>
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <Text size="sm" c="dimmed">
            Damage Range
          </Text>
          <Text size="sm" fw={500} c="gray.3">
            {enemy.minDamage}–{enemy.maxDamage}
          </Text>
        </Group>
      </Stack>
      {hasDefense(enemy.damageType, defenses) && (
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
