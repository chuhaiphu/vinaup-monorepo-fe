export interface ICreateBlogCategory {
  title: string;
  endpoint: string;
}

export interface IUpdateBlogCategory extends Partial<ICreateBlogCategory> {
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

export interface IBlogCategoryResponse {
  id: string;
  title: string;
  description: string | null;
  parent?: IBlogCategoryResponse | null;
  children?: IBlogCategoryResponse[];
  videoUrl: string | null;
  videoThumbnailUrl: string | null;
  videoPosition: string;
  mainImageUrl: string | null;
  endpoint: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

