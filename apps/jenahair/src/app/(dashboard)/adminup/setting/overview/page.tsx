import { getAppConfigActionPublic } from '@/actions/app-config-action';
import { Suspense } from 'react';
import AdminSettingOverviewPageContent from '@/components/mains/admin-settings/admin-setting-overview-page-content/admin-setting-overview-page-content';
import AdminSettingOverviewPageContentSkeleton from '@/components/mains/admin-settings/admin-setting-overview-page-content/admin-setting-overview-page-content-skeleton';

export default async function OverviewPage() {
  const appConfigPromise = getAppConfigActionPublic();

  return (
    <>
      <Suspense fallback={<AdminSettingOverviewPageContentSkeleton />}>
        <AdminSettingOverviewPageContent appConfigPromise={appConfigPromise} />
      </Suspense>
    </>
  );
}
