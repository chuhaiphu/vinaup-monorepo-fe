import { getBlogByEndpointActionPublic } from '@/actions/blog-action';
import IncrementView from '@/components/primitives/increment-view/increment-view';
import { Container, Group, Stack, Text } from '@mantine/core';
import {
  VinaupLocationIcon as LocationIcon,
  VinaupGridListIcon,
} from '@vinaup/ui/cores';
import Link from 'next/link';
import { Route } from 'next';
import {
  CopyToClipboard,
  VideoSection,
  SectionCarousel,
  SectionCarouselSlide,
} from '@vinaup/ui/landing';
import { notFound } from 'next/navigation';
import { FaRegCopy, FaRegEye } from 'react-icons/fa';
import { IoIosPricetag } from 'react-icons/io';
import LikeBlogButton from './like-blog-button';
import classes from './landing-blog-detail-page-content.module.scss';

const BLOG_ENDPOINT_PLACEHOLDER = '__placeholder__';

type LandingBlogDetailPageContentProps = {
  params: Promise<{ endpoint: string }>;
};

export default async function LandingBlogDetailPageContent({
  params,
}: LandingBlogDetailPageContentProps) {
  const { endpoint } = await params;

  if (endpoint === BLOG_ENDPOINT_PLACEHOLDER) {
    notFound();
  }

  const blogResponse = await getBlogByEndpointActionPublic(endpoint);

  if (!blogResponse.success || !blogResponse.data) {
    notFound();
  }

  const blogData = blogResponse.data;
  const currentUrl = `https://jenahair.com/blogs/${endpoint}`;

  const additionalImageSlides: SectionCarouselSlide[] =
    blogData.additionalImageUrls.map((url) => ({ src: url }));

  const renderAdditionalImagesCarousel = () => {
    if (additionalImageSlides.length === 0) return <></>;
    return <SectionCarousel slides={additionalImageSlides} height={480} />;
  };

  const renderVideoSection = (
    videoUrl?: string,
    thumbnailUrl?: string,
    title?: string
  ) => {
    if (!videoUrl) {
      return <></>;
    }

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
        ></div>
      </Stack>
    );
  };

  const renderBlogCategories = () => {
    const categoryEntries =
      blogData.blogCategoryBlogs
        ?.map((bcb) => bcb.blogCategory)
        .filter((c): c is NonNullable<typeof c> => !!c) || [];

    if (categoryEntries.length === 0) return <></>;

    return (
      <Group gap={4}>
        {categoryEntries.map((cat) => (
          <Link
            key={cat.id}
            href={`/blogs/${cat.endpoint}` as Route}
            prefetch
            style={{ textDecoration: 'none' }}
          >
            <Text fz={18} c={'white'}>
              {cat.title}
            </Text>
          </Link>
        ))}
      </Group>
    );
  };

  const renderBlogAction = () => {
    return (
      <>
        {/* <Group gap={6}>
          <FaShareAlt color="var(--vinaup-amber)" size={18} />
          <Text fz={18} c={'white'}>
            Share
          </Text>
        </Group> */}
        <Group gap={6}>
          <LikeBlogButton blogId={blogData.id} likes={blogData.likes || 0} />
        </Group>
        <Group gap={6}>
          <FaRegEye color="white" size={18} />
          <Text fz={18} c={'white'}>
            {blogData.views || 0}
          </Text>
        </Group>
        <CopyToClipboard content={currentUrl}>
          <Group gap={6}>
            <FaRegCopy color="var(--vinaup-amber)" size={18} />
            <Text fz={18} c={'white'}>
              Link
            </Text>
          </Group>
        </CopyToClipboard>
      </>
    );
  };

  const renderDestinationAndCategory = () => {
    const hasDestinations =
      blogData.destinations && blogData.destinations.length > 0;

    if (!hasDestinations) {
      return null;
    }

    return (
      <>
        {hasDestinations && (
          <Group gap={6}>
            <LocationIcon size={20} fill="var(--vinaup-amber)" />
            <Text fz={18} c={'white'}>
              {blogData.destinations.join(', ')}
            </Text>
          </Group>
        )}
      </>
    );
  };

  return (
    <div className={classes.blogDetailPage}>
      <IncrementView blogId={blogData.id} />
      <section className={classes.blogDetailHeader}>
        <Container size={'lg'} className={classes.blogDetailHeaderContainer}>
          <Group gap={20} align={'center'} wrap="nowrap">
            <Link href={'/blogs' as Route} prefetch>
              <VinaupGridListIcon size={30} fill="white" />
            </Link>
            <Text classNames={{ root: classes.blogTitle }}>{blogData.title}</Text>
          </Group>
        </Container>
      </section>
      <section className={classes.blogDetailInfo}>
        <Container size={'lg'} className={classes.blogDetailInfoContainer}>
          <Group justify="space-between">
            <Group
              gap={12}
              align={'center'}
              classNames={{ root: classes.blogCategories }}
            >
              <IoIosPricetag size={24} color="var(--vinaup-amber)" />
              {renderBlogCategories()}
            </Group>
            <Group classNames={{ root: classes.blogActionGroup }}>
              {renderBlogAction()}
            </Group>
          </Group>
        </Container>
      </section>
      {blogData.additionalImagesPosition === 'top' &&
        additionalImageSlides.length > 0 && (
          <section className={classes.blogCarouselSection}>
            <Container size={'lg'} className={classes.blogCarouselSectionContainer}>
              {renderAdditionalImagesCarousel()}
            </Container>
          </section>
        )}
      {blogData.videoPosition === 'top' && blogData.videoUrl && (
        <section className={classes.blogVideoSection}>
          <Container size={'lg'} className={classes.blogVideoSectionContainer}>
            {renderVideoSection(
              blogData.videoUrl || undefined,
              blogData.videoThumbnailUrl || undefined,
              blogData.title || undefined
            )}
          </Container>
        </section>
      )}
      <section className={classes.blogDetailContent}>
        <Container size={'lg'} className={classes.blogDetailContentContainer}>
          {renderHTMLContent(blogData.content)}
        </Container>
      </section>
      {blogData.videoPosition !== 'top' && blogData.videoUrl && (
        <section className={classes.blogVideoSection}>
          <Container size={'lg'} className={classes.blogVideoSectionContainer}>
            {renderVideoSection(
              blogData.videoUrl || undefined,
              blogData.videoThumbnailUrl || undefined,
              blogData.title || undefined
            )}
          </Container>
        </section>
      )}
      {blogData.additionalImagesPosition !== 'top' &&
        additionalImageSlides.length > 0 && (
          <section className={classes.blogCarouselSection}>
            <Container size={'lg'} className={classes.blogCarouselSectionContainer}>
              {renderAdditionalImagesCarousel()}
            </Container>
          </section>
        )}
      <section className={classes.blogLocationSection}>
        <Container size={'lg'} className={classes.blogLocationSectionContainer}>
          {renderDestinationAndCategory()}
        </Container>
      </section>
    </div>
  );
}
