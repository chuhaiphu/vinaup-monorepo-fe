'use client';

import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import classes from "./admin-setting-email-smtp-layout-content.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { Route } from "next";

interface AdminSettingEmailSmtpLayoutContentProps {
  children: React.ReactNode;
}

export default function AdminSettingEmailSmtpLayoutContent({ children }: AdminSettingEmailSmtpLayoutContentProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname === '/adminup/setting/email-smtp/email-template') return 'email-template';
    if (pathname === '/adminup/setting/email-smtp/smtp') return 'smtp';
    return 'smtp';
  };

  const activeTab = getActiveTab();

  const handleTabChange = (value: string | null) => {
    if (!value) return;
    const basePath = '/adminup/setting/email-smtp';
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
        <TabsTab value="smtp">
          SMTP Configuration
        </TabsTab>
        {/* <TabsTab value="email-template">
          Email Templates
        </TabsTab> */}
      </TabsList>

      <TabsPanel value="smtp" pt="lg">
        {children}
      </TabsPanel>

      <TabsPanel value="email-template" pt="lg">
        {children}
      </TabsPanel>
    </Tabs>
  );
}
