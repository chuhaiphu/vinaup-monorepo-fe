import { redirect } from 'next/navigation';
import { getAppConfigActionPublic } from '@/actions/app-config-action';
import { getMeActionPrivate } from '@/actions/auth-action';

export async function MaintenanceGuard() {
  const appConfigResponse = await getAppConfigActionPublic();
  const isMaintenanceMode = appConfigResponse.success ? appConfigResponse.data?.maintenanceMode : false;

  if (isMaintenanceMode) {
    const meResult = await getMeActionPrivate();
    const userRole = meResult.success ? meResult.data?.role : null;
    const isAdmin = userRole === 'supadmin' || userRole === 'admin';

    if (!isAdmin) {
      redirect('/maintenance');
    }
  }

  return null;
}
