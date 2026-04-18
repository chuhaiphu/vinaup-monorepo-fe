import {
  ICreateTourCategoryCustomTourRequest,
  ITourCategoryCustomTourRequestResponse
} from "@/interfaces/tour-category-custom-tour-request-interface";
import { apiPrivate } from "./_base";

export async function createTourCategoryCustomTourRequestApiPrivate(data: ICreateTourCategoryCustomTourRequest) {
  return apiPrivate<ITourCategoryCustomTourRequestResponse>('/tour-category-custom-tour-requests/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getTourCategoryCustomTourRequestByIdApiPrivate(id: string) {
  return apiPrivate<ITourCategoryCustomTourRequestResponse>(`/tour-category-custom-tour-requests/admin/${id}`, {
    method: 'GET',
  });
}

export async function getTourCategoryCustomTourRequestsByCustomTourRequestIdApiPrivate(customTourRequestId: string) {
  return apiPrivate<ITourCategoryCustomTourRequestResponse[]>(`/tour-category-custom-tour-requests/admin/request/${customTourRequestId}`, {
    method: 'GET',
  });
}

export async function getTourCategoryCustomTourRequestsByTourCategoryIdApiPrivate(tourCategoryId: string) {
  return apiPrivate<ITourCategoryCustomTourRequestResponse[]>(`/tour-category-custom-tour-requests/admin/category/${tourCategoryId}`, {
    method: 'GET',
  });
}

export async function getAllTourCategoryCustomTourRequestsApiPrivate() {
  return apiPrivate<ITourCategoryCustomTourRequestResponse[]>('/tour-category-custom-tour-requests/admin', {
    method: 'GET',
  });
}

export async function deleteTourCategoryCustomTourRequestApiPrivate(id: string) {
  return apiPrivate<void>(`/tour-category-custom-tour-requests/admin/${id}`, {
    method: 'DELETE',
  });
}

export async function deleteTourCategoryCustomTourRequestsByCustomTourRequestIdApiPrivate(customTourRequestId: string) {
  return apiPrivate<void>(`/tour-category-custom-tour-requests/admin/request/${customTourRequestId}`, {
    method: 'DELETE',
  });
}

export async function deleteTourCategoryCustomTourRequestsByTourCategoryIdApiPrivate(tourCategoryId: string) {
  return apiPrivate<void>(`/tour-category-custom-tour-requests/admin/category/${tourCategoryId}`, {
    method: 'DELETE',
  });
}
