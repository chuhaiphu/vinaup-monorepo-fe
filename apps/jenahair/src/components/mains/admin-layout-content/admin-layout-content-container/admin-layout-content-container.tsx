'use client';

import { AppShell, AppShellMain } from '@mantine/core';
import { useLayoutSiderStore } from '@/libs/zustand/layout-sider-store';
import React from 'react';
import DashboardSidebar from '@/components/sidebars/dashboard-sidebar/dashboard-sidebar';
import { DashboardHeader } from '@/components/headers/dashboard-header/dashboard-header';
import { IUserResponse } from '@/interfaces/user-interface';
import classes from './admin-layout-content-container.module.scss';
interface AdminLayoutContentContainerProps {
  children: React.ReactNode;
  userData: IUserResponse;
}

export default function AdminLayoutContentContainer({ children, userData }: AdminLayoutContentContainerProps) {
  const { collapsed } = useLayoutSiderStore();

  return (
    <AppShell
      classNames={{ root: classes.adminLayout }}
      layout="alt"
      header={{ height: 56 }}
      navbar={{
        width: '16rem',
        breakpoint: 'sm',
        collapsed: { mobile: collapsed }
      }}
    >
      <DashboardSidebar userData={userData} />
      <DashboardHeader userData={userData} />
      <AppShellMain miw={1080} classNames={{ main: classes.mainRoot }}>
        {children}
      </AppShellMain>
    </AppShell>
  );
}
