'use client';

import { IBlogResponse } from '@/interfaces/blog-interface';
import { Grid, GridCol, Pagination, Text } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import BlogItem from './blog-item/blog-item';
import classes from './blog-grid.module.scss';
import { Route } from 'next';

type BlogGridProps = {
  queryParams?: {
    q?: string;
    destinations?: string;
  };
  blogs: IBlogResponse[];
  pageSize?: number;
};

export default function BlogGrid({
  queryParams,
  blogs,
  pageSize = 16,
}: BlogGridProps) {
  const [page, setPage] = useState(1);

  let filteredBlogs = blogs ?? [];

  const searchQuery = queryParams?.q;
  const destinationsFilter = queryParams?.destinations;

  if (searchQuery) {
    filteredBlogs = filteredBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.description &&
          blog.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

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

  if (!blogs || blogs.length === 0) {
    return (
      <Text c={'#F9F9F9'} fz="xl" ta="center" mt="xl">
        No blogs available
      </Text>
    );
  }

  if (filteredBlogs.length === 0) {
    return (
      <Text c={'#F9F9F9'} fz="xl" ta="center" mt="xl">
        There are no blogs matching your criteria.
      </Text>
    );
  }

  const total = filteredBlogs.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const paginated = filteredBlogs.slice(start, start + pageSize);

  return (
    <>
      <Grid mt={'lg'} mb={'md'} gap="lg">
        {paginated.map((item) => (
          <GridCol span={{ base: 12, md: 6 }} key={item.id}>
            <Link href={`/blogs/${item.endpoint}` as Route} className={classes.cardLink}>
              <BlogItem item={item} />
            </Link>
          </GridCol>
        ))}
      </Grid>
      {totalPages > 1 && (
        <div className={classes.paginationWrapper}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
        </div>
      )}
    </>
  );
}
