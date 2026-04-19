'use client';

import { IPageResponse } from '@/interfaces/page-interface';
import { IAppConfigResponse } from '@/interfaces/app-config-interface';
import { Container, Group, Stack, Text } from '@mantine/core';
import { VinaupLocationIcon as LocationIcon } from '@vinaup/ui/cores';
import Link from 'next/link';
import { Route } from 'next';
import {
  SectionCarouselSlide,
  SectionCarousel,
  VideoSection,
} from '@vinaup/ui/landing';
import ContactPageContent from '@/components/mains/landing-page/contact-page-content/contact-page-content';
import classes from './dynamic-endpoint-page-content.module.scss';

interface DynamicEndpointPageContentProps {
  page: IPageResponse | undefined;
  allPages: IPageResponse[];
  appConfig?: IAppConfigResponse;
}

export default function DynamicEndpointPageContent({
  page,
  allPages,
  appConfig,
}: DynamicEndpointPageContentProps) {
  if (!page) {
    return <div className={classes.pageDetailPage}>Page not found</div>;
  }

  const additionalImageSlides: SectionCarouselSlide[] =
    page.additionalImageUrls.map((url) => ({ src: url }));

  const renderAdditionalImagesCarousel = () => {
    if (additionalImageSlides.length === 0) return <></>;
    return <SectionCarousel slides={additionalImageSlides} height={480} />;
  };

  const renderVideoSection = (
    videoUrl?: string,
    thumbnailUrl?: string,
    title?: string
  ) => {
    if (!videoUrl) return <></>;
    return (
      <VideoSection
        url={videoUrl}
        title={title}
        height={480}
        thumbnailUrl={thumbnailUrl || undefined}
      />
    );
  };

  const renderHTMLContent = (htmlContent: string | undefined | null) => {
    if (
      !htmlContent ||
      htmlContent.trim() === '' ||
      htmlContent.trim() === '<p></p>'
    ) {
      return <></>;
    }
    return (
      <Stack gap={2}>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className={classes.htmlContent}
        />
      </Stack>
    );
  };

  const renderPageTitles = () => {
    if (allPages.length === 0) return <></>;
    return (
      <Group gap={'sm'} className={classes.pageTags}>
        {allPages.map((p) => {
          const isActive = p.endpoint === page.endpoint;
          return (
            <Link
              key={p.id}
              href={`/${p.endpoint}` as Route}
              className={`${classes.pageTagItem} ${isActive ? classes.pageTagItemActive : ''}`.trim()}
              aria-current={isActive ? 'page' : undefined}
              scroll={false}
              prefetch
            >
              {p.title}
            </Link>
          );
        })}
      </Group>
    );
  };

  const renderDestination = () => {
    if (!page.destinations || page.destinations.length === 0) return null;
    return (
      <Group gap={6}>
        <LocationIcon size={20} fill="var(--vinaup-amber)" />
        <Text fz={18} c={'white'}>
          {page.destinations.join(', ')}
        </Text>
      </Group>
    );
  };

  return (
    <div className={classes.pageDetailPage}>
      <section className={classes.pageDetailHeader}>
        <Container size={'lg'} className={classes.pageDetailHeaderContainer}>
          <Group gap={20} align={'center'}>
            <Text classNames={{ root: classes.pageTitle }}>{page.title}</Text>
          </Group>
        </Container>
      </section>

      <section className={classes.pageDetailInfo}>
        <Container size={'lg'} className={classes.pageDetailInfoContainer}>
          {renderPageTitles()}
        </Container>
      </section>

      {page.additionalImagesPosition === 'top' &&
        additionalImageSlides.length > 0 && (
          <section className={classes.pageCarouselSection}>
            <Container size={'lg'} className={classes.pageCarouselSectionContainer}>
              {renderAdditionalImagesCarousel()}
            </Container>
          </section>
        )}

      {page.videoPosition === 'top' && page.videoUrl && (
        <section className={classes.pageVideoSection}>
          <Container size={'lg'} className={classes.pageVideoSectionContainer}>
            {renderVideoSection(
              page.videoUrl || undefined,
              page.videoThumbnailUrl || undefined,
              page.title
            )}
          </Container>
        </section>
      )}

      <section className={classes.pageDetailContent}>
        <Container size={'lg'} className={classes.pageDetailContentContainer}>
          {renderHTMLContent(page.content)}
          {page.type === 'contact' && (
            <ContactPageContent appConfig={appConfig} />
          )}
        </Container>
      </section>

      {page.videoPosition !== 'top' && page.videoUrl && (
        <section className={classes.pageVideoSection}>
          <Container size={'lg'} className={classes.pageVideoSectionContainer}>
            {renderVideoSection(
              page.videoUrl || undefined,
              page.videoThumbnailUrl || undefined,
              page.title
            )}
          </Container>
        </section>
      )}

      {page.additionalImagesPosition !== 'top' &&
        additionalImageSlides.length > 0 && (
          <section className={classes.pageCarouselSection}>
            <Container size={'lg'} className={classes.pageCarouselSectionContainer}>
              {renderAdditionalImagesCarousel()}
            </Container>
          </section>
        )}

      <section className={classes.pageLocationSection}>
        <Container size={'lg'} className={classes.pageLocationSectionContainer}>
          {renderDestination()}
        </Container>
      </section>
    </div>
  );
}
