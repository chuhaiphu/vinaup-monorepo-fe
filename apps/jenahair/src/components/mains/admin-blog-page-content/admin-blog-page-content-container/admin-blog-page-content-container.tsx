'use client';

import { ActionIcon, Group, Text, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import BlogsTable from '@/components/tables/blogs-table/blogs-table';
import { createBlogActionPrivate } from '@/actions/blog-action';
import { Route } from 'next';
import { IBlogResponse } from '@/interfaces/blog-interface';
import { IUserResponse } from '@/interfaces/user-interface';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import classes from './admin-blog-page-content-container.module.scss';

interface AdminBlogPageContentContainerProps {
  blogsData: IBlogResponse[];
  userData: IUserResponse;
}

export default function AdminBlogPageContentContainer({
  blogsData,
  userData,
}: AdminBlogPageContentContainerProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewBlog = async () => {
    setIsCreating(true);
    const newTitle = '';
    const endpoint = await generateUniqueEndpoint(newTitle, 'blog');

    const response = await createBlogActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: ['Ho Chi Minh'],
      userId: userData.id,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create blog failed',
        message: response.error || 'Failed to create blog',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }

    const blogId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/blog/${blogId}` as Route);
  };

  return (
    <div className={classes.adminBlogPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Blog</Text>
        <Group gap="sm">
          <UnstyledButton onClick={handleAddNewBlog} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon
            variant="transparent"
            onClick={handleAddNewBlog}
            loading={isCreating}
          >
            <AddNewIcon width={24} height={24} />
          </ActionIcon>
        </Group>
      </Group>

      <div>
        <BlogsTable blogsData={blogsData} />
      </div>
    </div>
  );
}
