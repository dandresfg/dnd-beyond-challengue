import { Group, Paper, Progress, Text } from '@mantine/core';

interface CharacterHealthBarProps {
  currentHp: number;
  maxHp: number;
  tempHp?: number;
  label?: string;
}

export function CharacterHealthBar({
  currentHp,
  maxHp,
  tempHp = 0,
  label = 'Healthy',
}: CharacterHealthBarProps) {
  const currentPct = maxHp > 0 ? (currentHp / maxHp) * 100 : 0;
  const tempPct = maxHp > 0 ? (tempHp / maxHp) * 100 : 0;
  const totalPct = Math.min(100, currentPct + tempPct);

  const sections = [
    { value: currentPct, color: 'blue' },
    { value: tempPct, color: 'teal' },
  ].filter((s) => s.value > 0);

  return (
    <Paper p="md" radius="md" withBorder bg="blue.9">
      <Group justify="space-between" mb="xs">
        <div>
          <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={4}>
            Health Points
          </Text>
          <Group gap="xs" align="baseline">
            <Text fw={700} size="xl">
              {currentHp}
            </Text>
            <Text size="lg" c="dimmed">
              / {maxHp}
            </Text>
            {tempHp > 0 && (
              <Text size="sm" c="teal" fw={600}>
                +{tempHp} Temp
              </Text>
            )}
          </Group>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Text size="xs" c="dimmed">
            {label}
          </Text>
          <Text fw={700} c="green">
            {Math.round(totalPct)}%
          </Text>
        </div>
      </Group>
      <Progress.Root size="lg" radius="xl">
        {sections.length > 0 ? (
          sections.map((s, i) => (
            <Progress.Section key={i} value={s.value} color={s.color} />
          ))
        ) : (
          <Progress.Section value={0} color="blue.8" />
        )}
      </Progress.Root>
      <Group justify="space-between" mt="xs">
        <Text size="xs" c="dimmed">
          0
        </Text>
        <Text size="xs" c="dimmed">
          Max: {maxHp}
        </Text>
      </Group>
    </Paper>
  );
}
