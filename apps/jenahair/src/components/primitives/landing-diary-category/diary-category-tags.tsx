import { IDiaryCategoryResponse } from '@/interfaces/diary-category-interface';
import { Group } from '@mantine/core';
import Link from 'next/link';
import classes from './diary-category-tags.module.scss';
import { Route } from 'next';

export default function DiaryCategoryTags({
  diaryCategories,
}: {
  diaryCategories: IDiaryCategoryResponse[];
}) {
  const sortedCategories = [...diaryCategories].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  const categoriesWithoutRoot = sortedCategories.filter(
    (category) => category.endpoint !== '__root__'
  );

  return (
    <Group gap="sm" className={classes.tagsWrapper}>
      {categoriesWithoutRoot.map((category) => (
        <Link
          key={category.id}
          href={`/diary/${category.endpoint}` as Route}
          className={classes.tagItem}
          scroll={false}
        >
          {category.title}
        </Link>
      ))}
    </Group>
  );
}
