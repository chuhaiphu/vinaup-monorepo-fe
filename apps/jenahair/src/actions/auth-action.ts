'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { IUserResponse } from '@/interfaces/user-interface';
import { executeApi } from '@/actions/_base';
import { localSignInApiPrivate, logoutApiPrivate, getMeApiPrivate, AuthRequest, AuthResponse, resetPasswordForUserApiPrivate, resetMyPasswordApiPrivate } from '@/apis/auth-apis';
import { revalidatePath } from 'next/cache';

export async function localSignInActionPrivate(
  credentials: AuthRequest
): Promise<ActionResponse<AuthResponse>> {
  const result = await executeApi(
    async () => localSignInApiPrivate(credentials)
  );
  if (result.success) {
    revalidatePath('/', 'layout');
  }
  return result;
}

export async function logoutActionPrivate(): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => logoutApiPrivate()
  );
  if (result.success) {
    revalidatePath('/', 'layout');
  }
  return result;
}

export async function getMeActionPrivate(): Promise<ActionResponse<IUserResponse>> {
  return executeApi(
    async () => getMeApiPrivate()
  );
}

export async function resetPasswordForUserActionPrivate(
  targetUserId: string
): Promise<ActionResponse<void>> {
  return executeApi(
    async () => resetPasswordForUserApiPrivate(targetUserId)
  );
}

export async function resetMyPasswordActionPrivate(): Promise<ActionResponse<void>> {
  return executeApi(
    async () => resetMyPasswordApiPrivate()
  );
}
