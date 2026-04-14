import { Grid, GridCol, Group, Text } from '@mantine/core';
import { Suspense } from 'react';
import { getAllTourCategoriesActionPublic } from '@/actions/tour-category-action';
import TourCategoryNav from '@/components/sidebars/tour-category-nav/tour-category-nav';
import TourCategoryNavSkeleton from '@/components/sidebars/tour-category-nav/tour-category-nav-skeleton';
import CreateTourCategoryAction from '@/components/mains/admin-tour/create-tour-category-action/create-tour-category-action';
import classes from './layout.module.scss';

export default async function AdminTourCategoryLayout({ children }: { children: React.ReactNode }) {
  const tourCategoriesDataPromise = getAllTourCategoriesActionPublic();

  return (
    <div className={classes.adminTourCategoryLayoutRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Tour Category</Text>
        <CreateTourCategoryAction />
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <Suspense fallback={<TourCategoryNavSkeleton />}>
            <TourCategoryNav tourCategoriesDataPromise={tourCategoriesDataPromise} />
          </Suspense>
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>{children}</GridCol>
      </Grid>
    </div>
  );
}
