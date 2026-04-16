'use client';

import {
  ActionIcon,
  Button,
  Grid,
  GridCol,
  Group,
  Modal,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './admin-diary-category-detail-page-content.module.scss';
import { TextEditor } from '@vinaup/ui/admin';
import UploadImageSection from '@/components/primitives/upload-image-section/upload-image-section';
import { use, useEffect, useMemo, useRef, useState } from 'react';
import {
  deleteDiaryCategoryActionPrivate,
  updateDiaryCategoryActionPrivate,
} from '@/actions/diary-category-action';
import { IDiaryCategoryResponse } from '@/interfaces/diary-category-interface';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { FaCaretDown } from 'react-icons/fa6';
import { GrTrash } from 'react-icons/gr';
import UploadIconV2 from '@/components/icons/vinaup-upload-icon-v2.svg';
import UploadIconV3 from '@/components/icons/vinaup-upload-icon-v3.svg';
import PenIcon from '@/components/icons/vinaup-pen-icon.svg';
import { TreeManager } from '@vinaup/utils/tree-manager';
import { useRouter } from 'next/navigation';
import { ActionResponse } from '@/interfaces/_base-interface';

interface AdminDiaryCategoryDetailPageContentProps {
  currentDiaryCategoryPromise: Promise<ActionResponse<IDiaryCategoryResponse>>;
  diaryCategoriesPromise: Promise<ActionResponse<IDiaryCategoryResponse[]>>;
  availableSortOrdersPromise: Promise<ActionResponse<number[]>>;
}

export default function AdminDiaryCategoryDetailPageContent({
  currentDiaryCategoryPromise,
  diaryCategoriesPromise,
  availableSortOrdersPromise,
}: AdminDiaryCategoryDetailPageContentProps) {
  const currentDiaryCategoryResult = use(currentDiaryCategoryPromise);
  const diaryCategoriesResult = use(diaryCategoriesPromise);
  const availableSortOrdersResult = use(availableSortOrdersPromise);

  if (!currentDiaryCategoryResult.success || !currentDiaryCategoryResult.data) {
    return <div>Diary category not found</div>;
  }

  const currentDiaryCategory = currentDiaryCategoryResult.data;
  const diaryCategoriesData = diaryCategoriesResult.data ?? [];
  const availableSortOrdersData = availableSortOrdersResult.data ?? [];

  return (
    <AdminDiaryCategoryDetailPageContentInner
      currentDiaryCategory={currentDiaryCategory}
      diaryCategoriesData={diaryCategoriesData}
      availableSortOrdersData={availableSortOrdersData}
    />
  );
}

interface AdminDiaryCategoryDetailPageContentInnerProps {
  currentDiaryCategory: IDiaryCategoryResponse;
  diaryCategoriesData: IDiaryCategoryResponse[];
  availableSortOrdersData: number[];
}

function AdminDiaryCategoryDetailPageContentInner({
  currentDiaryCategory,
  diaryCategoriesData,
  availableSortOrdersData,
}: AdminDiaryCategoryDetailPageContentInnerProps) {
  const [title, setTitle] = useState<string>(currentDiaryCategory.title);
  const [description, setDescription] = useState<string>(
    currentDiaryCategory.description || ''
  );
  const [parentId, setParentId] = useState<string | null>(
    currentDiaryCategory.parent?.id || null
  );
  const [videoUrl, setVideoUrl] = useState<string>(
    currentDiaryCategory.videoUrl || ''
  );
  const [videoThumbnailUrl, setVideoThumbnailUrl] = useState<string>(
    currentDiaryCategory.videoThumbnailUrl || ''
  );
  const [videoPosition, setVideoPosition] = useState<string>(
    currentDiaryCategory.videoPosition || 'end'
  );
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    currentDiaryCategory.mainImageUrl || ''
  );
  const [sortOrder, setSortOrder] = useState<number>(
    currentDiaryCategory.sortOrder || 0
  );

  const [videoThumbnailLoading, setVideoThumbnailLoading] =
    useState<boolean>(false);
  const [mainImageLoading, setMainImageLoading] = useState<boolean>(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSavingAll, setIsSavingAll] = useState<boolean>(false);

  useEffect(() => {
    setSortOrder(currentDiaryCategory.sortOrder);
  }, [currentDiaryCategory.sortOrder]);

  const router = useRouter();
  const videoUrlInputRef = useRef<HTMLInputElement>(null);

  const treeManager = useMemo(() => {
    if (diaryCategoriesData.length === 0) {
      return null;
    }
    return new TreeManager(diaryCategoriesData);
  }, [diaryCategoriesData]);

  const excludedIds = treeManager?.toIds(
    treeManager?.toFlatList(currentDiaryCategory.id) ?? []
  );
  excludedIds?.add(currentDiaryCategory.id);

  const parentOptions = diaryCategoriesData
    .filter((cat) => !excludedIds?.has(cat.id))
    .map((cat) => ({ value: cat.id, label: cat.title }));

  const handleFocusAndSelectInput = (
    ref: React.RefObject<HTMLInputElement | null>
  ) => {
    if (ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  };

  const handleUpdateTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleUpdateDescription = (newDescription: string) => {
    setDescription(newDescription);
  };

  const handleUpdateParent = (newParentId: string | null) => {
    if (!newParentId) return;
    setParentId(newParentId);
  };

  const handleUpdateSortOrder = (newSortOrder: string | null) => {
    if (!newSortOrder) return;
    setSortOrder(parseInt(newSortOrder));
  };

  const handleUpdateVideoPosition = (newPosition: string) => {
    setVideoPosition(newPosition);
  };

  const handleUpdateVideoUrl = (newUrl: string) => {
    setVideoUrl(newUrl);
  };

  const handleSelectVideoThumbnail = async (imageUrl: string) => {
    setVideoThumbnailLoading(true);
    try {
      await updateDiaryCategoryActionPrivate(currentDiaryCategory.id, {
        videoThumbnailUrl: imageUrl,
      });
      setVideoThumbnailUrl(imageUrl);
    } catch (error) {
      notifications.show({
        title: 'Failed to set image',
        message: error instanceof Error ? error.message : '',
        color: 'red',
      });
    } finally {
      setVideoThumbnailLoading(false);
    }
  };

  const handleRemoveVideoThumbnail = async () => {
    setVideoThumbnailLoading(true);
    setVideoThumbnailUrl('');
    await updateDiaryCategoryActionPrivate(currentDiaryCategory.id, {
      videoThumbnailUrl: '',
    });
    setVideoThumbnailLoading(false);
  };

  const handleSelectMainImage = async (imageUrl: string) => {
    setMainImageLoading(true);
    try {
      await updateDiaryCategoryActionPrivate(currentDiaryCategory.id, {
        mainImageUrl: imageUrl,
      });
      setMainImageUrl(imageUrl);
    } catch (error) {
      notifications.show({
        title: 'Failed to set image',
        message: error instanceof Error ? error.message : '',
        color: 'red',
      });
    } finally {
      setMainImageLoading(false);
    }
  };

  const handleRemoveMainImage = async () => {
    setMainImageLoading(true);
    setMainImageUrl('');
    await updateDiaryCategoryActionPrivate(currentDiaryCategory.id, {
      mainImageUrl: '',
    });
    setMainImageLoading(false);
  };

  const handleCopyLink = () => {
    const link = `https://jenahair.com/nhat-ky/${currentDiaryCategory.endpoint}`;
    navigator.clipboard.writeText(link);
    notifications.show({
      title: 'Link copied',
      message: 'Link has been copied to clipboard',
      color: 'green',
    });
  };

  const handleViewLink = () => {
    const link = `https://jenahair.com/nhat-ky/${currentDiaryCategory.endpoint}`;
    window.open(link, '_blank');
  };

  const handleSaveAll = async () => {
    setIsSavingAll(true);
    try {
      let newEndpoint = currentDiaryCategory.endpoint;
      if (title !== currentDiaryCategory.title) {
        newEndpoint = await generateUniqueEndpoint(
          title,
          'diary-category',
          currentDiaryCategory.id
        );
      }

      await updateDiaryCategoryActionPrivate(currentDiaryCategory.id, {
        title,
        description,
        parentId: parentId || undefined,
        sortOrder,
        videoUrl,
        videoPosition,
        endpoint: newEndpoint,
      });

      notifications.show({
        message: 'Saved successfully',
        color: 'green',
        position: 'top-right',
        autoClose: 900,
      });
    } catch (error) {
      notifications.show({
        title: 'Save failed',
        message: error instanceof Error ? error.message : 'Failed to save',
        color: 'red',
      });
    } finally {
      setIsSavingAll(false);
    }
  };

  const handleDeleteDiaryCategory = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteDiaryCategoryActionPrivate(
        currentDiaryCategory.id
      );
      if (result.success) {
        router.replace('/adminup/diary-category');
        notifications.show({
          message: 'Diary category has been successfully deleted',
          color: 'green',
          position: 'top-center',
          autoClose: 1500,
        });
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete diary category',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message:
          error instanceof Error
            ? error.message
            : 'Failed to delete diary category',
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpened(false);
    }
  };

  return (
    <div className={classes.categoryDetailRoot}>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 7, lg: 7, xl: 8 }}>
          <Stack>
            <Paper p={'sm'} radius={'md'} classNames={{ root: classes.paperBlock }}>
              <Stack gap={'xs'}>
                <Text>Title</Text>
                <TextInput
                  size="md"
                  value={title}
                  placeholder="A title under 100 characters"
                  maxLength={100}
                  onChange={(e) => {
                    handleUpdateTitle(e.target.value);
                  }}
                />
                <Group gap={'xs'} justify="space-between">
                  <Text size="md">
                    URL: jenahair.com/nhat-ky/{currentDiaryCategory.endpoint}
                  </Text>
                  <Group>
                    <Text
                      size="sm"
                      className={classes.linkText}
                      onClick={handleViewLink}
                    >
                      View
                    </Text>
                    <Text
                      size="sm"
                      className={classes.linkText}
                      onClick={handleCopyLink}
                    >
                      Copy link
                    </Text>
                  </Group>
                </Group>
              </Stack>

              <Stack gap={'xs'} mt={'md'}>
                <Text>Parent Diary Category</Text>
                <Select
                  size="md"
                  placeholder="---"
                  data={parentOptions}
                  value={parentId}
                  searchable
                  nothingFoundMessage="No diary category found"
                  onChange={(value) => handleUpdateParent(value)}
                />
              </Stack>

              <Stack gap={'xs'} mt={'md'}>
                <Text>Description</Text>
                <TextEditor
                  content={description}
                  onChange={(newDescription) => {
                    handleUpdateDescription(newDescription);
                  }}
                />
              </Stack>
            </Paper>
          </Stack>
        </GridCol>

        <GridCol span={{ base: 12, sm: 12, md: 5, lg: 5, xl: 4 }}>
          <Paper
            pt={0}
            p={'xs'}
            radius={'md'}
            classNames={{ root: classes.categoryConfiguration }}
          >
            <Stack gap={'0'}>
              <Group justify="space-between" wrap="nowrap">
                <Text size="lg">Index</Text>
                <Select
                  w={'5rem'}
                  classNames={{
                    root: classes.selectRoot,
                    section: classes.selectSection,
                    input: classes.selectInput,
                    option: classes.selectOption,
                  }}
                  size="md"
                  data={availableSortOrdersData.map((order) => ({
                    value: order.toString(),
                    label: order.toString(),
                  }))}
                  value={sortOrder?.toString()}
                  variant="unstyled"
                  rightSection={
                    <FaCaretDown color="var(--vinaup-blue-link)" size={24} />
                  }
                  onChange={handleUpdateSortOrder}
                />
              </Group>
              <Group justify="space-between" wrap="nowrap" mt={'sm'}>
                <ActionIcon
                  size="lg"
                  variant="subtle"
                  color="var(--vinaup-blue-link)"
                  onClick={() => setDeleteModalOpened(true)}
                >
                  <GrTrash size={24} color="var(--vinaup-blue-link)" />
                </ActionIcon>
                <Group gap={'xs'}>
                  <Button
                    onClick={handleSaveAll}
                    loading={isSavingAll}
                    variant="filled"
                    color="teal"
                    size="sm"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => {
                      router.push('/adminup/diary-category');
                    }}
                    variant="filled"
                    color="blue"
                    size="xs"
                    bg={'#01426e'}
                  >
                    Exit
                  </Button>
                </Group>
              </Group>
            </Stack>
          </Paper>
          <Paper
            p={'xs'}
            radius={'md'}
            mt={'sm'}
            classNames={{ root: classes.paperBlock + ' ' + classes.videoSection }}
          >
            <Stack gap={'2px'}>
              <Group justify="space-between" wrap="nowrap">
                <Text size="lg">Video</Text>
                <Select
                  w={'6rem'}
                  size="sm"
                  comboboxProps={{ withinPortal: false }}
                  classNames={{
                    root: classes.selectRoot,
                    section: classes.selectSection,
                    input: classes.selectInput,
                    option: classes.selectOption,
                  }}
                  data={[
                    { value: 'top', label: 'Top' },
                    { value: 'bottom', label: 'Bottom' },
                  ]}
                  value={videoPosition}
                  variant="unstyled"
                  rightSection={
                    <FaCaretDown color="var(--vinaup-blue-link)" size={20} />
                  }
                  onChange={(value) => {
                    if (!value) return;
                    handleUpdateVideoPosition(value);
                  }}
                />
              </Group>
              <Group justify="space-between" wrap="nowrap">
                <UploadImageSection
                  size="md"
                  icon={<UploadIconV2 width={60} height={60} />}
                  isLoading={videoThumbnailLoading}
                  onImageSelect={
                    videoThumbnailUrl.length > 0
                      ? undefined
                      : handleSelectVideoThumbnail
                  }
                  onRemoveFile={
                    videoThumbnailUrl.length > 0
                      ? handleRemoveVideoThumbnail
                      : undefined
                  }
                  imageUrl={videoThumbnailUrl}
                />
                <Stack gap={'0'} w={'75%'}>
                  <Group justify="space-between" wrap="nowrap">
                    <TextInput
                      ref={videoUrlInputRef}
                      w={'100%'}
                      classNames={{
                        input: classes.videoUrlInput,
                      }}
                      variant="unstyled"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={(e) => {
                        handleUpdateVideoUrl(e.target.value);
                      }}
                    />
                    <ActionIcon
                      size="md"
                      variant="transparent"
                      onClick={() => handleFocusAndSelectInput(videoUrlInputRef)}
                    >
                      <PenIcon width={24} height={24} />
                    </ActionIcon>
                  </Group>
                  <Text size="sm" c="dimmed">
                    ← Auto or Upload thumbnail
                  </Text>
                </Stack>
              </Group>
            </Stack>
          </Paper>
          <Paper
            p={'xs'}
            radius={'md'}
            mt={'sm'}
            classNames={{ root: classes.paperBlock }}
          >
            <Stack gap={'0'}>
              <Text size="xl">Featured image</Text>
              <Group justify="center">
                <UploadImageSection
                  size="2xl"
                  icon={<UploadIconV3 width={200} height={200} />}
                  isLoading={mainImageLoading}
                  imageUrl={mainImageUrl}
                  onImageSelect={
                    mainImageUrl.length > 0 ? undefined : handleSelectMainImage
                  }
                  onRemoveFile={
                    mainImageUrl.length > 0 ? handleRemoveMainImage : undefined
                  }
                />
              </Group>
              <Group justify="center">
                <Text size="sm" c="dimmed">
                  (png, jpg; jpeg; Size &lt; 2M)
                </Text>
              </Group>
            </Stack>
          </Paper>
        </GridCol>
      </Grid>

      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="Confirm Delete"
        centered
      >
        <Stack>
          <Text>Are you sure you want to delete this diary category?</Text>
          <Group justify="flex-end" mt="sm">
            <Button
              variant="default"
              onClick={() => setDeleteModalOpened(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleDeleteDiaryCategory}
              loading={isDeleting}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}
