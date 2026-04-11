import AdminSettingOverviewPageContent from "@/components/mains/admin-setting-overview-page-content/admin-setting-overview-page-content";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default async function OverviewPage() {
  return (
    <Suspense fallback={<Loader />}>
      <AdminSettingOverviewPageContent />
    </Suspense>
  );
}

