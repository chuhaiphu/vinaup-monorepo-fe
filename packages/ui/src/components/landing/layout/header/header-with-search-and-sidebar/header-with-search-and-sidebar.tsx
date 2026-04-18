'use client';

import { Group, ActionIcon, Container, TextInput } from '@mantine/core';
import { IoSearch } from 'react-icons/io5';
import classes from './header-with-search-and-sidebar.module.scss';
import Link from 'next/link';
import { SocialLinkItem } from '../types';
import clsx from 'clsx';
import { useWindowScroll } from '@mantine/hooks';
import NavigationControl from '../../../primitives/navigation-control/navigation-control';
import { MenuSquareIcon } from '../../../../../cores';

export interface HeaderSplitSearchWithSocialMediaProps {
  socialLinks: SocialLinkItem[];
  logo: React.ReactNode;
  sidebarChildren?: React.ReactNode;
}

export function HeaderWithSearchAndSidebar({
  socialLinks,
  logo,
  sidebarChildren,
}: Readonly<HeaderSplitSearchWithSocialMediaProps>) {
  const [scroll] = useWindowScroll();
  const isScrolled = scroll.y > 10;

  return (
    <header
      className={clsx(classes.headerWrapper, {
        [classes.scrolled]: isScrolled,
      })}
    >
      <Container size={'xl'} h="100%">
        {sidebarChildren}

        <Group
          h="100%"
          w="100%"
          justify="space-between"
          align="center"
          wrap="nowrap"
          className={classes.inner}
        >
          {/* LEFT: Logo + Search */}
          <Group gap="sm" wrap="nowrap">
            <Link
              href="/"
              className={classes.logoSection}
              aria-label="Jena Hair - Trang chủ"
              title="Về trang chủ"
            >
              {logo}
            </Link>

            <TextInput
              visibleFrom="xs"
              placeholder="Từ khóa"
              leftSection={<IoSearch size={18} className={classes.searchIconSvg} />}
              variant="unstyled"
              classNames={{ input: classes.searchInput }}
            />
          </Group>

          {/* RIGHT: Socials & Menu */}
          <Group gap="sm" wrap="nowrap">
            <Group gap="xs">
              {socialLinks.map((social) => (
                <ActionIcon
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  variant="transparent"
                  size="xl"
                  className={classes.socialIcon}
                  aria-label={social.label}
                >
                  {social.icon}
                </ActionIcon>
              ))}
            </Group>

            <NavigationControl
              iconSvg={<MenuSquareIcon size={32} fill="var(--vinaup-amber)" />}
              menuButtonLabel="Mở menu điều hướng"
            />
          </Group>
        </Group>
      </Container>
    </header>
  );
}
