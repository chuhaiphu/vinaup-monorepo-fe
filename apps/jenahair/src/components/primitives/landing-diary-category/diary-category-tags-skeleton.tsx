import { Box, Group } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';
import classes from './diary-category-tags.module.scss';

type DiaryCategoryTagsSkeletonProps = {
  itemCount?: number;
};

const TAG_WIDTHS = [96, 128, 112, 144];

export default function DiaryCategoryTagsSkeleton({
  itemCount = 4,
}: DiaryCategoryTagsSkeletonProps) {
  return (
    <Group gap="sm" className={classes.tagsWrapper}>
      <Box p={6} bg={'white'} bdrs={'lg'}>
        <Skeleton width={44} height={44} borderRadius={10} />
      </Box>
      {Array.from({ length: itemCount }).map((_, index) => (
        <Box key={index} p={6} bg={'white'} bdrs={'lg'}>
          <Skeleton
            width={TAG_WIDTHS[index % TAG_WIDTHS.length]}
            height={44}
            borderRadius={10}
          />
        </Box>
      ))}
    </Group>
  );
}
