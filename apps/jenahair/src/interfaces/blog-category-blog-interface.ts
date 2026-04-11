import { IBlogResponse } from "./blog-interface";
import { IBlogCategoryResponse } from "./blog-category-interface";

export interface ICreateBlogCategoryBlog {
  blogCategoryId: string;
  blogId: string;
  sortOrder?: number;
}

export interface IUpdateBlogCategoryBlog {
  sortOrder?: number;
}

export interface IBlogCategoryBlogResponse {
  id: string;
  blogCategoryId: string;
  blogId: string;
  sortOrder: number;
  blogCategory?: IBlogCategoryResponse;
  blog?: IBlogResponse;
}

