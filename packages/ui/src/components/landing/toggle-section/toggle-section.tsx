import { Switch, Group, Text, Paper } from '@mantine/core';

interface ToggleSectionProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  text: string;
  subText?: string;
  checkedSubText?: string;
  uncheckedSubText?: string;
}

export function ToggleSection({
  checked,
  onToggle,
  text,
  subText,
  checkedSubText,
  uncheckedSubText
}: ToggleSectionProps) {
  const displaySubText = subText ||
    (checked ? checkedSubText : uncheckedSubText) ||
    '';

  return (
    <Paper p="md" withBorder>
      <Group justify="space-between">
        <div>
          <Text fw={500} size="lg">{text}</Text>
          {displaySubText && (
            <Text size="md" c="dimmed">
              {displaySubText}
            </Text>
          )}
        </div>

        <Switch
          checked={checked}
          onChange={(e) => onToggle(e.currentTarget.checked)}
          size="lg"
          color={checked ? 'red' : 'green'}
        />
      </Group>
    </Paper>
  );
}