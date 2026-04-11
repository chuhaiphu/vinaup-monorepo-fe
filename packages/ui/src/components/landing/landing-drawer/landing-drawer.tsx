"use client";

import { Drawer, Stack } from "@mantine/core";
import Link from "next/link";
import { Route } from "next";
import { VinaupHomeIcon as HomeIcon } from '../../../cores';

import classes from "./landing-drawer.module.scss";

export interface LandingDrawerMenuItem {
  id: string | number;
  title: string;
  url: string;
  isExternal?: boolean;
  children?: LandingDrawerMenuItem[];
}

export interface LandingDrawerProps {
  opened: boolean;
  onClose: () => void;
  menus: LandingDrawerMenuItem[];
  titleNode?: React.ReactNode;
  socialsNode?: React.ReactNode;
  homeUrl?: string;
  homeLabel?: string;
}

export function LandingDrawer({ 
  opened, 
  onClose, 
  menus, 
  titleNode, 
  socialsNode,
  homeUrl = "/",
  homeLabel = "Home"
}: LandingDrawerProps) {
  
  const renderMenuItem = (
    menu: LandingDrawerMenuItem,
    depth: number = 0,
    isRootChildren: boolean,
  ): React.ReactNode => {
    const hasChildren = menu.children && menu.children.length > 0;

    const content = (
      <span
        className={
          !hasChildren && !isRootChildren
            ? classes.menuLabel
            : classes.menuLabelParent
        }
      >
        {menu.title}
      </span>
    );

    return (
      <div key={menu.id}>
        {menu.isExternal ? (
          <a
            href={menu.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className={classes.menuItem}
            style={{ paddingLeft: `${depth * 16 + 12}px` }}
          >
            {content}
          </a>
        ) : (
          <Link
            href={menu.url as Route}
            onClick={onClose}
            className={classes.menuItem}
            style={{ paddingLeft: `${depth * 16 + 12}px` }}
          >
            {content}
          </Link>
        )}
        {hasChildren && (
          <Stack gap={0}>
            {menu.children?.map((child) =>
              renderMenuItem(child, depth + 1, false),
            )}
          </Stack>
        )}
      </div>
    );
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="xs"
      title={
        titleNode || (
          <Link onClick={onClose} href={homeUrl as Route} className={classes.homeLink}>
            <HomeIcon size={20} stroke="black" />
            <span>{homeLabel}</span>
          </Link>
        )
      }
    >
      <div className={classes.drawerDivider} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 100px)",
          justifyContent: "space-between",
        }}
      >
        <Stack gap={0}>
          {menus.map((menu) => renderMenuItem(menu, 0, true))}
        </Stack>

        {socialsNode && (
          <div className={classes.drawerSocials}>
            {socialsNode}
          </div>
        )}
      </div>
    </Drawer>
  );
}
