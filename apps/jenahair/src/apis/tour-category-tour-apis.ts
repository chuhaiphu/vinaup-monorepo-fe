import {
  ICreateTourCategoryTour,
  ITourCategoryTourResponse,
  IUpdateTourCategoryTour,
} from '@/interfaces/tour-category-tour-interface';
import { apiPrivate, apiPublic } from './_base';

// Public GET (no auth)
export async function getAllTourCategoryToursApiPublic() {
  return apiPublic<ITourCategoryTourResponse[]>('/tour-category-tours', {
    method: 'GET',
  });
}

export async function getTourCategoryTourByIdApiPublic(id: string) {
  return apiPublic<ITourCategoryTourResponse>(`/tour-category-tours/${id}`, {
    method: 'GET',
  });
}

export async function getTourCategoryToursByTourIdApiPublic(tourId: string) {
  return apiPublic<ITourCategoryTourResponse[]>(
    `/tour-category-tours/tour/${tourId}`,
    { method: 'GET' }
  );
}

export async function getTourCategoryToursByTourCategoryIdApiPublic(
  tourCategoryId: string
) {
  return apiPublic<ITourCategoryTourResponse[]>(
    `/tour-category-tours/category/${tourCategoryId}`,
    { method: 'GET' }
  );
}

// Admin (auth)
export async function createTourCategoryTourApiPrivate(
  data: ICreateTourCategoryTour
) {
  return apiPrivate<ITourCategoryTourResponse>('/tour-category-tours/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTourCategoryTourApiPrivate(
  id: string,
  data: IUpdateTourCategoryTour
) {
  return apiPrivate<ITourCategoryTourResponse>(`/tour-category-tours/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTourCategoryTourApiPrivate(id: string) {
  return apiPrivate<void>(`/tour-category-tours/admin/${id}`, { method: 'DELETE' });
}

export async function deleteTourCategoryToursByTourIdApiPrivate(tourId: string) {
  return apiPrivate<void>(`/tour-category-tours/admin/tour/${tourId}`, {
    method: 'DELETE',
  });
}

export async function deleteTourCategoryToursByTourCategoryIdApiPrivate(
  tourCategoryId: string
) {
  return apiPrivate<void>(`/tour-category-tours/admin/category/${tourCategoryId}`, {
    method: 'DELETE',
  });
}
