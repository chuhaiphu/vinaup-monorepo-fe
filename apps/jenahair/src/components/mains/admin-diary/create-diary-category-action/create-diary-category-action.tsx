'use client';

import { ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { createDiaryCategoryActionPrivate } from '@/actions/diary-category-action';
import { Route } from 'next';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export default function CreateDiaryCategoryAction() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewDiaryCategory = async () => {
    setIsCreating(true);
    const newTitle = 'New Diary Category';
    const endpoint = await generateUniqueEndpoint(newTitle, 'diary-category');

    const response = await createDiaryCategoryActionPrivate({
      title: newTitle,
      endpoint: endpoint,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create diary category failed',
        message: response.error || 'Failed to create diary category',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }

    const categoryId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/diary-category/${categoryId}` as Route);
  };

  return (
    <Group gap="xs">
      <UnstyledButton onClick={handleAddNewDiaryCategory} fz={'lg'}>
        Add new
      </UnstyledButton>
      <ActionIcon
        variant="transparent"
        onClick={handleAddNewDiaryCategory}
        loading={isCreating}
      >
        <AddNewIcon width={32} height={32} />
      </ActionIcon>
    </Group>
  );
}
