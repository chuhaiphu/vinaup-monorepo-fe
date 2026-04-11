import {
  ICreateCustomTourRequest,
  ICustomTourRequestResponse,
} from '@/interfaces/custom-tour-request-interface';
import { apiPrivate, apiPublic } from './_base';

// ==================== PUBLIC ROUTES ====================

export async function createCustomTourRequestApiPublic(
  data: ICreateCustomTourRequest
) {
  return apiPublic<ICustomTourRequestResponse>('/custom-tour-requests', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== ADMIN ROUTES ====================

export async function getAllCustomTourRequestsAdminApiPrivate() {
  return apiPrivate<ICustomTourRequestResponse[]>(
    `/custom-tour-requests/admin/list`,
    {
      method: 'GET',
    }
  );
}

export async function getCustomTourRequestByIdApiPrivate(id: string) {
  return apiPrivate<ICustomTourRequestResponse>(
    `/custom-tour-requests/admin/${id}`,
    {
      method: 'GET',
    }
  );
}

export async function deleteCustomTourRequestApiPrivate(id: string) {
  return apiPrivate<void>(`/custom-tour-requests/admin/${id}`, {
    method: 'DELETE',
  });
}
