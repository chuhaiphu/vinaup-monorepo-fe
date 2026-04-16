import { Paper, Stack, Group } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';
import classes from './diary-category-nav.module.scss';

const NAV_ITEMS = [
  { depth: 0, width: '60%' },
  { depth: 1, width: '50%' },
  { depth: 1, width: '55%' },
  { depth: 0, width: '65%' },
  { depth: 0, width: '45%' },
];

export default function DiaryCategoryNavSkeleton() {
  return (
    <Paper p={'sm'} radius={'md'} shadow="xs" withBorder>
      <Stack gap={'xs'}>
        {NAV_ITEMS.map((item, i) => (
          <Stack
            key={i}
            className={classes.navItem}
            bd={'1px solid #c7c7c7'}
            bdrs={'sm'}
            p={'8px'}
            ml={item.depth * 16}
          >
            <Group>
              <Skeleton height={26} borderRadius={4} width={item.width} />
            </Group>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
