import { ScrollArea, Stack } from '@mantine/core';

interface CombatLogProps {
  children: React.ReactNode;
}

export function CombatLog({ children }: CombatLogProps) {
  return (
    <ScrollArea style={{ flex: 1 }} type="auto">
      <Stack gap="md" p="md">
        {children}
      </Stack>
    </ScrollArea>
  );
}
