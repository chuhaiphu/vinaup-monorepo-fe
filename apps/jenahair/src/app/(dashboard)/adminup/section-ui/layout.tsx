import { Group, Text } from '@mantine/core';
import classes from './layout.module.scss';

export default function AdminSectionUILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={classes.adminSectionUILayoutRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Section UI</Text>
      </Group>
      {children}
    </div>
  );
}
