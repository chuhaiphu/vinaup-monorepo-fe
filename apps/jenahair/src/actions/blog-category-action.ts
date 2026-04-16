'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateBlogCategory,
  IBlogCategoryResponse,
  IUpdateBlogCategory,
} from '@/interfaces/blog-category-interface';
import { executeApi } from '@/actions/_base';
import {
  createBlogCategoryApiPrivate,
  getBlogCategoryByIdApiPrivate,
  getBlogCategoryByEndpointApiPublic,
  getAllBlogCategoriesApiPublic,
  getAllBlogCategoriesAdminApiPrivate,
  getAvailableSortOrdersApiPrivate,
  updateBlogCategoryApiPrivate,
  deleteBlogCategoryApiPrivate,
} from '@/apis/blog-category-apis';

export async function createBlogCategoryActionPrivate(
  input: ICreateBlogCategory
): Promise<ActionResponse<IBlogCategoryResponse>> {
  const result = await executeApi(async () => createBlogCategoryApiPrivate(input));
  if (result.success) {
    updateTag('blog-categories');
  }
  return result;
}

export async function getBlogCategoryByIdActionPrivate(
  id: string
): Promise<ActionResponse<IBlogCategoryResponse>> {
  return executeApi(async () => getBlogCategoryByIdApiPrivate(id));
}

export async function getBlogCategoryByEndpointActionPublic(
  endpoint: string
): Promise<ActionResponse<IBlogCategoryResponse>> {
  'use cache';
  cacheLife('hours');
  cacheTag('blog-categories', `blog-category:${endpoint}`);
  return executeApi(async () => getBlogCategoryByEndpointApiPublic(endpoint));
}

export async function getAllBlogCategoriesActionPrivate(): Promise<
  ActionResponse<IBlogCategoryResponse[]>
> {
  return executeApi(async () => getAllBlogCategoriesAdminApiPrivate());
}

export async function getAllBlogCategoriesActionPublic(): Promise<
  ActionResponse<IBlogCategoryResponse[]>
> {
  'use cache';
  cacheLife('hours');
  cacheTag('blog-categories');
  return executeApi(async () => getAllBlogCategoriesApiPublic());
}

export async function getAvailableSortOrdersActionPrivate(
  parentId: string
): Promise<ActionResponse<number[]>> {
  return executeApi(async () => getAvailableSortOrdersApiPrivate(parentId));
}

export async function updateBlogCategoryActionPrivate(
  id: string,
  input: IUpdateBlogCategory
): Promise<ActionResponse<IBlogCategoryResponse>> {
  const result = await executeApi(async () =>
    updateBlogCategoryApiPrivate(id, input)
  );
  if (result.success) {
    updateTag('blog-categories');
    if (input.endpoint) {
      updateTag(`blog-category:${input.endpoint}`);
    }
  }
  return result;
}

export async function deleteBlogCategoryActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteBlogCategoryApiPrivate(id));
  if (result.success) {
    updateTag('blog-categories');
  }
  return result;
}
