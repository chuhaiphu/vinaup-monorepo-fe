'use client';

import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Box, Container } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import classes from './hero-carousel.module.scss';
import Image from 'next/image';

export interface HeroSlide {
  id: string | number;
  image: string;
  alt: string;
  title?: string;
  description?: string;
}

interface HeroCarouselProps {
  children?: React.ReactNode;
  data: HeroSlide[];
  height?: string | number;
  overlayOpacity?: number;
}

export function HeroCarousel({
  children,
  data,
  height = '80vh',
  overlayOpacity = 0.6,
}: HeroCarouselProps) {
  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnMouseEnter: false,
      stopOnInteraction: false,
      playOnInit: true,
    })
  );

  return (
    <Box
      className={classes.carouselWrapper}
      style={{
        '--carousel-height': height,
        '--carousel-overlay-opacity': overlayOpacity
      } as React.CSSProperties}
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
          <CarouselSlide key={slide.id} className={classes.slide}>
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              className={classes.slideImage}
            />
            {/* Vùng chứa Title và Description của mỗi slide */}
            {(slide.title || slide.description) && (
              <div className={classes.slideTextOverlay}>
                <Container size={1232} w="100%">
                  <div className={classes.textContainer}>
                    {slide.title && <h2 className={classes.slideTitle}>{slide.title}</h2>}
                    {slide.description && <p className={classes.slideDescription}>{slide.description}</p>}
                  </div>
                </Container>
              </div>
            )}
          </CarouselSlide>
        ))}
      </Carousel>

      {/* Lớp nội dung đè lên Carousel */}
      <div className={classes.contentOverlay}>{children}</div>
    </Box>
  );
}
