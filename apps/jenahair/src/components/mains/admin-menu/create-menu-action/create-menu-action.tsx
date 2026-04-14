'use client';

import { ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { createMenuActionPrivate } from '@/actions/menu-action';
import { Route } from 'next';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export default function CreateMenuAction() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewMenu = async () => {
    setIsCreating(true);
    const newTitle = 'New Menu';

    const response = await createMenuActionPrivate({
      title: newTitle,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create menu failed',
        message: response.error || 'Failed to create menu',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }

    const menuId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/menu/${menuId}` as Route);
  };

  return (
    <Group gap="xs">
      <UnstyledButton onClick={handleAddNewMenu} fz={'lg'}>
        Add new
      </UnstyledButton>
      <ActionIcon
        variant="transparent"
        onClick={handleAddNewMenu}
        loading={isCreating}
      >
        <AddNewIcon width={32} height={32} />
      </ActionIcon>
    </Group>
  );
}
