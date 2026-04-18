import { ICreateBlog, IBlogResponse, IUpdateBlog } from "@/interfaces/blog-interface";
import { apiPrivate, apiPublic } from "./_base";

export interface BlogFilterParams {
  visibility?: string;
}

function buildQueryString(filter?: BlogFilterParams): string {
  if (!filter) return '';
  const params = new URLSearchParams();
  if (filter.visibility) params.append('visibility', filter.visibility);
  const query = params.toString();
  return query ? `?${query}` : '';
}

// ==================== PUBLIC ROUTES ====================

export async function getAllBlogsApiPublic(filter?: BlogFilterParams) {
  const queryString = buildQueryString(filter);
  return apiPublic<IBlogResponse[]>(`/blogs${queryString}`, {
    method: 'GET',
  });
}

export async function getBlogByEndpointApiPublic(endpoint: string) {
  return apiPublic<IBlogResponse>(`/blogs/${endpoint}`, {
    method: 'GET',
  });
}

export async function incrementBlogViewApiPublic(id: string) {
  return apiPublic<{ recorded: boolean }>(`/blogs/${id}/view`, {
    method: 'POST',
  });
}

export async function toggleBlogLikeApiPublic(id: string) {
  return apiPublic<{ liked: boolean }>(`/blogs/${id}/like`, {
    method: 'POST',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createBlogApiPrivate(data: ICreateBlog) {
  return apiPrivate<IBlogResponse>('/blogs/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllBlogsAdminApiPrivate(filter?: BlogFilterParams) {
  const queryString = buildQueryString(filter);
  return apiPrivate<IBlogResponse[]>(`/blogs/admin${queryString}`, {
    method: 'GET',
  });
}

export async function getBlogByIdApiPrivate(id: string) {
  return apiPrivate<IBlogResponse>(`/blogs/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateBlogApiPrivate(id: string, data: IUpdateBlog) {
  return apiPrivate<IBlogResponse>(`/blogs/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBlogApiPrivate(id: string) {
  return apiPrivate<void>(`/blogs/admin/${id}`, {
    method: 'DELETE',
  });
}
