'use client';

import {
  ActionIcon,
  Grid,
  GridCol,
  Group,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Route } from 'next';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { useState } from 'react';
import { ITourCategoryResponse } from '@/interfaces/tour-category-interface';
import { createTourCategoryActionPrivate } from '@/actions/tour-category-action';
import TourCategoryNav from '@/components/sidebars/tour-category-nav/tour-category-nav';
import classes from './admin-tour-category-layout-content-container.module.scss';

interface AdminTourCategoryLayoutContentContainerProps {
  tourCategoriesData: ITourCategoryResponse[];
  children: React.ReactNode;
}

export default function AdminTourCategoryLayoutContentContainer({
  tourCategoriesData,
  children,
}: AdminTourCategoryLayoutContentContainerProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewTourCategory = async () => {
    setIsCreating(true);
    const newTitle = 'New Tour Category';
    const endpoint = await generateUniqueEndpoint(newTitle, 'landing');

    const response = await createTourCategoryActionPrivate({
      title: newTitle,
      endpoint: endpoint,
    });

    if (!response.success || !response.data) {
      setIsCreating(false);
      return;
    }

    const categoryId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/tour-category/${categoryId}` as Route);
  };

  return (
    <div>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Tour Category</Text>
        <Group gap="sm">
          <UnstyledButton onClick={handleAddNewTourCategory} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon
            variant="transparent"
            onClick={handleAddNewTourCategory}
            loading={isCreating}
          >
            <AddNewIcon width={24} height={24} />
          </ActionIcon>
        </Group>
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <TourCategoryNav tourCategoriesData={tourCategoriesData} />
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>
          {children}
        </GridCol>
      </Grid>
    </div>
  );
}
