import {
  Badge,
  Button,
  Group,
  NumberInput,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import {
  IconHeart,
  IconShield,
  IconDroplet,
  IconSword,
} from '@tabler/icons-react';

interface PrepActionCardProps {
  isUserTurn: boolean;
  isPrepPhase: boolean;
  prepAmount: number;
  onPrepAmountChange: (n: number) => void;
  onAttack?: () => void;
  onHeal?: () => void;
  onAddTempHp?: () => void;
  quickPrepLabels?: string[];
}

export function PrepActionCard({
  isUserTurn,
  isPrepPhase,
  prepAmount,
  onPrepAmountChange,
  onAttack,
  onHeal,
  onAddTempHp,
  quickPrepLabels = [],
}: PrepActionCardProps) {
  const badgeLabel = isPrepPhase ? 'YOUR TURN: PREP' : 'YOUR TURN';

  return (
    <Paper p="md" radius="md" withBorder bg="dark.6" pos="relative">
      {isUserTurn && (
        <Badge
          size="sm"
          color="yellow"
          variant="filled"
          pos="absolute"
          top={-12}
          left="md"
        >
          {badgeLabel}
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
            {!isPrepPhase && (
              <Button
                variant="filled"
                color="red"
                leftSection={<IconSword size={18} />}
                onClick={onAttack}
                style={{ flexDirection: 'column', height: 52 }}
              >
                <Text size="xs" fw={700}>
                  ATTACK
                </Text>
              </Button>
            )}
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
        {isPrepPhase && quickPrepLabels.length > 0 && (
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
