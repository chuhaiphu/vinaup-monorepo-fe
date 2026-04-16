import {
  ICreateDiaryCategoryDiary,
  IDiaryCategoryDiaryResponse,
  IUpdateDiaryCategoryDiary,
} from '@/interfaces/diary-category-diary-interface';
import { apiPrivate, apiPublic } from './_base';

// Public GET (no auth)
export async function getAllDiaryCategoryDiariesApiPublic() {
  return apiPublic<IDiaryCategoryDiaryResponse[]>('/diary-category-diaries', {
    method: 'GET',
  });
}

export async function getDiaryCategoryDiaryByIdApiPublic(id: string) {
  return apiPublic<IDiaryCategoryDiaryResponse>(`/diary-category-diaries/${id}`, {
    method: 'GET',
  });
}

export async function getDiaryCategoryDiariesByDiaryIdApiPublic(diaryId: string) {
  return apiPublic<IDiaryCategoryDiaryResponse[]>(
    `/diary-category-diaries/diary/${diaryId}`,
    { method: 'GET' }
  );
}

export async function getDiaryCategoryDiariesByDiaryCategoryIdApiPublic(
  diaryCategoryId: string
) {
  return apiPublic<IDiaryCategoryDiaryResponse[]>(
    `/diary-category-diaries/category/${diaryCategoryId}`,
    { method: 'GET' }
  );
}

// Admin (auth)
export async function createDiaryCategoryDiaryApiPrivate(
  data: ICreateDiaryCategoryDiary
) {
  return apiPrivate<IDiaryCategoryDiaryResponse>('/diary-category-diaries/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateDiaryCategoryDiaryApiPrivate(
  id: string,
  data: IUpdateDiaryCategoryDiary
) {
  return apiPrivate<IDiaryCategoryDiaryResponse>(`/diary-category-diaries/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteDiaryCategoryDiaryApiPrivate(id: string) {
  return apiPrivate<void>(`/diary-category-diaries/admin/${id}`, { method: 'DELETE' });
}

export async function deleteDiaryCategoryDiariesByDiaryIdApiPrivate(diaryId: string) {
  return apiPrivate<void>(`/diary-category-diaries/admin/diary/${diaryId}`, {
    method: 'DELETE',
  });
}

export async function deleteDiaryCategoryDiariesByDiaryCategoryIdApiPrivate(
  diaryCategoryId: string
) {
  return apiPrivate<void>(`/diary-category-diaries/admin/category/${diaryCategoryId}`, {
    method: 'DELETE',
  });
}
