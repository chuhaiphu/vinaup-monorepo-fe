'use client';

import classes from './sticky-header.module.scss';
import clsx from 'clsx';
import { useWindowScroll } from '@mantine/hooks';

export interface StickyHeaderProps {
  children: React.ReactNode;
}

export function StickyHeader({ children }: Readonly<StickyHeaderProps>) {
  const [scroll] = useWindowScroll();
  const isScrolled = scroll.y > 10;

  return (
    <header
      className={clsx(classes.stickyHeader, {
        [classes.scrolled]: isScrolled,
      })}
    >
      {children}
    </header>
  );
}
