'use client';
import { NavLink } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NavItemProps } from './_props';
import { FaChevronUp } from 'react-icons/fa6';
import Link from 'next/link';

import classes from './dashboard-nav.module.scss';
import { isPathActive } from '@/utils/function-helpers';
import { useLayoutSiderStore } from '@/libs/zustand/layout-sider-store';

export function DashboardNav({ navItems }: Readonly<{ navItems: NavItemProps[] }>) {
  const pathName = usePathname();
  const { close } = useLayoutSiderStore();

  const [openedItems, setOpenedItems] = useState<Record<string, boolean>>({});
  const navItemsRef = useRef(navItems);

  useEffect(() => {
    navItemsRef.current = navItems;
  }, [navItems]);

  useEffect(() => {
    setOpenedItems((prev) => {
      const next = { ...prev };
      navItemsRef.current.forEach((item) => {
        if (
          item.childrens?.some((c) => c.path === pathName) ||
          item.defaultOpened
        ) {
          next[item.key] = true;
        }
      });
      return next;
    });
  }, [pathName]);

  const handleToggle = (key: string, opened: boolean) => {
    setOpenedItems((prev) => ({ ...prev, [key]: opened }));
  };

  const renderNavItem = (item: NavItemProps, isChild = false) => {
    if (item.key === 'spacer') {
      return <div key="spacer" className={classes.spacer} />;
    }

    // Parent with children
    if (item.childrens) {
      const isActive = item.childrens.some((child) =>
        isPathActive(pathName, child.path!)
      );
      const isOpened = openedItems[item.key];

      return (
        <NavLink
          key={item.key}
          label={item.label}
          opened={isOpened}
          onChange={(opened) => handleToggle(item.key, opened)}
          rightSection={
            <div className={classes.iconWrapper}>
              <FaChevronUp size={16} />
            </div>
          }
          classNames={{
            root: `${classes.item} ${isOpened ? classes.opened : ''} ${isActive ? classes.active : ''}`,
            children: classes.childGroup,
            label: classes.label,
            body: classes.body,
            section: classes.section,
          }}
        >
          {item.childrens.map((child) => renderNavItem(child, true))}
        </NavLink>
      );
    }

    // Item with path
    if (item.path) {
      const isActive = isPathActive(pathName, item.path, item.isRoot);
      const icon =
        isActive && item.rightSectionActive
          ? item.rightSectionActive
          : item.rightSection;

      // Child item
      if (isChild) {
        return (
          <NavLink
            key={item.key}
            label={item.label}
            component={Link}
            href={item.path}
            onClick={close}
            active={isActive}
            rightSection={<div className={classes.iconWrapper}>{icon}</div>}
            classNames={{
              root: `${classes.childItem} ${isActive ? classes.active : ''}`,
              label: classes.label,
              body: classes.body,
              section: classes.section,
            }}
          />
        );
      }

      // Parent item without children
      return (
        <NavLink
          key={item.key}
          label={item.label}
          component={Link}
          href={item.path}
          onClick={close}
          rightSection={<div className={classes.iconWrapper}>{icon}</div>}
          classNames={{
            root: `${classes.item} ${classes.single} ${isActive ? classes.active : ''}`,
            label: classes.label,
            body: classes.body,
            section: classes.section,
          }}
        />
      );
    }

    // Item without path (display only)
    return (
      <NavLink key={item.key} label={item.label} rightSection={item.rightSection} />
    );
  };

  return (
    <div className={classes.root}>
      {navItems.map((item) => renderNavItem(item))}
    </div>
  );
}
