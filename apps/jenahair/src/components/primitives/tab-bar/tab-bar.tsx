'use client';

import { Tabs, TabsList, TabsTab } from "@mantine/core";
import classes from "./tab-bar.module.scss";
import { useRouter, useSearchParams } from "next/navigation";

export function TabBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('type') || 'all';

  const handleTabChange = (value: string | null) => {
    if (!value) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('type', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs
      defaultValue="all"
      value={activeTab}
      onChange={handleTabChange}
      unstyled
      classNames={{
        root: classes.tabBarRoot,
        tab: classes.tab,
        tabLabel: classes.tabLabel,
        list: classes.tabList,
      }}
    >
      <TabsList grow>
        <TabsTab value="sale">Sale</TabsTab>
        <TabsTab value="hot">Hot</TabsTab>
        <TabsTab value="new">New</TabsTab>
        <TabsTab value="all">All</TabsTab>
      </TabsList>
    </Tabs>
  )
}