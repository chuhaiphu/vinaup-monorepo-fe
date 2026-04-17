import { Container, Grid, GridCol, Group } from '@mantine/core';
import Image from 'next/image';
import classes from './salon-services-banner.module.scss';
import { ServiceTagItem } from '@/mocks/salon-services';

export interface SalonServicesBannerProps {
  imageSrc: string;
  imageAlt?: string;
  services: ServiceTagItem[];
}

export function SalonServicesBanner({
  imageSrc,
  imageAlt = 'Jena Hair Services',
  services,
}: Readonly<SalonServicesBannerProps>) {
  return (
    <section className={classes.wrapper}>
      <Container size={'xl'}>
        <Grid gap={{ base: 'xl', md: 40 }} align="center">
          <GridCol span={{ base: 12, md: 4 }}>
            <div className={classes.imageWrapper}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={classes.image}
              />
            </div>
          </GridCol>

          <GridCol span={{ base: 12, md: 8 }}>
            <div className={classes.content}>
              <h2 className={classes.title}>Tiệm cắt tóc nữ Jena Hair</h2>
              <p className={classes.subtitle}>
                Jena phục vụ cắt tóc làm đầu trang điểm bằng tình yêu nghề
              </p>

              <Group className={classes.tagsGroup}>
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`${classes.tag} ${service.isOutline ? classes.tagOutline : classes.tagSolid}`}
                  >
                    {service.label}
                  </div>
                ))}
              </Group>
            </div>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
}
