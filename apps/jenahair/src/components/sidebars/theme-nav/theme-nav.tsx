'use client';

import { Group, Paper, Stack, Text } from '@mantine/core';
import { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import classes from './theme-nav.module.scss';

type ThemeNavItem = {
  label: string;
  path: string;
};

const THEME_NAV_ITEMS: ThemeNavItem[] = [
  { label: 'Social Links', path: '/adminup/theme/social-links' },
  { label: 'Banner Marquee', path: '/adminup/theme/banner-marquee' },
];

export default function ThemeNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <Paper p={'sm'} radius={'md'} shadow="xs" withBorder>
      <Stack gap={'xs'}>
        {THEME_NAV_ITEMS.map((item) => (
          <Stack
            key={item.path}
            className={`${classes.navItem} ${isActive(item.path) ? classes.active : ''}`}
            bd={'1px solid #c7c7c7'}
            bdrs={'sm'}
            p={'8px'}
            onClick={() => router.push(item.path as Route)}
          >
            <Group>
              <Text fw={isActive(item.path) ? 'bold' : 'normal'}>{item.label}</Text>
            </Group>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
