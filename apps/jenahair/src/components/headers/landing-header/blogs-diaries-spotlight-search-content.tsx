'use client';

import { IBlogResponse } from '@/interfaces/blog-interface';
import { IDiaryResponse } from '@/interfaces/diary-interface';
import { IPageResponse } from '@/interfaces/page-interface';
import { SpotlightActionData } from '@mantine/spotlight';
import { SpotlightSearch } from '@vinaup/ui/landing';
import { useRouter } from 'next/navigation';
import classes from './blogs-diaries-spotlight-search-content.module.scss';

export default function BlogsDiariesSpotlightSearchContent({
  blogsResponse,
  diariesResponse,
  pagesResponse,
}: {
  blogsResponse: IBlogResponse[];
  diariesResponse: IDiaryResponse[];
  pagesResponse: IPageResponse[];
}) {
  const router = useRouter();
  const spotlightActions: SpotlightActionData[] = [
    ...(pagesResponse ?? []).map((page) => ({
      id: `page-${page.id}`,
      label: page.title,
      onClick: () => {
        router.push(`/${page.endpoint}`);
      },
    })),
    ...(blogsResponse ?? []).map((blog) => ({
      id: `blog-${blog.id}`,
      label: blog.title,
      onClick: () => {
        router.push(`/blogs/${blog.endpoint}`);
      },
    })),
    ...(diariesResponse ?? []).map((diary) => ({
      id: `diary-${diary.id}`,
      label: diary.title,
      onClick: () => {
        router.push(`/nhat-ky/${diary.endpoint}`);
      },
    })),
  ];

  return (
    <SpotlightSearch
      spotlightActions={spotlightActions}
      classNames={{
        root: classes.spotlightRoot,
        content: classes.spotlightContent,
        search: classes.spotlightSearch,
        actionsList: classes.spotlightActionsList,
        action: classes.spotlightAction,
      }}
    />
  );
}
