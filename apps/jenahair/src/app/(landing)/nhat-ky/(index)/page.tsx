import { getAllDiariesActionPublic } from '@/actions/diary-action';
import { getAllDiaryCategoriesActionPublic } from '@/actions/diary-category-action';
import DiaryGrid from '@/components/grids/diary-grid/diary-grid';
import DiaryCategoryTags from '@/components/primitives/landing-diary-category/diary-category-tags';
import { Stack, Loader, Box, Container, Text } from '@mantine/core';
import classes from './page.module.scss';
import { Suspense } from 'react';
import { VideoSection } from '@vinaup/ui/landing';
import { IDiaryCategoryResponse } from '@/interfaces/diary-category-interface';

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

  return (
    <DiaryGrid
      queryParams={queryParams}
      diaries={diariesData}
    />
  );
}

export default async function DiaryIndexPage({
  searchParams,
}: {
  searchParams: Promise<DiaryCategoryPageQueryParams>;
}) {
  const diaryCategoriesResponse = await getAllDiaryCategoriesActionPublic();
  const diaryCategories = diaryCategoriesResponse.data || [];

  return (
    <div className={classes.pageWrapper}>
      {/* --- 1. ORANGE HEADER --- */}
      <Box className={classes.orangeHeader}>
        <Container size={'xl'}>
          <h1 className={classes.h1Title}>Title Page / Danh mục là H1</h1>
        </Container>
      </Box>

      {/* --- 2. INTRO SECTION --- */}
      <Container size={'xl'} className={classes.introSection}>
        <Stack gap="sm">
          <DiaryCategoryTags diaryCategories={diaryCategories} />
        </Stack>
      </Container>

      <Suspense fallback={<Loader size={64} />}>
        <Container size="xl">
          <DiaryIndexPageContent
            searchParams={searchParams}
          />
        </Container>
      </Suspense>

      {/* --- 4. YOUTUBE --- */}
      <Container size="xl">
        <VideoSection
          url="https://www.youtube.com/watch?v=0VdBHRVy4Cw"
          title="Video Title"
          height={480}
        />
      </Container>
    </div>
  );
}
