'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateDiaryCategoryDiary,
  IDiaryCategoryDiaryResponse,
  IUpdateDiaryCategoryDiary,
} from '@/interfaces/diary-category-diary-interface';
import { cacheLife, cacheTag, updateTag } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createDiaryCategoryDiaryApiPrivate,
  getDiaryCategoryDiaryByIdApiPublic,
  getDiaryCategoryDiariesByDiaryIdApiPublic,
  getDiaryCategoryDiariesByDiaryCategoryIdApiPublic,
  getAllDiaryCategoryDiariesApiPublic,
  updateDiaryCategoryDiaryApiPrivate,
  deleteDiaryCategoryDiaryApiPrivate,
  deleteDiaryCategoryDiariesByDiaryIdApiPrivate,
  deleteDiaryCategoryDiariesByDiaryCategoryIdApiPrivate,
} from '@/apis/diary-category-diary-apis';

function invalidateDiaryCategoryDiaryTags(args?: {
  diaryId?: string;
  diaryCategoryId?: string;
}) {
  updateTag('diaries');
  updateTag('diary-categories');
  updateTag('diary-category-diaries');

  if (args?.diaryId) {
    updateTag(`diary-category-diaries:diary:${args.diaryId}`);
  }

  if (args?.diaryCategoryId) {
    updateTag(`diary-category-diaries:category:${args.diaryCategoryId}`);
  }
}

export async function createDiaryCategoryDiaryActionPrivate(
  input: ICreateDiaryCategoryDiary
): Promise<ActionResponse<IDiaryCategoryDiaryResponse>> {
  const result = await executeApi(async () =>
    createDiaryCategoryDiaryApiPrivate(input)
  );
  if (result.success) {
    invalidateDiaryCategoryDiaryTags({
      diaryId: input.diaryId,
      diaryCategoryId: input.diaryCategoryId,
    });
  }
  return result;
}

export async function getDiaryCategoryDiaryByIdActionPublic(
  id: string
): Promise<ActionResponse<IDiaryCategoryDiaryResponse>> {
  return executeApi(async () => getDiaryCategoryDiaryByIdApiPublic(id));
}

export async function getDiaryCategoryDiariesByDiaryIdActionPublic(
  diaryId: string
): Promise<ActionResponse<IDiaryCategoryDiaryResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('diary-category-diaries', `diary-category-diaries:diary:${diaryId}`);
  return executeApi(async () => getDiaryCategoryDiariesByDiaryIdApiPublic(diaryId));
}

export async function getDiaryCategoryDiariesByDiaryCategoryIdActionPublic(
  diaryCategoryId: string
): Promise<ActionResponse<IDiaryCategoryDiaryResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag(
    'diary-category-diaries',
    `diary-category-diaries:category:${diaryCategoryId}`
  );
  return executeApi(async () =>
    getDiaryCategoryDiariesByDiaryCategoryIdApiPublic(diaryCategoryId)
  );
}

export async function getAllDiaryCategoryDiariesActionPublic(): Promise<
  ActionResponse<IDiaryCategoryDiaryResponse[]>
> {
  'use cache';
  cacheLife('default');
  cacheTag('diary-category-diaries');
  return executeApi(async () => getAllDiaryCategoryDiariesApiPublic());
}

export async function updateDiaryCategoryDiaryActionPrivate(
  id: string,
  input: IUpdateDiaryCategoryDiary
): Promise<ActionResponse<IDiaryCategoryDiaryResponse>> {
  const result = await executeApi(async () =>
    updateDiaryCategoryDiaryApiPrivate(id, input)
  );
  if (result.success) {
    invalidateDiaryCategoryDiaryTags();
  }
  return result;
}

export async function deleteDiaryCategoryDiaryActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () =>
    deleteDiaryCategoryDiaryApiPrivate(id)
  );
  if (result.success) {
    invalidateDiaryCategoryDiaryTags();
  }
  return result;
}

export async function deleteDiaryCategoryDiariesByDiaryIdActionPrivate(
  diaryId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () =>
    deleteDiaryCategoryDiariesByDiaryIdApiPrivate(diaryId)
  );
  if (result.success) {
    invalidateDiaryCategoryDiaryTags({ diaryId });
  }
  return result;
}

export async function deleteDiaryCategoryDiariesByDiaryCategoryIdActionPrivate(
  diaryCategoryId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () =>
    deleteDiaryCategoryDiariesByDiaryCategoryIdApiPrivate(diaryCategoryId)
  );
  if (result.success) {
    invalidateDiaryCategoryDiaryTags({ diaryCategoryId });
  }
  return result;
}
