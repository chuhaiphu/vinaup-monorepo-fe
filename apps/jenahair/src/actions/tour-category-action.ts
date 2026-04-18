'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateTourCategory,
  ITourCategoryResponse,
  IUpdateTourCategory,
} from '@/interfaces/tour-category-interface';
import { executeApi } from '@/actions/_base';
import {
  createTourCategoryApiPrivate,
  getTourCategoryByIdApiPrivate,
  getTourCategoryByEndpointApiPublic,
  getAllTourCategoriesApiPublic,
  getAvailableSortOrdersApiPrivate,
  updateTourCategoryApiPrivate,
  deleteTourCategoryApiPrivate,
} from '@/apis/tour-category-apis';

export async function createTourCategoryActionPrivate(
  input: ICreateTourCategory
): Promise<ActionResponse<ITourCategoryResponse>> {
  const result = await executeApi(async () => createTourCategoryApiPrivate(input));
  if (result.success) {
    updateTag('tour-categories');
  }
  return result;
}

export async function getTourCategoryByIdActionPrivate(
  id: string
): Promise<ActionResponse<ITourCategoryResponse>> {
  return executeApi(async () => getTourCategoryByIdApiPrivate(id));
}

export async function getTourCategoryByEndpointActionPublic(
  endpoint: string
): Promise<ActionResponse<ITourCategoryResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('tour-categories', `tour-category:${endpoint}`);
  return executeApi(async () => getTourCategoryByEndpointApiPublic(endpoint));
}

export async function getAllTourCategoriesActionPublic(): Promise<
  ActionResponse<ITourCategoryResponse[]>
> {
  'use cache';
  cacheLife('default');
  cacheTag('tour-categories');
  return executeApi(async () => getAllTourCategoriesApiPublic());
}

export async function getAvailableSortOrdersActionPrivate(
  parentId: string
): Promise<ActionResponse<number[]>> {
  return executeApi(async () => getAvailableSortOrdersApiPrivate(parentId));
}

export async function updateTourCategoryActionPrivate(
  id: string,
  input: IUpdateTourCategory
): Promise<ActionResponse<ITourCategoryResponse>> {
  const result = await executeApi(async () =>
    updateTourCategoryApiPrivate(id, input)
  );
  if (result.success) {
    updateTag('tour-categories');
    if (input.endpoint) {
      updateTag(`tour-category:${input.endpoint}`);
    }
  }
  return result;
}

export async function deleteTourCategoryActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteTourCategoryApiPrivate(id));
  if (result.success) {
    updateTag('tour-categories');
  }
  return result;
}
