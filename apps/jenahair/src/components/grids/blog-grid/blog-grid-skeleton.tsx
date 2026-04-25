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
            gap="1.25rem"
            align="stretch"
            style={{
              borderRadius: 12,
              background: 'rgba(255,255,255,0.08)',
              padding: '0.75rem',
              overflow: 'hidden',
            }}
          >
            {/* Image — flex: 1, aspect-ratio 16/9 */}
            <Box style={{ flex: 1, aspectRatio: '16 / 9', borderRadius: 8, overflow: 'hidden' }}>
              <Skeleton width="100%" height="100%" borderRadius={8} />
            </Box>

            {/* Content — flex: 1, column, space-between */}
            <Box
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0.5rem 0',
              }}
            >
              {/* Title — 3-line clamp */}
              <Box>
                <Skeleton width="90%" height={18} borderRadius={6} />
                <Box mt={8}>
                  <Skeleton width="100%" height={18} borderRadius={6} />
                </Box>
                <Box mt={8}>
                  <Skeleton width="65%" height={18} borderRadius={6} />
                </Box>
              </Box>

              {/* Meta */}
              <Box mt={12}>
                <Skeleton width="40%" height={16} borderRadius={6} />
              </Box>
            </Box>
          </Group>
        </GridCol>
      ))}
    </Grid>
  );
}
