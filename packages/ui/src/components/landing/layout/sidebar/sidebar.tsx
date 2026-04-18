'use client';

import { Group, ActionIcon, Text, Drawer, TextInput } from '@mantine/core';
import { IoSearch, IoHomeOutline, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import type { Route } from 'next';
import classes from './sidebar.module.scss';

interface SidebarProps {
  opened: boolean;
  close: () => void;
  drawerPosition?: 'right' | 'left' | 'top' | 'bottom';
  navLinks: { label: string; href: string; active?: boolean }[];
}

export function Sidebar({
  opened,
  close,
  drawerPosition = 'right',
  navLinks,
}: SidebarProps) {
  return (
    <Drawer
      opened={opened}
      onClose={close}
      position={drawerPosition}
      padding="lg"
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

      {/* 1. Gắn link vào Header (Auto Home) */}
      <Link href={"/" as Route} className={classes.homeLink} onClick={close}>
        <Group className={classes.sidebarHeader} gap="xs">
          <IoHomeOutline size={20} strokeWidth={2} />
          <Text size="lg" fw={600}>
            Home
          </Text>
        </Group>
      </Link>

      <TextInput
        placeholder="Search..."
        leftSection={<IoSearch size={18} />}
        radius="md"
        mt="md"
        mb={0} // 2. Ép margin-bottom = 0 để kéo text ở dưới lên
      />

      {/* Danh sách Link Navigation */}
      <div className={classes.navLinksContainer}>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href as Route}
            className={`${classes.sidebarLink} ${link.active ? classes.active : ''}`}
            onClick={close}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </Drawer>
  );
}