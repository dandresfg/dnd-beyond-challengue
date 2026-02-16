import { Avatar, Badge, Group, Paper, Stack, Text } from '@mantine/core';

interface CharacterInfoCardProps {
  name: string;
  subtitle?: string;
  level?: number;
  portraitUrl?: string;
  ac?: number;
  resistances?: string[];
  badges?: string[];
}

export function CharacterInfoCard({
  name,
  subtitle,
  level,
  portraitUrl,
  ac,
  resistances = [],
  badges = [],
}: CharacterInfoCardProps) {
  return (
    <Paper p="md" radius="md" withBorder bg="blue.9">
      <Group align="flex-start" wrap="nowrap">
        <Avatar src={portraitUrl} alt={name} size={80} radius="md">
          {name.slice(0, 2).toUpperCase()}
        </Avatar>
        <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
          <Group justify="space-between" wrap="wrap">
            <div>
              <Text fw={700} size="xl">
                {name}
              </Text>
              {subtitle && (
                <Text size="sm" c="dimmed">
                  {subtitle}
                </Text>
              )}
            </div>
            {level != null && (
              <Badge size="sm" variant="filled">
                LVL {level}
              </Badge>
            )}
          </Group>
          {badges.length > 0 && (
            <Group gap="xs">
              {badges.map((b) => (
                <Badge key={b} size="sm" variant="light" color="yellow">
                  {b}
                </Badge>
              ))}
            </Group>
          )}
          <Group gap="md">
            {ac != null && (
              <Group gap="xs">
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  AC
                </Text>
                <Text fw={700} size="lg">
                  {ac}
                </Text>
              </Group>
            )}
            {resistances.length > 0 && (
              <Group gap="xs">
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Resistances
                </Text>
                <Text size="sm" fw={500}>
                  {resistances.join(', ')}
                </Text>
              </Group>
            )}
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
}
