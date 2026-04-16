import { IDiaryCategoryResponse } from '@/interfaces/diary-category-interface';
import { Group } from '@mantine/core';
import { VinaupHomeIcon } from '@vinaup/ui/cores';
import { Route } from 'next';
import Link from 'next/link';
import classes from './diary-category-tags.module.scss';

export default function DiaryCategoryTags({
  diaryCategories,
  activeEndpoint,
}: {
  diaryCategories: IDiaryCategoryResponse[];
  activeEndpoint?: string;
}) {
  const sortedCategories = [...diaryCategories].sort(
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
        href={'/nhat-ky' as Route}
        className={getTagClassName(isHomeActive)}
        aria-current={isHomeActive ? 'page' : undefined}
        scroll={false}
        prefetch={true}
      >
        <VinaupHomeIcon size={20} stroke="currentColor" />
      </Link>
      {categoriesWithoutRoot.map((category) => {
        const isActive = category.endpoint === activeEndpoint;
        return (
          <Link
            key={category.id}
            href={`/nhat-ky/${category.endpoint}` as Route}
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
