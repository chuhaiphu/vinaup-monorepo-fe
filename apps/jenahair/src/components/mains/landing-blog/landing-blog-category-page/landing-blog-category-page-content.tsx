import { getBlogCategoryBlogsByBlogCategoryIdActionPublic } from '@/actions/blog-category-blog-action';
import BlogGrid from '@/components/grids/blog-grid/blog-grid';
import BlogCategoryTags from '@/components/primitives/blog-category-tags/blog-category-tags';
import { IBlogCategoryResponse } from '@/interfaces/blog-category-interface';
import { IBlogResponse } from '@/interfaces/blog-interface';
import { Box, Container, Stack } from '@mantine/core';
import { VideoSection } from '@vinaup/ui/landing';
import classes from './landing-blog-category-page-content.module.scss';
import { Suspense } from 'react';
import BlogCategoryTagsSkeleton from '@/components/primitives/blog-category-tags/blog-category-tags-skeleton';

type LandingBlogCategoryPageContentProps = {
  category: IBlogCategoryResponse;
  searchParams: Promise<{ q?: string; destinations?: string }>;
};

const isHtmlDescriptionEmpty = (html: string | null | undefined): boolean => {
  if (!html) return true;
  const trimmed = html.trim();
  return trimmed === '' || trimmed === '<p></p>';
};

export default async function LandingBlogCategoryPageContent({
  category,
  searchParams,
}: LandingBlogCategoryPageContentProps) {
  const queryParams = await searchParams;

  const blogCategoryBlogsResponse =
    await getBlogCategoryBlogsByBlogCategoryIdActionPublic(category.id);

  const blogsInCategory: IBlogResponse[] =
    blogCategoryBlogsResponse.success && blogCategoryBlogsResponse.data
      ? blogCategoryBlogsResponse.data
          .map((bcb) => bcb.blog)
          .filter(
            (blog): blog is IBlogResponse =>
              blog !== undefined && blog.visibility === 'public'
          )
      : [];

  const sortedBlogs = [...blogsInCategory]
    .sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const renderVideoSection = () => {
    if (!category.videoUrl) {
      return null;
    }
    return (
      <VideoSection
        url={category.videoUrl}
        title={category.title}
        height={480}
        thumbnailUrl={category.videoThumbnailUrl || undefined}
      />
    );
  };

  return (
    <div className={classes.blogCategoryPage}>
      {/* --- 1. ORANGE HEADER --- */}
      <Box className={classes.blogCategoryHeader}>
        <Container size={'xl'}>
          <h1 className={classes.blogCategoryTitle}>{category.title}</h1>
        </Container>
      </Box>

      {/* --- 2. INTRO SECTION --- */}
      <Container size={'xl'} className={classes.blogCategoryIntro}>
        <Suspense fallback={<BlogCategoryTagsSkeleton />}>
          <BlogCategoryTags activeEndpoint={category.endpoint} />
        </Suspense>
        <Box mt={'sm'}>
          {category.videoPosition === 'top' && renderVideoSection()}
        </Box>
        <Stack gap="sm" mt={'sm'}>
          {!isHtmlDescriptionEmpty(category.description) && (
            <div
              className={classes.blogCategoryDescription}
              dangerouslySetInnerHTML={{ __html: category.description ?? '' }}
            />
          )}
        </Stack>
      </Container>

      <Container size="xl">
        <BlogGrid queryParams={queryParams} blogs={sortedBlogs} />
      </Container>

      {category.videoPosition !== 'top' && (
        <Container size="xl" p={0}>
          {renderVideoSection()}
        </Container>
      )}
    </div>
  );
}
