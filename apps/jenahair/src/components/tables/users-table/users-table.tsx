'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { ActionIcon, Button, Group, Modal, Popover, Stack, Text } from '@mantine/core';
import { SlOptionsVertical } from 'react-icons/sl';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { MdLockReset } from 'react-icons/md';
import classes from './users-table.module.scss';
import { IUserResponse } from '@/interfaces/user-interface';
import { EntitiesTable, EntitiesTableColumnProps } from '@vinaup/ui/admin';
import { DatePicker } from '@mantine/dates';

import { resetPasswordForUserActionPrivate } from '@/actions/auth-action';
import { notifications } from '@mantine/notifications';

interface UsersTableProps {
  usersData: IUserResponse[];
  currentUserId: string;
}

const RoleDisplayMap: Record<string, string> = {
  ['supadmin']: 'Super Admin',
  ['admin']: 'Admin',
  ['user']: 'User',
};

export default function UsersTable({
  usersData,
  currentUserId,
}: UsersTableProps) {
  const [datePickerOpened, setDatePickerOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | string | null>(null);
  const [resetPasswordModalOpened, setResetPasswordModalOpened] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserResponse | null>(null);

  const handleResetPassword = async () => {
    if (!selectedUser) return;
    setIsResetting(true);
    const result = await resetPasswordForUserActionPrivate(selectedUser.id);
    if (result.success) {
      notifications.show({
        title: 'Password Reset',
        message: `Password for ${selectedUser.email} has been reset successfully.`,
        color: 'green',
        position: 'top-center',
        autoClose: 10000,
      });
    } else {
      notifications.show({
        title: 'Reset failed',
        message: result.error || 'Failed to reset password',
        color: 'red',
      });
    }

    setIsResetting(false);
    setResetPasswordModalOpened(false);
    setSelectedUser(null);
  };

  const columns: EntitiesTableColumnProps<IUserResponse>[] = [
    {
      key: 'date',
      width: '10%',
      headerAlign: 'left',
      header: (
        <Popover opened={datePickerOpened} onChange={setDatePickerOpened} position='bottom-start'>
          <Popover.Target>
            <ActionIcon
              variant="transparent"
              onClick={() => setDatePickerOpened((o) => !o)}
            >
              <MdOutlineCalendarMonth size={24} color="#01426e" />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <DatePicker
              value={selectedDate}
              onChange={(value) => setSelectedDate(value)}
            />
          </Popover.Dropdown>
        </Popover>
      ),
      render: ({ entity }) => <>{entity.createdAt ? dayjs(entity.createdAt).format('DD/MM/YYYY') : '-'}</>,
    },
    {
      key: 'email',
      width: '30%',
      header: 'Email',
      render: ({ entity }) => (
        <>
          {entity.email}
        </>
      ),
    },
    {
      key: 'name',
      width: '25%',
      headerAlign: 'left',
      cellAlign: 'left',
      header: 'Name',
      render: ({ entity }) => <>{entity.name || '-'}</>,
    },
    {
      key: 'role',
      width: '15%',
      headerAlign: 'left',
      cellAlign: 'left',
      header: 'Role',
      render: ({ entity }) => <>{RoleDisplayMap[entity.role] || entity.role}</>,
    },
    {
      key: 'actions',
      width: '15%',
      headerAlign: 'right',
      header: (
        <div className={`${classes.columnHeaderContent} ${classes.actionColumnHeaderContent}`}>
          <ActionIcon variant="transparent">
            <SlOptionsVertical size={24} color="#01426e" />
          </ActionIcon>
        </div>
      ),
      cellAlign: 'right',
      render: ({ entity }) => (
        <Group gap="xs" justify="flex-end">

          <ActionIcon
            variant="transparent"
            onClick={() => {
              setSelectedUser(entity);
              setResetPasswordModalOpened(true);
            }}
            title="Reset Password"
            size={'lg'}
          >{entity.id !== currentUserId && entity.role !== 'supadmin' && (
            <MdLockReset size={32} color="#01426e" />
          )}
          </ActionIcon>
        </Group>
      ),
    },
  ];


  return (
    <>
      <EntitiesTable<IUserResponse>
        data={usersData}
        loading={false}
        columns={columns}
        classNames={{
          wrapper: classes.tableWrapper,
          table: {
            table: classes.table,
            thead: classes.thead,
            tbody: classes.tbody,
            tr: classes.tr,
            th: classes.th,
            td: classes.td,
          },
        }}
      />
      <Modal
        opened={resetPasswordModalOpened}
        onClose={() => setResetPasswordModalOpened(false)}
        title="Confirm Reset Password"
        centered
      >
        <Stack>
          <Text>
            Are you sure you want to reset password for user <strong>{selectedUser?.email}</strong>?
          </Text>
          <Group justify="flex-end" mt="sm">
            <Button
              variant="default"
              onClick={() => setResetPasswordModalOpened(false)}
              disabled={isResetting}
            >
              Cancel
            </Button>
            <Button
              color="blue"
              onClick={handleResetPassword}
              loading={isResetting}
            >
              Reset Password
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
