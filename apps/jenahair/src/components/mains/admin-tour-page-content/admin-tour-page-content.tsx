import { Group, Text } from '@mantine/core';
import ToursTable from '@/components/tables/tours-table/tours-table';
import { getAllToursActionPrivate } from '@/actions/tour-action';
import classes from './admin-tour-page-content.module.scss';
import CreateTourAction from './create-tour-action/create-tour-action';
import { Suspense } from 'react';
import ToursTableSkeleton from '@/components/tables/tours-table/tours-table-skeleton';

export default async function AdminTourPageContent() {
  const toursDataPromise = getAllToursActionPrivate().then((res) => {
    if (!res.success || !res.data) {
      return [];
    }
    return res.data;
  });

  return (
    <div className={classes.adminTourPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Tour</Text>
        <Group gap="sm">
          <CreateTourAction />
        </Group>
      </Group>
      <Suspense fallback={<ToursTableSkeleton />}>
        <ToursTable toursDataPromise={toursDataPromise} />
      </Suspense>
    </div>
  );
}
