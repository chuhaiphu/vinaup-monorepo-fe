import AdminUserPageContent from "@/components/mains/admin-user-page-content/admin-user-page-content";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default async function AdminUserPage() {
  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminUserPageContent />
    </Suspense>
  );
}
