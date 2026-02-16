import { Avatar, Badge, Box, Group, Paper, Stack, Text } from '@mantine/core';
import { IconShield, IconFlame, IconBulb } from '@tabler/icons-react';

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
    <Paper p="md" radius="md" withBorder bg="dark.6" h={'100%'}>
      <Group align="flex-start" wrap="nowrap">
        <Box pos="relative" style={{ flexShrink: 0 }}>
          <Avatar src={portraitUrl} alt={name} size={80} radius="md">
            {name.slice(0, 2).toUpperCase()}
          </Avatar>
          {level != null && (
            <Badge
              size="sm"
              variant="filled"
              color="blue"
              pos="absolute"
              bottom={-4}
              right={-4}
              style={{ border: '2px solid var(--mantine-color-dark-6)' }}
            >
              LVL {level}
            </Badge>
          )}
        </Box>
        <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
          <Group justify="space-between" wrap="wrap" align="flex-start">
            <div>
              <Text fw={700} size="xl">
                {name}
              </Text>
              {subtitle && (
                <Text size="sm" c="blue.4" fw={500}>
                  {subtitle}
                </Text>
              )}
            </div>
            {badges.length > 0 && (
              <Group gap="xs">
                {badges.map((b) => (
                  <Badge
                    key={b}
                    size="sm"
                    variant="light"
                    color="yellow"
                    leftSection={<IconBulb size={12} />}
                    styles={{
                      root: {
                        backgroundColor: 'rgba(251, 191, 36, 0.1)',
                        border: '1px solid rgba(251, 191, 36, 0.2)',
                      },
                    }}
                  >
                    {b}
                  </Badge>
                ))}
              </Group>
            )}
          </Group>
          <Group gap="md">
            {ac != null && (
              <Group
                gap="xs"
                p="xs"
                style={{
                  backgroundColor: 'var(--mantine-color-dark-5)',
                  borderRadius: 'var(--mantine-radius-md)',
                  border: '1px solid var(--mantine-color-dark-4)',
                }}
              >
                <Box c="dimmed">
                  <IconShield size={20} />
                </Box>
                <Stack gap={0}>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                    AC
                  </Text>
                  <Text fw={700} size="lg">
                    {ac}
                  </Text>
                </Stack>
              </Group>
            )}
            {resistances.length > 0 && (
              <Group
                gap="xs"
                p="xs"
                style={{
                  backgroundColor: 'var(--mantine-color-dark-5)',
                  borderRadius: 'var(--mantine-radius-md)',
                  border: '1px solid var(--mantine-color-dark-4)',
                }}
              >
                <Box c="dimmed">
                  <IconFlame size={20} />
                </Box>
                <Stack gap={0}>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                    Resistances
                  </Text>
                  <Text size="sm" fw={500}>
                    {resistances.join(', ')}
                  </Text>
                </Stack>
              </Group>
            )}
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
}
