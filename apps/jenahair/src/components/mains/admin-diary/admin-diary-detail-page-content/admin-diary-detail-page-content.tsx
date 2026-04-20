'use client';

import {
  ActionIcon,
  Button,
  Grid,
  GridCol,
  Group,
  Modal,
  MultiSelect,
  MultiSelectProps,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './admin-diary-detail-page-content.module.scss';
import { TextEditor } from '@vinaup/ui/admin';
import UploadImageSection from '@/components/primitives/upload-image-section/upload-image-section';
import { use, useEffect, useMemo, useRef, useState } from 'react';
import {
  createDiaryActionPrivate,
  deleteDiaryActionPrivate,
  updateDiaryActionPrivate,
} from '@/actions/diary-action';
import { IDiaryResponse } from '@/interfaces/diary-interface';
import {
  generateUniqueEndpoint,
  stripHtmlAndTruncate,
} from '@/utils/function-helpers';
import { MAX_IMAGE_COUNT_ALLOWED, VN_PROVINCES } from '@/constants';
import { FaCaretDown, FaCheck } from 'react-icons/fa6';
import { GrTrash } from 'react-icons/gr';
import UploadIconV2 from '@/components/icons/vinaup-upload-icon-v2.svg';
import UploadIconV3 from '@/components/icons/vinaup-upload-icon-v3.svg';
import PenIcon from '@/components/icons/vinaup-pen-icon.svg';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { useRouter } from 'next/navigation';
import { IDiaryCategoryResponse } from '@/interfaces/diary-category-interface';
import {
  createDiaryCategoryDiaryActionPrivate,
  deleteDiaryCategoryDiaryActionPrivate,
} from '@/actions/diary-category-diary-action';
import { TreeManager } from '@vinaup/utils/tree-manager';
import { Route } from 'next';
import dayjs from 'dayjs';
import { ActionResponse } from '@/interfaces/_base-interface';
import { useAuth } from '@/providers/auth-provider';

interface AdminDiaryDetailPageContentProps {
  currentDiaryPromise: Promise<ActionResponse<IDiaryResponse>>;
  diaryCategoriesPromise: Promise<ActionResponse<IDiaryCategoryResponse[]>>;
}

export default function AdminDiaryDetailPageContent({
  currentDiaryPromise,
  diaryCategoriesPromise,
}: AdminDiaryDetailPageContentProps) {
  const currentDiaryResult = use(currentDiaryPromise);
  const diaryCategoriesResult = use(diaryCategoriesPromise);
  const { getUser } = useAuth();

  if (!currentDiaryResult.success || !currentDiaryResult.data) {
    return <div>Diary not found</div>;
  }

  const currentDiaryData = currentDiaryResult.data;
  const diaryCategoriesData = diaryCategoriesResult.data ?? [];

  return (
    <AdminDiaryDetailPageContentInner
      currentDiaryData={currentDiaryData}
      diaryCategoriesData={diaryCategoriesData}
      userId={getUser()?.id ?? ''}
    />
  );
}

interface AdminDiaryDetailPageContentInnerProps {
  currentDiaryData: IDiaryResponse;
  diaryCategoriesData: IDiaryCategoryResponse[];
  userId: string;
}

function AdminDiaryDetailPageContentInner({
  currentDiaryData,
  diaryCategoriesData,
  userId,
}: AdminDiaryDetailPageContentInnerProps) {
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>(
    currentDiaryData.additionalImageUrls
  );
  const [additionalImagesPosition, setAdditionalImagesPosition] = useState<string>(
    currentDiaryData.additionalImagesPosition || 'top'
  );
  const [videoUrl, setVideoUrl] = useState<string>(currentDiaryData.videoUrl || '');
  const [videoThumbnailUrl, setVideoThumbnailUrl] = useState<string>(
    currentDiaryData.videoThumbnailUrl || ''
  );
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    currentDiaryData.mainImageUrl || ''
  );
  const [videoPosition, setVideoPosition] = useState<string>(
    currentDiaryData.videoPosition || 'bottom'
  );
  const [loadingImageIndex, setLoadingImageIndex] = useState<number | null>(null);
  const [videoThumbnailLoading, setVideoThumbnailLoading] =
    useState<boolean>(false);
  const [mainImageLoading, setMainImageLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(currentDiaryData.title);
  const [content, setContent] = useState<string>(currentDiaryData.content || '');
  const [destinations, setDestinations] = useState<string[]>(
    currentDiaryData.destinations
  );
  const [status, setStatus] = useState<string>(currentDiaryData.visibility);
  const [sortOrder, setSortOrder] = useState<number>(currentDiaryData.sortOrder);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    currentDiaryData.diaryCategoryDiaries.map((dcd) => dcd.diaryCategoryId)
  );

  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isSavingAll, setIsSavingAll] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    setSelectedCategoryIds(
      currentDiaryData.diaryCategoryDiaries.map((dcd) => dcd.diaryCategoryId)
    );
  }, [currentDiaryData.diaryCategoryDiaries]);

  const treeManager = useMemo(() => {
    if (diaryCategoriesData.length === 0) {
      return null;
    }
    return new TreeManager(diaryCategoriesData);
  }, [diaryCategoriesData]);

  const videoUrlInputRef = useRef<HTMLInputElement>(null);
  const handleFocusAndSelectInput = (
    ref: React.RefObject<HTMLInputElement | null>
  ) => {
    if (ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  };

  const handleAddNewDiary = async () => {
    setIsCreating(true);
    const newTitle = '';
    const endpoint = await generateUniqueEndpoint(newTitle, 'diary');
    const response = await createDiaryActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: ['Ho Chi Minh'],
      userId: userId,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create diary failed',
        message: response.error || 'Failed to create diary',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }
    const diaryId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/diary/${diaryId}` as Route);
    notifications.show({
      title: 'New diary created',
      message: 'New diary has been successfully created',
      color: 'green',
      position: 'top-center',
    });
  };

  const handleSelectAdditionalImage = async (
    imageUrl: string,
    imageIndex: number
  ) => {
    setLoadingImageIndex(imageIndex);
    try {
      await updateDiaryActionPrivate(currentDiaryData.id, {
        additionalImageUrls: [...additionalImageUrls, imageUrl],
      });
      setAdditionalImageUrls([...additionalImageUrls, imageUrl]);
    } catch (error) {
      notifications.show({
        title: 'Failed to set image',
        message: error instanceof Error ? error.message : '',
        color: 'red',
      });
    } finally {
      setLoadingImageIndex(null);
    }
  };

  const handleRemoveAdditionalImage = async (imageIndex: number) => {
    setLoadingImageIndex(imageIndex);
    const newImages = additionalImageUrls.filter((_, idx) => idx !== imageIndex);

    setAdditionalImageUrls(newImages);
    await updateDiaryActionPrivate(currentDiaryData.id, {
      additionalImageUrls: newImages,
    });
    setLoadingImageIndex(null);
  };

  const handleSelectVideoThumbnail = async (imageUrl: string) => {
    setVideoThumbnailLoading(true);
    try {
      await updateDiaryActionPrivate(currentDiaryData.id, {
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
    await updateDiaryActionPrivate(currentDiaryData.id, {
      videoThumbnailUrl: '',
    });
    setVideoThumbnailLoading(false);
  };

  const handleSelectMainImage = async (imageUrl: string) => {
    setMainImageLoading(true);
    try {
      await updateDiaryActionPrivate(currentDiaryData.id, {
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
    await updateDiaryActionPrivate(currentDiaryData.id, {
      mainImageUrl: '',
    });
    setMainImageLoading(false);
  };

  const handleUpdateTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleUpdateAdditionalImagesPosition = (newPosition: string) => {
    setAdditionalImagesPosition(newPosition);
  };

  const handleUpdateDestinations = (newDestinations: string[]) => {
    setDestinations(newDestinations);
  };

  const handleUpdateStatus = (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleUpdateContent = (newContent: string) => {
    setContent(newContent);
  };

  const handleUpdateSortOrder = (newSortOrder: string) => {
    const sortOrderNumber = Number(newSortOrder);
    setSortOrder(sortOrderNumber);
  };

  const handleUpdateVideoPosition = (newPosition: string) => {
    setVideoPosition(newPosition);
  };

  const handleUpdateVideoUrl = (newVideoUrl: string) => {
    setVideoUrl(newVideoUrl);
  };

  const seoTitle = title ? stripHtmlAndTruncate(title, 100) : '';
  const seoContent = content ? stripHtmlAndTruncate(content, 300) : '';

  const handleCopyLink = () => {
    const link = `https://jenahair.com/nhat-ky/${currentDiaryData.endpoint}`;
    navigator.clipboard.writeText(link);
    notifications.show({
      title: 'Link copied',
      message: 'Link has been copied to clipboard',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  };

  const handleViewLink = () => {
    const link = `https://jenahair.com/nhat-ky/${currentDiaryData.endpoint}`;
    window.open(link, '_blank');
  };

  const handleDeleteDiary = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteDiaryActionPrivate(currentDiaryData.id);
      if (result.success) {
        router.replace('/adminup/diary');
        notifications.show({
          message: 'Diary has been successfully deleted',
          color: 'green',
          position: 'top-center',
        });
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete diary',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: error instanceof Error ? error.message : 'Failed to delete diary',
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpened(false);
    }
  };

  const handleSaveAll = async () => {
    setIsSavingAll(true);
    try {
      let newEndpoint = currentDiaryData.endpoint;
      if (title !== currentDiaryData.title) {
        newEndpoint = await generateUniqueEndpoint(
          title,
          'diary',
          currentDiaryData.id
        );
      }

      const updatePayload = {
        title: title,
        endpoint: newEndpoint,
        content: content,
        additionalImageUrls: additionalImageUrls,
        additionalImagesPosition: additionalImagesPosition,
        videoUrl: videoUrl,
        videoThumbnailUrl: videoThumbnailUrl,
        mainImageUrl: mainImageUrl,
        videoPosition: videoPosition,
        destinations: destinations,
        visibility: status,
        sortOrder: sortOrder,
      };

      await updateDiaryActionPrivate(currentDiaryData.id, updatePayload);

      const currentDiaryCategoryIds = currentDiaryData.diaryCategoryDiaries.map(
        (dcd) => dcd.diaryCategoryId
      );

      const toAdd = selectedCategoryIds.filter(
        (id) => !currentDiaryCategoryIds.includes(id)
      );
      const toRemove = currentDiaryCategoryIds.filter(
        (id) => !selectedCategoryIds.includes(id)
      );

      for (const diaryCategoryId of toAdd) {
        await createDiaryCategoryDiaryActionPrivate({
          diaryId: currentDiaryData.id,
          diaryCategoryId: diaryCategoryId,
          sortOrder: 0,
        });
      }

      for (const diaryCategoryId of toRemove) {
        const diaryCategoryDiary = currentDiaryData.diaryCategoryDiaries.find(
          (dcd) => dcd.diaryCategoryId === diaryCategoryId
        );
        if (diaryCategoryDiary) {
          await deleteDiaryCategoryDiaryActionPrivate(diaryCategoryDiary.id);
        }
      }

      notifications.show({
        title: 'Success',
        message: 'All changes have been saved successfully',
        color: 'green',
        position: 'top-right',
      });
    } catch (error) {
      notifications.show({
        title: 'Save failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        color: 'red',
      });
    } finally {
      setIsSavingAll(false);
    }
  };

  const diaryCategoryOptionsData: Record<string, IDiaryCategoryResponse> =
    diaryCategoriesData.reduce(
      (acc, diaryCategory) => {
        acc[diaryCategory.id] = diaryCategory;
        return acc;
      },
      {} as Record<string, IDiaryCategoryResponse>
    );

  const getOptionChain = (diaryCategoryId: string): IDiaryCategoryResponse[] => {
    const diaryCategoryChain = diaryCategoryOptionsData[diaryCategoryId];
    if (!diaryCategoryChain) return [];
    if (diaryCategoryChain.parent) {
      return [...getOptionChain(diaryCategoryChain.parent.id), diaryCategoryChain];
    }
    return [diaryCategoryChain];
  };

  const getOptionChainWithoutRoot = (
    diaryCategoryId: string
  ): IDiaryCategoryResponse[] => {
    const parentChain = getOptionChain(diaryCategoryId);
    return parentChain.slice(1);
  };

  const renderDiaryCategoryOption: MultiSelectProps['renderOption'] = ({
    option,
    checked,
  }) => {
    const parentChain = getOptionChainWithoutRoot(option.value);

    if (parentChain.length > 1) {
      return (
        <Group gap="xs" wrap="nowrap" justify="space-between">
          {checked && <FaCheck size={20} color="gray" />}
          <Group gap="xs" wrap="nowrap">
            {parentChain.map((category, index) => (
              <Group key={category.id} gap="xs" wrap="nowrap">
                <Text
                  size="sm"
                  fw={index === parentChain.length - 1 ? 500 : 400}
                  c={index === parentChain.length - 1 ? undefined : 'dark.3'}
                >
                  {category.title}
                </Text>
                {index < parentChain.length - 1 && (
                  <Text size="sm" c="dark.3" fw={300}>
                    ›
                  </Text>
                )}
              </Group>
            ))}
          </Group>
        </Group>
      );
    }

    return (
      <Group gap="sm" justify="space-between">
        {checked && <FaCheck size={20} color="gray" />}
        <Text size="sm" fw={500}>
          {diaryCategoryOptionsData[option.value].title}
        </Text>
      </Group>
    );
  };

  const handleUpdateDiaryCategories = (newDiaryCategoryIds: string[]) => {
    setSelectedCategoryIds(newDiaryCategoryIds);
  };

  return (
    <div className={classes.adminDiaryDetailPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Diary detail</Text>
        <Group gap="xs">
          <UnstyledButton onClick={handleAddNewDiary} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon
            variant="transparent"
            onClick={handleAddNewDiary}
            loading={isCreating}
          >
            <AddNewIcon width={32} height={32} />
          </ActionIcon>
        </Group>
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>
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
                    URL: jenahair.com/nhat-ky/{currentDiaryData.endpoint}
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
            </Paper>
            <Paper p={'sm'} radius={'md'} classNames={{ root: classes.paperBlock }}>
              <Stack gap={'xs'}>
                <Text>Content</Text>
                <TextEditor
                  content={content}
                  onChange={(newContent) => {
                    handleUpdateContent(newContent);
                  }}
                />
              </Stack>
            </Paper>
            <Paper p={'sm'} radius={'md'} classNames={{ root: classes.paperBlock }}>
              <Stack gap={'xs'}>
                <Group justify="space-between" wrap="nowrap">
                  <Text>Images Describer</Text>
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
                    value={additionalImagesPosition}
                    variant="unstyled"
                    rightSection={
                      <FaCaretDown color="var(--vinaup-blue-link)" size={20} />
                    }
                    onChange={(value) => {
                      if (!value) return;
                      handleUpdateAdditionalImagesPosition(value);
                    }}
                  />
                </Group>
                <Group>
                  {additionalImageUrls.map((imgUrl, index) => (
                    <UploadImageSection
                      key={index}
                      size="xl"
                      imageUrl={imgUrl}
                      isLoading={loadingImageIndex === index}
                      onImageSelect={(imageUrl) =>
                        handleSelectAdditionalImage(imageUrl, index)
                      }
                      onRemoveFile={() => handleRemoveAdditionalImage(index)}
                    />
                  ))}
                  {additionalImageUrls.length < MAX_IMAGE_COUNT_ALLOWED && (
                    <UploadImageSection
                      size="xl"
                      isLoading={loadingImageIndex === additionalImageUrls.length}
                      onImageSelect={(imageUrl) =>
                        handleSelectAdditionalImage(
                          imageUrl,
                          additionalImageUrls.length
                        )
                      }
                    />
                  )}
                </Group>
              </Stack>
            </Paper>
            <Paper p={'sm'} radius={'md'} classNames={{ root: classes.paperBlock }}>
              <Grid>
                <GridCol span={6}>
                  <Stack gap={'xs'}>
                    <Text>Country</Text>
                    <TextInput
                      size="md"
                      classNames={{
                        input: classes.countryInput,
                      }}
                      value={currentDiaryData.country}
                      disabled
                    />
                  </Stack>
                </GridCol>
                <GridCol span={6}>
                  <Stack gap={'xs'}>
                    <Text>Destination</Text>
                    <MultiSelect
                      maxValues={3}
                      size="md"
                      hidePickedOptions
                      data={VN_PROVINCES.map((p) => ({ value: p, label: p }))}
                      value={destinations}
                      placeholder={
                        destinations.length < 3 ? 'Select up to 3 destinations' : ''
                      }
                      searchable
                      nothingFoundMessage="Not found"
                      onChange={(value) => handleUpdateDestinations(value)}
                    />
                  </Stack>
                </GridCol>
              </Grid>
            </Paper>
            <Paper
              p={'md'}
              radius={'md'}
              withBorder
              classNames={{ root: classes.paperBlock }}
              bg={'var(--vinaup-soft-gray)'}
            >
              <Stack gap={4}>
                <div className={classes.seoBlockTitle}>
                  <b>S</b>earch <b>E</b>ngine <b>O</b>ptimization
                </div>
                <div className={classes.seoDivider} />
                <Stack gap={4}>
                  <Text
                    component="a"
                    href={`https://jenahair.com/nhat-ky/${currentDiaryData.endpoint}`}
                    target="_blank"
                    size="lg"
                    fw={500}
                    c={'var(--vinaup-teal)'}
                  >
                    {seoTitle || currentDiaryData.title}
                  </Text>
                  <Text
                    component="a"
                    href={`https://jenahair.com/nhat-ky/${currentDiaryData.endpoint}`}
                    target="_blank"
                    size="md"
                    c={'var(--vinaup-blue-link)'}
                  >
                    https://jenahair.com/nhat-ky/{currentDiaryData.endpoint}
                  </Text>
                  <Text size="sm">
                    {dayjs(currentDiaryData.updatedAt).format('MMM DD, YYYY')}
                  </Text>
                  <div
                    dangerouslySetInnerHTML={{ __html: seoContent || '' }}
                    className={classes.htmlDescription}
                  ></div>
                </Stack>
                <div className={classes.seoDivider} />
                <Stack gap={4}>
                  <Group justify="space-between" align="center">
                    <Text size="md" fw={500}>
                      Seo title
                    </Text>
                  </Group>
                  <TextInput
                    classNames={{
                      input: classes.seoTextInput,
                    }}
                    size="md"
                    placeholder="Name title (Suggest < 72 characters)"
                    value={seoTitle}
                    readOnly
                    disabled
                  />
                </Stack>
                <div className={classes.seoDivider} />
                <Stack gap={4}>
                  <Text size="md" fw={500}>
                    Seo description
                  </Text>
                  <TextInput
                    classNames={{
                      input: classes.seoTextInput,
                    }}
                    size="md"
                    placeholder="..."
                    value={seoContent}
                    readOnly
                    disabled
                  />
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <Paper
            p={'xs'}
            radius={'md'}
            classNames={{
              root: classes.diaryConfiguration,
            }}
          >
            <Stack gap={'0'}>
              <Group justify="space-between" wrap="nowrap">
                <Text size="lg">Updated at</Text>
                <Group>
                  <Text size="md" fw={500} lh={'2.5rem'}>
                    {dayjs(currentDiaryData.updatedAt).format('DD/MM/YYYY')}
                  </Text>
                  <Text size="md" fw={500} lh={'2.5rem'}>
                    {dayjs(currentDiaryData.updatedAt).format('HH:mm')}
                  </Text>
                </Group>
              </Group>
              <Group justify="space-between" wrap="nowrap">
                <Text size="lg">Status</Text>
                <Select
                  classNames={{
                    root: classes.selectRoot,
                    input: classes.selectInput,
                    section: classes.selectSection,
                  }}
                  size="md"
                  data={[
                    { value: 'public', label: 'Public' },
                    { value: 'private', label: 'Private' },
                  ]}
                  value={status}
                  variant="unstyled"
                  rightSection={
                    <FaCaretDown color="var(--vinaup-blue-link)" size={24} />
                  }
                  onChange={(value) => {
                    if (!value) return;
                    handleUpdateStatus(value);
                  }}
                />
              </Group>
              <Group justify="space-between" wrap="nowrap">
                <Text size="lg">Pin to Home</Text>
                <Select
                  scrollAreaProps={{
                    scrollbarSize: 6,
                    type: 'always',
                  }}
                  w={'5rem'}
                  classNames={{
                    root: classes.selectRoot,
                    section: classes.selectSection,
                    input: classes.selectInput,
                    option: classes.selectOption,
                  }}
                  size="md"
                  data={[
                    { value: '-1', label: 'Off' },
                    { value: '0', label: '1' },
                    { value: '1', label: '2' },
                    { value: '2', label: '3' },
                    { value: '3', label: '4' },
                    { value: '4', label: '5' },
                    { value: '5', label: '6' },
                    { value: '6', label: '7' },
                    { value: '7', label: '8' },
                    { value: '8', label: '9' },
                    { value: '9', label: '10' },
                  ]}
                  value={sortOrder.toString()}
                  variant="unstyled"
                  rightSection={
                    <FaCaretDown color="var(--vinaup-blue-link)" size={24} />
                  }
                  onChange={(value) => {
                    if (!value) return;
                    handleUpdateSortOrder(value);
                  }}
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
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      router.push('/adminup/diary');
                    }}
                    variant="filled"
                    color="blue"
                    size="sm"
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
            classNames={{ root: classes.paperBlock }}
          >
            <Group justify="space-between" wrap="nowrap">
              <MultiSelect
                placeholder={
                  selectedCategoryIds.length < 3
                    ? 'Select up to 3 diary categories'
                    : ''
                }
                size="md"
                maxValues={3}
                w={'100%'}
                searchable
                nothingFoundMessage="Not found"
                value={selectedCategoryIds}
                renderOption={renderDiaryCategoryOption}
                data={treeManager?.toFlatListWithoutRoot().map((diaryCategory) => ({
                  value: diaryCategory.id,
                  label: diaryCategory.title,
                }))}
                onChange={(diaryCategoryIds) => {
                  if (!diaryCategoryIds) return;
                  handleUpdateDiaryCategories(diaryCategoryIds);
                }}
              />
            </Group>
          </Paper>
          <Paper
            p={'xs'}
            radius={'md'}
            mt={'sm'}
            classNames={{ root: classes.paperBlock + ' ' + classes.videoSection }}
          >
            <Stack gap={'2px'}>
              <Group justify="space-between" wrap="nowrap">
                <Text size="lg">Video:</Text>
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
            classNames={{ root: classes.paperBlock + ' ' + classes.videoSection }}
          >
            <Stack gap={'0'}>
              <Text size="xl">Feature Image:</Text>
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
                <Text size="md" c="dimmed">
                  (png, jpg; jpeg; Size ≤ 5Mbs)
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
          <Group justify="flex-end" mt="sm">
            <Button
              variant="default"
              onClick={() => setDeleteModalOpened(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button color="red" onClick={handleDeleteDiary} loading={isDeleting}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}
