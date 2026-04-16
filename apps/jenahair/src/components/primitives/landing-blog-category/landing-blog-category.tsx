import { getBlogCategoryBlogsByBlogCategoryIdActionPublic } from '@/actions/blog-category-blog-action';
import BlogGrid from '@/components/grids/blog-grid/blog-grid';
import { IBlogCategoryResponse } from '@/interfaces/blog-category-interface';
import { IBlogResponse } from '@/interfaces/blog-interface';
import { Stack } from '@mantine/core';
import { VideoSection } from '@vinaup/ui/landing';
import classes from './landing-blog-category.module.scss';

interface LandingBlogCategoryProps {
  category: IBlogCategoryResponse;
  queryParams: {
    q?: string;
    destinations?: string;
  };
}

export default async function LandingBlogCategory({
  category,
  queryParams,
}: LandingBlogCategoryProps) {
  // Get all blogs in this category
  const blogCategoryBlogsResponse =
    await getBlogCategoryBlogsByBlogCategoryIdActionPublic(category.id);
  // Extract blogs and filter only public ones
  const blogsFromBlogCategory: IBlogResponse[] =
    blogCategoryBlogsResponse.success && blogCategoryBlogsResponse.data
      ? blogCategoryBlogsResponse.data
          .map((bcb) => bcb.blog)
          .filter(
            (blog): blog is IBlogResponse =>
              blog !== undefined && blog.visibility === 'public'
          )
      : [];

  const sortedBlogs = blogsFromBlogCategory
    .sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const renderHTMLDescription = (htmlDescription: string | null) => {
    if (
      !htmlDescription ||
      htmlDescription.trim() === '' ||
      htmlDescription.trim() === '<p></p>'
    ) {
      return null;
    }
    return (
      <div
        dangerouslySetInnerHTML={{ __html: htmlDescription }}
        className={classes.htmlDescription}
      ></div>
    );
  };
  const renderVideoSection = (
    videoUrl?: string,
    thumbnailUrl?: string,
    title?: string
  ) => {
    if (!videoUrl) {
      return <></>;
    }
    return (
      <VideoSection
        url={videoUrl}
        title={title}
        height={480}
        thumbnailUrl={thumbnailUrl || undefined}
      />
    );
  };

  return (
    <Stack gap={'xs'} mb={'lg'}>
      <h1 className={classes.sectionTitle}>{category.title}</h1>
      {category.videoPosition === 'top' &&
        renderVideoSection(
          category.videoUrl || undefined,
          category.videoThumbnailUrl || undefined,
          category.title
        )}
      {renderHTMLDescription(category.description)}
      <BlogGrid
        queryParams={{
          q: queryParams.q,
          destinations: queryParams.destinations,
        }}
        blogs={sortedBlogs}
      />
      {category.videoPosition === 'bottom' &&
        renderVideoSection(
          category.videoUrl || undefined,
          category.videoThumbnailUrl || undefined,
          category.title
        )}
    </Stack>
  );
}
