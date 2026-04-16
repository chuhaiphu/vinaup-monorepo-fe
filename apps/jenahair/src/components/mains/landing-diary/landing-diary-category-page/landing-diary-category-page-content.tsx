import { getAllDiaryCategoriesActionPublic } from '@/actions/diary-category-action';
import { getDiaryCategoryDiariesByDiaryCategoryIdActionPublic } from '@/actions/diary-category-diary-action';
import DiaryGrid from '@/components/grids/diary-grid/diary-grid';
import DiaryCategoryTags from '@/components/primitives/landing-diary-category/diary-category-tags';
import { IDiaryCategoryResponse } from '@/interfaces/diary-category-interface';
import { IDiaryResponse } from '@/interfaces/diary-interface';
import { Box, Container, Stack } from '@mantine/core';
import { VideoSection } from '@vinaup/ui/landing';
import classes from './landing-diary-category-page-content.module.scss';

type LandingDiaryCategoryPageContentProps = {
  category: IDiaryCategoryResponse;
  searchParams: Promise<{ q?: string; destinations?: string }>;
};

const isHtmlDescriptionEmpty = (html: string | null | undefined): boolean => {
  if (!html) return true;
  const trimmed = html.trim();
  return trimmed === '' || trimmed === '<p></p>';
};

export default async function LandingDiaryCategoryPageContent({
  category,
  searchParams,
}: LandingDiaryCategoryPageContentProps) {
  const queryParams = await searchParams;

  const [diaryCategoriesResponse, diaryCategoryDiariesResponse] =
    await Promise.all([
      getAllDiaryCategoriesActionPublic(),
      getDiaryCategoryDiariesByDiaryCategoryIdActionPublic(category.id),
    ]);

  const diaryCategories = diaryCategoriesResponse.data || [];

  const diariesInCategory: IDiaryResponse[] =
    diaryCategoryDiariesResponse.success && diaryCategoryDiariesResponse.data
      ? diaryCategoryDiariesResponse.data
        .map((dcd) => dcd.diary)
        .filter(
          (diary): diary is IDiaryResponse =>
            diary !== undefined && diary.visibility === 'public'
        )
      : [];

  const sortedDiaries = [...diariesInCategory]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const renderVideoSection = () => {
    if (!category.videoUrl) {
      return null;
    }
    return (
      <VideoSection
        url={category.videoUrl}
        title={category.title}
        height={480}
        thumbnailUrl={category.videoThumbnailUrl || undefined}
      />
    );
  };

  return (
    <div className={classes.diaryCategoryPage}>
      {/* --- 1. ORANGE HEADER --- */}
      <Box className={classes.diaryCategoryHeader}>
        <Container size={1232}>
          <h1 className={classes.diaryCategoryTitle}>{category.title}</h1>
        </Container>
      </Box>

      {/* --- 2. INTRO SECTION --- */}
      <Container size={1232} className={classes.diaryCategoryIntro}>
        <DiaryCategoryTags diaryCategories={diaryCategories} />
        <Stack gap="sm" mt={'sm'}>
          {!isHtmlDescriptionEmpty(category.description) && (
            <div
              className={classes.diaryCategoryDescription}
              dangerouslySetInnerHTML={{ __html: category.description ?? '' }}
            />
          )}
        </Stack>
      </Container>

      {category.videoPosition === 'top' && (
        <Container size="xl">{renderVideoSection()}</Container>
      )}

      <Container size="xl">
        <DiaryGrid queryParams={queryParams} diaries={sortedDiaries} />
      </Container>

      {category.videoPosition !== 'top' && (
        <Container size="xl">{renderVideoSection()}</Container>
      )}
    </div>
  );
}
