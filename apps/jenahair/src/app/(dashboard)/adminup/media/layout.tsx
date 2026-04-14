import { Group, Text } from '@mantine/core';
import MediaTabs from './media-tabs';
import classes from './layout.module.scss';

export default function AdminMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={classes.adminMediaPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Media</Text>
      </Group>
      <MediaTabs>{children}</MediaTabs>
    </div>
  );
}
