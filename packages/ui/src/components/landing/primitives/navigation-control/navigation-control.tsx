'use client';

import { ActionIcon } from '@mantine/core';
import classes from './navigation-control.module.scss';
import { NavLinkItem } from '../../layout/header/types';
import { useDisclosure } from '@mantine/hooks';
import { Sidebar } from '../../layout/sidebar/sidebar';

export interface NavigationControlProps {
  iconSvg: React.ReactNode;
  navLinks: NavLinkItem[];
  menuButtonLabel?: string;
}

export default function NavigationControl({
  iconSvg,
  navLinks,
  menuButtonLabel = 'Open navigation menu',
}: Readonly<NavigationControlProps>) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Sidebar
        opened={opened}
        close={close}
        drawerPosition="right"
        navLinks={navLinks}
      />

      <ActionIcon
        variant="transparent"
        size="xl"
        className={classes.menuIcon}
        onClick={open}
        aria-label={menuButtonLabel}
        title={menuButtonLabel}
      >
        {iconSvg}
      </ActionIcon>
    </>
  );
}
