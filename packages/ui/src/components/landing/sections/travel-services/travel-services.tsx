import Image from 'next/image';
import { SectionHeader } from '../../primitives/section-header/section-header';
import classes from './travel-services.module.scss';
import { Flex, Grid, GridCol } from '@mantine/core';

export interface TravelServicesItem {
  id: number | string;
  title: string;
  subtitle: string;
  image: string;
  align: 'left' | 'right';
}

export interface TravelServicesProps {
  data: TravelServicesItem[];
  youtubeEmbedUrl: string;
}

export function TravelServices({
  data,
  youtubeEmbedUrl,
}: Readonly<TravelServicesProps>) {
  return (
    <section>
      <SectionHeader
        title="Vietnam Travel Channel"
        description="The travel services offered on this website include a wide range of interconnected and linked options."
        align="left"
      />
      <Grid gap={{ base: 'sm', sm: 'lg' }} align="stretch">
        <GridCol span={{ base: 12, md: 4 }}>
          <div className={classes.videoWrapper}>
            {/* <iframe
              width="100%"
              height="100%"
              // src="https://www.youtube-nocookie.com/embed/WhQapHmaYYE?autoplay=1&mute=1&loop=1&playlist=WhQapHmaYYE"
              title="Vietnam Travel Insights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe> */}

            <iframe
              width="100%"
              height="100%"
              src={youtubeEmbedUrl}
              title="Vietnam Travel Insights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </GridCol>
        <GridCol span={{ base: 12, md: 8 }}>
          <Flex direction="column" gap={{ base: 'sm', md: 'lg' }}>
            {data.map((item) => (
              <div key={item.id} className={classes.card}>
                <div className={classes.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={classes.bgImage}
                  />
                </div>

                <div
                  className={`${classes.gradientOverlay} ${
                    item.align === 'left'
                      ? classes.gradientLeft
                      : classes.gradientRight
                  }`}
                />

                <div
                  className={`${classes.content} ${
                    item.align === 'left'
                      ? classes.contentLeft
                      : classes.contentRight
                  }`}
                >
                  <div className={classes.textWrapper}>
                    <h3 className={classes.title}>{item.title}</h3>
                    <div className={classes.subtitleWrapper}>
                      <p className={classes.subtitle}>{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Flex>
        </GridCol>
      </Grid>
    </section>
  );
}
