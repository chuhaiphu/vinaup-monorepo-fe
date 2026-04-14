import { Group, ActionIcon, Text, Box, Container } from '@mantine/core';
import { IoSearch } from 'react-icons/io5';
import classes from './header.module.scss';
import Link from 'next/link';
import type { Route } from 'next';
import NavigationControl from '../../../primitives/navigation-control/navigation-control';
import { NavLinkItem, SocialLinkItem, HeaderProps } from '../types';
import { RxHamburgerMenu } from 'react-icons/rx';

export function HeaderCenteredLogo({ navLinks, socialLinks }: Readonly<HeaderProps>) {
  return (
    <header className={classes.headerWrapper}>
      {/* HÀNG 1: Logo & Socials */}
      <div className={classes.topRow}>
        <Container size={1232} h="100%">
          <Group justify="space-between" align="center" h="100%" wrap="nowrap">
            {/* BÊN TRÁI: Social Icons */}
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

            {/* GIỮA: Logo */}
            <Link href="/" className={classes.logoLink}>
              <Text className={classes.logoText}>The Local Travel</Text>
            </Link>

            {/* PHẢI: Search & Menu */}
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
              >
                <IoSearch size={20} strokeWidth={2} />
              </ActionIcon>

              <NavigationControl navLinks={navLinks} iconSvg={<RxHamburgerMenu size={32} color="var(--brand-green)" />} />
            </Group>
          </Group>
        </Container>
      </div>

      {/* HÀNG 2: Navigation */}
      <nav className={classes.bottomRow}>
        <Container size={1232} h="100%" classNames={{ root: classes.navContainer }}>
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
