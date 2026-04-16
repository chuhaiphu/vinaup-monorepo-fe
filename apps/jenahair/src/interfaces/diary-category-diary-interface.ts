import { IDiaryResponse } from "./diary-interface";
import { IDiaryCategoryResponse } from "./diary-category-interface";

export interface ICreateDiaryCategoryDiary {
  diaryCategoryId: string;
  diaryId: string;
  sortOrder?: number;
}

export interface IUpdateDiaryCategoryDiary {
  sortOrder?: number;
}

export interface IDiaryCategoryDiaryResponse {
  id: string;
  diaryCategoryId: string;
  diaryId: string;
  sortOrder: number;
  diaryCategory?: IDiaryCategoryResponse;
  diary?: IDiaryResponse;
}
