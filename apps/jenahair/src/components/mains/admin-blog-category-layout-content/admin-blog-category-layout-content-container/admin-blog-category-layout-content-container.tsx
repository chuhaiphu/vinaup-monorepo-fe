'use client';

import {
  ActionIcon,
  Grid,
  GridCol,
  Group,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Route } from 'next';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { useState } from 'react';
import { IBlogCategoryResponse } from '@/interfaces/blog-category-interface';
import { createBlogCategoryActionPrivate } from '@/actions/blog-category-action';
import BlogCategoryNav from '@/components/sidebars/blog-category-nav/blog-category-nav';
import classes from './admin-blog-category-layout-content-container.module.scss';

interface AdminBlogCategoryLayoutContentContainerProps {
  blogCategoriesData: IBlogCategoryResponse[];
  children: React.ReactNode;
}

export default function AdminBlogCategoryLayoutContentContainer({
  blogCategoriesData,
  children,
}: AdminBlogCategoryLayoutContentContainerProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewBlogCategory = async () => {
    setIsCreating(true);
    const newTitle = 'New Blog Category';
    const endpoint = await generateUniqueEndpoint(newTitle, 'landing');
    const response = await createBlogCategoryActionPrivate({
      title: newTitle,
      endpoint: endpoint,
    });

    if (!response.success || !response.data) {
      setIsCreating(false);
      return;
    }

    const categoryId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/blog-category/${categoryId}` as Route);
  };

  return (
    <div>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Blog Category</Text>
        <Group gap="sm">
          <UnstyledButton onClick={handleAddNewBlogCategory} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon
            variant="transparent"
            onClick={handleAddNewBlogCategory}
            loading={isCreating}
          >
            <AddNewIcon width={24} height={24} />
          </ActionIcon>
        </Group>
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <BlogCategoryNav blogCategoriesData={blogCategoriesData} />
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>
          {children}
        </GridCol>
      </Grid>
    </div>
  );
}
