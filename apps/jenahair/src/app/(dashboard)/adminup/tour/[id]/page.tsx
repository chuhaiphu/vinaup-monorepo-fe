import AdminTourDetailPageContent from "@/components/mains/admin-tour-detail-page-content/admin-tour-detail-page-content";
import { Suspense } from "react";

export default async function AdminTourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense>
      <AdminTourDetailPageContent params={params} />
    </Suspense>
  );
}