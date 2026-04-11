'use client';

import { ActionIcon, Group, Text, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import ToursTable from '@/components/tables/tours-table/tours-table';
import { createTourActionPrivate } from '@/actions/tour-action';
import { Route } from 'next';
import { ITourResponse } from '@/interfaces/tour-interface';
import { IUserResponse } from '@/interfaces/user-interface';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import classes from './admin-tour-page-content-container.module.scss';

interface AdminTourPageContentContainerProps {
  toursData: ITourResponse[];
  userData: IUserResponse;
}

export default function AdminTourPageContentContainer({
  toursData,
  userData,
}: AdminTourPageContentContainerProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewTour = async () => {
    setIsCreating(true);
    const newTitle = '';
    const endpoint = await generateUniqueEndpoint(newTitle, 'tour');

    const response = await createTourActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: ['Ho Chi Minh'],
      userId: userData.id,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create tour failed',
        message: response.error || 'Failed to create tour',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }

    const tourId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/tour/${tourId}` as Route);
  };

  return (
    <div className={classes.adminTourPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Tour</Text>
        <Group gap="sm">
          <UnstyledButton onClick={handleAddNewTour} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon
            variant="transparent"
            onClick={handleAddNewTour}
            loading={isCreating}
          >
            <AddNewIcon width={24} height={24} />
          </ActionIcon>
        </Group>
      </Group>

      <div>
        <ToursTable toursData={toursData} />
      </div>
    </div>
  );
}
