import { ICreatePage, IPageResponse, IUpdatePage } from "@/interfaces/page-interface";
import { apiPrivate, apiPublic } from "./_base";

// ==================== PUBLIC ROUTES ====================

export async function getPageByEndpointApiPublic(endpoint: string) {
  return apiPublic<IPageResponse>(`/pages/${endpoint}`, {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createPageApiPrivate(data: ICreatePage) {
  return apiPrivate<IPageResponse>('/pages/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllPagesAdminApiPrivate() {
  return apiPrivate<IPageResponse[]>('/pages/admin/list', {
    method: 'GET',
  });
}

export async function getPageByIdApiPrivate(id: string) {
  return apiPrivate<IPageResponse>(`/pages/admin/${id}`, {
    method: 'GET',
  });
}

export async function updatePageApiPrivate(id: string, data: IUpdatePage) {
  return apiPrivate<IPageResponse>(`/pages/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deletePageApiPrivate(id: string) {
  return apiPrivate<void>(`/pages/admin/${id}`, {
    method: 'DELETE',
  });
}
