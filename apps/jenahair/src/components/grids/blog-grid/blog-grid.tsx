import { IBlogResponse } from "@/interfaces/blog-interface";
import { Text } from "@mantine/core";
import BlogGridContent from "./blog-grid-content";

export default function BlogGrid(
  { queryParams, blogsData }: {
    queryParams?: {
      q?: string,
      destinations?: string,
    },
    blogsData: IBlogResponse[]
  }
) {

  if (!blogsData || blogsData.length === 0) {
    return <Text c={'#F9F9F9'} fz="xl" ta="center" mt="xl">
      No blogs available
    </Text>;
  }

  const searchQuery = queryParams?.q;
  const destinationsFilter = queryParams?.destinations;

  let filtered = blogsData;

  // Filter by search query
  if (searchQuery) {
    filtered = filtered.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.description && blog.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  // Filter by destinations
  if (destinationsFilter) {
    const selectedDestinations = destinationsFilter.split(',').filter(Boolean);
    if (selectedDestinations.length > 0) {
      filtered = filtered.filter((blog) =>
        selectedDestinations.some((dest) =>
          blog.destinations.some((blogDest) =>
            blogDest.toLowerCase().includes(dest.toLowerCase())
          )
        )
      );
    }
  }

  if (filtered.length === 0) {
    return (
      <Text c={'#F9F9F9'} fz="xl" ta="center" mt="xl">
        There are no blogs matching your criteria.
      </Text>
    );
  }

  return (
    <BlogGridContent blogsData={filtered} />
  );
}

