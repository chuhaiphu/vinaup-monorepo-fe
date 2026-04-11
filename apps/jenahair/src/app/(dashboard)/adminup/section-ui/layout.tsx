import AdminSectionUILayoutContent from "@/components/mains/admin-section-ui-layout-content/admin-section-ui-layout-content";
import { Suspense } from "react";

export default async function AdminSectionUILayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <AdminSectionUILayoutContent>
        {children}
      </AdminSectionUILayoutContent>
    </Suspense>
  );
}
