import { ICreateUser, IUpdatePassword, IUserResponse } from "@/interfaces/user-interface";
import { apiPrivate } from "./_base";

export async function createUserApiPrivate(data: ICreateUser) {
  return apiPrivate<IUserResponse>('/users/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllUsersApiPrivate() {
  return apiPrivate<IUserResponse[]>('/users/admin', {
    method: 'GET',
  });
}

export async function getUserByIdApiPrivate(id: string) {
  return apiPrivate<IUserResponse>(`/users/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateUserApiPrivate(id: string, data: Partial<ICreateUser>) {
  return apiPrivate<IUserResponse>(`/users/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function updatePasswordApiPrivate(data: IUpdatePassword) {
  return apiPrivate<IUserResponse>(`/users/admin/${data.userId}`, {
    method: 'PUT',
    body: JSON.stringify({ password: data.newPassword }),
  });
}

export async function deleteUserApiPrivate(id: string) {
  return apiPrivate<void>(`/users/admin/${id}`, {
    method: 'DELETE',
  });
}
