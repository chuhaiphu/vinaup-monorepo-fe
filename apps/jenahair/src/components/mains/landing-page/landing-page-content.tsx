import { notFound } from 'next/navigation';
import { getPageByEndpointActionPublic } from '@/actions/page-action';
import LandingPageDetail from '@/components/mains/landing-page/landing-page-detail/landing-page-detail';

export default async function LandingPageContent({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}) {
  const { endpoint } = await params;

  const pageResponse = await getPageByEndpointActionPublic(endpoint);
  if (pageResponse.success && pageResponse.data) {
    return <LandingPageDetail page={pageResponse.data} />;
  }

  notFound();
}
