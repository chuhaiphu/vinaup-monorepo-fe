'use client';
import { Paper, Stack, Group } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';
import classes from './admin-section-ui-detail-page-content.module.scss';

const ROWS = 3;

export default function SectionUIDetailSkeleton() {
  return (
    <div className={classes.sectionUIDetailRoot}>
      <Paper p="md" radius="md" classNames={{ root: classes.paperBlock }}>
        <Stack gap="md">
          <Group justify="space-between">
            <Skeleton width={120} height={28} borderRadius={4} />
            <Skeleton width={100} height={32} borderRadius={4} />
          </Group>
          <Stack gap="xs">
            {Array.from({ length: ROWS }).map((_, i) => (
              <Paper key={i} p="sm" withBorder>
                <Group justify="space-between">
                  <Stack gap={6}>
                    <Skeleton width={160} height={18} borderRadius={4} />
                    <Skeleton width={120} height={14} borderRadius={4} />
                  </Stack>
                  <Skeleton width={48} height={28} borderRadius={4} />
                </Group>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </div>
  );
}
