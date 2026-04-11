'use client';

import { Group, Text } from '@mantine/core';
import classes from './admin-section-ui-layout-content-container.module.scss';

interface AdminSectionUILayoutContentContainerProps {
  children: React.ReactNode;
}

export default function AdminSectionUILayoutContentContainer({
  children,
}: AdminSectionUILayoutContentContainerProps) {
  return (
    <div>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Section UI</Text>
      </Group>
      {children}
    </div>
  );
}
