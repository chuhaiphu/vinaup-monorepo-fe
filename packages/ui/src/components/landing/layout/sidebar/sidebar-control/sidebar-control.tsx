'use client';

import { ActionIcon } from '@mantine/core';
import { useSidebarStore } from '../../../../../libs/zustand/sidebar-store';
import classes from './sidebar-control.module.scss';

export interface SidebarControlProps {
  iconSvg: React.ReactNode;
  menuButtonLabel?: string;
}

export default function SidebarControl({
  iconSvg,
  menuButtonLabel = 'Open navigation menu',
}: Readonly<SidebarControlProps>) {
  const open = useSidebarStore((state) => state.open);

  return (
    <ActionIcon
      variant="transparent"
      size="xl"
      className={classes.sidebarControl}
      onClick={open}
      aria-label={menuButtonLabel}
      title={menuButtonLabel}
    >
      {iconSvg}
    </ActionIcon>
  );
}
