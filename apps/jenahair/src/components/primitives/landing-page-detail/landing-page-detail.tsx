'use client';

import { IPageResponse } from '@/interfaces/page-interface';
import { Grid, GridCol, Group, Image, Paper, Stack, Text } from '@mantine/core';
import { VinaupLocationIcon as LocationIcon } from '@vinaup/ui/cores';
import classes from './landing-page-detail.module.scss';
import {
  CarouselSlide,
  LandingCarousel,
} from '@vinaup/ui/landing';
import { VideoSection } from '@vinaup/ui/landing';
import { RiCheckDoubleFill } from 'react-icons/ri';
import { SERVICE_ITEMS } from '@/constants';
import ContactForm from '@/components/forms/contact-form/contact-form';
import { submitCustomerContactActionPublic } from '@/actions/customer-contact-action';

interface LandingPageDetailProps {
  page: IPageResponse;
}

export default function LandingPageDetail({ page }: LandingPageDetailProps) {
  const additionalImageSlides: CarouselSlide[] = page.additionalImageUrls.map(
    (url) => ({
      imageUrl: url,
    })
  );

  const staticServiceSlides: CarouselSlide[] = SERVICE_ITEMS.map((item) => ({
    imageUrl: item.imageUrl,
    titleMain: item.name,
    href: item.endpoint,
  }));

  const handleContactSubmit = async (formData: FormData) => {
    const result = await submitCustomerContactActionPublic(formData);

    if (result.success) {
      alert('Your contact request has been submitted successfully!');
    } else {
      alert(result.error || 'Submission failed. Please try again.');
    }
  };

  const renderAdditionalImagesCarousel = () => {
    if (additionalImageSlides.length === 0) {
      return <></>;
    }
    return <LandingCarousel slides={additionalImageSlides} height={480} />;
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
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className={classes.htmlContent}
        ></div>
      </Stack>
    );
  };

  return (
    <div className={classes.pageDetailContainer}>
      <Stack gap={'sm'} mb={'lg'}>
        <h1 className={classes.sectionTitle}>{page.title}</h1>
        {page.destinations.length > 0 && (
          <Group gap={4}>
            <LocationIcon size={20} />
            <Text fz={15} c={'white'}>
              {page.destinations.join(', ')}
            </Text>
          </Group>
        )}
      </Stack>
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
          {page.additionalImagesPosition === 'top' &&
            renderAdditionalImagesCarousel()}
          {page.videoPosition === 'top' &&
            renderVideoSection(
              page.videoUrl || undefined,
              page.videoThumbnailUrl || undefined,
              page.title
            )}
          {/* {renderHTMLDescription(page.description)} */}
          {renderHTMLContent(page.content)}
          {/* Show contact form if page type is "contact" */}
          {page.type === 'contact' && (
            <Paper
              shadow="xs"
              mt={'md'}
              mb={'md'}
              p={'md'}
              bg={'white'}
              bdrs={'lg'}
            >
              <ContactForm
                onSubmit={handleContactSubmit}
                nameFieldName="name"
                emailFieldName="email"
                phoneFieldName="phone"
                notesFieldName="notes"
                notesLabel="Your message"
                notesPlaceholder="Enter your message"
                phoneEmailLayout="inline"
                showTitle={false}
              />
            </Paper>
          )}
          {page.additionalImagesPosition === 'bottom' &&
            renderAdditionalImagesCarousel()}
          {page.videoPosition === 'bottom' &&
            renderVideoSection(
              page.videoUrl || undefined,
              page.videoThumbnailUrl || undefined,
              page.title
            )}
        </GridCol>
        <GridCol
          span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 4 }}
          classNames={{
            col: classes.rightCol,
          }}
        >
          <Stack gap={'lg'}>
            {page.mainImageUrl && (
              <Image
                src={page.mainImageUrl}
                alt={page.title || ''}
                height={480}
                bdrs={'lg'}
              />
            )}

            <Paper
              shadow="0"
              bg={'transparent'}
              mb={'lg'}
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
                  <Text
                    classNames={{ root: classes.subTitle }}
                    c={'#FCBE11'}
                    fz={18}
                  >
                    We have Vietnam tourism license
                  </Text>
                </Group>
                <Group wrap="nowrap">
                  <RiCheckDoubleFill size={32} color="#FCBE11" />
                  <Text
                    classNames={{ root: classes.subTitle }}
                    c={'#FCBE11'}
                    fz={18}
                  >
                    We have good agencies
                  </Text>
                </Group>
                <Group wrap="nowrap">
                  <RiCheckDoubleFill size={32} color="#FCBE11" />
                  <Text
                    classNames={{ root: classes.subTitle }}
                    c={'#FCBE11'}
                    fz={18}
                  >
                    We try make you happy
                  </Text>
                </Group>
              </Stack>
            </Paper>
          </Stack>

          <LandingCarousel
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
