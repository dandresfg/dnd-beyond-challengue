import { Box, Button, Group, Stack, Text } from '@mantine/core';
import { IconHourglass, IconArrowsRight } from '@tabler/icons-react';

interface PhaseBannerProps {
  onButtonClick: () => void;
}

export function PhaseBanner({ onButtonClick }: PhaseBannerProps) {
  return (
    <Box
      p="md"
      style={{
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: 'var(--mantine-radius-md)',
      }}
    >
      <Group justify="space-between" wrap="nowrap" align="flex-start" gap="md">
        <Group gap="sm" wrap="nowrap">
          <Box c="yellow.5" style={{ display: 'flex', alignItems: 'center' }}>
            <IconHourglass size={28} />
          </Box>
          <Stack gap={4}>
            <Text fw={700} size="lg" c="yellow.5">
              Tactical Prep Phase
            </Text>
            <Text size="sm" c="dimmed">
              Wave cleared. Prepare for the next encounter.
            </Text>
          </Stack>
        </Group>
        <Button
          size="sm"
          variant="filled"
          color="yellow"
          rightSection={<IconArrowsRight size={18} />}
          onClick={onButtonClick}
          styles={{
            root: {
              boxShadow: '0 4px 14px rgba(251, 191, 36, 0.25)',
            },
          }}
        >
          Start Next Wave
        </Button>
      </Group>
    </Box>
  );
}
