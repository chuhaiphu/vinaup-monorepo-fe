import AdminMenuDetailPageContent from "@/components/mains/admin-menu-detail-page-content/admin-menu-detail-page-content";
import { Suspense } from "react";

export default async function AdminMenuDetailPage({
  params
}: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <AdminMenuDetailPageContent params={params} />
    </Suspense>
  );
}
