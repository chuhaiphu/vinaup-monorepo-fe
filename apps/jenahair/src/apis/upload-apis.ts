import { apiPrivate } from "./_base";

export interface UploadResponse {
  url: string;
  filename: string;
}

export async function uploadFileApiPrivate(file: File, folder?: string) {
  const formData = new FormData();
  formData.append('file', file);
  const queryString = folder ? `?folder=${encodeURIComponent(folder)}` : '';
  return apiPrivate<UploadResponse>(`/upload/admin${queryString}`, {
    method: 'POST',
    body: formData,
  });
}

export async function deleteUploadedFileApiPrivate(relativePath: string) {
  return apiPrivate<void>(`/upload/admin`, {
    method: 'DELETE',
    body: JSON.stringify({path: relativePath}),
  });
}
