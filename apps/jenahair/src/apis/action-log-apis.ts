import { IActionLog } from "@/interfaces/action-log-interface";
import { apiPrivate } from "./_base";

export interface ActionLogFilterParams {
  entityType?: string;
  userId?: string;
}

export async function getAllActionLogsApiPrivate(filter?: ActionLogFilterParams) {
  const params = new URLSearchParams();
  if (filter?.entityType) params.append('entityType', filter.entityType);
  if (filter?.userId) params.append('userId', filter.userId);
  const queryString = params.toString() ? `?${params.toString()}` : '';
  return apiPrivate<IActionLog[]>(`/action-logs/admin${queryString}`, {
    method: 'GET',
  });
}

export async function getActionLogsByEntityApiPrivate(entityType: string, entityId: string) {
  return apiPrivate<IActionLog[]>(`/action-logs/admin/${entityType}/${entityId}`, {
    method: 'GET',
  });
}
