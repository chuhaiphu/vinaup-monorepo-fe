import { Suspense } from 'react';
import { Container, Grid, GridCol, Stack, Group } from '@mantine/core';
import Link from 'next/link';
import { VideoSection } from '@vinaup/ui/landing';
import { VinaupGridListIcon } from '@vinaup/ui/cores';
import classes from './salon-video-and-blogs-showcase.module.scss';
import { BlogsColumn } from './blogs-column';
import { BlogsColumnSkeleton } from './blogs-column-skeleton';

export interface SalonVideoAndBlogsShowcaseProps {
  videoUrl: string;
  videoTitle?: string;
  videoThumbnailUrl?: string;
}

export function SalonVideoAndBlogsShowcase({
  videoUrl,
  videoTitle,
  videoThumbnailUrl,
}: Readonly<SalonVideoAndBlogsShowcaseProps>) {
  return (
    <section className={classes.sectionWrapper}>
      <Container size={'xl'}>
        <Stack gap="3rem">
          <div className={classes.header}>
            <h2 className={classes.mainTitle}>Salon cam kết với khách hàng</h2>
            <p className={classes.mainDescription}>
              Salon phục vụ làm đẹp cho khách hàng, đến khi hài lòng mà không phụ
              thu thêm chi phí phát sinh. Sản phẩm phục vụ khách hàng là hàng chính
              hãng
            </p>
          </div>

          <Grid gap={{ base: 'xl', md: 'lg' }}>
            <GridCol span={{ base: 12, md: 6 }}>
              <Stack gap="1.5rem" h="100%">
                <Group justify="space-between" align="center">
                  <h3 className={classes.subTitle}>Video</h3>
                  <Link href="/nhat-ky" className={classes.seeAllLink} prefetch>
                    Tất cả
                    <VinaupGridListIcon size={23} />
                  </Link>
                </Group>

                <VideoSection
                  url={videoUrl}
                  title={videoTitle}
                  thumbnailUrl={videoThumbnailUrl}
                  height={400}
                />
              </Stack>
            </GridCol>

            <GridCol span={{ base: 12, md: 6 }}>
              <Stack gap="1.5rem" h="100%">
                <Group justify="space-between" align="center">
                  <h3 className={classes.subTitle}>Blog</h3>
                  <Link href="/blogs" className={classes.seeAllLink} prefetch>
                    Tất cả
                    <VinaupGridListIcon size={23} />
                  </Link>
                </Group>

                <Suspense fallback={<BlogsColumnSkeleton />}>
                  <BlogsColumn />
                </Suspense>
              </Stack>
            </GridCol>
          </Grid>
        </Stack>
      </Container>
    </section>
  );
}
