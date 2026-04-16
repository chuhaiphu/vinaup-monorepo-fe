'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateDiaryCategory,
  IDiaryCategoryResponse,
  IUpdateDiaryCategory,
} from '@/interfaces/diary-category-interface';
import { executeApi } from '@/actions/_base';
import {
  createDiaryCategoryApiPrivate,
  getDiaryCategoryByIdApiPrivate,
  getDiaryCategoryByEndpointApiPublic,
  getAllDiaryCategoriesApiPublic,
  getAllDiaryCategoriesAdminApiPrivate,
  getAvailableSortOrdersApiPrivate,
  updateDiaryCategoryApiPrivate,
  deleteDiaryCategoryApiPrivate,
} from '@/apis/diary-category-apis';

export async function createDiaryCategoryActionPrivate(
  input: ICreateDiaryCategory
): Promise<ActionResponse<IDiaryCategoryResponse>> {
  const result = await executeApi(async () => createDiaryCategoryApiPrivate(input));
  if (result.success) {
    updateTag('diary-categories');
  }
  return result;
}

export async function getDiaryCategoryByIdActionPrivate(
  id: string
): Promise<ActionResponse<IDiaryCategoryResponse>> {
  return executeApi(async () => getDiaryCategoryByIdApiPrivate(id));
}

export async function getDiaryCategoryByEndpointActionPublic(
  endpoint: string
): Promise<ActionResponse<IDiaryCategoryResponse>> {
  'use cache';
  cacheLife('hours');
  cacheTag('diary-categories', `diary-category:${endpoint}`);
  return executeApi(async () => getDiaryCategoryByEndpointApiPublic(endpoint));
}

export async function getAllDiaryCategoriesActionPrivate(): Promise<
  ActionResponse<IDiaryCategoryResponse[]>
> {
  return executeApi(async () => getAllDiaryCategoriesAdminApiPrivate());
}

export async function getAllDiaryCategoriesActionPublic(): Promise<
  ActionResponse<IDiaryCategoryResponse[]>
> {
  'use cache';
  cacheLife('hours');
  cacheTag('diary-categories');
  return executeApi(async () => getAllDiaryCategoriesApiPublic());
}

export async function getAvailableSortOrdersActionPrivate(
  parentId: string
): Promise<ActionResponse<number[]>> {
  return executeApi(async () => getAvailableSortOrdersApiPrivate(parentId));
}

export async function updateDiaryCategoryActionPrivate(
  id: string,
  input: IUpdateDiaryCategory
): Promise<ActionResponse<IDiaryCategoryResponse>> {
  const result = await executeApi(async () =>
    updateDiaryCategoryApiPrivate(id, input)
  );
  if (result.success) {
    updateTag('diary-categories');
    if (input.endpoint) {
      updateTag(`diary-category:${input.endpoint}`);
    }
  }
  return result;
}

export async function deleteDiaryCategoryActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteDiaryCategoryApiPrivate(id));
  if (result.success) {
    updateTag('diary-categories');
  }
  return result;
}
