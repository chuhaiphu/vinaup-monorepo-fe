'use client';

import React, { useMemo } from 'react';
import { Paper, Stack, Group, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { Route } from 'next';
import classes from './blog-category-nav.module.scss';
import { IBlogCategoryResponse } from '@/interfaces/blog-category-interface';
import { TreeManager } from '@vinaup/utils/tree-manager';

interface BlogCategoryNavProps {
  blogCategoriesData: IBlogCategoryResponse[];
}

export default function BlogCategoryNav({
  blogCategoriesData,
}: BlogCategoryNavProps) {
  const router = useRouter();
  const { id } = useParams();

  const treeManager = useMemo(() => {
    if (blogCategoriesData.length === 0) {
      return null;
    }
    return new TreeManager(blogCategoriesData);
  }, [blogCategoriesData]);

  const isActiveBlogCategory = (categoryId: string) => {
    return id === categoryId;
  };

  const renderBlogCategoryTree = () => {
    const root = treeManager?.getRoot();
    if (!root || !root.children) {
      return null;
    }
    return root.children?.map((child) => renderBlogCategoryBar(child, 0));
  };

  const renderBlogCategoryBar = (
    blogCategory: IBlogCategoryResponse,
    depth: number = 0
  ): React.ReactNode => {
    return (
      <React.Fragment key={blogCategory.id}>
        <Stack
          key={blogCategory.id}
          className={`${classes.navItem} ${isActiveBlogCategory(blogCategory.id) ? classes.active : ''}`}
          bd={'1px solid #c7c7c7'}
          bdrs={'sm'}
          p={'8px'}
          ml={depth * 16}
          onClick={() => {
            router.push(`/adminup/blog-category/${blogCategory.id}` as Route);
          }}
        >
          <Group key={blogCategory.id}>
            <Text fw={isActiveBlogCategory(blogCategory.id) ? 'bold' : 'normal'}>
              {blogCategory.title}
            </Text>
          </Group>
        </Stack>
        <>
          {blogCategory.children?.map((child) =>
            renderBlogCategoryBar(child, depth + 1)
          )}
        </>
      </React.Fragment>
    );
  };

  return (
    <Paper p={'sm'} radius={'md'} shadow="xs" withBorder>
      <Stack gap={'xs'}>{renderBlogCategoryTree()}</Stack>
    </Paper>
  );
}
