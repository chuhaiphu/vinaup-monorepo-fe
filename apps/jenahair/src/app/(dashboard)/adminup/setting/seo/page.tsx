import AdminSettingSeoPageContent from "@/components/mains/admin-setting-seo-page-content/admin-setting-seo-page-content";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default async function SeoPage() {

  return (
    <Suspense fallback={<Loader />}>
      <AdminSettingSeoPageContent />
    </Suspense>
  );
}

