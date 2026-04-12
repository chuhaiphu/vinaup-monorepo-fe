
import { Box, Text } from '@mantine/core';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Image from 'next/image';
import classes from './tour-types.module.scss';
import { SplitSectionHeader } from '../split-section-header/split-section-header';

export interface TourTypeItem {
  title: string;
  image: string;
}

interface TourTypesProps {
  data: TourTypeItem[];
}

export function TourTypes({ data }: TourTypesProps) {
  return (
    <Box component="section">
      {/* HEADER */}
      <SplitSectionHeader
        title="Vietnam tour types"
        description="The Local Travel is your premier destination, where we showcase a wide variety of tours offered by carefully selected and trusted travel agents."
      />

      {/* CAROUSEL */}
      <div className={classes.carouselWrapper}>
        <Carousel
          slideSize={{ base: '100%', sm: '33.333333%', md: '25%', lg: '20%' }}
          slideGap="xs"
          classNames={{
            control: classes.carouselControl,
            controls: classes.carouselControls,
          }}
          previousControlIcon={<FaArrowLeft size={16} />}
          nextControlIcon={<FaArrowRight size={16} />}
        >
          {data.map((tour, index) => (
            <CarouselSlide key={index}>
              <div className={classes.card}>
                <div className={classes.imageWrapper}>
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                    className={classes.image}
                  />
                  <div className={classes.overlay}>
                    <Text className={classes.cardTitle}>{tour.title}</Text>
                  </div>
                </div>
              </div>
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
    </Box>
  );
}
