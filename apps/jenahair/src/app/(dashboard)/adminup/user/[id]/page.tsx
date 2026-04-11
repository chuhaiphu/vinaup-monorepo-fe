import AdminUserDetailPageContent from "@/components/mains/admin-user-detail-page-content/admin-user-detail-page-content";
import { Suspense } from "react";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense>
      <AdminUserDetailPageContent params={params} />
    </Suspense>
  );
}

