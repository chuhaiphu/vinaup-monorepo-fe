'use client';

import { ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { createPageActionPrivate } from '@/actions/page-action';
import { Route } from 'next';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useAuth } from '@/providers/auth-provider';

export default function CreatePageAction() {
  const router = useRouter();
  const userData = useAuth().getUser();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewPage = async () => {
    setIsCreating(true);
    const newTitle = 'Untitled';
    const endpoint = await generateUniqueEndpoint(newTitle, 'page');

    const response = await createPageActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: [],
      userId: userData?.id || '',
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create page failed',
        message: response.error || 'Failed to create page',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }

    const pageId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/page/${pageId}` as Route);
  };

  return (
    <Group gap="xs">
      <UnstyledButton onClick={handleAddNewPage} fz={'lg'}>
        Add new
      </UnstyledButton>
      <ActionIcon
        variant="transparent"
        onClick={handleAddNewPage}
        loading={isCreating}
      >
        <AddNewIcon width={32} height={32} />
      </ActionIcon>
    </Group>
  );
}
