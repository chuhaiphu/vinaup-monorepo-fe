import { Group, Stack, Loader } from '@mantine/core';
import classes from './page.module.scss';
import TourGrid from '@/components/grids/tour-grid/tour-grid';
import { getAllToursActionPublic } from '@/actions/tour-action';
import { Suspense } from 'react';

async function TourPageContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; destinations?: string }>;
}) {
  const queryParams = await searchParams;
  const toursResponse = await getAllToursActionPublic();
  const toursData = toursResponse.data || [];

  return <TourGrid queryParams={queryParams} toursData={toursData} />;
}

export default async function TourPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; destinations?: string }>;
}) {
  return (
    <>
      {/* <SearchBar /> */}
      <Group align="center" justify="space-between">
        <Stack gap={6}>
          <h2 className={classes.sectionTitle}>Vietnam Landtours</h2>
          <h3 className={classes.sectionSubTitle}>
            Many tours are available to serve you.
          </h3>
        </Stack>
      </Group>
      <Suspense fallback={<Loader size={64} />}>
        <TourPageContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
