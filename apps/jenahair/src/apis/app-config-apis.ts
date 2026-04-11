import { IAppConfigResponse, IUpdateAppConfig } from "@/interfaces/app-config-interface";
import { apiPrivate, apiPublic } from "./_base";

// ==================== PUBLIC ROUTES ====================

export async function getAppConfigApiPublic() {
  return apiPublic<IAppConfigResponse>('/app-config', {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function getAppConfigAdminApiPrivate() {
  return apiPrivate<IAppConfigResponse>('/app-config/admin', {
    method: 'GET',
  });
}

export async function updateAppConfigApiPrivate(data: IUpdateAppConfig) {
  return apiPrivate<IAppConfigResponse>('/app-config/admin', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
