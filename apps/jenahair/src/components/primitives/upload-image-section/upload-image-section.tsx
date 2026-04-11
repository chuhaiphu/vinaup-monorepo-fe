'use client';

import { ActionIcon, Image, Loader } from '@mantine/core';
import UploadIconV1 from '@/components/icons/vinaup-upload-icon-v1.svg';
import { HiOutlineTrash } from "react-icons/hi";
import { useState } from 'react';
import classes from './upload-image-section.module.scss';
import MediaImageModal from './media-image-modal';

interface UploadImageSectionProps {
  icon?: React.ReactNode;
  imageUrl?: string;
  isLoading: boolean;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile?: () => void;
  onImageSelect?: (imageUrl: string) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export default function UploadImageSection({
  icon,
  imageUrl,
  isLoading,
  onFileChange,
  onRemoveFile,
  onImageSelect,
  size = 'sm',
}: Readonly<UploadImageSectionProps>) {
  const [modalOpened, setModalOpened] = useState(false);
  const sizeMutiplier = size === 'sm' ? 1 : size === 'md' ? 1.5 : size === 'lg' ? 2 : size === 'xl' ? 3 : 6;

  const handleUploadClick = () => {
    if (onImageSelect) {
      setModalOpened(true);
    }
  };

  const handleImageSelect = (selectedImageUrl: string) => {
    if (onImageSelect) {
      onImageSelect(selectedImageUrl);
    }
  };

  return (
    <>
      <div className={classes.uploadImageWrapper}>
        <ActionIcon
          component={onImageSelect ? "button" : "label"}
          variant="transparent"
          size={40 * sizeMutiplier}
          loaderProps={{
            children: <Loader size={36 * sizeMutiplier} />,
          }}
          loading={isLoading}
          onClick={onImageSelect ? handleUploadClick : undefined}
        >
          {imageUrl ? (
            <Image
              width={40 * sizeMutiplier}
              height={40 * sizeMutiplier}
              src={imageUrl}
              alt="Upload Preview"
            />
          ) : (
            <>
              {icon ? icon : <UploadIconV1 width={40 * sizeMutiplier} height={40 * sizeMutiplier} />}
              {!onImageSelect && <input type="file" hidden onChange={onFileChange} />}
            </>
          )}
        </ActionIcon>
        {imageUrl && (
          <ActionIcon
            size={30}
            variant="transparent"
            onClick={onRemoveFile}
            className={classes.deleteButton}
          >
            <HiOutlineTrash size={26} color='#f1f1f1' />
          </ActionIcon>
        )}
      </div>

      {onImageSelect && (
        <MediaImageModal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          onSelect={handleImageSelect}
        />
      )}
    </>
  );
}
