import AdminBlogCategoryLayoutContent from "@/components/mains/admin-blog-category-layout-content/admin-blog-category-layout-content";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default async function AdminBlogCategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminBlogCategoryLayoutContent>
        {children}
      </AdminBlogCategoryLayoutContent>
    </Suspense>
  );
}

