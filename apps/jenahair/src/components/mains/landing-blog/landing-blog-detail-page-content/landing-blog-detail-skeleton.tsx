'use client';

import { Container, Group, Stack } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';
import classes from './landing-blog-detail-page-content.module.scss';

const CONTENT_LINES = [100, 94, 98, 92, 96, 88, 95, 82];

export default function LandingBlogDetailSkeleton() {
  return (
    <div className={classes.blogDetailPage}>
      <section className={classes.blogDetailHeader}>
        <Container size={'lg'} className={classes.blogDetailHeaderContainer}>
          <Group gap={20} align={'center'}>
            <Skeleton width={30} height={30} borderRadius={999} />
            <Skeleton height={36} width="70%" borderRadius={6} />
          </Group>
        </Container>
      </section>

      <section className={classes.blogDetailInfo}>
        <Container size={'lg'} className={classes.blogDetailInfoContainer}>
          <Group justify="space-between">
            <Group gap={12} align={'center'}>
              <Skeleton width={24} height={24} borderRadius={999} />
              <Skeleton width={240} height={22} borderRadius={6} />
            </Group>
            <Group gap={18}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Group key={index} gap={6}>
                  <Skeleton width={18} height={18} borderRadius={999} />
                  <Skeleton width={48} height={20} borderRadius={6} />
                </Group>
              ))}
            </Group>
          </Group>
        </Container>
      </section>

      <section className={classes.blogDetailContent}>
        <Container size={'lg'} className={classes.blogDetailContentContainer}>
          <Stack gap={10}>
            {CONTENT_LINES.map((width, index) => (
              <Skeleton
                key={index}
                width={`${width}%`}
                height={18}
                borderRadius={6}
              />
            ))}
          </Stack>
        </Container>
      </section>

      <section className={classes.blogVideoSection}>
        <Container
          size={'lg'}
          className={classes.blogVideoSectionContainer}
          bg={'white'}
          bdrs={'md'}
          p={'sm'}
        >
          <Skeleton width="100%" height={320} borderRadius={8} />
        </Container>
      </section>

      <section className={classes.blogLocationSection}>
        <Container size={'lg'} className={classes.blogLocationSectionContainer}>
          <Group gap={6}>
            <Skeleton width={20} height={20} borderRadius={999} />
            <Skeleton width={260} height={22} borderRadius={6} />
          </Group>
        </Container>
      </section>
    </div>
  );
}
