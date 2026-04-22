'use client';

import { ActionIcon, Container, Group } from '@mantine/core';
import Link from 'next/link';
import { MenuSquareIcon } from '@vinaup/ui/cores';
import { SidebarControl, type SocialLinkItem } from '@vinaup/ui/landing';
import classes from './sticky-header-content.module.scss';

interface StickyHeaderContentProps {
  socialLinks: SocialLinkItem[];
  logo: React.ReactNode;
  spotlightChildren?: React.ReactNode;
}

export function StickyHeaderContent({
  socialLinks,
  logo,
  spotlightChildren,
}: Readonly<StickyHeaderContentProps>) {
  return (
    <Container size="xl" h="100%">


      <Group
        h="100%"
        w="100%"
        justify="space-between"
        align="center"
        wrap="nowrap"
        className={classes.inner}
      >
        <Group gap="sm" wrap="nowrap">
          <Link
            href="/"
            className={classes.logoSection}
            aria-label="Jena Hair - Trang chủ"
            title="Về trang chủ"
          >
            {logo}
          </Link>

          {spotlightChildren}
        </Group>

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

          <SidebarControl
            iconSvg={<MenuSquareIcon size={32} fill="var(--vinaup-amber)" />}
            menuButtonLabel="Mở menu điều hướng"
          />
        </Group>
      </Group>
    </Container>
  );
}
