"use client";

import {
  Group,
  Button,
  Anchor,
  Box,
  Burger,
  Drawer,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Scissors from "@/components/icons/cut.svg";
import styles from "./landing-header.module.scss";

const navLinks = [
  { label: "TRANG CHỦ", link: "#" },
  { label: "DỊCH VỤ", link: "#" },
  { label: "NHẬT KÝ", link: "#" },
  { label: "CAM KẾT", link: "#" },
  { label: "LIÊN HỆ", link: "#" },
];

export function LandingHeader() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <Box component="header" className={styles.header}>
      <Group
        h="100%"
        px="xl"
        justify="space-between"
        wrap="nowrap"
        className={styles.inner}
      >
        <Anchor href="/" underline="never" className={styles.logoSection}>
          <Group gap={8}>
            <div className={styles.iconWrapper}>
              <Scissors size={24} color="#F4A261" strokeWidth={2.5} />
            </div>
            <Text span fw={800} size="xl" className={styles.logoText}>
              JENA HAIR
            </Text>
          </Group>
        </Anchor>

        <Group gap={35} visibleFrom="md" className={styles.navSection}>
          {navLinks.map((link) => (
            <Anchor
              key={link.label}
              href={link.link}
              className={styles.navLink}
              underline="never"
            >
              {link.label}
            </Anchor>
          ))}
        </Group>

        <Group gap="md">
          <Button
            visibleFrom="sm"
            className={styles.ctaButton}
            radius="xl"
            size="md"
          >
            ĐẶT LỊCH NGAY
          </Button>

          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="md"
            size="sm"
            color="white"
          />
        </Group>
      </Group>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="MENU"
        hiddenFrom="md"
        zIndex={1000}
      >
        <Stack gap="lg">
          {navLinks.map((link) => (
            <Anchor
              key={link.label}
              href={link.link}
              fw={600}
              size="lg"
              c="dark"
              onClick={close}
            >
              {link.label}
            </Anchor>
          ))}
          <Button fullWidth radius="xl" size="lg" className={styles.ctaButton}>
            ĐẶT LỊCH NGAY
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}
