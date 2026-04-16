'use client';

import { ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { createDiaryActionPrivate } from '@/actions/diary-action';
import { Route } from 'next';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useAuth } from '@/providers/auth-provider';

export default function CreateDiaryAction() {
  const router = useRouter();
  const userData = useAuth().getUser();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewDiary = async () => {
    setIsCreating(true);
    const newTitle = '';
    const endpoint = await generateUniqueEndpoint(newTitle, 'diary');

    const response = await createDiaryActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: ['Ho Chi Minh'],
      userId: userData?.id || '',
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create diary failed',
        message: response.error || 'Failed to create diary',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }

    const diaryId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/diary/${diaryId}` as Route);
  };

  return (
    <Group gap="xs">
      <UnstyledButton onClick={handleAddNewDiary} fz={'lg'}>
        Add new
      </UnstyledButton>
      <ActionIcon
        variant="transparent"
        onClick={handleAddNewDiary}
        loading={isCreating}
      >
        <AddNewIcon width={32} height={32} />
      </ActionIcon>
    </Group>
  );
}
