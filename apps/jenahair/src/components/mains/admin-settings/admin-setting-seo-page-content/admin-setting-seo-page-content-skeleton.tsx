import { Group, Paper, Stack } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';
import classes from './admin-setting-seo-page-content.module.scss';

export default function AdminSettingSeoPageContentSkeleton() {
  return (
    <Stack gap="md">
      {/* Site title + Description */}
      <Paper radius="md" shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Stack p="sm" gap="md">
          <Stack gap={2}>
            <Skeleton height={60} borderRadius={4} />
          </Stack>
          <Stack gap={2}>
            <Skeleton height={100} borderRadius={4} />
          </Stack>
        </Stack>
      </Paper>

      {/* Sitemap & Robots */}
      {[0, 1].map((i) => (
        <Paper
          key={i}
          radius="md"
          shadow="xs"
          classNames={{ root: classes.paperBlock }}
        >
          <Group justify="space-between" wrap="nowrap" p="sm" gap="md">
            <Skeleton height={40} width={'100%'} borderRadius={4} />
            <Skeleton height={60} borderRadius={4} />
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}
