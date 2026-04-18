'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateTourCategoryTour,
  ITourCategoryTourResponse,
  IUpdateTourCategoryTour,
} from '@/interfaces/tour-category-tour-interface';
import { cacheLife, cacheTag, updateTag } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createTourCategoryTourApiPrivate,
  getTourCategoryTourByIdApiPublic,
  getTourCategoryToursByTourIdApiPublic,
  getTourCategoryToursByTourCategoryIdApiPublic,
  getAllTourCategoryToursApiPublic,
  updateTourCategoryTourApiPrivate,
  deleteTourCategoryTourApiPrivate,
  deleteTourCategoryToursByTourIdApiPrivate,
  deleteTourCategoryToursByTourCategoryIdApiPrivate,
} from '@/apis/tour-category-tour-apis';

function invalidateTourCategoryTourTags(args?: {
  tourId?: string;
  tourCategoryId?: string;
}) {
  updateTag('tours');
  updateTag('tour-categories');
  updateTag('tour-category-tours');

  if (args?.tourId) {
    updateTag(`tour-category-tours:tour:${args.tourId}`);
  }

  if (args?.tourCategoryId) {
    updateTag(`tour-category-tours:category:${args.tourCategoryId}`);
  }
}

export async function createTourCategoryTourActionPrivate(
  input: ICreateTourCategoryTour
): Promise<ActionResponse<ITourCategoryTourResponse>> {
  const result = await executeApi(async () =>
    createTourCategoryTourApiPrivate(input)
  );
  if (result.success) {
    invalidateTourCategoryTourTags({
      tourId: input.tourId,
      tourCategoryId: input.tourCategoryId,
    });
  }
  return result;
}

export async function getTourCategoryTourByIdActionPublic(
  id: string
): Promise<ActionResponse<ITourCategoryTourResponse>> {
  return executeApi(async () => getTourCategoryTourByIdApiPublic(id));
}

export async function getTourCategoryToursByTourIdActionPublic(
  tourId: string
): Promise<ActionResponse<ITourCategoryTourResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('tour-category-tours', `tour-category-tours:tour:${tourId}`);
  return executeApi(async () => getTourCategoryToursByTourIdApiPublic(tourId));
}

export async function getTourCategoryToursByTourCategoryIdActionPublic(
  tourCategoryId: string
): Promise<ActionResponse<ITourCategoryTourResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('tour-category-tours', `tour-category-tours:category:${tourCategoryId}`);
  return executeApi(async () =>
    getTourCategoryToursByTourCategoryIdApiPublic(tourCategoryId)
  );
}

export async function getAllTourCategoryToursActionPublic(): Promise<
  ActionResponse<ITourCategoryTourResponse[]>
> {
  'use cache';
  cacheLife('default');
  cacheTag('tour-category-tours');
  return executeApi(async () => getAllTourCategoryToursApiPublic());
}

export async function updateTourCategoryTourActionPrivate(
  id: string,
  input: IUpdateTourCategoryTour
): Promise<ActionResponse<ITourCategoryTourResponse>> {
  const result = await executeApi(async () =>
    updateTourCategoryTourApiPrivate(id, input)
  );
  if (result.success) {
    invalidateTourCategoryTourTags();
  }
  return result;
}

export async function deleteTourCategoryTourActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteTourCategoryTourApiPrivate(id));
  if (result.success) {
    invalidateTourCategoryTourTags();
  }
  return result;
}

export async function deleteTourCategoryToursByTourIdActionPrivate(
  tourId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () =>
    deleteTourCategoryToursByTourIdApiPrivate(tourId)
  );
  if (result.success) {
    invalidateTourCategoryTourTags({ tourId });
  }
  return result;
}

export async function deleteTourCategoryToursByTourCategoryIdActionPrivate(
  tourCategoryId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () =>
    deleteTourCategoryToursByTourCategoryIdApiPrivate(tourCategoryId)
  );
  if (result.success) {
    invalidateTourCategoryTourTags({ tourCategoryId });
  }
  return result;
}
