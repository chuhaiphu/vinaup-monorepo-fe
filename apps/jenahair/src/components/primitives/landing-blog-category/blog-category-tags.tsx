import { IBlogCategoryResponse } from '@/interfaces/blog-category-interface';
import { Group } from '@mantine/core';
import Link from 'next/link';
import classes from './blog-category-tags.module.scss';
import { Route } from 'next';
import { ActionResponse } from '@/interfaces/_base-interface';
import { use } from 'react';

function parseSelectedEndpoints(up?: string): string[] {
  return (up || '')
    .split(',')
    .map((endpoint) => endpoint.trim())
    .filter(Boolean);
}

function buildToggleHref(
  endpoint: string,
  selectedEndpoints: string[],
  queryParams: { q?: string; destinations?: string }
): string {
  const isSelected = selectedEndpoints.includes(endpoint);
  const nextSelectedEndpoints = isSelected
    ? selectedEndpoints.filter((item) => item !== endpoint)
    : [...selectedEndpoints, endpoint];

  const params = new URLSearchParams();

  if (queryParams.q) {
    params.set('q', queryParams.q);
  }

  if (queryParams.destinations) {
    params.set('destinations', queryParams.destinations);
  }

  if (nextSelectedEndpoints.length > 0) {
    params.set('up', nextSelectedEndpoints.join(','));
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '?';
}

export default function BlogCategoryTags({
  blogCategoriesPromise,
  searchParams,
}: {
  blogCategoriesPromise: Promise<ActionResponse<IBlogCategoryResponse[]>>;
  searchParams: Promise<{ q?: string; destinations?: string; up?: string }>;
}) {
  const queryParams = use(searchParams);
  const blogCategoriesResponse = use(blogCategoriesPromise);
  const categories = blogCategoriesResponse.data || [];
  const selectedEndpoints = parseSelectedEndpoints(queryParams.up);

  const sortedCategories = [...categories].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  const categoriesWithoutRoot = sortedCategories.filter(
    (category) => category.endpoint !== '__root__'
  );

  return (
    <Group gap="sm" className={classes.tagsWrapper}>
      {categoriesWithoutRoot.map((category) => {
        const isSelected = selectedEndpoints.includes(category.endpoint);
        const className = isSelected
          ? `${classes.tagItem} ${classes.tagItemActive}`
          : classes.tagItem;

        return (
          <Link
            key={category.id}
            href={
              buildToggleHref(
                category.endpoint,
                selectedEndpoints,
                queryParams
              ) as Route
            }
            className={className}
            scroll={false}
          >
            {category.title}
          </Link>
        );
      })}
    </Group>
  );
}
