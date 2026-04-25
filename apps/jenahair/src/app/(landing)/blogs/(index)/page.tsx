import { getAllBlogsActionPublic } from '@/actions/blog-action';
import BlogGrid from '@/components/grids/blog-grid/blog-grid';
import BlogCategoryTags from '@/components/primitives/blog-category-tags/blog-category-tags';
import { Stack, Box, Container } from '@mantine/core';
import classes from './page.module.scss';
import { Suspense } from 'react';
import BlogGridSkeleton from '@/components/grids/blog-grid/blog-grid-skeleton';
import BlogCategoryTagsSkeleton from '@/components/primitives/blog-category-tags/blog-category-tags-skeleton';
export type BlogIndexPageQueryParams = {
  q?: string;
  destinations?: string;
};

async function BlogIndexPageContent({
  searchParams,
}: {
  searchParams: Promise<BlogIndexPageQueryParams>;
}) {
  const blogsResponse = await getAllBlogsActionPublic();
  const queryParams = await searchParams;
  const blogsData = blogsResponse.data || [];

  return <BlogGrid queryParams={queryParams} blogs={blogsData} />;
}

export default async function BlogsIndexPage({
  searchParams,
}: {
  searchParams: Promise<BlogIndexPageQueryParams>;
}) {
  return (
    <div className={classes.pageWrapper}>
      {/* --- 1. ORANGE HEADER --- */}
      <Box className={classes.orangeHeader}>
        <Container size={'xl'}>
          <h1 className={classes.h1Title}>Blog</h1>
        </Container>
      </Box>

      {/* --- 2. CATEGORY TAGS --- */}
      <Container size={'xl'} className={classes.categorySection}>
        <Stack gap="sm">
          <Suspense fallback={<BlogCategoryTagsSkeleton />}>
            <BlogCategoryTags />
          </Suspense>
        </Stack>
      </Container>

      {/* --- 3. BLOGS GRID --- */}
      <Container size="xl">
        <Suspense fallback={<BlogGridSkeleton />}>
          <BlogIndexPageContent searchParams={searchParams} />
        </Suspense>
      </Container>
    </div>
  );
}
