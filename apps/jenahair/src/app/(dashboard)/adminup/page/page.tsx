import AdminPagePageContent from "@/components/mains/admin-page-page-content/admin-page-page-content";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default async function AdminPagePage() {
  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminPagePageContent />
    </Suspense>
  );
}

