'use client';

import { Button, PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { updateUserPasswordActionPrivate } from '@/actions/user-action';

interface UserDetailFormProps {
  userId: string;
}

interface PasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

export default function UserDetailForm({ userId }: UserDetailFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PasswordFormValues>({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      newPassword: (value) => {
        if (!value) return 'New password is required';
        if (value.length < 8) return 'Password must be at least 8 characters long';
        return null;
      },
      confirmPassword: (value, values) => {
        if (!value) return 'Please confirm your password';
        if (value !== values.newPassword) return 'Passwords do not match';
        return null;
      },
    },
  });

  const handleSubmit = async (values: PasswordFormValues) => {
    setIsLoading(true);
    try {
      const result = await updateUserPasswordActionPrivate({
        userId,
        newPassword: values.newPassword,
      });

      if (result.success) {
        notifications.show({
          title: 'Success',
          message: 'Password updated successfully',
          color: 'green',
        });
        form.reset();
      } else {
        notifications.show({
          title: 'Error',
          message: result.error || 'Failed to update password',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'An unexpected error occurred',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <PasswordInput
          label="New Password"
          placeholder="Enter new password (min 8 characters)"
          required
          {...form.getInputProps('newPassword')}
        />

        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm new password"
          required
          {...form.getInputProps('confirmPassword')}
        />

        <Button
          type="submit"
          loading={isLoading}
          mt="md"
        >
          Update Password
        </Button>
      </Stack>
    </form>
  );
}
