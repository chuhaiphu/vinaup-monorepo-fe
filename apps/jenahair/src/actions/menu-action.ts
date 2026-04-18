'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateMenu,
  IMenuResponse,
  IUpdateMenu,
} from '@/interfaces/menu-interface';
import { executeApi } from '@/actions/_base';
import {
  createMenuApiPrivate,
  getMenuByIdApiPrivate,
  getAllMenusAdminApiPrivate,
  getAvailableSortOrdersApiPrivate,
  updateMenuApiPrivate,
  deleteMenuApiPrivate,
  getAllMenusApiPublic,
} from '@/apis/menu-apis';

export async function createMenuActionPrivate(
  input: ICreateMenu
): Promise<ActionResponse<IMenuResponse>> {
  const result = await executeApi(async () => createMenuApiPrivate(input));
  if (result.success) {
    updateTag('menu');
  }
  return result;
}

export async function getMenuByIdActionPrivate(
  id: string
): Promise<ActionResponse<IMenuResponse>> {
  return executeApi(async () => getMenuByIdApiPrivate(id));
}

export async function getAllMenusActionPrivate(): Promise<
  ActionResponse<IMenuResponse[]>
> {
  return executeApi(async () => getAllMenusAdminApiPrivate());
}

export async function getAllMenusActionPublic(): Promise<
  ActionResponse<IMenuResponse[]>
> {
  'use cache';
  cacheLife('default');
  cacheTag('menu');
  return executeApi(async () => getAllMenusApiPublic());
}

export async function getAvailableSortOrdersActionPrivate(
  parentId: string
): Promise<ActionResponse<number[]>> {
  return executeApi(async () => getAvailableSortOrdersApiPrivate(parentId));
}

export async function updateMenuActionPrivate(
  id: string,
  input: IUpdateMenu
): Promise<ActionResponse<IMenuResponse>> {
  const result = await executeApi(async () => updateMenuApiPrivate(id, input));
  if (result.success) {
    updateTag('menu');
  }
  return result;
}

export async function deleteMenuActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteMenuApiPrivate(id));
  if (result.success) {
    updateTag('menu');
  }
  return result;
}
