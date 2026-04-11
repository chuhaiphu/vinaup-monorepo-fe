import { getAppConfigActionPublic } from '@/actions/app-config-action';
import AdminSettingOverviewPageContentContainer from "./admin-setting-overview-page-content-container/admin-setting-overview-page-content-container";

export default async function AdminSettingOverviewPageContent() {
  const appConfigResponse = await getAppConfigActionPublic();
  const appConfig = appConfigResponse.data;

  return (
    <AdminSettingOverviewPageContentContainer appConfig={appConfig} />
  );
}
