'use client';

import { Button, Group, Modal, Paper, Stack, Text } from '@mantine/core';
import { MdLockReset } from 'react-icons/md';
import { useState } from 'react';
import { resetMyPasswordActionPrivate } from '@/actions/auth-action';
import { notifications } from '@mantine/notifications';
import { IUserResponse } from '@/interfaces/user-interface';

interface UserDetailsBlockProps {
  user: IUserResponse;
}

export default function UserDetailsBlock({ user }: UserDetailsBlockProps) {
  const [resetPasswordModalOpened, setResetPasswordModalOpened] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleResetPassword = async () => {
    setIsResetting(true);

    const result = await resetMyPasswordActionPrivate();
    if (result.success) {
      notifications.show({
        title: 'Password Reset',
        message: 'Your password has been reset successfully',
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
  };

  return (
    <>
      <Paper p="lg" mb="lg" style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
        <Group justify="space-between" align="flex-start">
          <Stack gap="md">
            <div>
              <Text size="sm" c="dimmed">Email</Text>
              <Text size="md" fw={500}>{user.email}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">Name</Text>
              <Text size="md" fw={500}>{user.name || 'N/A'}</Text>
            </div>
          </Stack>

          <Button
            variant="outline"
            color="blue"
            leftSection={<MdLockReset size={20} />}
            onClick={() => setResetPasswordModalOpened(true)}
          >
            Reset Password
          </Button>
        </Group>
      </Paper>

      <Modal
        opened={resetPasswordModalOpened}
        onClose={() => setResetPasswordModalOpened(false)}
        title="Confirm Reset Password"
        centered
      >
        <Stack>
          <Text>
            Are you sure you want to reset your password?
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
