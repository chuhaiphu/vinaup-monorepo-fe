'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateBlogCategoryBlog,
  IBlogCategoryBlogResponse,
  IUpdateBlogCategoryBlog,
} from '@/interfaces/blog-category-blog-interface';
import { cacheLife, cacheTag, updateTag } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createBlogCategoryBlogApiPrivate,
  getBlogCategoryBlogByIdApiPublic,
  getBlogCategoryBlogsByBlogIdApiPublic,
  getBlogCategoryBlogsByBlogCategoryIdApiPublic,
  getAllBlogCategoryBlogsApiPublic,
  updateBlogCategoryBlogApiPrivate,
  deleteBlogCategoryBlogApiPrivate,
  deleteBlogCategoryBlogsByBlogIdApiPrivate,
  deleteBlogCategoryBlogsByBlogCategoryIdApiPrivate,
} from '@/apis/blog-category-blog-apis';

function invalidateBlogCategoryBlogTags(args?: {
  blogId?: string;
  blogCategoryId?: string;
}) {
  updateTag('blogs');
  updateTag('blog-categories');
  updateTag('blog-category-blogs');

  if (args?.blogId) {
    updateTag(`blog-category-blogs:blog:${args.blogId}`);
  }

  if (args?.blogCategoryId) {
    updateTag(`blog-category-blogs:category:${args.blogCategoryId}`);
  }
}

export async function createBlogCategoryBlogActionPrivate(
  input: ICreateBlogCategoryBlog
): Promise<ActionResponse<IBlogCategoryBlogResponse>> {
  const result = await executeApi(async () =>
    createBlogCategoryBlogApiPrivate(input)
  );
  if (result.success) {
    invalidateBlogCategoryBlogTags({
      blogId: input.blogId,
      blogCategoryId: input.blogCategoryId,
    });
  }
  return result;
}

export async function getBlogCategoryBlogByIdActionPublic(
  id: string
): Promise<ActionResponse<IBlogCategoryBlogResponse>> {
  return executeApi(async () => getBlogCategoryBlogByIdApiPublic(id));
}

export async function getBlogCategoryBlogsByBlogIdActionPublic(
  blogId: string
): Promise<ActionResponse<IBlogCategoryBlogResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('blog-category-blogs', `blog-category-blogs:blog:${blogId}`);
  return executeApi(async () => getBlogCategoryBlogsByBlogIdApiPublic(blogId));
}

export async function getBlogCategoryBlogsByBlogCategoryIdActionPublic(
  blogCategoryId: string
): Promise<ActionResponse<IBlogCategoryBlogResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('blog-category-blogs', `blog-category-blogs:category:${blogCategoryId}`);
  return executeApi(async () =>
    getBlogCategoryBlogsByBlogCategoryIdApiPublic(blogCategoryId)
  );
}

export async function getAllBlogCategoryBlogsActionPublic(): Promise<
  ActionResponse<IBlogCategoryBlogResponse[]>
> {
  'use cache';
  cacheLife('default');
  cacheTag('blog-category-blogs');
  return executeApi(async () => getAllBlogCategoryBlogsApiPublic());
}

export async function updateBlogCategoryBlogActionPrivate(
  id: string,
  input: IUpdateBlogCategoryBlog
): Promise<ActionResponse<IBlogCategoryBlogResponse>> {
  const result = await executeApi(async () =>
    updateBlogCategoryBlogApiPrivate(id, input)
  );
  if (result.success) {
    invalidateBlogCategoryBlogTags();
  }
  return result;
}

export async function deleteBlogCategoryBlogActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteBlogCategoryBlogApiPrivate(id));
  if (result.success) {
    invalidateBlogCategoryBlogTags();
  }
  return result;
}

export async function deleteBlogCategoryBlogsByBlogIdActionPrivate(
  blogId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () =>
    deleteBlogCategoryBlogsByBlogIdApiPrivate(blogId)
  );
  if (result.success) {
    invalidateBlogCategoryBlogTags({ blogId });
  }
  return result;
}

export async function deleteBlogCategoryBlogsByBlogCategoryIdActionPrivate(
  blogCategoryId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () =>
    deleteBlogCategoryBlogsByBlogCategoryIdApiPrivate(blogCategoryId)
  );
  if (result.success) {
    invalidateBlogCategoryBlogTags({ blogCategoryId });
  }
  return result;
}
