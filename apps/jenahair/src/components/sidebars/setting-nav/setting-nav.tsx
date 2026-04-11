'use client';

import { Group, Paper, Stack, Text } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { Route } from 'next';
import classes from './setting-nav.module.scss';

type SettingNavItem = {
  label: string;
  path: string;
};

const SETTING_NAV_ITEMS: SettingNavItem[] = [
  { label: 'Overview', path: '/adminup/setting/overview' },
  { label: 'SEO', path: '/adminup/setting/seo' },
  { label: 'Email SMTP', path: '/adminup/setting/email-smtp' },
];

export default function SettingNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <Paper p={'sm'} radius={'md'} shadow="xs" withBorder>
      <Stack gap={'xs'}>
        {SETTING_NAV_ITEMS.map((item) => (
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
