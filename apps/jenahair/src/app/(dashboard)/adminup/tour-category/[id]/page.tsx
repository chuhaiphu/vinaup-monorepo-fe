import AdminTourCategoryDetailPageContent from "@/components/mains/admin-tour-category-detail-page-content/admin-tour-category-detail-page-content";
import { Suspense } from "react";

export default async function AdminTourCategoryDetailPage({
  params
}: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <AdminTourCategoryDetailPageContent params={params} />
    </Suspense>
  );
}
