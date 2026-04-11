'use client';

import { ActionIcon, Grid, GridCol, Group, Text, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Route } from "next";
import AddNewIcon from "@/components/icons/vinaup-add-new-icon.svg";
import { useState } from "react";
import { IMenuResponse } from "@/interfaces/menu-interface";
import { createMenuActionPrivate } from "@/actions/menu-action";
import MenuNav from "@/components/sidebars/menu-nav/menu-nav";
import classes from "./admin-menu-layout-content-container.module.scss";

interface AdminMenuLayoutContentContainerProps {
  menusData: IMenuResponse[];
  children: React.ReactNode;
}

export default function AdminMenuLayoutContentContainer({
  menusData,
  children
}: AdminMenuLayoutContentContainerProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewMenu = async () => {
    setIsCreating(true);
    const newTitle = 'New Menu';

    const response = await createMenuActionPrivate({
      title: newTitle,
    });

    if (!response.success || !response.data) {
      setIsCreating(false);
      return;
    }

    const menuId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/menu/${menuId}` as Route);
  };

  return (
    <div>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Menu</Text>
        <Group gap="sm">
          <UnstyledButton onClick={handleAddNewMenu} fz={'lg'}>Add new</UnstyledButton>
          <ActionIcon
            variant="transparent"
            onClick={handleAddNewMenu}
            loading={isCreating}
          >
            <AddNewIcon width={24} height={24} />
          </ActionIcon>
        </Group>
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <MenuNav menusData={menusData} />
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>{children}</GridCol>
      </Grid>
    </div>
  );
}
