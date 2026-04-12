'use client';

import { Group, ActionIcon, Text, Drawer, Divider, TextInput } from '@mantine/core';
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
      {/* Nút X hình tròn kính nằm ở ngoài rìa của Sidebar */}
      <ActionIcon
        onClick={close}
        radius="xl"
        size="xl"
        className={classes.sidebarCloseBtn}
        data-position={drawerPosition}
      >
        <IoClose size={24} />
      </ActionIcon>

      {/* Tiêu đề Sidebar (Biểu tượng Home) */}
      <Group className={classes.sidebarHeader} gap="xs">
        <IoHomeOutline size={20} strokeWidth={2} />
        <Text size="lg" fw={600}>
          Home
        </Text>
      </Group>

      <TextInput
        placeholder="Search..."
        leftSection={<IoSearch size={18} />}
        radius="md"
        mt="md"
        mb="xs"
      />

      <Divider my="sm" />

      {/* Danh sách Link Navigation */}
      <div className={classes.navLinksContainer}>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href as Route}
            className={`${classes.sidebarLink} ${link.active ? classes.active : ''}`}
            onClick={close} // Đóng sidebar sau khi nhấn link
          >
            {link.label}
          </Link>
        ))}
      </div>
    </Drawer>
  );
}
