import { Group, Text } from '@mantine/core';

interface NavbarProps {
  title: string;
  phaseLabel?: string;
}

export function Navbar({ title, phaseLabel }: NavbarProps) {
  return (
    <Group h="100%" px="md" justify="space-between" wrap="nowrap">
      <Text fw={600} size="lg" lineClamp={1}>
        {title}
      </Text>
      {phaseLabel && (
        <Text size="sm" c="dimmed" tt="uppercase">
          {phaseLabel}
        </Text>
      )}
    </Group>
  );
}
