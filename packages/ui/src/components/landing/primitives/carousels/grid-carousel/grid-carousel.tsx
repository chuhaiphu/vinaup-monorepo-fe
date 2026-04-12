import { Carousel, CarouselSlide, CarouselProps } from '@mantine/carousel';
import { Text } from '@mantine/core';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Image from 'next/image';
import classes from './grid-carousel.module.scss';

export interface GridCarouselItem {
  title: string;
  image: string;
}

export interface GridCarouselProps {
  items: GridCarouselItem[];
  // Cho phép chỉnh số lượng slide hiển thị tùy theo trang
  slideSize?: CarouselProps['slideSize'];
  // Cho phép truyền thêm props của Mantine nếu muốn (autoplay, loop...)
  carouselProps?: Partial<CarouselProps>;
}

export function GridCarousel({
  items,
  slideSize = { base: '100%', sm: '33.333333%', md: '25%', lg: '20%' },
  carouselProps,
}: GridCarouselProps) {
  if (!items?.length) return null;

  return (
    <div className={classes.carouselWrapper}>
      <Carousel
        slideSize={slideSize}
        slideGap="xs"
        previousControlIcon={<FaArrowLeft size={16} />}
        nextControlIcon={<FaArrowRight size={16} />}
        classNames={{
          control: classes.carouselControl,
          controls: classes.carouselControls,
        }}
        {...carouselProps}
      >
        {items.map((item, index) => (
          <CarouselSlide key={index}>
            <div className={classes.card}>
              <div className={classes.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                  className={classes.image}
                />
                <div className={classes.overlay}>
                  <Text className={classes.cardTitle}>{item.title}</Text>
                </div>
              </div>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  );
}
