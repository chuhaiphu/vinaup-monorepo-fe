import {
  ICreateCustomerContact,
  ICustomerContactResponse,
} from '@/interfaces/customer-contact-interface';
import { apiPrivate, apiPublic } from './_base';

// ==================== PUBLIC ROUTES ====================

export async function createCustomerContactApiPublic(data: ICreateCustomerContact) {
  return apiPublic<ICustomerContactResponse>('/contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== ADMIN ROUTES ====================
export async function getAllCustomerContactsAdminApiPrivate() {
  return apiPrivate<ICustomerContactResponse[]>(`/contacts/admin/list`, {
    method: 'GET',
  });
}

export async function getCustomerContactByIdApiPrivate(id: string) {
  return apiPrivate<ICustomerContactResponse>(`/contacts/admin/${id}`, {
    method: 'GET',
  });
}

export async function deleteCustomerContactApiPrivate(id: string) {
  return apiPrivate<void>(`/contacts/admin/${id}`, {
    method: 'DELETE',
  });
}
