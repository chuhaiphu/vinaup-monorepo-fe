'use client';

import { Carousel } from '@mantine/carousel';
import { Box } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import classes from './hero-carousel.module.scss';
import Image from 'next/image';

export interface HeroSlide {
  id: string | number;
  image: string;
  alt: string;
}

interface HeroCarouselProps {
  children?: React.ReactNode;
  data: HeroSlide[];
  height?: string | number;
}

export function HeroCarousel({
  children,
  data,
  height = '80vh',
}: HeroCarouselProps) {
  const autoplay = useRef(Autoplay({
    delay: 4000,
    stopOnMouseEnter: false,
    stopOnInteraction: false,
    playOnInit: true,
  }));

  return (
    <Box
      className={classes.carouselWrapper}
      style={{ '--carousel-height': height } as React.CSSProperties}
    >
      <Carousel
        height="100%"
        withControls={false}
        withIndicators
        plugins={[autoplay.current]}
        emblaOptions={{
          loop: true,
          watchDrag: true,
          watchResize: true,
          watchSlides: true,
        }}
        classNames={{
          root: classes.carouselRoot,
          container: classes.carouselContainer,
          indicators: classes.indicatorsCustom,
          indicator: classes.indicatorDot,
        }}
      >
        {data.map((slide, index) => (
          <Carousel.Slide key={slide.id} className={classes.slide}>
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              className={classes.slideImage}
            />
          </Carousel.Slide>
        ))}
      </Carousel>

      {/* Lớp nội dung đè lên Carousel */}
      <div className={classes.contentOverlay}>
        {children}
      </div>
    </Box>
  );
}