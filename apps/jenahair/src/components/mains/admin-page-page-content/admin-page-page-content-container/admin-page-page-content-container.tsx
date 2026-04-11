'use client';

import { ActionIcon, Group, Text, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import classes from './admin-page-page-content-container.module.scss';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import PagesTable from '@/components/tables/pages-table/pages-table';
import { createPageActionPrivate } from '@/actions/page-action';
import { Route } from 'next';
import { IPageResponse } from '@/interfaces/page-interface';
import { IUserResponse } from '@/interfaces/user-interface';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

interface AdminPagePageContentContainerProps {
  pagesData: IPageResponse[];
  userData: IUserResponse;
}

export default function AdminPagePageContentContainer({
  pagesData,
  userData,
}: AdminPagePageContentContainerProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewPage = async () => {
    setIsCreating(true);
    const newTitle = 'Untitled';
    const endpoint = await generateUniqueEndpoint(newTitle, 'landing');

    const response = await createPageActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: [],
      userId: userData.id,
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
    <div className={classes.adminPagePageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Page</Text>
        <Group gap="sm">
          <UnstyledButton onClick={handleAddNewPage} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon
            variant="transparent"
            onClick={handleAddNewPage}
            loading={isCreating}
          >
            <AddNewIcon width={24} height={24} />
          </ActionIcon>
        </Group>
      </Group>

      <div className={classes.pageContent}>
        <PagesTable pagesData={pagesData} />
      </div>
    </div>
  );
}
