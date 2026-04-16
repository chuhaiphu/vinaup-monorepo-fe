'use client';

import { ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { createBlogCategoryActionPrivate } from '@/actions/blog-category-action';
import { Route } from 'next';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export default function CreateBlogCategoryAction() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewBlogCategory = async () => {
    setIsCreating(true);
    const newTitle = 'New Blog Category';
    const endpoint = await generateUniqueEndpoint(newTitle, 'blog-category');

    const response = await createBlogCategoryActionPrivate({
      title: newTitle,
      endpoint: endpoint,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create blog category failed',
        message: response.error || 'Failed to create blog category',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }

    const categoryId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/blog-category/${categoryId}` as Route);
  };

  return (
    <Group gap="xs">
      <UnstyledButton onClick={handleAddNewBlogCategory} fz={'lg'}>
        Add new
      </UnstyledButton>
      <ActionIcon
        variant="transparent"
        onClick={handleAddNewBlogCategory}
        loading={isCreating}
      >
        <AddNewIcon width={32} height={32} />
      </ActionIcon>
    </Group>
  );
}
