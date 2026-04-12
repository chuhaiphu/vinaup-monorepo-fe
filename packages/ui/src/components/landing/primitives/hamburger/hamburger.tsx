'use client';

import { ActionIcon } from '@mantine/core';
import { RxHamburgerMenu } from 'react-icons/rx';
import classes from './hamburger.module.scss';
import { NavLinkItem } from '../../layout/header/header';
import { MainSidebar } from '../../main-sidebar/main-sidebar';
import { useDisclosure } from '@mantine/hooks';

export interface LandingHeaderProps {
  navLinks: NavLinkItem[];
}

export default function Hamburger({ navLinks }: Readonly<LandingHeaderProps>) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <MainSidebar
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
    </div>
  );
}
