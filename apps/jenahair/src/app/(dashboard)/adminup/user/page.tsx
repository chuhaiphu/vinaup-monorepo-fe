import { Group, Text } from '@mantine/core';
import UsersTable from '@/components/tables/users-table/users-table';
import UsersTableSkeleton from '@/components/tables/users-table/users-table-skeleton';
import { getAllUsersActionPrivate } from '@/actions/user-action';
import { Suspense } from 'react';
import classes from './page.module.scss';
import { getMeActionPrivate } from '@/actions/auth-action';
import { ActionResponse } from '@/interfaces/_base-interface';
import { IUserResponse } from '@/interfaces/user-interface';
import { redirect } from 'next/navigation';

export default async function AdminUserPage() {
  const usersDataPromise = getAllUsersActionPrivate().then((res) => {
    if (!res) return [];
    return res;
  });

  const currentUserPromise = getMeActionPrivate().then((res) => {
    if (!res) return null;
    return res;
  });

  return (
    <div className={classes.adminUserPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">User Management</Text>
      </Group>
      <Suspense>
        <AdminUserHiddenGuard currentUserPromise={currentUserPromise} />
      </Suspense>
      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTable usersDataPromise={usersDataPromise} />
      </Suspense>
    </div>
  );
}

interface AdminUserHiddenGuardProps {
  currentUserPromise: Promise<ActionResponse<IUserResponse> | null>;
}
const AdminUserHiddenGuard = async ({
  currentUserPromise,
}: AdminUserHiddenGuardProps) => {
  const currentUserData = await currentUserPromise;
  if (
    !currentUserData ||
    !currentUserData.data ||
    currentUserData.data.role !== 'supadmin'
  ) {
    redirect('/adminup');
  }

  return null;
};
