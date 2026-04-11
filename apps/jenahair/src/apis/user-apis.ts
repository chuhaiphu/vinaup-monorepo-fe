import { ICreateUser, IUpdatePassword, IUserResponse } from "@/interfaces/user-interface";
import { apiPrivate } from "./_base";

export async function createUserApiPrivate(data: ICreateUser) {
  return apiPrivate<IUserResponse>('/admin/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllUsersApiPrivate() {
  return apiPrivate<IUserResponse[]>('/admin/users', {
    method: 'GET',
  });
}

export async function getUserByIdApiPrivate(id: string) {
  return apiPrivate<IUserResponse>(`/admin/users/${id}`, {
    method: 'GET',
  });
}

export async function updateUserApiPrivate(id: string, data: Partial<ICreateUser>) {
  return apiPrivate<IUserResponse>(`/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function updatePasswordApiPrivate(data: IUpdatePassword) {
  return apiPrivate<IUserResponse>(`/admin/users/${data.userId}`, {
    method: 'PUT',
    body: JSON.stringify({ password: data.newPassword }),
  });
}

export async function deleteUserApiPrivate(id: string) {
  return apiPrivate<void>(`/admin/users/${id}`, {
    method: 'DELETE',
  });
}
