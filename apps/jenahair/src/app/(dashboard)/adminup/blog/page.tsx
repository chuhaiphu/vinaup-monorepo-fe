import AdminBlogPageContent from "@/components/mains/admin-blog-page-content/admin-blog-page-content";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default async function AdminBlogPage() {
  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminBlogPageContent />
    </Suspense>
  );
}