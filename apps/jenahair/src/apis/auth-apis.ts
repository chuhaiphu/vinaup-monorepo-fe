import { IUserResponse } from "@/interfaces/user-interface";
import { apiPrivate } from "./_base";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: IUserResponse;
}

export async function localSignInApiPrivate(data: AuthRequest) {
  return apiPrivate<AuthResponse>('/auth/local', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function logoutApiPrivate() {
  return apiPrivate<void>('/auth/logout', {
    method: 'POST',
  });
}

export async function getMeApiPrivate() {
  return apiPrivate<IUserResponse>('/auth/me', {
    method: 'GET',
  });
}

export async function resetPasswordForUserApiPrivate(targetUserId: string) {
  return apiPrivate<void>(`/auth/reset-password/${targetUserId}`, {
    method: 'POST',
  });
}

export async function resetMyPasswordApiPrivate() {
  return apiPrivate<void>('/auth/reset-password', {
    method: 'POST',
  });
}
