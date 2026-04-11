import AdminTourCategoryLayoutContent from "@/components/mains/admin-tour-category-layout-content/admin-tour-category-layout-content";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default async function AdminTourCategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminTourCategoryLayoutContent>
      {children}
    </AdminTourCategoryLayoutContent>
    </Suspense>
  );
}