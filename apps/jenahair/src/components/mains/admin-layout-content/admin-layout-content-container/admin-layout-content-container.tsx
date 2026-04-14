'use client';

import { AppShell, AppShellMain } from '@mantine/core';
import { useLayoutSiderStore } from '@/libs/zustand/layout-sider-store';
import React from 'react';
import DashboardSidebar from '@/components/sidebars/dashboard-sidebar/dashboard-sidebar';
import { DashboardHeader } from '@/components/headers/dashboard-header/dashboard-header';
import classes from './admin-layout-content-container.module.scss';
import { useAuth } from '@/providers/auth-provider';
interface AdminLayoutContentContainerProps {
  children: React.ReactNode;
}

export default function AdminLayoutContentContainer({
  children,
}: AdminLayoutContentContainerProps) {
  const { collapsed } = useLayoutSiderStore();
  const userData = useAuth().getUser();
  return (
    <AppShell
      classNames={{ root: classes.adminLayout }}
      layout="alt"
      header={{ height: 56 }}
      navbar={{
        width: '16rem',
        breakpoint: 'sm',
        collapsed: { mobile: collapsed },
      }}
    >
      <DashboardSidebar
        userData={{
          id: userData?.id || '',
          name: userData?.name || '',
          email: userData?.email || '',
          role: userData?.role || 'user',
        }}
      />
      <DashboardHeader
        userData={{
          id: userData?.id || '',
          name: userData?.name || '',
          email: userData?.email || '',
          role: userData?.role || 'user',
        }}
      />
      <AppShellMain miw={1080} classNames={{ main: classes.mainRoot }}>
        {children}
      </AppShellMain>
    </AppShell>
  );
}
