'use client';

import { useMemo } from 'react';
import { IMenuResponse } from '@/interfaces/menu-interface';
import { TreeManager } from '@vinaup/utils';
import TiktokIcon from '@/components/icons/tiktok.svg';
import InstagramIcon from '@/components/icons/instagram-icon.svg';
import FaceBookIcon from '@/components/icons/facebook-icon.svg';
import GoogleMapIcon from '@/components/icons/google-map.svg';
import { Group, Text } from '@mantine/core';
import { Drawer, DrawerMenuItem } from '@vinaup/ui/landing';

interface MenuDrawerProps {
  opened: boolean;
  onClose: () => void;
  menusData: IMenuResponse[];
}

export function MenuDrawer({ opened, onClose, menusData }: MenuDrawerProps) {
  const menuTreeManager = useMemo(() => {
    return menusData.length > 0 ? new TreeManager(menusData) : null;
  }, [menusData]);

  const getMenuUrl = (menu: IMenuResponse): string => {
    if (menu.targetType === 'custom-url' && menu.customUrl) {
      if (menu.customUrl === '') return '/';
      if (!menu.customUrl.startsWith('http')) return `https://${menu.customUrl}`;
      return menu.customUrl;
    }
    return '/';
  };

  const toDrawerMenuItem = (menu: IMenuResponse): DrawerMenuItem => {
    return {
      id: menu.id,
      title: menu.title,
      url: getMenuUrl(menu),
      isExternal: menu.targetType === 'custom-url' && menu.customUrl !== '',
      children: menu.children?.map(toDrawerMenuItem),
    };
  };

  const getMenus = () => {
    const root = menuTreeManager?.getRoot();
    return (root?.children || []).map((m: IMenuResponse) => toDrawerMenuItem(m));
  };

  const socialsNode = (
    <>
      <Text size="sm" c="dimmed" mb="md" ta="center">
        Kết nối với chúng tôi
      </Text>
      <Group justify="center" gap={20}>
        <a
          href="#"
          style={{
            color: 'inherit',
            transition: 'transform 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GoogleMapIcon width={28} height={28} />
        </a>
        <a
          href="#"
          style={{
            color: 'inherit',
            transition: 'transform 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TiktokIcon width={28} height={28} />
        </a>
        <a
          href="#"
          style={{
            color: 'inherit',
            transition: 'transform 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <InstagramIcon width={28} height={28} />
        </a>
        <a
          href="#"
          style={{
            color: 'inherit',
            transition: 'transform 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaceBookIcon width={28} height={28} />
        </a>
      </Group>
    </>
  );

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      menus={getMenus()}
      socialsNode={socialsNode}
    />
  );
}
