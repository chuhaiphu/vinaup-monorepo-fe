import { Group, Text } from '@mantine/core';
import BlogsTable from '@/components/tables/blogs-table/blogs-table';
import { getAllBlogsActionPrivate } from '@/actions/blog-action';
import classes from './page.module.scss';
import CreateBlogAction from '@/components/mains/admin-blog/create-blog-action/create-blog-action';
import { Suspense } from 'react';
import BlogsTableSkeleton from '@/components/tables/blogs-table/blogs-table-skeleton';

export default async function AdminBlogCategoryPage() {
  const blogsDataPromise = getAllBlogsActionPrivate().then((res) => {
    if (!res.success || !res.data) {
      return [];
    }
    return res.data;
  });

  return (
    <div className={classes.adminBlogCategoryPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Blog</Text>
        <Group gap="xs">
          <CreateBlogAction />
        </Group>
      </Group>
      <Suspense fallback={<BlogsTableSkeleton />}>
        <BlogsTable blogsDataPromise={blogsDataPromise} />
      </Suspense>
    </div>
  );
}
