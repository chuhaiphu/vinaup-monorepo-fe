import {
  getAllToursActionPublic,
  getTourByEndpointActionPublic,
} from '@/actions/tour-action';
import {
  Grid,
  GridCol,
  Group,
  Paper,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { VinaupLocationIcon as LocationIcon } from '@vinaup/ui/cores';
import classes from './page.module.scss';
import { SmileSquareIcon } from '@vinaup/ui/cores';
import {
  CarouselSlide,
  Carousel,
} from '@vinaup/ui/landing';
import { VideoSection } from '@vinaup/ui/landing';
import { formatPrice, renderDurationDays } from '@/utils/function-helpers';
import { RiCheckDoubleFill } from 'react-icons/ri';
import { SERVICE_ITEMS } from '@/constants';
import SocialTab from '@/components/primitives/social-tab/social-tab';
import IncrementView from '@/components/primitives/social-tab/increment-view';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAppConfigActionPublic } from '@/actions/app-config-action';
import Image from 'next/image';

const TOUR_ENDPOINT_PLACEHOLDER = '__placeholder__';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}): Promise<Metadata> {
  const { endpoint } = await params;
  const tourResponse = await getTourByEndpointActionPublic(endpoint);

  if (!tourResponse.success || !tourResponse.data) {
    return {
      title: 'Tour Not Found',
    };
  }

  const tour = tourResponse.data;
  const description = tour.description
    ? tour.description.replace(/<[^>]*>/g, '').substring(0, 300)
    : tour.destinations?.join(', ') || 'Vietnam';

  return {
    title: tour.title,
    description: description,
    openGraph: {
      title: tour.title,
      description: description,
      images: tour.mainImageUrl ? [tour.mainImageUrl] : [],
    },
    alternates: {
      canonical: `https://jenahair.com/tours/${endpoint}`,
    },
  };
}

export async function generateStaticParams() {
  const toursResponse = await getAllToursActionPublic();
  const params =
    toursResponse.success && toursResponse.data
      ? toursResponse.data.map((tour) => ({
          endpoint: tour.endpoint,
        }))
      : [];

  return params.length > 0 ? params : [{ endpoint: TOUR_ENDPOINT_PLACEHOLDER }];
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}) {
  const { endpoint } = await params;

  if (endpoint === TOUR_ENDPOINT_PLACEHOLDER) {
    notFound();
  }

  const tourData = await getTourByEndpointActionPublic(endpoint);
  const configData = await getAppConfigActionPublic();

  if (!tourData.success || !tourData.data) {
    notFound();
  }

  const additionalImageSlides: CarouselSlide[] =
    tourData.data.additionalImageUrls.map((url) => ({
      src: url,
    }));

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

  const renderHTMLDescription = (htmlDescription: string | undefined | null) => {
    if (
      !htmlDescription ||
      htmlDescription.trim() === '' ||
      htmlDescription.trim() === '<p></p>'
    ) {
      return <></>;
    }
    return (
      <Stack gap={2}>
        <Text size="xl" fw={'bold'} c={'var(--vinaup-yellow)'}>
          Overview:
        </Text>
        <div
          dangerouslySetInnerHTML={{ __html: htmlDescription }}
          className={classes.htmlDescription}
        ></div>
      </Stack>
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
        <Text size="xl" fw={'bold'} c={'var(--vinaup-yellow)'}>
          Itinerary:
        </Text>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className={classes.htmlContent}
        ></div>
      </Stack>
    );
  };

  const renderPrice = (price: number, discountPrice: number) => {
    // Case 1: price === 0 -> Ask for Price
    if (price === 0) {
      return (
        <Group classNames={{ root: classes.price }} gap={'xs'}>
          <Text c={'#00E1FF'} className={classes.value}>
            Ask for Price
          </Text>
        </Group>
      );
    }

    // Case 2: Only price exists (discountPrice === 0) -> render price with main style
    if (discountPrice === 0) {
      return (
        <Group classNames={{ root: classes.price }} gap={'xs'}>
          <Text c={'#00E1FF'} className={classes.currency}>
            đ
          </Text>
          <Text c={'#00E1FF'} className={classes.value}>
            {formatPrice(price)}
          </Text>
        </Group>
      );
    }

    // Case 3: Both price and discountPrice exist -> price strikethrough, discountPrice as main
    return (
      <Group classNames={{ root: classes.price }} gap={'xs'}>
        <Text c={'#00E1FF'} className={classes.currency}>
          đ
        </Text>
        <Group gap={'xs'}>
          <Text c={'#00E1FF'} className={classes.value}>
            {formatPrice(discountPrice)}
          </Text>
          <Text td="line-through" c={'white'} className={classes.value}>
            {formatPrice(price)}
          </Text>
        </Group>
      </Group>
    );
  };

  const currentUrl = `https://jenahair.com/tours/${endpoint}`;

  return (
    <div className={classes.tourDetailPage}>
      <IncrementView tourId={tourData.data.id} />
      <Grid
        gap={'xl'}
        mb={'lg'}
        classNames={{
          root: classes.topInfo,
        }}
      >
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
          <Stack gap={'sm'} pl={'sm'} pr={'sm'} pt={'sm'}>
            <Text
              c={'#00E1FF'}
              component="h2"
              classNames={{
                root: classes.tourTitle,
              }}
            >
              {tourData.data.title}
            </Text>
            <SocialTab
              tourId={tourData.data.id}
              likes={tourData.data.likes}
              views={tourData.data.views}
              url={currentUrl}
            />
            <Group justify="space-between" pb={'sm'}>
              <Group gap={4}>
                <LocationIcon size={20} />
                <Text fz={15} c={'white'}>
                  {tourData.data.destinations.join(', ')}
                </Text>
              </Group>
              <Group gap={'xs'}>
                <Link
                  href={`https://wa.me/${configData.data?.phoneContact ? configData.data?.phoneContact : '84912711789'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.whatsappLink}
                >
                  <Text fz={'xl'} c={'#60D669'}>
                    Whatsapp
                  </Text>
                  <SmileSquareIcon size={22} />
                </Link>
              </Group>
            </Group>
          </Stack>
        </GridCol>
        <GridCol
          span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 4 }}
          classNames={{
            col: classes.rightCol,
          }}
        >
          <Stack
            gap={'xs'}
            justify="center"
            pl={{ base: 'sm', md: 0 }}
            pr={'sm'}
            pb={'sm'}
            pt={'sm'}
          >
            <Group justify="space-between" align="flex-start">
              <Stack gap={0} align="flex-start">
                <Text className={classes.label} size="md" c={'#F9F9F9'}>
                  Price from
                </Text>
                {renderPrice(tourData.data.price, tourData.data.discountPrice)}
              </Stack>
              <Stack gap={0} align="flex-end">
                <Text className={classes.label} size="md" c={'#F9F9F9'}>
                  Duration
                </Text>
                <Text className={classes.duration} size="lg" c={'white'}>
                  {renderDurationDays(tourData.data.durationDays)}
                </Text>
              </Stack>
            </Group>
            <div className={classes.spacer} />
            <Group justify="space-between" wrap="nowrap" pt={0}>
              <Link href={`/tours/${endpoint}/booking`} className={classes.link}>
                <UnstyledButton
                  classNames={{ root: classes.leftButton }}
                  bg={'#00E1FF'}
                  p={'xs'}
                  bdrs={'md'}
                >
                  Book Now
                </UnstyledButton>
              </Link>
              <Link href={`/customized-tour`} className={classes.link}>
                <UnstyledButton
                  classNames={{ root: classes.rightButton }}
                  c={'#FCBE11'}
                  p={'xs'}
                  bdrs={'md'}
                >
                  Customized Tour
                </UnstyledButton>
              </Link>
            </Group>
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
          {tourData.data.additionalImagesPosition === 'top' &&
            renderAdditionalImagesCarousel()}
          {tourData.data.videoPosition === 'top' &&
            renderVideoSection(
              tourData.data.videoUrl || undefined,
              tourData.data.videoThumbnailUrl || undefined,
              tourData.data.title
            )}
          {renderHTMLDescription(tourData.data.description)}
          {renderHTMLContent(tourData.data.content)}
          {tourData.data.additionalImagesPosition === 'bottom' &&
            renderAdditionalImagesCarousel()}
          {tourData.data.videoPosition === 'bottom' &&
            renderVideoSection(
              tourData.data.videoUrl || undefined,
              tourData.data.videoThumbnailUrl || undefined,
              tourData.data.title
            )}
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
              src={tourData.data.mainImageUrl || '/images/image-placeholder.png'}
              alt={tourData.data.title || ''}
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
