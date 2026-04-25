import { Box, Group } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';
import classes from './diary-category-tags.module.scss';

type DiaryCategoryTagsSkeletonProps = {
  itemCount?: number;
};

const TAG_WIDTHS = [96, 128, 112, 144];

export default function DiaryCategoryTagsSkeleton({
  itemCount = 2,
}: DiaryCategoryTagsSkeletonProps) {
  return (
    <Group gap="sm" className={classes.tagsWrapper}>
      <Box
        style={{
          border: '2px solid rgba(255,255,255,0.35)',
          borderRadius: 10,
          padding: '0.7rem',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Skeleton width={20} height={20} borderRadius={999} />
      </Box>
      {Array.from({ length: itemCount }).map((_, index) => (
        <Box
          key={index}
          style={{
            border: '2px solid rgba(255,255,255,0.35)',
            borderRadius: 10,
            padding: '0.7rem 1.1rem',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <Skeleton
            width={TAG_WIDTHS[index % TAG_WIDTHS.length]}
            height={20}
            borderRadius={6}
          />
        </Box>
      ))}
    </Group>
  );
}
