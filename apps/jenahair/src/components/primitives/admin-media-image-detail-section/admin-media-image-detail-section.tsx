'use client';

import { MediaDetail, type IMedia, type IUpdateMedia } from '@vinaup/ui/admin';
import { IMediaResponse } from '@/interfaces/media-interface';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import {
  deleteMediaActionPrivate,
  updateMediaActionPrivate,
} from '@/actions/media-action';
import { useRouter } from 'next/navigation';

interface AdminMediaImageDetailSectionProps {
  image: IMediaResponse;
}

export default function AdminMediaImageDetailSection({
  image: initialImage,
}: AdminMediaImageDetailSectionProps) {
  const router = useRouter();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (id: string, data: IUpdateMedia) => {
    const result = await updateMediaActionPrivate(id, data);
    if (!result.success) {
      throw new Error(result.error || 'Failed to update media');
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalOpened(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteMediaActionPrivate(initialImage.id);
      if (result.success) {
        notifications.show({
          message: 'Image has been successfully deleted',
          color: 'green',
          position: 'top-right',
        });
        router.push('/adminup/media/images');
      } else {
        throw new Error(result.error || 'Failed to delete image');
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: error instanceof Error ? error.message : 'Failed to delete image',
        color: 'red',
        position: 'top-right',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpened(false);
    }
  };

  const handleNotify = (type: 'success' | 'error', message: string) => {
    notifications.show({
      message: message,
      color: type === 'success' ? 'green' : 'red',
      position: 'top-right',
    });
  };

  return (
    <>
      <MediaDetail
        image={initialImage as unknown as IMedia}
        onUpdate={handleUpdate}
        onDelete={handleDeleteClick}
        onNotify={handleNotify}
      />

      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="Confirm Delete"
        centered
      >
        <Stack>
          <Text>
            Are you sure you want to delete this image? This action cannot be
            undone.
          </Text>
          <Group justify="flex-end" mt="sm">
            <Button
              variant="default"
              onClick={() => setDeleteModalOpened(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button color="red" onClick={handleConfirmDelete} loading={isDeleting}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
