import AdminSettingLayoutContent from "@/components/mains/admin-setting-layout-content/admin-setting-layout-content";

export default async function AdminSettingLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSettingLayoutContent>
      {children}
    </AdminSettingLayoutContent>
  );
}

