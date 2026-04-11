'use client';

import React, { useMemo } from 'react';
import { Paper, Stack, Group, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { Route } from 'next';
import classes from './tour-category-nav.module.scss';
import { ITourCategoryResponse } from '@/interfaces/tour-category-interface';
import { TreeManager } from '@vinaup/utils/tree-manager';

interface TourCategoryNavProps {
  tourCategoriesData: ITourCategoryResponse[];
}

export default function TourCategoryNav({
  tourCategoriesData,
}: TourCategoryNavProps) {
  const router = useRouter();
  const { id } = useParams();

  const treeManager = useMemo(() => {
    if (tourCategoriesData.length === 0) {
      return null;
    }
    return new TreeManager(tourCategoriesData);
  }, [tourCategoriesData]);

  const isActiveTourCategory = (categoryId: string) => {
    return id === categoryId;
  };

  const renderTourCategoryTree = () => {
    const root = treeManager?.getRoot();
    if (!root || !root.children) {
      return null;
    }
    return root.children?.map((child) => renderTourCategoryBar(child, 0));
  };

  const renderTourCategoryBar = (
    tourCategory: ITourCategoryResponse,
    depth: number = 0
  ): React.ReactNode => {
    return (
      <React.Fragment key={tourCategory.id}>
        <Stack
          key={tourCategory.id}
          className={`${classes.navItem} ${isActiveTourCategory(tourCategory.id) ? classes.active : ''}`}
          bd={'1px solid #c7c7c7'}
          bdrs={'sm'}
          p={'8px'}
          ml={depth * 16}
          onClick={() => {
            router.push(`/adminup/tour-category/${tourCategory.id}` as Route);
          }}
        >
          <Group key={tourCategory.id}>
            <Text fw={isActiveTourCategory(tourCategory.id) ? 'bold' : 'normal'}>
              {tourCategory.title}
            </Text>
          </Group>
        </Stack>
        <>
          {tourCategory.children?.map((child) =>
            renderTourCategoryBar(child, depth + 1)
          )}
        </>
      </React.Fragment>
    );
  };

  return (
    <Paper p={'sm'} radius={'md'} shadow="xs" withBorder>
      <Stack gap={'xs'}>{renderTourCategoryTree()}</Stack>
    </Paper>
  );
}
