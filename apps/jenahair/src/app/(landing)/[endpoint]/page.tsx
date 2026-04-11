import DynamicPageContent from "@/components/mains/dynamic-page-content/dynamic-page-content";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default async function DynamicEndpointPage({
  params,
  searchParams,
}: {
  params: Promise<{ endpoint: string }>;
  searchParams: Promise<{ q?: string; type?: string; destinations?: string }>;
}) {
  return (
    <Suspense fallback={<Loader size={64} />}>
      <DynamicPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

