import { redirect } from 'next/navigation';
import { getAppConfigActionPublic } from '@/actions/app-config-action';
import MaintenancePageContent from '@/components/mains/maintenance-page-content/maintenance-page-content';

export default async function MaintenancePage() {
  const appConfigResponse = await getAppConfigActionPublic();
  const isMaintenanceMode = appConfigResponse.success ? appConfigResponse.data?.maintenanceMode : false;

  if (!isMaintenanceMode) {
    redirect('/');
  }
  return (
    <MaintenancePageContent />
  );
}