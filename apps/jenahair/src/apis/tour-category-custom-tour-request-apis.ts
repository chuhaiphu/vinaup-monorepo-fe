import {
  ICreateTourCategoryCustomTourRequest,
  ITourCategoryCustomTourRequestResponse
} from "@/interfaces/tour-category-custom-tour-request-interface";
import { apiPrivate } from "./_base";

export async function createTourCategoryCustomTourRequestApiPrivate(data: ICreateTourCategoryCustomTourRequest) {
  return apiPrivate<ITourCategoryCustomTourRequestResponse>('/admin/tour-category-custom-tour-requests', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getTourCategoryCustomTourRequestByIdApiPrivate(id: string) {
  return apiPrivate<ITourCategoryCustomTourRequestResponse>(`/admin/tour-category-custom-tour-requests/${id}`, {
    method: 'GET',
  });
}

export async function getTourCategoryCustomTourRequestsByCustomTourRequestIdApiPrivate(customTourRequestId: string) {
  return apiPrivate<ITourCategoryCustomTourRequestResponse[]>(`/admin/tour-category-custom-tour-requests/request/${customTourRequestId}`, {
    method: 'GET',
  });
}

export async function getTourCategoryCustomTourRequestsByTourCategoryIdApiPrivate(tourCategoryId: string) {
  return apiPrivate<ITourCategoryCustomTourRequestResponse[]>(`/admin/tour-category-custom-tour-requests/category/${tourCategoryId}`, {
    method: 'GET',
  });
}

export async function getAllTourCategoryCustomTourRequestsApiPrivate() {
  return apiPrivate<ITourCategoryCustomTourRequestResponse[]>('/admin/tour-category-custom-tour-requests', {
    method: 'GET',
  });
}

export async function deleteTourCategoryCustomTourRequestApiPrivate(id: string) {
  return apiPrivate<void>(`/admin/tour-category-custom-tour-requests/${id}`, {
    method: 'DELETE',
  });
}

export async function deleteTourCategoryCustomTourRequestsByCustomTourRequestIdApiPrivate(customTourRequestId: string) {
  return apiPrivate<void>(`/admin/tour-category-custom-tour-requests/request/${customTourRequestId}`, {
    method: 'DELETE',
  });
}

export async function deleteTourCategoryCustomTourRequestsByTourCategoryIdApiPrivate(tourCategoryId: string) {
  return apiPrivate<void>(`/admin/tour-category-custom-tour-requests/category/${tourCategoryId}`, {
    method: 'DELETE',
  });
}
