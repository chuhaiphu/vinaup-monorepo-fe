'use client';
import { ICreateMedia, IMedia, MediaUpload, type UploadResult } from '@vinaup/media-ui';
import { uploadImageActionPrivate } from '@/actions/upload-action';
import { createManyMediaActionPrivate } from '@/actions/media-action';
import { notifications } from '@mantine/notifications';

export default function MediaImageUploadSection() {

  const handleUpload = async (files: File[]): Promise<UploadResult[]> => {
    const successResults: UploadResult[] = [];
  
    for (const file of files) {
      const uploadResponse = await uploadImageActionPrivate(file, 'media');
      if (uploadResponse.success && uploadResponse.data) {
        successResults.push({
          url: uploadResponse.data,
          name: file.name
        });
      }
    }
    
    if (successResults.length === 0 && files.length > 0) {
      throw new Error("All files failed to upload.");
    }
    return successResults;
  }

  const handleSave = async (data: ICreateMedia[]): Promise<IMedia[]> => {
    const response = await createManyMediaActionPrivate(data);
    if (!response.success || !response.data) {
      throw new Error(response.error || "Lỗi khi lưu vào cơ sở dữ liệu");
    }
    return response.data as unknown as IMedia[];
  }

  const handleUploadSuccess = (media: IMedia[]) => {
    notifications.show({
      title: 'Upload success',
      message: `Upload success ${media.length} images`,
      color: 'green',
    });
  };

  const handleUploadError = (error: Error) => {
    notifications.show({
      title: 'Upload failed',
      message: error.message || 'There was an error',
      color: 'red',
    });
  };

  return (
    <MediaUpload
      folder="media"
      multiple={true}
      maxSize={2 * 1024 * 1024} // 2MB
      acceptedTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/webp']}
      onUpload={handleUpload}
      onSave={handleSave}
      onUploadSuccess={handleUploadSuccess}
      onUploadError={handleUploadError}
    />
  )
}