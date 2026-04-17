import Link from 'next/link';
import { Stack } from '@mantine/core';
import { getAllBlogsActionPublic } from '@/actions/blog-action';
import BlogItem from '@/components/grids/blog-grid/blog-item/blog-item';
import { Route } from 'next';

export async function BlogsColumn() {
  const result = await getAllBlogsActionPublic();
  const blogs = result.success ? (result.data ?? []).slice(0, 2) : [];

  const first = blogs[0];
  const second = blogs[1];

  return (
    <Stack gap="lg" justify="space-between" style={{ flexGrow: 1 }}>
      {first && (
        <Link
          href={`/blogs/${first.endpoint}` as Route}
          style={{ textDecoration: 'none' }}
        >
          <BlogItem item={first} />
        </Link>
      )}
      {first && !second && (
        <div style={{ visibility: 'hidden', pointerEvents: 'none' }} aria-hidden>
          <BlogItem item={first} />
        </div>
      )}
      {second && (
        <Link
          href={`/blogs/${second.endpoint}` as Route}
          style={{ textDecoration: 'none' }}
        >
          <BlogItem item={second} />
        </Link>
      )}
    </Stack>
  );
}
