"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ActionIcon, Group, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Route } from "next";
import Image from "next/image";

import classes from "./search-bar-container.module.scss";
import { IMenuResponse } from "@/interfaces/menu-interface";
import { MenuDrawer } from "./../../menu-drawer/menu-drawer";

import TiktokIcon from "@/components/icons/tiktok.svg";
import InstagramIcon from "@/components/icons/instagram-icon.svg";
import FaceBookIcon from "@/components/icons/facebook-icon.svg";
import GoogleMapIcon from "@/components/icons/google-map.svg";
import { MenuIcon } from '@vinaup/ui/cores';

interface SearchBarProps {
  logoUrl?: string;
  menusData: IMenuResponse[];
}

export function SearchBarContainer({ logoUrl, menusData }: SearchBarProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [searchQuery, setSearchQuery] = useState(params.get("q") || "");

  const handleSearch = () => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set("q", searchQuery);
    router.push(
      `/blogs${newParams.toString() ? `?${newParams.toString()}` : ""}` as Route,
    );
  };

  return (
    <>
      <div className={classes.searchWrapper}>
        <div className={classes.customSearchBar}>
          <div className={classes.logoSection}>
            {logoUrl ? (
              <Image src={logoUrl} alt="Logo" width={40} height={40} />
            ) : (
              <span className={classes.logoText}>Jenahair</span>
            )}
          </div>

          <TextInput
            id="search-input-unique-id"
            variant="unstyled"
            classNames={{
              input: classes.searchBarInput,
              root: classes.searchBarRoot,
            }}
            placeholder="Nhập Tìm Kiếm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <div className={classes.actionSection}>
            <Group gap={12} wrap="nowrap">
              <div className={classes.socialIcons}>
                <a href="#" className={classes.socialLink}>
                  <GoogleMapIcon width={35} height={35} />
                </a>
                <a href="#" className={classes.socialLink}>
                  <TiktokIcon width={35} height={35} />
                </a>
                <a href="#" className={classes.socialLink}>
                  <InstagramIcon width={35} height={35} />
                </a>
                <a href="#" className={classes.socialLink}>
                  <FaceBookIcon width={35} height={35} />
                </a>
              </div>

              <div className={classes.verticalDivider} />

              <ActionIcon variant="transparent" onClick={open}>
                <MenuIcon size={30} color="#F16406" />
              </ActionIcon>
            </Group>
          </div>
        </div>
      </div>

      <MenuDrawer opened={opened} onClose={close} menusData={menusData} />
    </>
  );
}
