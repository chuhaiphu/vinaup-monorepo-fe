'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreatePage,
  IPageResponse,
  IUpdatePage,
} from '@/interfaces/page-interface';
import { executeApi } from '@/actions/_base';
import {
  createPageApiPrivate,
  getPageByIdApiPrivate,
  getPageByEndpointApiPublic,
  getAllPagesAdminApiPrivate,
  updatePageApiPrivate,
  deletePageApiPrivate,
} from '@/apis/page-apis';

export async function createPageActionPrivate(
  input: ICreatePage
): Promise<ActionResponse<IPageResponse>> {
  const result = await executeApi(async () => createPageApiPrivate(input));
  if (result.success) {
    updateTag('pages');
  }
  return result;
}

export async function getPageByIdActionPrivate(
  id: string
): Promise<ActionResponse<IPageResponse>> {
  return executeApi(async () => getPageByIdApiPrivate(id));
}

export async function getPageByEndpointActionPublic(
  endpoint: string
): Promise<ActionResponse<IPageResponse>> {
  'use cache';
  cacheLife('hours');
  cacheTag('pages', `page:${endpoint}`);
  return executeApi(async () => getPageByEndpointApiPublic(endpoint));
}

export async function getAllPagesAdminActionPrivate(): Promise<
  ActionResponse<IPageResponse[]>
> {
  return executeApi(async () => getAllPagesAdminApiPrivate());
}

export async function getAllPagesVisibleActionPrivate(): Promise<
  ActionResponse<IPageResponse[]>
> {
  // Note: This may need a backend filter endpoint
  const result = await executeApi(async () => getAllPagesAdminApiPrivate());
  if (result.success && result.data) {
    return {
      success: true,
      data: result.data.filter((page) => page.visibility === 'PUBLIC'),
    };
  }
  return result;
}

export async function updatePageActionPrivate(
  id: string,
  input: IUpdatePage
): Promise<ActionResponse<IPageResponse>> {
  const result = await executeApi(async () => updatePageApiPrivate(id, input));
  if (result.success) {
    updateTag('pages');
    if (input.endpoint) {
      updateTag(`page:${input.endpoint}`);
    }
  }
  return result;
}

export async function deletePageActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deletePageApiPrivate(id));
  if (result.success) {
    updateTag('pages');
  }
  return result;
}
