import AdminPageDetailPageContent from "@/components/mains/admin-page-detail-page-content/admin-page-detail-page-content";
import { Suspense } from "react";

export default async function AdminPageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense>
      <AdminPageDetailPageContent params={params} />
    </Suspense>
  );
}

