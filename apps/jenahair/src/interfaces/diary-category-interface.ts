export interface ICreateDiaryCategory {
  title: string;
  endpoint: string;
}

export interface IUpdateDiaryCategory extends Partial<ICreateDiaryCategory> {
  title?: string;
  description?: string;
  parentId?: string;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  videoPosition?: string;
  mainImageUrl?: string;
  endpoint?: string;
  sortOrder?: number;
}

export interface IDiaryCategoryResponse {
  id: string;
  title: string;
  description: string | null;
  parent?: IDiaryCategoryResponse | null;
  children?: IDiaryCategoryResponse[];
  videoUrl: string | null;
  videoThumbnailUrl: string | null;
  videoPosition: string;
  mainImageUrl: string | null;
  endpoint: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
