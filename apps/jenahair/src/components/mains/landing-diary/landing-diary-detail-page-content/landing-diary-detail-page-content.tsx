import { getDiaryByEndpointActionPublic } from '@/actions/diary-action';
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
import LikeDiaryButton from './like-diary-button';
import classes from './landing-diary-detail-page-content.module.scss';

const DIARY_ENDPOINT_PLACEHOLDER = '__placeholder__';

type LandingDiaryDetailPageContentProps = {
  params: Promise<{ endpoint: string }>;
};

export default async function LandingDiaryDetailPageContent({
  params,
}: LandingDiaryDetailPageContentProps) {
  const { endpoint } = await params;

  if (endpoint === DIARY_ENDPOINT_PLACEHOLDER) {
    notFound();
  }

  const diaryResponse = await getDiaryByEndpointActionPublic(endpoint);

  if (!diaryResponse.success || !diaryResponse.data) {
    notFound();
  }

  const diaryData = diaryResponse.data;
  const currentUrl = `https://jenahair.com/diary/${endpoint}`;

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

  const renderDiaryCategories = () => {
    const categories =
      diaryData.diaryCategoryDiaries
        ?.map((dcd) => dcd.diaryCategory?.title)
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

  const renderDiaryAction = () => {
    return (
      <>
        <Group gap={6}>
          <FaShareAlt color="var(--vinaup-amber)" size={18} />
          <Text fz={18} c={'white'}>
            Share
          </Text>
        </Group>
        <Group gap={6}>
          <LikeDiaryButton diaryId={diaryData.id} likes={diaryData.likes || 0} />
        </Group>
        <Group gap={6}>
          <FaRegEye color="white" size={18} />
          <Text fz={18} c={'white'}>
            {diaryData.views || 0}
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
      diaryData.destinations && diaryData.destinations.length > 0;

    if (!hasDestinations) {
      return null;
    }

    return (
      <>
        {hasDestinations && (
          <Group gap={6}>
            <LocationIcon size={20} fill="var(--vinaup-amber)" />
            <Text fz={18} c={'white'}>
              {diaryData.destinations.join(', ')}
            </Text>
          </Group>
        )}
      </>
    );
  };

  return (
    <div className={classes.diaryDetailPage}>
      <IncrementView diaryId={diaryData.id} />
      <section className={classes.diaryDetailHeader}>
        <Container size={'lg'} className={classes.diaryDetailHeaderContainer}>
          <Group gap={20} align={'center'}>
            <VinaupHomeIcon size={30} stroke="white" />
            <Text classNames={{ root: classes.diaryTitle }}>
              {diaryData.title}
            </Text>
          </Group>
        </Container>
      </section>
      <section className={classes.diaryDetailInfo}>
        <Container size={'lg'} className={classes.diaryDetailInfoContainer}>
          <Group justify="space-between">
            <Group gap={12} align={'center'}>
              <IoIosPricetag size={24} color="var(--vinaup-amber)" />
              {renderDiaryCategories()}
            </Group>
            <Group>{renderDiaryAction()}</Group>
          </Group>
        </Container>
      </section>
      <section>
        <Container size={'lg'} className={classes.diaryDetailContentContainer}>
          {renderHTMLContent(diaryData.content)}
        </Container>
      </section>
      <section className={classes.diaryVideoSection}>
        <Container size={'lg'} className={classes.diaryVideoSectionContainer}>
          {renderVideoSection(
            diaryData.videoUrl || undefined,
            diaryData.videoThumbnailUrl || undefined,
            diaryData.title || undefined
          )}
        </Container>
      </section>
      <section className={classes.diaryLocationSection}>
        <Container size={'lg'} className={classes.diaryLocationSectionContainer}>
          {renderDestinationAndCategory()}
        </Container>
      </section>
    </div>
  );
}
