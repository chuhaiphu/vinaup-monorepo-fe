'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateTourCategoryCustomTourRequest,
  ITourCategoryCustomTourRequestResponse,
} from '@/interfaces/tour-category-custom-tour-request-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createTourCategoryCustomTourRequestApiPrivate,
  getTourCategoryCustomTourRequestByIdApiPrivate,
  getTourCategoryCustomTourRequestsByCustomTourRequestIdApiPrivate,
  getTourCategoryCustomTourRequestsByTourCategoryIdApiPrivate,
  getAllTourCategoryCustomTourRequestsApiPrivate,
  deleteTourCategoryCustomTourRequestApiPrivate,
  deleteTourCategoryCustomTourRequestsByCustomTourRequestIdApiPrivate,
  deleteTourCategoryCustomTourRequestsByTourCategoryIdApiPrivate,
} from '@/apis/tour-category-custom-tour-request-apis';

export async function createTourCategoryCustomTourRequestActionPrivate(
  input: ICreateTourCategoryCustomTourRequest
): Promise<ActionResponse<ITourCategoryCustomTourRequestResponse>> {
  const result = await executeApi(
    async () => createTourCategoryCustomTourRequestApiPrivate(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getTourCategoryCustomTourRequestByIdActionPrivate(
  id: string
): Promise<ActionResponse<ITourCategoryCustomTourRequestResponse>> {
  return executeApi(
    async () => getTourCategoryCustomTourRequestByIdApiPrivate(id)
  );
}

export async function getTourCategoryCustomTourRequestsByCustomTourRequestIdActionPrivate(
  customTourRequestId: string
): Promise<ActionResponse<ITourCategoryCustomTourRequestResponse[]>> {
  return executeApi(
    async () => getTourCategoryCustomTourRequestsByCustomTourRequestIdApiPrivate(customTourRequestId)
  );
}

export async function getTourCategoryCustomTourRequestsByTourCategoryIdActionPrivate(
  tourCategoryId: string
): Promise<ActionResponse<ITourCategoryCustomTourRequestResponse[]>> {
  return executeApi(
    async () => getTourCategoryCustomTourRequestsByTourCategoryIdApiPrivate(tourCategoryId)
  );
}

export async function getAllTourCategoryCustomTourRequestsActionPrivate(): Promise<ActionResponse<ITourCategoryCustomTourRequestResponse[]>> {
  return executeApi(
    async () => getAllTourCategoryCustomTourRequestsApiPrivate()
  );
}

export async function deleteTourCategoryCustomTourRequestActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryCustomTourRequestApiPrivate(id)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteTourCategoryCustomTourRequestsByCustomTourRequestIdActionPrivate(
  customTourRequestId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryCustomTourRequestsByCustomTourRequestIdApiPrivate(customTourRequestId)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteTourCategoryCustomTourRequestsByTourCategoryIdActionPrivate(
  tourCategoryId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryCustomTourRequestsByTourCategoryIdApiPrivate(tourCategoryId)
  );
  revalidatePath('/', 'layout');
  return result;
}
