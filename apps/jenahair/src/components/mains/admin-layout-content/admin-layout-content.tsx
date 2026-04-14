'use client';
import { logoutActionPrivate } from '@/actions/auth-action';
import AdminLayoutContainer from '@/components/mains/admin-layout-content/admin-layout-content-container/admin-layout-content-container';
import { ActionResponse } from '@/interfaces/_base-interface';
import { IUserResponse } from '@/interfaces/user-interface';
import { AuthProvider } from '@/providers/auth-provider';
import { Notifications } from '@mantine/notifications';
import { redirect } from 'next/navigation';
import { use } from 'react';

interface AdminLayoutContentProps {
  children: React.ReactNode;
  userDataPromise: Promise<ActionResponse<IUserResponse>>;
}

export default function AdminLayoutContent({
  children,
  userDataPromise,
}: AdminLayoutContentProps) {
  const userData = use(userDataPromise);
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
      <AdminLayoutContainer>{children}</AdminLayoutContainer>
    </AuthProvider>
  );
}
