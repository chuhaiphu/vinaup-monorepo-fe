'use client';

import { Group, ActionIcon, Text, Drawer, TextInput } from '@mantine/core';
import { IoSearch, IoHomeOutline, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import type { Route } from 'next';
import { useState, type ReactNode } from 'react';
import classes from './sidebar.module.scss';
import { useSidebarStore } from '../../../../libs';

export interface SidebarNavLink {
  id?: string;
  label: string;
  href: string;
  external?: boolean;
  children?: SidebarNavLink[];
}

interface SidebarProps {
  drawerPosition?: 'right' | 'left' | 'top' | 'bottom';
  navLinks: SidebarNavLink[];
}

function filterLinks(links: SidebarNavLink[], query: string): SidebarNavLink[] {
  if (!query) return links;

  const q = query.toLowerCase();

  return links.flatMap((link) => {
    const matchLabel = link.label.toLowerCase().includes(q);

    // recursive find in children
    const filteredChildren = link.children ? filterLinks(link.children, q) : [];

    // if current node matches or has matching children, include it in results
    if (matchLabel || filteredChildren.length > 0) {
      return [{ ...link, children: filteredChildren }];
    }

    return [];
  });
}

export function Sidebar({ drawerPosition = 'right', navLinks }: SidebarProps) {
  const opened = useSidebarStore((state) => state.opened);
  const close = useSidebarStore((state) => state.close);
  const [search, setSearch] = useState('');

  const filtered = filterLinks(navLinks, search);

  const renderNavNode = (link: SidebarNavLink, depth: number): ReactNode => {
    const key = link.id ?? `${link.href}-${link.label}-${depth}`;
    const paddingLeft = depth > 0 ? depth * 16 + 12 : 12;

    const row = link.external ? (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.sidebarLink}
        style={{ paddingLeft }}
        onClick={close}
      >
        {link.label}
      </a>
    ) : (
      <Link
        href={link.href as Route}
        className={classes.sidebarLink}
        style={{ paddingLeft }}
        onClick={close}
      >
        {link.label}
      </Link>
    );

    return (
      <div key={key} className={classes.navNode}>
        {row}
        {link.children?.length ? (
          <div className={classes.navChildren}>
            {link.children.map((child) => renderNavNode(child, depth + 1))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      position={drawerPosition}
      padding="1rem"
      size={300}
      withCloseButton={false}
      classNames={{ content: classes.drawerContent }}
    >
      <ActionIcon
        onClick={close}
        radius="xl"
        size="xl"
        className={classes.sidebarCloseBtn}
        data-position={drawerPosition}
      >
        <IoClose size={24} />
      </ActionIcon>

      <Group justify="space-between" align="center" mb="sm">
        <Link href={"/" as Route} className={classes.homeLink} onClick={close}>

            <IoHomeOutline size={24} strokeWidth={2} color="var(--vinaup-amber)" />

        </Link>

        <Text className={classes.brandTitle}>
          Jenahair
        </Text>
      </Group>

      <div className={classes.searchSection}>
        <TextInput
          placeholder="Tìm kiếm..."
          leftSection={<IoSearch size={18} />}
          radius="md"
          mt="md"
          mb={0}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>

      <div className={classes.navLinksContainer}>
        {filtered.map((link) => renderNavNode(link, 0))}
      </div>
    </Drawer>
  );
}
