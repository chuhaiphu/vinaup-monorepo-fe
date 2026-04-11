import AdminMenuLayoutContent from "@/components/mains/admin-menu-layout-content/admin-menu-layout-content";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default async function AdminMenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminMenuLayoutContent>
        {children}
      </AdminMenuLayoutContent>
    </Suspense>
  );
}