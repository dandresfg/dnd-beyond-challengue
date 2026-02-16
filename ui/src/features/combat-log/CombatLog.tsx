import { ScrollArea, Stack } from '@mantine/core';
import { useLog } from '../../context/LogContext';
import { CombatLogEntry } from './CombatLogEntry';

export function CombatLog() {
  const { entries } = useLog();

  return (
    <ScrollArea style={{ flex: 1 }} type="auto">
      <Stack gap="md" p="md">
        {entries.map((entry) => (
          <CombatLogEntry key={entry.id} entry={entry} />
        ))}
      </Stack>
    </ScrollArea>
  );
}
