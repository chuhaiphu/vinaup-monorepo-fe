import {
  ICreateTourCategory,
  ITourCategoryResponse,
  IUpdateTourCategory,
} from '@/interfaces/tour-category-interface';
import { apiPrivate, apiPublic } from './_base';

// ==================== PUBLIC ROUTES ====================

export async function getAllTourCategoriesApiPublic() {
  return apiPublic<ITourCategoryResponse[]>('/tour-categories', {
    method: 'GET',
  });
}

export async function getTourCategoryByEndpointApiPublic(endpoint: string) {
  return apiPublic<ITourCategoryResponse>(`/tour-categories/${endpoint}`, {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createTourCategoryApiPrivate(data: ICreateTourCategory) {
  return apiPrivate<ITourCategoryResponse>('/tour-categories/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAvailableSortOrdersApiPrivate(parentId: string) {
  return apiPrivate<number[]>(
    `/tour-categories/admin/available-sort-orders/${parentId}`,
    {
      method: 'GET',
    }
  );
}

export async function getTourCategoryByIdApiPrivate(id: string) {
  return apiPrivate<ITourCategoryResponse>(`/tour-categories/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateTourCategoryApiPrivate(
  id: string,
  data: IUpdateTourCategory
) {
  return apiPrivate<ITourCategoryResponse>(`/tour-categories/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTourCategoryApiPrivate(id: string) {
  return apiPrivate<void>(`/tour-categories/admin/${id}`, {
    method: 'DELETE',
  });
}
