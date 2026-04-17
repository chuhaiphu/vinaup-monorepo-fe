import { getAllDiariesActionPublic } from '@/actions/diary-action';
import { getAllDiaryCategoriesActionPublic } from '@/actions/diary-category-action';
import DiaryGrid from '@/components/grids/diary-grid/diary-grid';
import DiaryCategoryTags from '@/components/primitives/landing-diary-category/diary-category-tags';
import { Stack, Loader, Box, Container, Text } from '@mantine/core';
import classes from './page.module.scss';
import { Suspense } from 'react';
import { IDiaryCategoryResponse } from '@/interfaces/diary-category-interface';
import { MOCK_BLOGS_DATA } from '@/mocks/mock-blogs';
import BlogGrid from '@/components/grids/blog-grid/blog-grid';

export type DiaryCategoryPageQueryParams = {
  q?: string;
  destinations?: string;
};

async function BlogIndexPageContent({
  searchParams,
}: {
  searchParams: Promise<DiaryCategoryPageQueryParams>; //chưa sửa vì chưa có searchParams cho blogs, tạm thời giữ nguyên để test giao diện, sau này sửa lại khi có searchParams cho blogs
}) {
  const blogsResponse = await getAllDiariesActionPublic(); //chưa sửa getAllBlogsActionPublic vì chưa có, tạm thời dùng getAllDiariesActionPublic để test giao diện
  const queryParams = await searchParams;
  // const diariesData = diariesResponse.data || [];
  const blogsData = MOCK_BLOGS_DATA;

  return (
    <BlogGrid
      queryParams={queryParams}
      blogs={blogsData}
    />
  );
}

export default async function BlogsIndexPage({
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
          <h1 className={classes.h1Title}>Nhật ký Salon</h1>
        </Container>
      </Box>

      {/* --- 2. CATEGORY TAGS --- */}
      <Container size={'xl'} className={classes.categorySection}>
        <Stack gap="sm">
          <DiaryCategoryTags diaryCategories={diaryCategories} />
        </Stack>
      </Container>

      {/* --- 3. BLOGS GRID --- */}
      <Suspense fallback={<Loader size={64} />}>
        <Container size="xl">
          <BlogIndexPageContent
            searchParams={searchParams}
          />
        </Container>
      </Suspense>
    </div>
  );
}
