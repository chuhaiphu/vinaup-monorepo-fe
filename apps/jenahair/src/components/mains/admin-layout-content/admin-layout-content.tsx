'use client';

import { logoutActionPrivate } from '@/actions/auth-action';
import { DashboardHeader } from '@/components/headers/dashboard-header/dashboard-header';
import DashboardSidebar from '@/components/sidebars/dashboard-sidebar/dashboard-sidebar';
import { ActionResponse } from '@/interfaces/_base-interface';
import { IUserResponse } from '@/interfaces/user-interface';
import { useLayoutSiderStore } from '@/libs/zustand/layout-sider-store';
import { AuthProvider } from '@/providers/auth-provider';
import { AppShell, AppShellMain } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { redirect } from 'next/navigation';
import { use } from 'react';
import classes from './admin-layout-content.module.scss';

interface AdminLayoutContentProps {
  children: React.ReactNode;
  userDataPromise: Promise<ActionResponse<IUserResponse>>;
}

export default function AdminLayoutContent({
  children,
  userDataPromise,
}: AdminLayoutContentProps) {
  const userData = use(userDataPromise);
  const { collapsed } = useLayoutSiderStore();

  if (!userData.success || !userData.data) {
    Notifications.show({
      title: 'Error',
      message: 'Session expired. Please log in again.',
      color: 'red',
    });
    redirect('/login');
  }

  const initialUser = {
    id: userData.data.id,
    name: userData.data.name || '',
    email: userData.data.email,
    role: userData.data.role,
  };

  const handleLogout = async () => {
    await logoutActionPrivate();
  };

  return (
    <AuthProvider initialUser={initialUser} onLogout={handleLogout}>
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
        <DashboardSidebar userData={initialUser} />
        <DashboardHeader userData={initialUser} />
        <AppShellMain miw={1080} classNames={{ main: classes.mainRoot }}>
          {children}
        </AppShellMain>
      </AppShell>
    </AuthProvider>
  );
}
