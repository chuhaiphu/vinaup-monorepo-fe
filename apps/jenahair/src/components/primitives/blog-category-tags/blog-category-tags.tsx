import { Group } from '@mantine/core';
import { VinaupGridListIcon } from '@vinaup/ui/cores';
import { Route } from 'next';
import Link from 'next/link';
import classes from './blog-category-tags.module.scss';
import { getAllBlogCategoriesActionPublic } from '@/actions/blog-category-action';

export default async function BlogCategoryTags({
  activeEndpoint,
}: {
  activeEndpoint?: string;
}) {
  const blogCategoriesResponse = await getAllBlogCategoriesActionPublic();
  const blogCategories = blogCategoriesResponse.data || [];

  const sortedCategories = [...blogCategories].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  const categoriesWithoutRoot = sortedCategories.filter(
    (category) => category.endpoint !== '__root__'
  );

  const isHomeActive = !activeEndpoint;

  const getTagClassName = (isActive: boolean) =>
    `${classes.tagItem} ${isActive ? classes.tagItemActive : ''}`.trim();

  return (
    <Group gap="sm" className={classes.tagsWrapper}>
      <Link
        href={'/blogs' as Route}
        className={getTagClassName(isHomeActive) + ' ' + classes.homeTag}
        aria-current={isHomeActive ? 'page' : undefined}
        scroll={false}
        prefetch={true}
      >
        <VinaupGridListIcon size={20} fill="currentColor" />
      </Link>
      {categoriesWithoutRoot.map((category) => {
        const isActive = category.endpoint === activeEndpoint;
        return (
          <Link
            key={category.id}
            href={`/blogs/${category.endpoint}` as Route}
            className={getTagClassName(isActive)}
            aria-current={isActive ? 'page' : undefined}
            scroll={false}
            prefetch={true}
          >
            {category.title}
          </Link>
        );
      })}
    </Group>
  );
}
