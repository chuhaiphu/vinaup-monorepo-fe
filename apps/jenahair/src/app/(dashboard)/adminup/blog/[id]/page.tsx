import AdminBlogDetailPageContent from "@/components/mains/admin-blog-detail-page-content/admin-blog-detail-page-content";
import { Suspense } from "react";

export default async function AdminBlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense>
      <AdminBlogDetailPageContent params={params} />
    </Suspense>
  );
}

