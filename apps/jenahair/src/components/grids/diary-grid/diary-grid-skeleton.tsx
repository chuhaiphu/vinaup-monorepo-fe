import { Box, Grid, GridCol } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';

type DiaryGridSkeletonProps = {
  itemCount?: number;
};

export default function DiaryGridSkeleton({
  itemCount = 4,
}: DiaryGridSkeletonProps) {
  return (
    <Grid mt={'lg'} mb={'md'} gap="lg">
      {Array.from({ length: itemCount }).map((_, index) => (
        <GridCol
          span={{ base: 12, sm: 6, md: 3 }}
          key={index}
          p={8}
          style={{ borderRadius: 16, background: 'rgba(255,255,255,0.08)' }}
        >
          <Box style={{ aspectRatio: '3 / 4', width: '100%' }}>
            <Skeleton width="100%" height="100%" borderRadius={16} />
          </Box>
        </GridCol>
      ))}
    </Grid>
  );
}
