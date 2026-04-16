import { getAllBlogsActionPublic } from '@/actions/blog-action';
import BlogGrid from '@/components/grids/blog-grid/blog-grid';
import { Group, Stack, Loader, Box, Container, Text } from '@mantine/core';
import classes from './page.module.scss';
import { Suspense } from 'react';

const MOCK_TAGS = ['Tẩy tóc', 'Uốn tóc Xù Hippi', 'Tẩy tóc', 'Uốn tóc Xù Hippi', 'Tẩy tóc', 'Uốn tóc Xù Hippi'];

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
      <main className={classes.pageWrapper}>
        {/* --- 1. ORANGE HEADER --- */}
        <Box className={classes.orangeHeader}>
          <Container size={1232}>
            <h1 className={classes.h1Title}>Title Page / Danh mục là H1</h1>
          </Container>
        </Box>

        {/* --- 2. INTRO SECTION --- */}
        <Container size={1232} className={classes.introSection}>
          <Stack gap="sm">
            <h2 className={classes.h2Title}>H2 content Mô tả</h2>

            <Text className={classes.description}>
              Title blog abc Title blog abc Title blog abc Title blog abc Title blog abc Title blog abc Title blog abc Title blog abc Title blog abc Title blog abc Title blog abc Title blog abc Title blog abc Title blog abc Title blog abc
            </Text>

            <Group gap="sm" className={classes.tagsWrapper}>
              {MOCK_TAGS.map((tag, index) => (
                <div key={index} className={classes.tagItem}>
                  {tag}
                </div>
              ))}
            </Group>
          </Stack>
        </Container>

        {/* --- 3. BLOG GRID --- */}
        <Suspense fallback={<Loader size={64} />}>
          <BlogPageContent searchParams={searchParams} />
        </Suspense>

        {/* --- 4. YOUTUBE --- */}
      </main>
    </>
  );
}
