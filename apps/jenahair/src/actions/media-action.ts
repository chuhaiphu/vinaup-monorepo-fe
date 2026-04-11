'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateMedia,
  IMediaResponse,
  IUpdateMedia,
} from '@/interfaces/media-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createMediaApiPrivate,
  getAllMediaApiPrivate,
  getMediaByIdApiPrivate,
  updateMediaApiPrivate,
  deleteMediaApiPrivate,
} from '@/apis/media-apis';

export async function createMediaActionPrivate(
  input: ICreateMedia
): Promise<ActionResponse<IMediaResponse>> {
  const result = await executeApi(async () => createMediaApiPrivate(input));
  revalidatePath('/adminup/media');
  return result;
}

export async function createManyMediaActionPrivate(
  input: ICreateMedia[]
): Promise<ActionResponse<IMediaResponse[]>> {
  try {
    const results: IMediaResponse[] = [];
    for (const mediaInput of input) {
      const result = await executeApi(async () =>
        createMediaApiPrivate(mediaInput)
      );
      if (result.success && result.data) {
        results.push(result.data);
      }
    }
    revalidatePath('/adminup/media');
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create media',
    };
  }
}

export async function getMediaByIdActionPrivate(
  id: string
): Promise<ActionResponse<IMediaResponse>> {
  return executeApi(async () => getMediaByIdApiPrivate(id));
}

export async function getAllMediaActionPrivate(): Promise<
  ActionResponse<IMediaResponse[]>
> {
  return executeApi(async () => getAllMediaApiPrivate());
}

export async function updateMediaActionPrivate(
  id: string,
  input: IUpdateMedia
): Promise<ActionResponse<IMediaResponse>> {
  const result = await executeApi(async () => updateMediaApiPrivate(id, input));
  revalidatePath('/adminup/media');
  return result;
}

export async function deleteMediaActionPrivate(
  id: string
): Promise<ActionResponse<{ url: string } | null>> {
  // First get the media to have its URL
  const mediaResult = await executeApi(async () => getMediaByIdApiPrivate(id));

  const result = await executeApi(async () => deleteMediaApiPrivate(id));

  if (result.success && mediaResult.success && mediaResult.data) {
    const { deleteLocalImageActionPrivate } =
      await import('@/actions/upload-action');
    const urlObj = new URL(mediaResult.data.url);
    const pathParts = urlObj.pathname.split('/');
    let domainIndex = -1;
    if (process.env.NODE_ENV === 'development') {
      domainIndex = pathParts.findIndex((part) => part === 'media');
    } else {
      domainIndex = pathParts.findIndex((part) => part === process.env.API_URL);
    }
    const relativePath = pathParts.slice(domainIndex + 1).join('/');
    if (relativePath) {
      deleteLocalImageActionPrivate(relativePath);
    }
    revalidatePath('/adminup/media');
    revalidatePath('/adminup/media/images');
    return { success: true, data: { url: mediaResult.data.url } };
  }

  revalidatePath('/adminup/media');
  revalidatePath('/adminup/media/images');
  return { success: result.success, data: null, error: result.error };
}

export async function upsertMediaActionPrivate(
  input: ICreateMedia
): Promise<ActionResponse<IMediaResponse>> {
  // Check if media with same URL exists, update or create
  const allMedia = await executeApi(async () => getAllMediaApiPrivate());

  if (allMedia.success && allMedia.data) {
    const existing = allMedia.data.find((m) => m.url === input.url);
    if (existing) {
      return updateMediaActionPrivate(existing.id, {
        name: input.name,
        title: input.title,
        description: input.description,
        folder: input.folder,
      });
    }
  }

  return createMediaActionPrivate(input);
}
