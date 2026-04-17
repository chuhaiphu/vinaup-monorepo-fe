import { Stack, Box } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';

export function BlogsColumnSkeleton() {
  return (
    <Stack gap="lg" justify="space-between" style={{ flexGrow: 1 }}>
      {Array.from({ length: 2 }).map((_, i) => (
        <Box
          key={i}
          style={{ display: 'flex', gap: '1.5rem', alignItems: 'stretch' }}
        >
          <Box style={{ flex: 1, aspectRatio: '16 / 9', borderRadius: 8, overflow: 'hidden' }}>
            <Skeleton width="100%" height="100%" borderRadius={8} />
          </Box>
          <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Skeleton width="100%" height={20} borderRadius={4} />
            <Skeleton width="70%" height={20} borderRadius={4} />
            <Skeleton width="50%" height={16} borderRadius={4} />
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
