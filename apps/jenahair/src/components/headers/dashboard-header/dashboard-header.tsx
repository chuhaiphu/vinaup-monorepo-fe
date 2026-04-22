'use client';

import { Group, Burger, AppShellHeader } from '@mantine/core';
import { UserSection } from '@/components/headers/user-section/user-section';
import classes from './dashboard-header.module.scss';
import { IUserResponse } from '@/interfaces/user-interface';
import { useAdminLayoutSiderStore } from '@/libs/zustand/admin-layout-sider-store';

export function DashboardHeader({ userData }: { userData: IUserResponse }) {
  const { collapsed, toggle } = useAdminLayoutSiderStore();

  return (
    <AppShellHeader>
      <div className={classes.dashboardHeader}>
        <Group justify="space-between" align="center" h="100%">
          <Burger opened={!collapsed} onClick={toggle} size="sm" />
          <UserSection userData={userData} />
        </Group>
      </div>
    </AppShellHeader>
  );
}
