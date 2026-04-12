'use client';

import { ActionIcon } from '@mantine/core';
import { RxHamburgerMenu } from 'react-icons/rx';
import classes from './navigation-control.module.scss';
import { NavLinkItem } from '../../layout/header/header';

import { useDisclosure } from '@mantine/hooks';
import { Sidebar } from '../../layout/sidebar/sidebar';

export interface LandingHeaderProps {
  navLinks: NavLinkItem[];
}

export default function NavigationControl({
  navLinks,
}: Readonly<LandingHeaderProps>) {
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
      >
        <RxHamburgerMenu size={32} />
      </ActionIcon>
    </>
  );
}
