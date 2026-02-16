import {
  Badge,
  Button,
  Group,
  NumberInput,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { IconHeart, IconShield, IconDroplet } from '@tabler/icons-react';

interface PrepActionCardProps {
  isUserTurn: boolean;
  prepAmount: number;
  onPrepAmountChange: (n: number) => void;
  onHeal?: () => void;
  onAddTempHp?: () => void;
  quickPrepLabels?: string[];
}

export function PrepActionCard({
  isUserTurn,
  prepAmount,
  onPrepAmountChange,
  onHeal,
  onAddTempHp,
  quickPrepLabels = [],
}: PrepActionCardProps) {
  return (
    <Paper p="md" radius="md" withBorder bg="blue.9" pos="relative">
      {isUserTurn && (
        <Badge
          size="sm"
          color="yellow"
          variant="filled"
          pos="absolute"
          top={-12}
          left="md"
        >
          YOUR TURN: PREP
        </Badge>
      )}
      <Stack gap="md" pt={isUserTurn ? 'xs' : 0}>
        <Group align="flex-end" wrap="nowrap" gap="md">
          <Stack gap="xs" style={{ flex: 1 }}>
            <Text size="xs" fw={500} c="dimmed">
              Amount
            </Text>
            <NumberInput
              value={prepAmount}
              onChange={(v) => onPrepAmountChange(Number(v) || 0)}
              min={0}
              size="md"
              styles={{ input: { fontWeight: 700, fontSize: '1.25rem' } }}
            />
          </Stack>
          <Group gap="xs" wrap="nowrap">
            <Button
              variant="default"
              color="gray"
              disabled
              leftSection={<IconDroplet size={18} />}
              style={{ flexDirection: 'column', height: 52 }}
            >
              <Text size="xs">DMG</Text>
            </Button>
            <Button
              variant="light"
              color="teal"
              leftSection={<IconHeart size={18} />}
              onClick={onHeal}
              style={{ flexDirection: 'column', height: 52 }}
            >
              <Text size="xs" fw={700}>
                HEAL
              </Text>
            </Button>
            <Button
              variant="light"
              color="blue"
              leftSection={<IconShield size={18} />}
              onClick={onAddTempHp}
              style={{ flexDirection: 'column', height: 52 }}
            >
              <Text size="xs" fw={700}>
                TEMP
              </Text>
            </Button>
          </Group>
        </Group>
        {quickPrepLabels.length > 0 && (
          <Group gap="xs" wrap="nowrap" align="center">
            <Text size="xs" c="dimmed">
              Quick Prep:
            </Text>
            <Group gap="xs">
              {quickPrepLabels.map((label, i) => (
                <Button
                  key={i}
                  variant="default"
                  size="xs"
                  radius="xl"
                  onClick={() => {}}
                >
                  {label}
                </Button>
              ))}
            </Group>
          </Group>
        )}
      </Stack>
    </Paper>
  );
}
