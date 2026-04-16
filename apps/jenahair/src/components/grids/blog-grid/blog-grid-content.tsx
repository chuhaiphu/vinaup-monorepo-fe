'use client';
import { IBlogResponse } from '@/interfaces/blog-interface';
import { Grid, GridCol, Pagination } from '@mantine/core';
import BlogItem from './blog-item/blog-item';
import Link from 'next/link';
import classes from './blog-grid-content.module.scss';
import { useState } from 'react';
import { Route } from 'next';

type BlogGridContentProps = {
  blogs: IBlogResponse[];
  pageSize?: number;
};

export default function BlogGridContent({
  blogs,
  pageSize = 16,
}: BlogGridContentProps) {
  const [page, setPage] = useState(1);
  const total = blogs.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const getPaginatedData = () => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return blogs.slice(start, end);
  };

  return (
    <>
      <Grid mt={'lg'} mb={'md'} gap="lg">
        {getPaginatedData().map((item) => (
          <GridCol span={{ base: 12, sm: 6, md: 3 }} key={item.id}>
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

