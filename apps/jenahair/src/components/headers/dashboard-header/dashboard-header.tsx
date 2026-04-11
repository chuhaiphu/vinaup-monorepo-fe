'use client';

import { Group, Burger, AppShellHeader } from '@mantine/core';
import { UserSection } from '@/components/headers/user-section/user-section';
import classes from './dashboard-header.module.scss';
import { IUserResponse } from '@/interfaces/user-interface';
import { useLayoutSiderStore } from '@/libs/zustand/layout-sider-store';

export function DashboardHeader({ userData }: { userData: IUserResponse }) {
  const { collapsed, toggle } = useLayoutSiderStore();

  return (
    <AppShellHeader>
      <div className={classes.dashboardHeader}>
        <Group justify="space-between" align="center" h="100%">
          <Group>
            <Burger opened={!collapsed} onClick={toggle} hiddenFrom="sm" size="sm" />
          </Group>
          <UserSection userData={userData} />
        </Group>
      </div>
    </AppShellHeader>
  );
}




