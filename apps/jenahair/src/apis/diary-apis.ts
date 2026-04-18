import { ICreateDiary, IDiaryResponse, IUpdateDiary } from "@/interfaces/diary-interface";
import { apiPrivate, apiPublic } from "./_base";

export interface DiaryFilterParams {
  visibility?: string;
}

function buildQueryString(filter?: DiaryFilterParams): string {
  if (!filter) return '';
  const params = new URLSearchParams();
  if (filter.visibility) params.append('visibility', filter.visibility);
  const query = params.toString();
  return query ? `?${query}` : '';
}

// ==================== PUBLIC ROUTES ====================

export async function getAllDiariesApiPublic(filter?: DiaryFilterParams) {
  const queryString = buildQueryString(filter);
  return apiPublic<IDiaryResponse[]>(`/diaries${queryString}`, {
    method: 'GET',
  });
}

export async function getDiaryByEndpointApiPublic(endpoint: string) {
  return apiPublic<IDiaryResponse>(`/diaries/${endpoint}`, {
    method: 'GET',
  });
}

export async function incrementDiaryViewApiPublic(id: string) {
  return apiPublic<{ recorded: boolean }>(`/diaries/${id}/view`, {
    method: 'POST',
  });
}

export async function toggleDiaryLikeApiPublic(id: string) {
  return apiPublic<{ liked: boolean }>(`/diaries/${id}/like`, {
    method: 'POST',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createDiaryApiPrivate(data: ICreateDiary) {
  return apiPrivate<IDiaryResponse>('/diaries/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllDiariesAdminApiPrivate(filter?: DiaryFilterParams) {
  const queryString = buildQueryString(filter);
  return apiPrivate<IDiaryResponse[]>(`/diaries/admin${queryString}`, {
    method: 'GET',
  });
}

export async function getDiaryByIdApiPrivate(id: string) {
  return apiPrivate<IDiaryResponse>(`/diaries/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateDiaryApiPrivate(id: string, data: IUpdateDiary) {
  return apiPrivate<IDiaryResponse>(`/diaries/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteDiaryApiPrivate(id: string) {
  return apiPrivate<void>(`/diaries/admin/${id}`, {
    method: 'DELETE',
  });
}
