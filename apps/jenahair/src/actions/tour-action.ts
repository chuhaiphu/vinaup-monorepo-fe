'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateTour,
  ITourResponse,
  IUpdateTour,
} from '@/interfaces/tour-interface';
import { executeApi } from '@/actions/_base';
import {
  createTourApiPrivate,
  getTourByIdApiPrivate,
  getTourByEndpointApiPublic,
  getAllToursAdminApiPrivate,
  getAllToursApiPublic,
  updateTourApiPrivate,
  deleteTourApiPrivate,
  incrementTourViewApiPublic,
  toggleTourLikeApiPublic,
} from '@/apis/tour-apis';

export async function createTourActionPrivate(
  input: ICreateTour
): Promise<ActionResponse<ITourResponse>> {
  const result = await executeApi(async () => createTourApiPrivate(input));
  if (result.success) {
    updateTag('tours');
  }
  return result;
}

export async function getTourByIdActionPrivate(
  id: string
): Promise<ActionResponse<ITourResponse>> {
  return executeApi(async () => getTourByIdApiPrivate(id));
}

export async function getTourByEndpointActionPublic(
  endpoint: string
): Promise<ActionResponse<ITourResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('tours', `tour:${endpoint}`);
  return executeApi(async () => getTourByEndpointApiPublic(endpoint));
}

export async function getAllToursActionPrivate(): Promise<
  ActionResponse<ITourResponse[]>
> {
  return executeApi(async () => getAllToursAdminApiPrivate());
}

export async function getAllToursActionPublic(): Promise<
  ActionResponse<ITourResponse[]>
> {
  'use cache';
  cacheLife('default');
  cacheTag('tours');
  return executeApi(async () => getAllToursApiPublic({ visibility: 'public' }));
}

export async function getAllToursPinnedToHomeActionPublic(): Promise<
  ActionResponse<ITourResponse[]>
> {
  'use cache';
  cacheLife('default');
  cacheTag('tours');
  return executeApi(async () =>
    getAllToursApiPublic({ visibility: 'public', pinnedToHome: true })
  );
}

export async function updateTourActionPrivate(
  id: string,
  input: IUpdateTour
): Promise<ActionResponse<ITourResponse>> {
  const result = await executeApi(async () => updateTourApiPrivate(id, input));
  if (result.success) {
    updateTag('tours');
    if (input.endpoint) {
      updateTag(`tour:${input.endpoint}`);
    }
  }
  return result;
}

export async function deleteTourActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteTourApiPrivate(id));
  if (result.success) {
    updateTag('tours');
  }
  return result;
}

export async function incrementTourViewActionPublic(
  tourId: string
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(async () => incrementTourViewApiPublic(tourId));
  if (result.success) {
    updateTag('tours');
  }
  return {
    success: result.success,
    data: result.data?.recorded ?? false,
    error: result.error,
  };
}

export async function incrementTourLikeActionPublic(
  tourId: string
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(async () => toggleTourLikeApiPublic(tourId));
  if (result.success) {
    updateTag('tours');
  }
  return {
    success: result.success,
    data: result.data?.liked ?? false,
    error: result.error,
  };
}
