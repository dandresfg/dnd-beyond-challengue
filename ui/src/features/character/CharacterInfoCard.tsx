import { Avatar, Badge, Box, Group, Paper, Stack, Text } from '@mantine/core';
import { IconBackpack, IconShield } from '@tabler/icons-react';
import { CharacterStats as CharacterStatsComponent } from './CharacterStats';
import { Character } from '../../types/character';

export function CharacterInfoCard({
  name,
  subtitle,
  level,
  items = [],
  defenses = [],
  stats,
}: Character) {
  return (
    <Paper p="md" radius="md" withBorder bg="dark.6" h="100%">
      <Text variant="h5">Character Info</Text>
      <Group align="flex-start" wrap="nowrap" gap="md" mt={8}>
        <Box pos="relative" style={{ flexShrink: 0 }}>
          <Avatar
            src={'/assets/player.png'}
            alt={name}
            size={96}
            radius="md"
            style={{ border: '1px solid var(--mantine-color-dark-4)' }}
          >
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
              style={{
                border: '2px solid var(--mantine-color-dark-6)',
                borderRadius: 6,
              }}
            >
              LVL {level}
            </Badge>
          )}
        </Box>
        <Stack gap="sm" style={{ flex: 1, minWidth: 0 }}>
          <Group
            justify="space-between"
            wrap="wrap"
            align="flex-start"
            gap="xs"
          >
            <Stack gap={2}>
              <Text fw={700} size="xl" c="white">
                {name}
              </Text>
              {subtitle && (
                <Text size="sm" c="blue.4" fw={500}>
                  {subtitle}
                </Text>
              )}
            </Stack>
            <CharacterStatsComponent stats={stats} />
          </Group>
          <Group gap="md">
            {defenses.length > 0 && (
              <Group
                gap="xs"
                p="xs"
                align="center"
                style={{
                  backgroundColor: 'var(--mantine-color-dark-5)',
                  borderRadius: 'var(--mantine-radius-md)',
                  border: '1px solid var(--mantine-color-dark-4)',
                }}
              >
                <Box
                  c="gray.4"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <IconShield size={30} />
                </Box>
                <Stack gap={0}>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                    Resistances
                  </Text>
                  <Text size="sm" fw={500} c="white">
                    {defenses.map((defense) => defense.type).join(', ')}
                  </Text>
                </Stack>
              </Group>
            )}
            {items.length > 0 && (
              <Group
                gap="xs"
                p="xs"
                align="center"
                style={{
                  backgroundColor: 'var(--mantine-color-dark-5)',
                  borderRadius: 'var(--mantine-radius-md)',
                  border: '1px solid var(--mantine-color-dark-4)',
                }}
              >
                <Box
                  c="gray.4"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <IconBackpack size={30} />
                </Box>
                <Stack gap={0}>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                    Items
                  </Text>
                  <Text size="sm" fw={500} c="white">
                    {items.map((item) => item.name).join(', ')}
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
