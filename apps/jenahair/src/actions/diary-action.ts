'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateDiary,
  IDiaryResponse,
  IUpdateDiary,
} from '@/interfaces/diary-interface';
import { executeApi } from '@/actions/_base';
import {
  createDiaryApiPrivate,
  getDiaryByIdApiPrivate,
  getDiaryByEndpointApiPublic,
  getAllDiariesAdminApiPrivate,
  getAllDiariesApiPublic,
  updateDiaryApiPrivate,
  deleteDiaryApiPrivate,
  incrementDiaryViewApiPublic,
  toggleDiaryLikeApiPublic,
} from '@/apis/diary-apis';

export async function createDiaryActionPrivate(
  input: ICreateDiary
): Promise<ActionResponse<IDiaryResponse>> {
  const result = await executeApi(async () => createDiaryApiPrivate(input));
  if (result.success) {
    updateTag('diaries');
  }
  return result;
}

export async function getDiaryByIdActionPrivate(
  id: string
): Promise<ActionResponse<IDiaryResponse>> {
  return executeApi(async () => getDiaryByIdApiPrivate(id));
}

export async function getDiaryByEndpointActionPublic(
  endpoint: string
): Promise<ActionResponse<IDiaryResponse>> {
  'use cache';
  cacheLife('hours');
  cacheTag('diaries', `diary:${endpoint}`);
  return executeApi(async () => getDiaryByEndpointApiPublic(endpoint));
}

export async function getAllDiariesActionPrivate(): Promise<
  ActionResponse<IDiaryResponse[]>
> {
  return executeApi(async () => getAllDiariesAdminApiPrivate());
}

export async function getAllDiariesActionPublic(): Promise<
  ActionResponse<IDiaryResponse[]>
> {
  'use cache';
  cacheLife('hours');
  cacheTag('diaries');
  return executeApi(async () => getAllDiariesApiPublic({ visibility: 'public' }));
}

export async function updateDiaryActionPrivate(
  id: string,
  input: IUpdateDiary
): Promise<ActionResponse<IDiaryResponse>> {
  const result = await executeApi(async () => updateDiaryApiPrivate(id, input));
  if (result.success) {
    updateTag('diaries');
    if (input.endpoint) {
      updateTag(`diary:${input.endpoint}`);
    }
  }
  return result;
}

export async function deleteDiaryActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteDiaryApiPrivate(id));
  if (result.success) {
    updateTag('diaries');
  }
  return result;
}

export async function incrementDiaryViewActionPublic(
  diaryId: string
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(async () => incrementDiaryViewApiPublic(diaryId));
  if (result.success) {
    updateTag('diaries');
  }
  return {
    success: result.success,
    data: result.data?.recorded ?? false,
    error: result.error,
  };
}

export async function incrementDiaryLikeActionPublic(
  diaryId: string
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(async () => toggleDiaryLikeApiPublic(diaryId));
  if (result.success) {
    updateTag('diaries');
  }
  return {
    success: result.success,
    data: result.data?.liked ?? false,
    error: result.error,
  };
}
