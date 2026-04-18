import { ICreateTour, ITourResponse, IUpdateTour } from "@/interfaces/tour-interface";
import { apiPrivate, apiPublic } from "./_base";

export interface TourFilterParams {
  visibility?: string;
  pinnedToHome?: boolean;
}

function buildQueryString(filter?: TourFilterParams): string {
  if (!filter) return '';
  const params = new URLSearchParams();
  if (filter.visibility) params.append('visibility', filter.visibility);
  if (filter.pinnedToHome !== undefined) params.append('pinnedToHome', String(filter.pinnedToHome));
  const query = params.toString();
  return query ? `?${query}` : '';
}

// ==================== PUBLIC ROUTES ====================

export async function getAllToursApiPublic(filter?: TourFilterParams) {
  const queryString = buildQueryString(filter);
  return apiPublic<ITourResponse[]>(`/tours${queryString}`, {
    method: 'GET',
  });
}

export async function getTourByEndpointApiPublic(endpoint: string) {
  return apiPublic<ITourResponse>(`/tours/${endpoint}`, {
    method: 'GET',
  });
}

export async function incrementTourViewApiPublic(id: string) {
  return apiPublic<{ recorded: boolean }>(`/tours/${id}/view`, {
    method: 'POST',
  });
}

export async function toggleTourLikeApiPublic(id: string) {
  return apiPublic<{ liked: boolean }>(`/tours/${id}/like`, {
    method: 'POST',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createTourApiPrivate(data: ICreateTour) {
  return apiPrivate<ITourResponse>('/tours/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllToursAdminApiPrivate(filter?: TourFilterParams) {
  const queryString = buildQueryString(filter);
  return apiPrivate<ITourResponse[]>(`/tours/admin${queryString}`, {
    method: 'GET',
  });
}

export async function getTourByIdApiPrivate(id: string) {
  return apiPrivate<ITourResponse>(`/tours/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateTourApiPrivate(id: string, data: IUpdateTour) {
  return apiPrivate<ITourResponse>(`/tours/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTourApiPrivate(id: string) {
  return apiPrivate<void>(`/tours/admin/${id}`, {
    method: 'DELETE',
  });
}
