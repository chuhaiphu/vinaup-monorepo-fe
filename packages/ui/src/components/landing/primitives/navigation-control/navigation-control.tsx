'use client';

import { ActionIcon } from '@mantine/core';
import classes from './navigation-control.module.scss';
import { useSidebarStore } from '../../../../libs/zustand/sidebar-store';

export interface NavigationControlProps {
  iconSvg: React.ReactNode;
  menuButtonLabel?: string;
}

export default function NavigationControl({
  iconSvg,
  menuButtonLabel = 'Open navigation menu',
}: Readonly<NavigationControlProps>) {
  const open = useSidebarStore((state) => state.open);

  return (
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
  );
}
