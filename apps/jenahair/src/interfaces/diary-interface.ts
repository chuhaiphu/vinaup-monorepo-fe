import { IUserResponse } from "./user-interface";
import { IDiaryCategoryDiaryResponse } from "./diary-category-diary-interface";

export interface ICreateDiary {
  title: string;
  destinations: string[];
  endpoint: string;
  userId: string;
}

export interface IUpdateDiary extends Partial<ICreateDiary> {
  endpoint?: string;
  country?: string;
  description?: string;
  content?: string;
  visibility?: string;
  sortOrder?: number;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  videoPosition?: string;
  mainImageUrl?: string;
  additionalImageUrls?: string[];
  additionalImagesPosition?: string;
  categoryId?: string;
}

export interface IDiaryResponse {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  country: string;
  destinations: string[];
  endpoint: string;
  visibility: string;
  sortOrder: number;
  videoUrl: string | null;
  videoThumbnailUrl: string | null;
  videoPosition: string | null;
  mainImageUrl: string | null;
  additionalImageUrls: string[];
  additionalImagesPosition: string | null;
  likes: number;
  views: number;
  createdBy: IUserResponse | null;
  createdAt: Date;
  updatedAt: Date;
  diaryCategoryDiaries: IDiaryCategoryDiaryResponse[];
}
