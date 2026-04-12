'use client';

import { ActionIcon, Stack } from '@mantine/core';
import { FaListCheck } from 'react-icons/fa6';
import { useDisclosure } from '@mantine/hooks';
import { Drawer } from '@mantine/core';
import Link from 'next/link';
import { Route } from 'next';
import classes from './landing-drawer.module.scss';
import { IMenuResponse } from '@/interfaces/menu-interface';
import { ITourCategoryResponse } from '@/interfaces/tour-category-interface';
import { TreeManager } from '@vinaup/utils/tree-manager';
import { VinaupHomeIcon as HomeIcon } from '@vinaup/ui/cores';
import React, { useMemo } from 'react';

interface DrawerContainerProps {
  menusData: IMenuResponse[];
  tourCategoriesData: ITourCategoryResponse[];
}

export default function DrawerContainer({
  menusData,
  tourCategoriesData,
}: DrawerContainerProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const menuTreeManager = useMemo(() => {
    if (menusData.length === 0) {
      return null;
    }
    return new TreeManager(menusData);
  }, [menusData]);

  // Build tour category lookup map
  const tourCategoryMap = tourCategoriesData.reduce(
    (tcMap, tc) => {
      tcMap[tc.id] = tc;
      return tcMap;
    },
    {} as Record<string, ITourCategoryResponse>
  );

  // Get URL for a menu item
  const getMenuUrl = (menu: IMenuResponse): string => {
    if (menu.targetType === 'tour-category' && menu.targetId) {
      const tourCategory = tourCategoryMap[menu.targetId];
      if (tourCategory) {
        return `/${tourCategory.endpoint}`;
      }
    }
    if (menu.targetType === 'custom-url' && menu.customUrl) {
      if (menu.customUrl === '') {
        return '/';
      }
      // If customUrl doesn't start with http:// or https://, add https://
      if (
        !menu.customUrl.startsWith('http://') &&
        !menu.customUrl.startsWith('https://')
      ) {
        return `https://${menu.customUrl}`;
      }
      return menu.customUrl;
    }
    return '/';
  };

  const renderMenuItem = (
    menu: IMenuResponse,
    depth: number = 0,
    isRootChildren: boolean
  ): React.ReactNode => {
    const url = getMenuUrl(menu);
    const hasChildren = menu.children && menu.children.length > 0;
    const isCustomUrl =
      menu.targetType === 'custom-url' && menu.customUrl && menu.customUrl !== '';

    return (
      <div key={menu.id}>
        {isCustomUrl ? (
          <a
            onClick={close}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              paddingLeft: depth > 0 ? `${depth * 16 + 12}px` : '12px',
            }}
            className={`${classes.menuLink} ${classes.menuItem}`}
          >
            <span
              className={
                !isRootChildren ? classes.menuLabel : classes.menuLabelParent
              }
            >
              {menu.title}
            </span>
          </a>
        ) : (
          <Link
            onClick={close}
            href={url as Route}
            style={{
              paddingLeft: depth > 0 ? `${depth * 16 + 12}px` : '12px',
            }}
            className={`${classes.menuLink} ${classes.menuItem}`}
          >
            <span
              className={!hasChildren ? classes.menuLabel : classes.menuLabelParent}
            >
              {menu.title}
            </span>
          </Link>
        )}
        {hasChildren && (
          <Stack gap={0}>
            {menu.children?.map((child) => renderMenuItem(child, depth + 1, false))}
          </Stack>
        )}
      </div>
    );
  };

  const renderMenuTree = () => {
    const root = menuTreeManager?.getRoot();
    if (!root || !root.children || root.children.length === 0) {
      return null;
    }
    return root.children.map((menu) => renderMenuItem(menu, 0, true));
  };

  return (
    <>
      <ActionIcon variant="transparent" onClick={open} aria-label="Open menu">
        <FaListCheck size={28} color="#F9F9F9" />
      </ActionIcon>
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Link onClick={close} href="/" className={classes.homeLink}>
            <HomeIcon size={20} stroke="black" />
            <span>Home</span>
          </Link>
        }
        position="right"
        size={'xs'}
        offset={8}
      >
        <div className={classes.divider} />
        <Stack gap={0}>{renderMenuTree()}</Stack>
      </Drawer>
    </>
  );
}
