import AdminLayoutContent from "@/components/mains/admin-layout-content/admin-layout-content";
import { Suspense } from "react";

export default async function AdminLayoutRoot({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </Suspense>
  );
}
