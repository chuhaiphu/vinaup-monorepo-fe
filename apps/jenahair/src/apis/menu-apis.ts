import { ICreateMenu, IMenuResponse, IUpdateMenu } from "@/interfaces/menu-interface";
import { apiPrivate, apiPublic } from "./_base";

// ==================== PUBLIC ROUTES ====================

export async function getRootMenusApiPublic() {
  return apiPublic<IMenuResponse[]>('/menus', {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createMenuApiPrivate(data: ICreateMenu) {
  return apiPrivate<IMenuResponse>('/menus/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllMenusApiPublic() {
  return apiPublic<IMenuResponse[]>('/menus/list', {
    method: 'GET',
  });
}

export async function getAllMenusAdminApiPrivate() {
  return apiPrivate<IMenuResponse[]>('/menus/admin/list', {
    method: 'GET',
  });
}

export async function getAvailableSortOrdersApiPrivate(parentId: string) {
  return apiPrivate<number[]>(`/menus/admin/available-sort-orders/${parentId}`, {
    method: 'GET',
  });
}

export async function getMenuByIdApiPrivate(id: string) {
  return apiPrivate<IMenuResponse>(`/menus/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateMenuApiPrivate(id: string, data: IUpdateMenu) {
  return apiPrivate<IMenuResponse>(`/menus/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteMenuApiPrivate(id: string) {
  return apiPrivate<void>(`/menus/admin/${id}`, {
    method: 'DELETE',
  });
}
