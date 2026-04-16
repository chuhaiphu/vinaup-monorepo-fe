import { IBlogResponse } from '@/interfaces/blog-interface';
import { IBlogCategoryResponse } from '@/interfaces/blog-category-interface';
import { Text } from '@mantine/core';
import BlogGridContent from './blog-grid-content';

export default function BlogGrid({
  queryParams,
  blogs,
  blogCategories,
}: {
  queryParams?: {
    q?: string;
    destinations?: string;
    up?: string;
  };
  blogs: IBlogResponse[];
  blogCategories?: IBlogCategoryResponse[];
}) {
  if (!blogs || blogs.length === 0) {
    return (
      <Text c={'#F9F9F9'} fz="xl" ta="center" mt="xl">
        No blogs available
      </Text>
    );
  }

  const searchQuery = queryParams?.q;
  const destinationsFilter = queryParams?.destinations;
  const categoryEndpointsFilter = queryParams?.up;

  let filteredBlogs = blogs;

  // Filter by search query
  if (searchQuery) {
    filteredBlogs = filteredBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.description &&
          blog.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  // Filter by destinations
  if (destinationsFilter) {
    const selectedDestinations = destinationsFilter.split(',').filter(Boolean);
    if (selectedDestinations.length > 0) {
      filteredBlogs = filteredBlogs.filter((blog) =>
        selectedDestinations.some((dest) =>
          blog.destinations.some((blogDest) =>
            blogDest.toLowerCase().includes(dest.toLowerCase())
          )
        )
      );
    }
  }

  // Filter by selected blog category endpoints (OR logic)
  if (categoryEndpointsFilter) {
    const selectedCategoryEndpoints = categoryEndpointsFilter
      .split(',')
      .map((endpoint) => endpoint.trim())
      .filter(Boolean);

    if (selectedCategoryEndpoints.length > 0) {
      const selectedCategoryIds = (blogCategories || [])
        .filter((category) => selectedCategoryEndpoints.includes(category.endpoint))
        .map((category) => category.id);

      filteredBlogs = filteredBlogs.filter((blog) =>
        blog.blogCategoryBlogs.some((pivot) =>
          selectedCategoryIds.includes(pivot.blogCategoryId)
        )
      );
    }
  }

  if (filteredBlogs.length === 0) {
    return (
      <Text c={'#F9F9F9'} fz="xl" ta="center" mt="xl">
        There are no blogs matching your criteria.
      </Text>
    );
  }

  return <BlogGridContent blogs={filteredBlogs} />;
}
