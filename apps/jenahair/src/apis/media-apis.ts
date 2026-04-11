import { ICreateMedia, IMediaResponse, IUpdateMedia } from "@/interfaces/media-interface";
import { apiPrivate } from "./_base";

export async function createMediaApiPrivate(data: ICreateMedia) {
  return apiPrivate<IMediaResponse>('/admin/media', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllMediaApiPrivate(folder?: string) {
  const queryString = folder ? `?folder=${encodeURIComponent(folder)}` : '';
  return apiPrivate<IMediaResponse[]>(`/admin/media${queryString}`, {
    method: 'GET',
  });
}

export async function getMediaFoldersApiPrivate() {
  return apiPrivate<string[]>('/admin/media/folders', {
    method: 'GET',
  });
}

export async function getMediaByIdApiPrivate(id: string) {
  return apiPrivate<IMediaResponse>(`/admin/media/${id}`, {
    method: 'GET',
  });
}

export async function updateMediaApiPrivate(id: string, data: IUpdateMedia) {
  return apiPrivate<IMediaResponse>(`/admin/media/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteMediaApiPrivate(id: string) {
  return apiPrivate<void>(`/admin/media/${id}`, {
    method: 'DELETE',
  });
}
