'use client';

import { IDiaryResponse } from '@/interfaces/diary-interface';
import { Grid, GridCol, Pagination, Text } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import DiaryItem from './diary-item/diary-item';
import classes from './diary-grid.module.scss';
import { Route } from 'next';
import { Carousel, CarouselSlide } from '@mantine/carousel';

type DiaryGridProps = {
  queryParams?: {
    q?: string;
    destinations?: string;
  };
  diaries: IDiaryResponse[];
  pageSize?: number;
  showPagination?: boolean;
};

export default function DiaryGrid({
  queryParams,
  diaries,
  pageSize = 16,
  showPagination = true,
}: DiaryGridProps) {
  const [page, setPage] = useState(1);

  let filteredDiaries = diaries ?? [];

  const searchQuery = queryParams?.q;
  const destinationsFilter = queryParams?.destinations;

  if (searchQuery) {
    filteredDiaries = filteredDiaries.filter(
      (diary) =>
        diary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (diary.description &&
          diary.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  if (destinationsFilter) {
    const selectedDestinations = destinationsFilter.split(',').filter(Boolean);
    if (selectedDestinations.length > 0) {
      filteredDiaries = filteredDiaries.filter((diary) =>
        selectedDestinations.some((dest) =>
          diary.destinations.some((diaryDest) =>
            diaryDest.toLowerCase().includes(dest.toLowerCase())
          )
        )
      );
    }
  }

  if (!diaries || diaries.length === 0) {
    return (
      <Text c={'#F9F9F9'} fz="xl" ta="center" mt="xl">
        No diaries available
      </Text>
    );
  }

  if (filteredDiaries.length === 0) {
    return (
      <Text c={'#F9F9F9'} fz="xl" ta="center" mt="xl">
        There are no diaries matching your criteria.
      </Text>
    );
  }

  const total = filteredDiaries.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const paginated = filteredDiaries.slice(start, start + pageSize);

  const renderDiaryCard = (item: IDiaryResponse) => (
    <Link href={`/nhat-ky/${item.endpoint}` as Route} className={classes.cardLink}>
      <DiaryItem item={item} />
    </Link>
  );

  return (
    <>
      {/* Desktop and tablet grid view */}
      <Grid mt={'lg'} mb={'md'} gap="lg" visibleFrom="md">
        {paginated.map((item) => (
          <GridCol span={{ base: 12, sm: 6, md: 3 }} key={item.id}>
            {renderDiaryCard(item)}
          </GridCol>
        ))}
      </Grid>

      {/* Mobile carousel view */}
      <Carousel
        mt="lg"
        mb="md"
        slideSize="80%"
        slideGap="md"
        withControls={false}
        hiddenFrom="md"
        classNames={{
          container: classes.carouselContainer,
          viewport: classes.carouselViewport,
        }}
      >
        {paginated.map((item) => (
          <CarouselSlide key={item.id}>
            {renderDiaryCard(item)}
          </CarouselSlide>
        ))}
      </Carousel>

      {showPagination && totalPages > 1 && (
        <div className={classes.paginationWrapper}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
        </div>
      )}
    </>
  );
}
