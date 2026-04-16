import { getBlogByEndpointActionPublic } from '@/actions/blog-action';
import IncrementView from '@/components/primitives/social-tab/increment-view';
import { Container, Group, Stack, Text } from '@mantine/core';
import {
  VinaupLocationIcon as LocationIcon,
  VinaupHomeIcon,
} from '@vinaup/ui/cores';
import { CopyToClipboard, VideoSection } from '@vinaup/ui/landing';
import { notFound } from 'next/navigation';
import { FaRegCopy, FaRegEye, FaShareAlt } from 'react-icons/fa';
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
    const categories =
      blogData.blogCategoryBlogs
        ?.map((bcb) => bcb.blogCategory?.title)
        .filter(Boolean) || [];
    const hasCategories = categories.length > 0;

    return (
      <>
        {hasCategories && (
          <Group gap={4}>
            <Text fz={18} c={'white'}>
              {categories.join('; ')}
            </Text>
          </Group>
        )}
      </>
    );
  };

  const renderBlogAction = () => {
    return (
      <>
        <Group gap={6}>
          <FaShareAlt color="var(--vinaup-amber)" size={18} />
          <Text fz={18} c={'white'}>
            Share
          </Text>
        </Group>
        <Group gap={6}>
          <LikeBlogButton blogId={blogData.id} likes={blogData.likes || 0} />
        </Group>
        <Group gap={6}>
          <FaRegEye color="white" size={18} />
          <Text fz={18} c={'white'}>
            {blogData.views || 0}
          </Text>
        </Group>
        <Group gap={6}>
          <FaRegCopy color="var(--vinaup-amber)" size={18} />
          <CopyToClipboard content={currentUrl}>
            <Text fz={18} c={'white'}>
              Link
            </Text>
          </CopyToClipboard>
        </Group>
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
          <Group gap={20} align={'center'}>
            <VinaupHomeIcon size={30} stroke="white" className={classes.homeIcon} />
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
      <section className={classes.blogDetailContent}>
        <Container size={'lg'} className={classes.blogDetailContentContainer}>
          {renderHTMLContent(blogData.content)}
        </Container>
      </section>
      <section className={classes.blogVideoSection}>
        <Container size={'lg'} className={classes.blogVideoSectionContainer}>
          {renderVideoSection(
            blogData.videoUrl || undefined,
            blogData.videoThumbnailUrl || undefined,
            blogData.title || undefined
          )}
        </Container>
      </section>
      <section className={classes.blogLocationSection}>
        <Container size={'lg'} className={classes.blogLocationSectionContainer}>
          {renderDestinationAndCategory()}
        </Container>
      </section>
    </div>
  );
}
