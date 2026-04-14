'use client';

import { ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { createTourActionPrivate } from '@/actions/tour-action';
import { Route } from 'next';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useAuth } from '@/providers/auth-provider';

export default function CreateTourAction() {
  const router = useRouter();
  const userData = useAuth().getUser();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewTour = async () => {
    setIsCreating(true);
    const newTitle = '';
    const endpoint = await generateUniqueEndpoint(newTitle, 'tour');

    const response = await createTourActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: ['Ho Chi Minh'],
      userId: userData?.id || '',
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
    <Group gap="xs">
      <UnstyledButton onClick={handleAddNewTour} fz={'lg'}>
        Add new
      </UnstyledButton>
      <ActionIcon
        variant="transparent"
        onClick={handleAddNewTour}
        loading={isCreating}
      >
        <AddNewIcon width={32} height={32} />
      </ActionIcon>
    </Group>
  );
}
