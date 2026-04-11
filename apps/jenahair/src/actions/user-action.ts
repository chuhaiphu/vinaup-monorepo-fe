'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { ICreateUser, IUpdatePassword, IUserResponse } from '@/interfaces/user-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createUserApiPrivate,
  getUserByIdApiPrivate,
  updatePasswordApiPrivate,
  getAllUsersApiPrivate,
} from '@/apis/user-apis';

export async function createUserActionPrivate(
  input: ICreateUser
): Promise<ActionResponse<IUserResponse>> {
  const result = await executeApi(
    async () => createUserApiPrivate(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getUserByIdActionPrivate(
  id: string
): Promise<IUserResponse | undefined> {
  const result = await executeApi(
    async () => getUserByIdApiPrivate(id)
  );
  return result.data;
}

export async function getAllUsersActionPrivate(): Promise<IUserResponse[] | undefined> {
  const result = await executeApi(
    async () => getAllUsersApiPrivate()
  );
  return result.data;
}

export async function updateUserPasswordActionPrivate(
  input: IUpdatePassword
): Promise<ActionResponse<IUserResponse>> {
  const result = await executeApi(
    async () => updatePasswordApiPrivate(input)
  );
  revalidatePath('/adminup/user/[id]', 'page');
  return result;
}