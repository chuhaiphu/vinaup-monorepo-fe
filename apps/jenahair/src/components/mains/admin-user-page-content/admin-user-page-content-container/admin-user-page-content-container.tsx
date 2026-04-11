'use client';

import { Group, Text } from "@mantine/core";
import classes from "./admin-user-page-content-container.module.scss";
import UsersTable from "@/components/tables/users-table/users-table";
import { IUserResponse } from "@/interfaces/user-interface";

interface AdminUserPageContentContainerProps {
  usersData: IUserResponse[];
  userData: IUserResponse;
}

export default function AdminUserPageContentContainer({
  usersData,
  userData
}: AdminUserPageContentContainerProps) {
  return (
    <div className={classes.adminUserPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">User Management</Text>
      </Group>

      <div className={classes.pageContent}>
        <UsersTable usersData={usersData} currentUserId={userData.id} />
      </div>
    </div>
  );
}
