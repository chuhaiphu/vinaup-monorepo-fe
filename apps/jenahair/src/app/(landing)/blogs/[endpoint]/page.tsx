import {
  getAllBlogsActionPublic,
  getBlogByEndpointActionPublic,
} from '@/actions/blog-action';
import { Grid, GridCol, Group, Paper, Stack, Text } from '@mantine/core';
import { VinaupLocationIcon as LocationIcon } from '@vinaup/ui/cores';
import classes from './page.module.scss';
import {
  CarouselSlide,
  Carousel,
} from '@vinaup/ui/landing';
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
  const additionalImageSlides: CarouselSlide[] = blogData.additionalImageUrls.map(
    (url) => ({
      src: url,
    })
  );

  const staticServiceSlides: CarouselSlide[] = SERVICE_ITEMS.map((item) => ({
    src: item.imageUrl,
    titleMain: item.name,
    href: item.endpoint,
  }));

  const renderAdditionalImagesCarousel = () => {
    if (additionalImageSlides.length === 0) {
      return <></>;
    } else {
      return <Carousel slides={additionalImageSlides} height={480} />;
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

  // const renderHTMLDescription = (htmlDescription: string | undefined | null) => {
  //   if (!htmlDescription || htmlDescription.trim() === '' || htmlDescription.trim() === '<p></p>') {
  //     return <></>
  //   }
  //   return (
  //     <Stack gap={2}>
  //       <Text size="xl" fw={'bold'} c={'var(--vinaup-yellow)'}>Overview:</Text>
  //       <div dangerouslySetInnerHTML={{ __html: htmlDescription }} className={classes.htmlDescription}></div>
  //     </Stack>
  //   );
  // }

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
    <div className={classes.blogDetailPage}>
      <IncrementView blogId={blogData.id} />
      <Grid
        mb={'lg'}
        classNames={{
          root: classes.topInfo,
        }}
      >
        <GridCol span={12}>
          <Stack gap={'sm'}>
            <Text
              c={'#00E1FF'}
              component="h2"
              classNames={{
                root: classes.blogTitle,
              }}
            >
              {blogData.title}
            </Text>
            <SocialTab
              blogId={blogData.id}
              likes={blogData.likes}
              views={blogData.views}
              url={currentUrl}
            />
          </Stack>
        </GridCol>
      </Grid>
      <Grid
        gap={'xl'}
        classNames={{
          root: classes.mainContent,
        }}
      >
        <GridCol
          span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 8 }}
          classNames={{
            col: classes.leftCol,
          }}
        >
          {blogData.additionalImagesPosition === 'top' &&
            renderAdditionalImagesCarousel()}
          {blogData.videoPosition === 'top' &&
            renderVideoSection(
              blogData.videoUrl || undefined,
              blogData.videoThumbnailUrl || undefined,
              blogData.title
            )}
          {/* {renderHTMLDescription(blogData.description)} */}
          {renderHTMLContent(blogData.content)}
          {blogData.additionalImagesPosition === 'bottom' &&
            renderAdditionalImagesCarousel()}
          {blogData.videoPosition === 'bottom' &&
            renderVideoSection(
              blogData.videoUrl || undefined,
              blogData.videoThumbnailUrl || undefined,
              blogData.title
            )}
          {renderDestinationAndCategory()}
        </GridCol>
        <GridCol
          span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 4 }}
          classNames={{
            col: classes.rightCol,
          }}
        >
          <div className={classes.mainImageWrapper}>
            <Image
              className={classes.mainImage}
              src={blogData.mainImageUrl || '/images/image-placeholder.png'}
              alt={blogData.title || ''}
              fill
            />
          </div>
          <Paper
            shadow="0"
            bg={'transparent'}
            mb={'sm'}
            pt={'sm'}
            pb={'sm'}
            pl={'md'}
            pr={'md'}
            classNames={{
              root: classes.whyBox,
            }}
          >
            <Stack gap={'sm'}>
              <Text
                classNames={{ root: classes.title }}
                c={'#FCBE11'}
                fz={24}
                fw={'bold'}
              >
                Why you should choose us?
              </Text>
              <Group wrap="nowrap">
                <RiCheckDoubleFill size={32} color="#FCBE11" />
                <Text classNames={{ root: classes.subTitle }} c={'#FCBE11'} fz={18}>
                  We have Vietnam tourism license
                </Text>
              </Group>
              <Group wrap="nowrap">
                <RiCheckDoubleFill size={32} color="#FCBE11" />
                <Text classNames={{ root: classes.subTitle }} c={'#FCBE11'} fz={18}>
                  We have good agencies
                </Text>
              </Group>
              <Group wrap="nowrap">
                <RiCheckDoubleFill size={32} color="#FCBE11" />
                <Text classNames={{ root: classes.subTitle }} c={'#FCBE11'} fz={18}>
                  We try make you happy
                </Text>
              </Group>
            </Stack>
          </Paper>
          <Carousel
            slides={staticServiceSlides}
            height={400}
            orientation="vertical"
            loop={true}
          />
        </GridCol>
      </Grid>
    </div>
  );
}
