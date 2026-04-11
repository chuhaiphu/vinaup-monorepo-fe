import AdminTourPageContent from "@/components/mains/admin-tour-page-content/admin-tour-page-content";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default async function AdminTourPage() {
  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminTourPageContent />
    </Suspense>
  );
}