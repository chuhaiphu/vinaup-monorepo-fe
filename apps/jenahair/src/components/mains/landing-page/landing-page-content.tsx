import { notFound } from 'next/navigation';
import { getPageByEndpointActionPublic, getAllPagesPublicActionPublic } from '@/actions/page-action';
import LandingPageDetail from '@/components/mains/landing-page/landing-page-detail/landing-page-detail';

export default async function LandingPageContent({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}) {
  const { endpoint } = await params;

  const [pageResponse, allPagesResponse] = await Promise.all([
    getPageByEndpointActionPublic(endpoint),
    getAllPagesPublicActionPublic(),
  ]);

  if (!pageResponse.success || !pageResponse.data) {
    notFound();
  }

  const allPages = allPagesResponse.success ? (allPagesResponse.data ?? []) : [];

  return <LandingPageDetail page={pageResponse.data} allPages={allPages} />;
}
