import { Alert, Button, Group, Stack, Text } from '@mantine/core';

interface PhaseBannerProps {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

export function PhaseBanner({
  title,
  description,
  buttonLabel,
  onButtonClick,
}: PhaseBannerProps) {
  return (
    <Alert
      color="blue"
      variant="light"
      radius="md"
      styles={{
        root: { border: '1px solid var(--mantine-color-blue-3)' },
      }}
    >
      <Group justify="space-between" wrap="nowrap" align="flex-start" gap="md">
        <Stack gap={4}>
          <Text fw={600} size="sm">
            {title}
          </Text>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </Stack>
        <Button size="sm" variant="filled" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      </Group>
    </Alert>
  );
}
