import {
  getAllBlogsActionPublic,
  getBlogByEndpointActionPublic,
} from '@/actions/blog-action';
import { Container, Grid, GridCol, Group, Paper, Stack, Text } from '@mantine/core';
import {
  VinaupLocationIcon as LocationIcon,
  VinaupHomeIcon,
} from '@vinaup/ui/cores';
import classes from './page.module.scss';
import { SectionCarouselSlide, SectionCarousel } from '@vinaup/ui/landing';
import { VideoSection } from '@vinaup/ui/landing';
import SocialTab from '@/components/primitives/social-tab/social-tab';
import IncrementView from '@/components/primitives/social-tab/increment-view';
import { RiCheckDoubleFill, RiPriceTag3Line } from 'react-icons/ri';
import { SERVICE_ITEMS } from '@/constants';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';

const BLOG_ENDPOINT_PLACEHOLDER = '__placeholder__';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}): Promise<Metadata> {
  const { endpoint } = await params;
  const blogResponse = await getBlogByEndpointActionPublic(endpoint);

  if (!blogResponse.success || !blogResponse.data) {
    return {
      title: 'Blog Not Found',
    };
  }

  const blog = blogResponse.data;
  const description = blog.description
    ? blog.description.replace(/<[^>]*>/g, '').substring(0, 160)
    : 'Discover expert hair care tips, styling inspiration, and salon insights from Jena Hair';

  return {
    title: `${blog.title} | Jena Hair`,
    description: description,
    openGraph: {
      title: blog.title,
      description: description,
      images: blog.mainImageUrl ? [blog.mainImageUrl] : [],
    },
    alternates: {
      canonical: `https://jenahair.com/blogs/${endpoint}`,
    },
  };
}

export async function generateStaticParams() {
  const blogsResponse = await getAllBlogsActionPublic();
  const params =
    blogsResponse.success && blogsResponse.data
      ? blogsResponse.data.map((blog) => ({
          endpoint: blog.endpoint,
        }))
      : [];

  return params.length > 0 ? params : [{ endpoint: BLOG_ENDPOINT_PLACEHOLDER }];
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}) {
  const { endpoint } = await params;

  if (endpoint === BLOG_ENDPOINT_PLACEHOLDER) {
    notFound();
  }

  const blogResponse = await getBlogByEndpointActionPublic(endpoint);

  if (!blogResponse.success || !blogResponse.data) {
    notFound();
  }
  const blogData = blogResponse.data;
  const additionalImageSlides: SectionCarouselSlide[] =
    blogData.additionalImageUrls.map((url) => ({
      src: url,
    }));

  const renderAdditionalImagesCarousel = () => {
    if (additionalImageSlides.length === 0) {
      return <></>;
    } else {
      return <SectionCarousel slides={additionalImageSlides} height={480} />;
    }
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
  console.log('blogData', blogData);
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
        {/* <Text size="xl" fw={'bold'} c={'var(--vinaup-yellow)'}>Content:</Text> */}
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className={classes.htmlContent}
        ></div>
      </Stack>
    );
  };

  const renderDestinationAndCategory = () => {
    const hasDestinations =
      blogData.destinations && blogData.destinations.length > 0;

    const categories =
      blogData.blogCategoryBlogs
        ?.map((bcb) => bcb.blogCategory?.title)
        .filter(Boolean) || [];
    const hasCategories = categories.length > 0;

    if (!hasDestinations && !hasCategories) {
      return null;
    }

    return (
      <Stack gap={'sm'} mt={'md'}>
        {hasDestinations && (
          <Group gap={4}>
            <LocationIcon size={20} fill="#00E1FF" />
            <Text fz={16} c={'white'} td="underline">
              {blogData.destinations.join(', ')}
            </Text>
          </Group>
        )}
        {hasCategories && (
          <Group gap={4}>
            <RiPriceTag3Line size={20} color="#00E1FF" />
            <Text fz={16} c={'white'} td="underline">
              {categories.join('; ')}
            </Text>
          </Group>
        )}
      </Stack>
    );
  };

  const currentUrl = `https://jenahair.com/blogs/${endpoint}`;

  return (
    <main className={classes.blogDetailPage}>
      <IncrementView blogId={blogData.id} />
      <section className={classes.blogDetailHeader}>
        <Container size={'lg'} className={classes.blogDetailHeaderContainer}>
          <Group gap={12}>
            <VinaupHomeIcon />
            <Text
              classNames={{
                root: classes.blogTitle,
              }}
            >
              {blogData.title}
            </Text>
          </Group>
        </Container>
      </section>
    </main>
  );
}
