import { ICreateBlogCategory, IBlogCategoryResponse, IUpdateBlogCategory } from "@/interfaces/blog-category-interface";
import { apiPrivate, apiPublic } from "./_base";

// ==================== PUBLIC ROUTES ====================

export async function getAllBlogCategoriesApiPublic() {
  return apiPublic<IBlogCategoryResponse[]>('/blog-categories', {
    method: 'GET',
  });
}

export async function getBlogCategoryByEndpointApiPublic(endpoint: string) {
  return apiPublic<IBlogCategoryResponse>(`/blog-categories/${endpoint}`, {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createBlogCategoryApiPrivate(data: ICreateBlogCategory) {
  return apiPrivate<IBlogCategoryResponse>('/blog-categories/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllBlogCategoriesAdminApiPrivate() {
  return apiPrivate<IBlogCategoryResponse[]>('/blog-categories/admin/list', {
    method: 'GET',
  });
}

export async function getAvailableSortOrdersApiPrivate(parentId: string) {
  return apiPrivate<number[]>(`/blog-categories/admin/available-sort-orders/${parentId}`, {
    method: 'GET',
  });
}

export async function getBlogCategoryByIdApiPrivate(id: string) {
  return apiPrivate<IBlogCategoryResponse>(`/blog-categories/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateBlogCategoryApiPrivate(id: string, data: IUpdateBlogCategory) {
  return apiPrivate<IBlogCategoryResponse>(`/blog-categories/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBlogCategoryApiPrivate(id: string) {
  return apiPrivate<void>(`/blog-categories/admin/${id}`, {
    method: 'DELETE',
  });
}
