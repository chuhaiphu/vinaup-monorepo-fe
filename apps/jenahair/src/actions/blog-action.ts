'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateBlog,
  IBlogResponse,
  IUpdateBlog,
} from '@/interfaces/blog-interface';
import { executeApi } from '@/actions/_base';
import {
  createBlogApiPrivate,
  getBlogByIdApiPrivate,
  getBlogByEndpointApiPublic,
  getAllBlogsAdminApiPrivate,
  getAllBlogsApiPublic,
  updateBlogApiPrivate,
  deleteBlogApiPrivate,
  incrementBlogViewApiPublic,
  toggleBlogLikeApiPublic,
} from '@/apis/blog-apis';

export async function createBlogActionPrivate(
  input: ICreateBlog
): Promise<ActionResponse<IBlogResponse>> {
  const result = await executeApi(async () => createBlogApiPrivate(input));
  if (result.success) {
    updateTag('blogs');
  }
  return result;
}

export async function getBlogByIdActionPrivate(
  id: string
): Promise<ActionResponse<IBlogResponse>> {
  return executeApi(async () => getBlogByIdApiPrivate(id));
}

export async function getBlogByEndpointActionPublic(
  endpoint: string
): Promise<ActionResponse<IBlogResponse>> {
  'use cache';
  cacheLife('hours');
  cacheTag('blogs', `blog:${endpoint}`);
  return executeApi(async () => getBlogByEndpointApiPublic(endpoint));
}

export async function getAllBlogsActionPrivate(): Promise<
  ActionResponse<IBlogResponse[]>
> {
  return executeApi(async () => getAllBlogsAdminApiPrivate());
}

export async function getAllBlogsActionPublic(): Promise<
  ActionResponse<IBlogResponse[]>
> {
  'use cache';
  cacheLife('hours');
  cacheTag('blogs');
  return executeApi(async () => getAllBlogsApiPublic({ visibility: 'public' }));
}

export async function updateBlogActionPrivate(
  id: string,
  input: IUpdateBlog
): Promise<ActionResponse<IBlogResponse>> {
  const result = await executeApi(async () => updateBlogApiPrivate(id, input));
  if (result.success) {
    updateTag('blogs');
    if (input.endpoint) {
      updateTag(`blog:${input.endpoint}`);
    }
  }
  return result;
}

export async function deleteBlogActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteBlogApiPrivate(id));
  if (result.success) {
    updateTag('blogs');
  }
  return result;
}

export async function incrementBlogViewActionPublic(
  blogId: string
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(async () => incrementBlogViewApiPublic(blogId));
  if (result.success) {
    updateTag('blogs');
  }
  return {
    success: result.success,
    data: result.data?.recorded ?? false,
    error: result.error,
  };
}

export async function incrementBlogLikeActionPublic(
  blogId: string
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(async () => toggleBlogLikeApiPublic(blogId));
  if (result.success) {
    updateTag('blogs');
  }
  return {
    success: result.success,
    data: result.data?.liked ?? false,
    error: result.error,
  };
}
