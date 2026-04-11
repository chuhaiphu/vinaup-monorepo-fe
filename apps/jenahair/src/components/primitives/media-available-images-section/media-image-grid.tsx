'use client';

import '@vinaup/media-ui/dist/index.css';
import { MediaGrid, type IMedia } from '@vinaup/media-ui';
import { useRouter, usePathname } from "next/navigation";
import { Route } from "next";
import { IMediaResponse } from "@/interfaces/media-interface";

interface MediaImageGridProps {
  images: IMediaResponse[];
}

export default function MediaImageGrid({ images }: MediaImageGridProps) {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/');
  const isDetailPage = pathSegments.length === 5 && pathSegments[3] === 'images';
  const selectedImageId = isDetailPage ? pathSegments[4] : null;
  const handleImageClick = (imageId: string) => {
    router.push(`/adminup/media/images/${imageId}` as Route);
  };

  return (
    <MediaGrid
      images={images as unknown as IMedia[]}
      selectedImageId={selectedImageId}
      onImageClick={handleImageClick}
      sortOptions={[
        { value: 'createdAt', label: 'Ngày tạo' },
        { value: 'updatedAt', label: 'Ngày cập nhật' },
        { value: 'name', label: 'Tên file' },
      ]}
    />
  );
}