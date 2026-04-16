import { Box, Container, Stack } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';
import DiaryGridSkeleton from '@/components/grids/diary-grid/diary-grid-skeleton';
import DiaryCategoryTagsSkeleton from '@/components/primitives/landing-diary-category/diary-category-tags-skeleton';
import classes from './landing-diary-category-page-content.module.scss';

const DESCRIPTION_LINES = [92, 86, 78];

export default function LandingDiaryCategoryPageContentSkeleton() {
  return (
    <div className={classes.diaryCategoryPage}>
      {/* --- 1. ORANGE HEADER --- */}
      <Box className={classes.diaryCategoryHeader}>
        <Container size={1232}>
          <Box style={{ width: '50%', margin: '0 auto' }} p={4} bg={'white'} bdrs={'md'}>
            <Skeleton
              height={36}
              borderRadius={6}
            />
          </Box>
        </Container>
      </Box>

      {/* --- 2. INTRO SECTION --- */}
      <Container size={1232} className={classes.diaryCategoryIntro}>
        <DiaryCategoryTagsSkeleton />
        <Stack gap="sm" mt={'sm'}>
          {DESCRIPTION_LINES.map((width, index) => (
            <Skeleton
              key={index}
              width={`${width}%`}
              height={20}
              borderRadius={6}
            />
          ))}
        </Stack>
      </Container>

      <Container size="xl">
        <DiaryGridSkeleton />
      </Container>
    </div>
  );
}
