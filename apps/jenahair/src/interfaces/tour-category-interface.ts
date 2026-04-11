export interface ICreateTourCategory {
  title: string;
  endpoint: string;
}

export interface IUpdateTourCategory extends Partial<ICreateTourCategory> {
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

export interface ITourCategoryResponse {
  id: string;
  title: string;
  description: string | null;
  parent?: ITourCategoryResponse | null;
  children?: ITourCategoryResponse[];
  videoUrl: string | null;
  videoThumbnailUrl: string | null;
  videoPosition: string;
  mainImageUrl: string | null;
  endpoint: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
