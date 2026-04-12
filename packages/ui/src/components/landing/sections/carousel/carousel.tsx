'use client';

import { Carousel as MantineCarousel, CarouselSlide } from '@mantine/carousel';
import { useRef, useState } from 'react';
import classes from './carousel.module.scss';
import { Container, Group } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { MediaCard } from '../../primitives/cards/media-card/media-card';

export interface CarouselSlide {
  titleMain?: string;
  titleHighlight?: string;
  subTitle?: string;
  alt?: string;
  src: string;
  href?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  showText?: boolean;
  height?: number | string;
  loop?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export function Carousel({
  slides = [],
  showText = true,
  height = '80vh',
  loop = true,
  orientation = 'horizontal',
}: CarouselProps) {
  const [active, setActive] = useState(0);
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  // Validate and normalize slides array
  const validSlides = Array.isArray(slides)
    ? slides.filter((slide) => slide && typeof slide === 'object')
    : slides;

  // Early return if no valid slides
  if (validSlides.length === 0) {
    return null;
  }

  const currentSlide = validSlides[active];
  const showTextBox =
    showText && (currentSlide?.titleMain || currentSlide?.subTitle);

  return (
    <div className={classes.landingCarouselWrapper}>
      <MantineCarousel
        height={height}
        withIndicators={true}
        slideSize="100%"
        slideGap="md"
        emblaOptions={{ loop, align: 'center' }}
        onSlideChange={setActive}
        classNames={{
          root: classes.landingCarousel,
          indicators: classes.indicators,
          indicator: classes.indicator,
          slide: classes.cleanSlide,
        }}
        withControls={false}
        orientation={orientation}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={() => autoplay.current.play()}
      >
        {validSlides.map((slide, index) => {
          return (
            <CarouselSlide pb={0} key={index}>
              <div className={classes.slideInner}>
                <MediaCard
                  title={slide.titleMain || ''}
                  src={slide.src}
                  href={slide.href}
                  height={height}
                  borderRadius="0"
                  variant={'floating'}
                  priority={index === 0}
                />
              </div>
            </CarouselSlide>
          );
        })}
      </MantineCarousel>

      {showTextBox && (
        <div className={classes.textBoxWrapper}>
          <Container className={classes.textBoxContainer} size={'xl'}>
            <Group
              justify="space-between"
              align="center"
              classNames={{ root: classes.textBoxGroup }}
            >
              <div>
                {currentSlide?.titleMain && (
                  <Group gap={8}>
                    <span className={classes.title}>{currentSlide.titleMain}</span>
                    {currentSlide.titleHighlight && (
                      <span className={classes.highlight}>
                        {currentSlide.titleHighlight}
                      </span>
                    )}
                  </Group>
                )}
                {currentSlide?.subTitle && (
                  <p className={classes.subTitleText}>{currentSlide.subTitle}</p>
                )}
              </div>
            </Group>
          </Container>
        </div>
      )}
    </div>
  );
}
