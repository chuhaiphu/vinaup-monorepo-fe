import {
  getAllPagesPublicActionPublic,
  getPageByEndpointActionPublic,
} from '@/actions/page-action';
import { getAppConfigActionPublic } from '@/actions/app-config-action';
import DynamicEndpointPageContent from '@/components/mains/landing-page/dynamic-endpoint-page-content/dynamic-endpoint-page-content';
import notFound from '../not-found';

export async function generateStaticParams() {
  const pagesResponse = await getAllPagesPublicActionPublic();

  if (!pagesResponse.success || !pagesResponse.data) {
    return [];
  }

  const pagesParams = pagesResponse.data.map((page) => ({
    endpoint: page.endpoint,
  }));

  return pagesParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}) {
  const { endpoint } = await params;
  const pageResponse = await getPageByEndpointActionPublic(endpoint);

  if (!pageResponse.success || !pageResponse.data) {
    return {
      title: 'Page Not Found | Jena Hair',
      description: 'The page you are looking for does not exist.',
    };
  }

  const page = pageResponse.data;
  const description = page.content
    ? page.content.replace(/<[^>]*>/g, '').substring(0, 160)
    : 'Khám phá thông tin và dịch vụ của Jena Hair';

  return {
    title: `${page.title} | Jena Hair`,
    description,
    openGraph: {
      title: page.title,
      description,
    },
  };
}

export default async function DynamicEndpointPage({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}) {
  'use cache';
  const { endpoint } = await params;

  const [pageResponse, allPagesResponse, appConfigResponse] = await Promise.all([
    getPageByEndpointActionPublic(endpoint),
    getAllPagesPublicActionPublic(),
    getAppConfigActionPublic(),
  ]);

  if (!pageResponse.success || !pageResponse.data) {
    notFound();
  }

  const allPages = allPagesResponse.success ? (allPagesResponse.data ?? []) : [];
  const page = pageResponse.data;
  const appConfig = appConfigResponse.success ? appConfigResponse.data : undefined;

  return (
    <DynamicEndpointPageContent
      page={page}
      allPages={allPages}
      appConfig={appConfig}
    />
  );
}
