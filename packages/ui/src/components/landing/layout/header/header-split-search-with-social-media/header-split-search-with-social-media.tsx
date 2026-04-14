import { Group, ActionIcon, Container, TextInput } from '@mantine/core';
import { IoSearch } from 'react-icons/io5';
// Đã sửa lại đúng chuẩn import CSS Module của Next.js
import classes from './header-split-search-with-social-media.module.scss';
import Link from 'next/link';
import NavigationControl from '../../../primitives/navigation-control/navigation-control';
import { NavLinkItem, SocialLinkItem } from '../types';
import MenuSquareIcon from '../../../../../cores/icons/menu-square-icon';

// 1. Đổi tên Interface
export interface HeaderSplitSearchWithSocialMediaProps {
  navLinks: NavLinkItem[];
  socialLinks: SocialLinkItem[];
  logo: React.ReactNode;
}

// 2. Đổi tên Component
export function HeaderSplitSearchWithSocialMedia({
  navLinks,
  socialLinks,
  logo,
}: Readonly<HeaderSplitSearchWithSocialMediaProps>) {
  return (
    <header className={classes.headerWrapper}>
      <Container size={1232} h="100%">
        <Group
          h="100%"
          w="100%" // Đảm bảo bung rộng 100% để space-between hoạt động
          justify="space-between"
          align="center"
          wrap="nowrap"
          className={classes.inner}
        >
          {/* LEFT: Logo + Search */}
          <Group gap="sm" wrap="nowrap">
            <Link href="/" className={classes.logoSection}>
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

            <NavigationControl navLinks={navLinks} iconSvg={<MenuSquareIcon size={32} fill="var(--vinaup-amber)" />} />
          </Group>
        </Group>
      </Container>
    </header>
  );
}