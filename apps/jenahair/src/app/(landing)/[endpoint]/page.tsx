import LandingPageContent from '@/components/mains/landing-page/landing-page-content';
import { Loader } from '@mantine/core';
import { Suspense } from 'react';

export default async function DynamicEndpointPage({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}) {
  return (
    <Suspense fallback={<Loader size={64} />}>
      <LandingPageContent params={params} />
    </Suspense>
  );
}
