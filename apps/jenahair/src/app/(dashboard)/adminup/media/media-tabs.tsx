'use client';

import { Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import { useRouter, usePathname } from 'next/navigation';
import { Route } from 'next';

interface MediaTabsProps {
  children: React.ReactNode;
}

export default function MediaTabs({ children }: MediaTabsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = pathname.includes('/adminup/media/images') ? 'images' : 'upload';

  const handleTabChange = (value: string | null) => {
    if (!value) return;
    router.push(`/adminup/media/${value}` as Route);
  };

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      styles={{ tabLabel: { fontSize: '1rem' } }}
    >
      <TabsList>
        <TabsTab value="upload">Uploads</TabsTab>
        <TabsTab value="images">Available Images</TabsTab>
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
