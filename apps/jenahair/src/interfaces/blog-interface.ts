import { IUserResponse } from "./user-interface";
import { IBlogCategoryBlogResponse } from "./blog-category-blog-interface";

export interface ICreateBlog {
  title: string;
  destinations: string[];
  endpoint: string;
  userId: string;
}

export interface IUpdateBlog extends Partial<ICreateBlog> {
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

export interface IBlogResponse {
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
  blogCategoryBlogs: IBlogCategoryBlogResponse[];
}

