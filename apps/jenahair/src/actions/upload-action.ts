'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { executeApi } from '@/actions/_base';
import {
  uploadFileApiPrivate,
  deleteUploadedFileApiPrivate,
} from '@/apis/upload-apis';

export async function uploadImageActionPrivate(
  file: File,
  folder: string
): Promise<ActionResponse<string>> {
  // Upload via backend API
  const result = await executeApi(
    async () => uploadFileApiPrivate(file, folder)
  );

  if (!result.success || !result.data) {
    return {
      success: false,
      error: result.error || 'Upload failed',
    };
  }
  return {
    success: true,
    data: result.data.url,
  };
}


export async function deleteLocalImageActionPrivate(
  relativePath: string
): Promise<ActionResponse<null>> {

  if (!relativePath) {
    return { success: false, error: 'Path is required' };
  }

  const result = await executeApi(
    async () => deleteUploadedFileApiPrivate(relativePath)
  );

  if (!result.success) {
    return {
      success: false,
      error: result.error || 'Delete failed',
    };
  }

  return {
    success: true,
    data: null,
  };
}

