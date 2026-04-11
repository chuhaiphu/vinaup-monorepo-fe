import AdminBlogCategoryDetailPageContent from "@/components/mains/admin-blog-category-detail-page-content/admin-blog-category-detail-page-content";
import { Suspense } from "react";

export default async function AdminBlogCategoryDetailPage({
  params
}: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <AdminBlogCategoryDetailPageContent params={params} />
    </Suspense>
  );
}

