import { Paper, Stack } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';
import classes from './admin-setting-overview-page-content.module.scss';

export default function AdminSettingOverviewPageContentSkeleton() {
  return (
    <div className={classes.overviewPageRoot}>
      <Stack gap="md">
        {/* Favicon */}
        <Paper radius="md" shadow="xs" classNames={{ root: classes.paperBlock }}>
          <Stack p="sm">
            <Skeleton height={22} width="20%" borderRadius={4} />
            <Skeleton height={100} borderRadius={4} />
          </Stack>
        </Paper>

        {/* Logo */}
        <Paper radius="md" shadow="xs" classNames={{ root: classes.paperBlock }}>
          <Stack p="sm">
            <Skeleton height={22} width="25%" borderRadius={4} />
            <Skeleton height={100} borderRadius={4} />
          </Stack>
        </Paper>

        {/* Hotline */}
        <Paper radius="md" classNames={{ root: classes.paperBlock }}>
          <Stack p="sm">
            <Skeleton height={22} width="18%" borderRadius={4} />
            <Skeleton height={60} borderRadius={4} />
          </Stack>
        </Paper>

        {/* Maintenance mode */}
        <Paper radius="md" classNames={{ root: classes.paperBlock }}>
          <Stack p="sm">
            <Skeleton height={50} borderRadius={4} />
          </Stack>
        </Paper>
      </Stack>
    </div>
  );
}
