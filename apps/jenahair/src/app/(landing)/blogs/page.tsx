import { getAllBlogsActionPublic } from '@/actions/blog-action';
import BlogGrid from '@/components/grids/blog-grid/blog-grid';
import { Group, Stack, Loader } from '@mantine/core';
import classes from './page.module.scss';
import SearchBar from '@/components/primitives/search-bar/search-bar';
import { Suspense } from 'react';

async function BlogPageContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; destinations?: string }>;
}) {
  const queryParams = await searchParams;
  const blogsResponse = await getAllBlogsActionPublic();
  const blogsData = blogsResponse.data || [];

  return <BlogGrid queryParams={queryParams} blogsData={blogsData} />;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; destinations?: string }>;
}) {
  return (
    <>
      <SearchBar />
      <Group align="center" justify="space-between">
        <Stack gap={6}>
          <h2 className={classes.sectionTitle}>Blogs</h2>
          <h3 className={classes.sectionSubTitle}>
            Read our latest travel stories and tips.
          </h3>
        </Stack>
      </Group>
      <Suspense fallback={<Loader size={64} />}>
        <BlogPageContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
