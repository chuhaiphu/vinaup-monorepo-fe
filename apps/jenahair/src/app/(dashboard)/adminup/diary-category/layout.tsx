import { Grid, GridCol, Group, Text } from '@mantine/core';
import DiaryCategoryNav from '@/components/sidebars/diary-category-nav/diary-category-nav';
import CreateDiaryCategoryAction from '@/components/mains/admin-diary/create-diary-category-action/create-diary-category-action';
import classes from './layout.module.scss';
import { getAllDiaryCategoriesActionPrivate } from '@/actions/diary-category-action';
import { Suspense } from 'react';
import DiaryCategoryNavSkeleton from '@/components/sidebars/diary-category-nav/diary-category-nav-skeleton';
export default async function AdminDiaryCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const diaryCategoriesDataPromise = getAllDiaryCategoriesActionPrivate();

  return (
    <div className={classes.adminDiaryCategoryLayoutRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Diary Category</Text>
        <CreateDiaryCategoryAction />
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <Suspense fallback={<DiaryCategoryNavSkeleton />}>
            <DiaryCategoryNav
              diaryCategoriesDataPromise={diaryCategoriesDataPromise}
            />
          </Suspense>
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>
          {children}
        </GridCol>
      </Grid>
    </div>
  );
}
