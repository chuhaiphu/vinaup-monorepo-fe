import { Group, ActionIcon, Text, Box, Container } from '@mantine/core';
import { IoSearch } from 'react-icons/io5';
import classes from './header.module.scss';
import Link from 'next/link';
import type { Route } from 'next';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Sidebar, SidebarControl } from '@vinaup/ui/landing';

export interface NavLinkItem {
  label: string;
  href: string;
  active?: boolean;
  children?: NavLinkItem[];
}

export interface SocialLinkItem {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface HeaderProps {
  navLinks: NavLinkItem[];
  socialLinks: SocialLinkItem[];
}

export function HeaderCenteredLogo({
  navLinks,
  socialLinks,
}: Readonly<HeaderProps>) {
  return (
    <header className={classes.headerWrapper}>
      <Sidebar navLinks={navLinks} drawerPosition="right" />

      {/* HANG 1: Logo & Socials */}
      <div className={classes.topRow}>
        <Container size={'xl'} h="100%">
          <Group justify="space-between" align="center" h="100%" wrap="nowrap">
            {/* BEN TRAI: Social Icons */}
            <Box className={classes.btnContainer} style={{ flex: 1 }}>
              <Group gap="xs">
                {socialLinks.map((social) => (
                  <ActionIcon
                    key={social.label}
                    component="a"
                    href={social.href}
                    target="_blank"
                    variant="subtle"
                    radius="xl"
                    size="lg"
                    className={classes.socialIcon}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </ActionIcon>
                ))}
              </Group>
            </Box>

            {/* GIUA: Logo */}
            <Link
              href="/"
              className={classes.logoLink}
              aria-label="The Local Travel - Trang chu"
              title="Ve trang chu"
            >
              <Text className={classes.logoText}>The Local Travel</Text>
            </Link>

            {/* PHAI: Search & Menu */}
            <Group
              justify="flex-end"
              style={{ flex: 1 }}
              wrap="nowrap"
              className={classes.rightSection}
            >
              <ActionIcon
                variant="outline"
                radius="xl"
                size="lg"
                className={classes.searchIcon}
                aria-label="Mo tim kiem"
                title="Mo tim kiem"
              >
                <IoSearch size={20} strokeWidth={2} />
              </ActionIcon>

              <SidebarControl
                iconSvg={<RxHamburgerMenu size={32} color="var(--brand-green)" />}
                menuButtonLabel="Mo menu dieu huong"
              />
            </Group>
          </Group>
        </Container>
      </div>

      {/* HANG 2: Navigation */}
      <nav className={classes.bottomRow}>
        <Container size={'xl'} h="100%" classNames={{ root: classes.navContainer }}>
          <Group
            gap={40}
            justify="center"
            align="center"
            h="100%"
            wrap="nowrap"
            className={classes.navGroup}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href as Route}
                className={`${classes.navLink} ${link.active ? classes.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </Group>
        </Container>
      </nav>
    </header>
  );
}
