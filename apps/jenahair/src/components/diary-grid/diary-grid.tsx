'use client';

import { SimpleGrid } from '@mantine/core';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { DiaryPost } from '@/mocks/salon-diary';
import { OverlayCard } from '@vinaup/ui/landing';
import classes from './diary-grid.module.scss';

export interface DiaryGridProps {
  posts: DiaryPost[];
}

export function DiaryGrid({ posts }: Readonly<DiaryGridProps>) {
  const renderCard = (post: DiaryPost) => (
    <OverlayCard
      title={post.title}
      description={post.description}
      src={post.image}
      classNames={{
        title: classes.overlayCardTitle,
        description: classes.overlayCardDescription,
      }}
    />
  );

  // Lấy tối đa 8 bài viết đầu tiên
  const displayPosts = posts.slice(0, 8);

  return (
    <>
      {/* 1. GIAO DIỆN PC: SimpleGrid 4 cột */}
      <SimpleGrid cols={{ base: 1, md: 4 }} spacing="lg" visibleFrom="md">
        {displayPosts.map((post) => (
          <div key={post.id}>{renderCard(post)}</div>
        ))}
      </SimpleGrid>

      {/* 2. GIAO DIỆN MOBILE: Carousel vuốt ngang */}
      <Carousel
        slideSize="80%"
        slideGap="md"
        emblaOptions={{
          align: 'start',
        }}
        withControls={false}
        hiddenFrom="md"
        classNames={{
          container: classes.carouselContainer,
          viewport: classes.carouselViewport,
        }}
      >
        {displayPosts.map((post) => (
          <CarouselSlide key={post.id}>{renderCard(post)}</CarouselSlide>
        ))}
      </Carousel>
    </>
  );
}
