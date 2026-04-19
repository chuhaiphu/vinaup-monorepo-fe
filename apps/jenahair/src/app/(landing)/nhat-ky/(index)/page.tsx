import { getAllDiariesActionPublic } from '@/actions/diary-action';
import DiaryGrid from '@/components/grids/diary-grid/diary-grid';
import DiaryCategoryTags from '@/components/primitives/diary-category-tags/diary-category-tags';
import { Stack, Box, Container } from '@mantine/core';
import classes from './page.module.scss';
import { Suspense } from 'react';
import DiaryGridSkeleton from '@/components/grids/diary-grid/diary-grid-skeleton';
import DiaryCategoryTagsSkeleton from '@/components/primitives/diary-category-tags/diary-category-tags-skeleton';

export type DiaryCategoryPageQueryParams = {
  q?: string;
  destinations?: string;
};

async function DiaryIndexPageContent({
  searchParams,
}: {
  searchParams: Promise<DiaryCategoryPageQueryParams>;
}) {
  const diariesResponse = await getAllDiariesActionPublic();
  const queryParams = await searchParams;
  const diariesData = diariesResponse.data || [];

  return <DiaryGrid queryParams={queryParams} diaries={diariesData} />;
}

export default async function DiaryIndexPage({
  searchParams,
}: {
  searchParams: Promise<DiaryCategoryPageQueryParams>;
}) {
  return (
    <div className={classes.pageWrapper}>
      {/* --- 1. ORANGE HEADER --- */}
      <Box className={classes.orangeHeader}>
        <Container size={'xl'}>
          <h1 className={classes.h1Title}>Tất cả Nhật ký</h1>
        </Container>
      </Box>

      {/* --- 2. INTRO SECTION --- */}
      <Container size={'xl'} className={classes.introSection}>
        <Stack gap="sm">
          <Suspense fallback={<DiaryCategoryTagsSkeleton />}>
            <DiaryCategoryTags />
          </Suspense>
        </Stack>
      </Container>

      <Container size="xl">
        <Suspense fallback={<DiaryGridSkeleton />}>
          <DiaryIndexPageContent searchParams={searchParams} />
        </Suspense>
      </Container>
    </div>
  );
}
