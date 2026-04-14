import { Group, Paper, Stack } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';
import classes from './smtp-page-content.module.scss';

export default function SmtpPageContentSkeleton() {
  return (
    <Stack gap="md">
      <Paper radius="md" shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Stack p="sm" gap="md">
          {/* Header */}
          <Group justify="space-between">
            <Skeleton height={24} width={200} borderRadius={4} />
            <Skeleton height={36} width={120} borderRadius={4} />
          </Group>

          {/* Host + Port */}
          <Group grow align="flex-start">
            <Stack gap={2}>
              <Skeleton height={18} width={40} borderRadius={4} />
              <Skeleton height={36} borderRadius={4} />
            </Stack>
            <Stack gap={2}>
              <Skeleton height={18} width={36} borderRadius={4} />
              <Skeleton height={36} borderRadius={4} />
            </Stack>
          </Group>

          {/* Username + Password */}
          <Group grow align="flex-start">
            <Stack gap={2}>
              <Skeleton height={18} width={72} borderRadius={4} />
              <Skeleton height={36} borderRadius={4} />
            </Stack>
            <Stack gap={2}>
              <Skeleton height={18} width={72} borderRadius={4} />
              <Skeleton height={36} borderRadius={4} />
            </Stack>
          </Group>

          {/* Secure toggle */}
          <Stack gap={4}>
            <Skeleton height={18} width={220} borderRadius={4} />
            <Skeleton height={20} width={100} borderRadius={4} />
          </Stack>

          {/* Divider gap */}
          <Skeleton height={1} borderRadius={0} style={{ opacity: 0.3 }} />

          {/* Sender info header */}
          <Skeleton height={22} width={180} borderRadius={4} />

          {/* From Name + From Email */}
          <Group grow align="flex-start">
            <Stack gap={2}>
              <Skeleton height={18} width={80} borderRadius={4} />
              <Skeleton height={36} borderRadius={4} />
            </Stack>
            <Stack gap={2}>
              <Skeleton height={18} width={80} borderRadius={4} />
              <Skeleton height={36} borderRadius={4} />
            </Stack>
          </Group>

          {/* Receive email + test button */}
          <Group justify="space-between" align="flex-end">
            <Stack gap={2} style={{ flex: 1 }}>
              <Skeleton height={18} width={110} borderRadius={4} />
              <Skeleton height={36} borderRadius={4} />
            </Stack>
            <Skeleton height={36} width={140} borderRadius={4} />
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
