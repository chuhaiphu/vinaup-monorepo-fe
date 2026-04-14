import { getAppConfigActionPublic } from '@/actions/app-config-action';
import { Suspense } from 'react';
import AdminSettingSeoPageContent from '@/components/mains/admin-settings/admin-setting-seo-page-content/admin-setting-seo-page-content';
import AdminSettingSeoPageContentSkeleton from '@/components/mains/admin-settings/admin-setting-seo-page-content/admin-setting-seo-page-content-skeleton';

export default async function SeoPage() {
  const appConfigPromise = getAppConfigActionPublic();

  return (
    <>
      <Suspense fallback={<AdminSettingSeoPageContentSkeleton />}>
        <AdminSettingSeoPageContent appConfigPromise={appConfigPromise} />
      </Suspense>
    </>
  );
}
