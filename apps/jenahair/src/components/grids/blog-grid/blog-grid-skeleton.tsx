import { Box, Grid, GridCol, Group } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';

type BlogGridSkeletonProps = {
  itemCount?: number;
};

export default function BlogGridSkeleton({
  itemCount = 4,
}: BlogGridSkeletonProps) {
  return (
    <Grid mt={'lg'} mb={'md'} gap="lg">
      {Array.from({ length: itemCount }).map((_, index) => (
        <GridCol span={{ base: 12, md: 6 }} key={index}>
          <Group
            gap="md"
            style={{
              borderRadius: 12,
              background: 'rgba(255,255,255,0.08)',
              padding: '0.75rem',
              overflow: 'hidden',
            }}
          >
            <Box style={{ flexShrink: 0, width: 140, height: 100 }}>
              <Skeleton width={140} height={100} borderRadius={8} />
            </Box>
            <Box style={{ flex: 1 }}>
              <Skeleton width="80%" height={18} borderRadius={6} />
              <Box mt={8}>
                <Skeleton width="95%" height={14} borderRadius={6} />
              </Box>
              <Box mt={4}>
                <Skeleton width="70%" height={14} borderRadius={6} />
              </Box>
              <Group gap="sm" mt={12}>
                <Skeleton width={48} height={16} borderRadius={6} />
                <Skeleton width={48} height={16} borderRadius={6} />
              </Group>
            </Box>
          </Group>
        </GridCol>
      ))}
    </Grid>
  );
}
