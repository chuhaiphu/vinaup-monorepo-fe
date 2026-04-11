'use client';

import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";
import classes from "./admin-media-layout-content-container.module.scss";
import { Route } from "next";

interface AdminMediaLayoutContentContainerProps {
  children: React.ReactNode;
}

export default function AdminMediaLayoutContentContainer({ children }: AdminMediaLayoutContentContainerProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname === '/adminup/media/upload') return 'upload';
    if (pathname.includes('/adminup/media/images')) return 'images';
    return 'upload';
  };

  const activeTab = getActiveTab();

  const handleTabChange = (value: string | null) => {
    if (!value) return;
    const basePath = '/adminup/media';
    router.push(`${basePath}/${value}` as Route);
  };

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      classNames={{
        list: classes.tabsList,
        tab: classes.tabsTab,
        panel: classes.tabsPanel,
        tabLabel: classes.tabLabel,
      }}
    >
      <TabsList>
        <TabsTab value="upload">
          Uploads
        </TabsTab>
        <TabsTab value="images">
          Available Images
        </TabsTab>
      </TabsList>
      <TabsPanel value="upload" pt="lg">
        {children}
      </TabsPanel>
      <TabsPanel value="images" pt="lg">
        {children}
      </TabsPanel>
    </Tabs>
  );
}
