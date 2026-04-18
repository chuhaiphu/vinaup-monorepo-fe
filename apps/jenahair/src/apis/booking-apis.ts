import {
  ICreateBooking,
  IBookingResponse,
  IUpdateBooking,
} from '@/interfaces/booking-interface';
import { apiPrivate, apiPublic } from './_base';

export interface BookingFilterParams {
  status?: string;
}

function buildQueryString(filter?: BookingFilterParams): string {
  if (!filter) return '';
  const params = new URLSearchParams();
  if (filter.status) params.append('status', filter.status);
  const query = params.toString();
  return query ? `?${query}` : '';
}

// ==================== PUBLIC ROUTES ====================

export async function createBookingApiPublic(data: ICreateBooking) {
  return apiPublic<IBookingResponse>('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== ADMIN ROUTES ====================

export async function getAllBookingsAdminApiPrivate(filter?: BookingFilterParams) {
  const queryString = buildQueryString(filter);
  return apiPrivate<IBookingResponse[]>(`/bookings/admin${queryString}`, {
    method: 'GET',
  });
}

export async function getBookingByIdApiPrivate(id: string) {
  return apiPrivate<IBookingResponse>(`/bookings/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateBookingApiPrivate(id: string, data: IUpdateBooking) {
  return apiPrivate<IBookingResponse>(`/bookings/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBookingApiPrivate(id: string) {
  return apiPrivate<void>(`/bookings/admin/${id}`, {
    method: 'DELETE',
  });
}
