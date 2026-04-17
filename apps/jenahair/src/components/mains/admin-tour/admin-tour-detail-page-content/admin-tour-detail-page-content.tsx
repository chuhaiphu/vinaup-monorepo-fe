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
import classes from './admin-tour-detail-page-content.module.scss';
import { TextEditor } from '@vinaup/ui/admin';
import UploadImageSection from '@/components/primitives/upload-image-section/upload-image-section';
import { use, useEffect, useMemo, useRef, useState } from 'react';
import {
  createTourActionPrivate,
  deleteTourActionPrivate,
  updateTourActionPrivate,
} from '@/actions/tour-action';
import { ITourResponse } from '@/interfaces/tour-interface';
import {
  generateUniqueEndpoint,
  stripHtmlAndTruncate,
} from '@/utils/function-helpers';
import { MAX_IMAGE_COUNT_ALLOWED, VN_PROVINCES } from '@/constants';
import dayjs from 'dayjs';
import { FaCaretDown, FaCheck } from 'react-icons/fa6';
import { GrTrash } from 'react-icons/gr';
import { VinaupUnlockIcon as UnlockIcon } from '@vinaup/ui/cores';
import UploadIconV2 from '@/components/icons/vinaup-upload-icon-v2.svg';
import UploadIconV3 from '@/components/icons/vinaup-upload-icon-v3.svg';
import PenIcon from '@/components/icons/vinaup-pen-icon.svg';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { useRouter } from 'next/navigation';
import { ITourCategoryResponse } from '@/interfaces/tour-category-interface';
import { ITourCategoryTourResponse } from '@/interfaces/tour-category-tour-interface';
import {
  createTourCategoryTourActionPrivate,
  deleteTourCategoryTourActionPrivate,
} from '@/actions/tour-category-tour-action';
import { TreeManager } from '@vinaup/utils/tree-manager';
import { Route } from 'next';
import { ActionResponse } from '@/interfaces/_base-interface';
import { useAuth } from '@/providers/auth-provider';

interface AdminTourDetailPageContentProps {
  currentTourPromise: Promise<ActionResponse<ITourResponse>>;
  tourCategoriesPromise: Promise<ActionResponse<ITourCategoryResponse[]>>;
}

export default function AdminTourDetailPageContent({
  currentTourPromise,
  tourCategoriesPromise,
}: AdminTourDetailPageContentProps) {
  const currentTourResult = use(currentTourPromise);
  const tourCategoriesResult = use(tourCategoriesPromise);
  const { getUser } = useAuth();

  if (!currentTourResult.success || !currentTourResult.data) {
    return <div>Tour not found</div>;
  }

  const currentTourData = currentTourResult.data;
  const tourCategoriesData = tourCategoriesResult.data ?? [];

  return (
    <AdminTourDetailPageContentInner
      currentTourData={currentTourData}
      tourCategoriesData={tourCategoriesData}
      userId={getUser()?.id ?? ''}
    />
  );
}

interface AdminTourDetailPageContentInnerProps {
  currentTourData: ITourResponse;
  tourCategoriesData: ITourCategoryResponse[];
  userId: string;
}

function AdminTourDetailPageContentInner({
  currentTourData,
  tourCategoriesData,
  userId,
}: AdminTourDetailPageContentInnerProps) {
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>(
    currentTourData.additionalImageUrls
  );
  const [additionalImagesPosition, setAdditionalImagesPosition] = useState<string>(
    currentTourData.additionalImagesPosition || 'top'
  );
  const [videoUrl, setVideoUrl] = useState<string>(currentTourData.videoUrl || '');
  const [videoThumbnailUrl, setVideoThumbnailUrl] = useState<string>(
    currentTourData.videoThumbnailUrl || ''
  );
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    currentTourData.mainImageUrl || ''
  );
  const [videoPosition, setVideoPosition] = useState<string>(
    currentTourData.videoPosition || 'bottom'
  );
  const [loadingImageIndex, setLoadingImageIndex] = useState<number | null>(null);
  const [videoThumbnailLoading, setVideoThumbnailLoading] =
    useState<boolean>(false);
  const [mainImageLoading, setMainImageLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(currentTourData.title);
  const [description, setDescription] = useState<string>(
    currentTourData.description || ''
  );
  const [content, setContent] = useState<string>(currentTourData.content || '');
  const [destinations, setDestinations] = useState<string[]>(
    currentTourData.destinations
  );
  const [status, setStatus] = useState<string>(currentTourData.visibility);
  const [sortOrder, setSortOrder] = useState<number>(currentTourData.sortOrder);
  const [normalPrice, setNormalPrice] = useState<number>(currentTourData.price);
  const [discountPrice, setDiscountPrice] = useState<number>(
    currentTourData.discountPrice
  );
  const [childPrice, setChildPrice] = useState<number>(currentTourData.childPrice);
  const [type, setType] = useState<string>(currentTourData.type);
  const [duration, setDuration] = useState<number>(currentTourData.durationDays);
  const [tourCategoryTours, setTourCategoryTours] = useState<
    ITourCategoryTourResponse[]
  >(currentTourData.tourCategoryTours);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isSavingAll, setIsSavingAll] = useState<boolean>(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    currentTourData.tourCategoryTours.map((bcb) => bcb.tourCategoryId)
  );

  const router = useRouter();

  useEffect(() => {
    setTourCategoryTours(currentTourData.tourCategoryTours);
    setSelectedCategoryIds(
      currentTourData.tourCategoryTours.map((bcb) => bcb.tourCategoryId)
    );
  }, [currentTourData.tourCategoryTours]);

  const treeManager = useMemo(() => {
    if (tourCategoriesData.length === 0) {
      return null;
    }
    return new TreeManager(tourCategoriesData);
  }, [tourCategoriesData]);

  const videoUrlInputRef = useRef<HTMLInputElement>(null);
  const handleFocusAndSelectInput = (
    ref: React.RefObject<HTMLInputElement | null>
  ) => {
    if (ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  };

  const handleAddNewTour = async () => {
    setIsCreating(true);
    const newTitle = '';
    const endpoint = await generateUniqueEndpoint(newTitle, 'tour');

    const response = await createTourActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: ['Ho Chi Minh'],
      userId: userId,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create tour failed',
        message: response.error || 'Failed to create tour',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }
    const tourId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/tour/${tourId}` as Route);
    notifications.show({
      title: 'New tour created',
      message: 'New tour has been successfully created',
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
      await updateTourActionPrivate(currentTourData.id, {
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

    // Optimistic update UI
    setAdditionalImageUrls(newImages);
    // Update database
    await updateTourActionPrivate(currentTourData.id, {
      additionalImageUrls: newImages,
    });
    setLoadingImageIndex(null);
  };

  const handleSelectVideoThumbnail = async (imageUrl: string) => {
    setVideoThumbnailLoading(true);
    try {
      await updateTourActionPrivate(currentTourData.id, {
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
    // Optimistic update UI
    setVideoThumbnailUrl('');
    // Update database
    await updateTourActionPrivate(currentTourData.id, {
      videoThumbnailUrl: '',
    });
    setVideoThumbnailLoading(false);
  };

  const handleSelectMainImage = async (imageUrl: string) => {
    setMainImageLoading(true);
    try {
      await updateTourActionPrivate(currentTourData.id, { mainImageUrl: imageUrl });
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
    // Optimistic update UI
    setMainImageUrl('');
    // Update database
    await updateTourActionPrivate(currentTourData.id, {
      mainImageUrl: '',
    });
    setMainImageLoading(false);
  };

  const handleUpdateTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleUpdateDescription = (newDescription: string) => {
    setDescription(newDescription);
  };

  const handleUpdateContent = (newContent: string) => {
    setContent(newContent);
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

  const handleUpdateSortOrder = (newSortOrder: string) => {
    const sortOrderNumber = Number(newSortOrder);
    setSortOrder(sortOrderNumber);
  };

  const handleUpdateType = (newType: string) => {
    setType(newType);
  };

  const handleUpdateNormalPrice = (newPrice: number | string) => {
    setNormalPrice(Number(newPrice));
  };

  const handleUpdateDiscountPrice = (newPrice: number | string) => {
    setDiscountPrice(Number(newPrice));
  };

  const handleUpdateChildPrice = (newPrice: number | string) => {
    setChildPrice(Number(newPrice));
  };

  const handleUpdateVideoPosition = (newPosition: string) => {
    setVideoPosition(newPosition);
  };

  const handleUpdateVideoUrl = (newUrl: string) => {
    setVideoUrl(newUrl);
  };

  const handleUpdateDuration = (newDuration: string) => {
    const newDurationNumber = Number(newDuration);
    setDuration(newDurationNumber);
  };

  // Generate SEO title and description
  const seoTitle = title ? stripHtmlAndTruncate(title, 100) : '';
  const seoDescription = description ? stripHtmlAndTruncate(description, 300) : '';

  const handleCopyLink = () => {
    const link = `https://jenahair.com/tours/${currentTourData.endpoint}`;
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
    const link = `https://jenahair.com/tours/${currentTourData.endpoint}`;
    window.open(link, '_blank');
  };

  const handleDeleteTour = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteTourActionPrivate(currentTourData.id);
      if (result.success) {
        router.replace('/adminup/tour');
        notifications.show({
          message: 'Tour has been successfully deleted',
          color: 'green',
          position: 'top-center',
        });
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete tour',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: error instanceof Error ? error.message : 'Failed to delete tour',
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
      let newEndpoint = currentTourData.endpoint;
      if (title !== currentTourData.title) {
        newEndpoint = await generateUniqueEndpoint(
          title,
          'tour',
          currentTourData.id
        );
      }

      const updatePayload = {
        title,
        endpoint: newEndpoint,
        description,
        content,
        additionalImageUrls,
        additionalImagesPosition,
        videoUrl,
        videoThumbnailUrl,
        mainImageUrl,
        videoPosition,
        destinations,
        visibility: status,
        sortOrder,
        price: normalPrice,
        discountPrice,
        childPrice,
        type,
        durationDays: duration,
      };

      await updateTourActionPrivate(currentTourData.id, updatePayload);

      const currentTourCategoryIds = currentTourData.tourCategoryTours.map(
        (bcb) => bcb.tourCategoryId
      );

      const toAdd = selectedCategoryIds.filter(
        (id) => !currentTourCategoryIds.includes(id)
      );
      const toRemove = currentTourCategoryIds.filter(
        (id) => !selectedCategoryIds.includes(id)
      );

      for (const tourCategoryId of toAdd) {
        await createTourCategoryTourActionPrivate({
          tourId: currentTourData.id,
          tourCategoryId: tourCategoryId,
          sortOrder: 0,
        });
      }

      for (const tourCategoryId of toRemove) {
        const tourCategoryTour = currentTourData.tourCategoryTours.find(
          (bcb) => bcb.tourCategoryId === tourCategoryId
        );
        if (tourCategoryTour) {
          await deleteTourCategoryTourActionPrivate(tourCategoryTour.id);
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

  // tour category options record for renderTourCategoryOption to reference the id from option value
  const tourCategoryOptionsData: Record<string, ITourCategoryResponse> =
    tourCategoriesData.reduce(
      (acc, tourCategory) => {
        acc[tourCategory.id] = tourCategory;
        return acc;
      },
      {} as Record<string, ITourCategoryResponse>
    );

  // Helper function to get parent chain recursively
  const getOptionChain = (tourCategoryId: string): ITourCategoryResponse[] => {
    const tourCategoryChain = tourCategoryOptionsData[tourCategoryId];
    if (!tourCategoryChain) return [];
    if (tourCategoryChain.parent) {
      return [...getOptionChain(tourCategoryChain.parent.id), tourCategoryChain];
    }
    return [tourCategoryChain];
  };

  const getOptionChainWithoutRoot = (
    tourCategoryId: string
  ): ITourCategoryResponse[] => {
    const parentChain = getOptionChain(tourCategoryId);
    return parentChain.slice(1);
  };

  const renderTourCategoryOption: MultiSelectProps['renderOption'] = ({
    option,
    checked,
  }) => {
    const parentChain = getOptionChainWithoutRoot(option.value);

    // If has parent(s), show the full chain
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

    // Root category (no parent)
    return (
      <Group gap="sm" justify="space-between">
        {checked && <FaCheck size={20} color="gray" />}
        <Text size="sm" fw={500}>
          {tourCategoryOptionsData[option.value].title}
        </Text>
      </Group>
    );
  };

  const handleUpdateTourCategories = (newTourCategoryIds: string[]) => {
    setSelectedCategoryIds(newTourCategoryIds);
  };

  return (
    <div className={classes.adminTourDetailPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Tour detail</Text>
        <Group gap="xs">
          <UnstyledButton onClick={handleAddNewTour} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon
            variant="transparent"
            onClick={handleAddNewTour}
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
                    URL: jenahair.com/tours/{currentTourData.endpoint}
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
                <Text>Description / Overview</Text>
                <TextEditor
                  content={description}
                  onChange={(newDescription) => {
                    handleUpdateDescription(newDescription);
                  }}
                />
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
                      value={currentTourData.country}
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
                    href={`https://jenahair.com/tours/${currentTourData.endpoint}`}
                    target="_blank"
                    size="lg"
                    fw={500}
                    c={'var(--vinaup-teal)'}
                  >
                    {seoTitle || currentTourData.title}
                  </Text>
                  <Text
                    component="a"
                    href={`https://jenahair.com/tours/${currentTourData.endpoint}`}
                    target="_blank"
                    size="md"
                    c={'var(--vinaup-blue-link)'}
                  >
                    https://jenahair.com/tours/{currentTourData.endpoint}
                  </Text>
                  <Text size="sm">
                    {dayjs(currentTourData.updatedAt).format('MMM DD, YYYY')}
                  </Text>
                  <div
                    dangerouslySetInnerHTML={{ __html: seoDescription || '' }}
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
                    classNames={{ input: classes.seoTextInput }}
                    size="md"
                    placeholder="..."
                    value={seoDescription}
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
              root: classes.tourConfiguration,
            }}
          >
            <Stack gap={'0'}>
              <Group justify="space-between" wrap="nowrap">
                <Text size="lg">Updated at</Text>
                <Group>
                  <Text size="md" fw={500} lh={'2.5rem'}>
                    {dayjs(currentTourData.updatedAt).format('DD/MM/YYYY')}
                  </Text>
                  <Text size="md" fw={500} lh={'2.5rem'}>
                    {dayjs(currentTourData.updatedAt).format('HH:mm')}
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
              <Group justify="space-between" wrap="nowrap">
                <Text size="lg">Type</Text>
                <Select
                  w={'5rem'}
                  classNames={{
                    root: classes.selectRoot,
                    section: classes.selectSection,
                    input: classes.selectInput,
                    option: classes.selectOption,
                  }}
                  size="md"
                  data={[
                    { value: 'hot', label: 'Hot' },
                    { value: 'sale', label: 'Sale' },
                    { value: 'new', label: 'New' },
                  ]}
                  value={type}
                  variant="unstyled"
                  rightSection={
                    <FaCaretDown color="var(--vinaup-blue-link)" size={24} />
                  }
                  onChange={(value) => {
                    if (!value) return;
                    handleUpdateType(value);
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
                      router.push('/adminup/tour');
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
            pb={0}
            radius={'md'}
            mt={'sm'}
            classNames={{ root: classes.paperBlock }}
          >
            <Stack gap={'0'}>
              <Group justify="space-between" wrap="nowrap" mb={4}>
                <MultiSelect
                  placeholder={
                    tourCategoryTours.length < 3
                      ? 'Select up to 3 tour categories'
                      : ''
                  }
                  maxValues={3}
                  w={'100%'}
                  searchable
                  nothingFoundMessage="Not found"
                  value={tourCategoryTours.map(
                    (tourCategoryTour) => tourCategoryTour.tourCategoryId
                  )}
                  renderOption={renderTourCategoryOption}
                  data={treeManager
                    ?.toFlatListWithoutRoot()
                    .map((tourCategory) => ({
                      value: tourCategory.id,
                      label: tourCategory.title,
                    }))}
                  onChange={(tourCategoryIds) => {
                    if (!tourCategoryIds) return;
                    handleUpdateTourCategories(tourCategoryIds);
                  }}
                />
              </Group>
              <Group justify="space-between" wrap="nowrap">
                <Text size="lg">Duration</Text>
                <Select
                  scrollAreaProps={{
                    scrollbarSize: 6,
                    type: 'always',
                  }}
                  w={'8rem'}
                  classNames={{
                    root: classes.selectRoot,
                    section: classes.selectSection,
                    input: classes.selectInput,
                    option: classes.selectOptionWithDivider,
                  }}
                  data={[
                    { value: '0.5', label: 'Half day' },
                    { value: '1', label: '1 day' },
                    { value: '2', label: '2 days' },
                    { value: '3', label: '3 days' },
                    { value: '4', label: '4 days' },
                    { value: '5', label: '5 days' },
                    { value: '6', label: '6 days' },
                    { value: '7', label: '7 days' },
                    { value: '8', label: '8 days' },
                    { value: '9', label: '9 days' },
                    { value: '10', label: '10 days' },
                    { value: '11', label: '11 days' },
                    { value: '12', label: '12 days' },
                    { value: '13', label: '13 days' },
                    { value: '14', label: '14 days' },
                    { value: '15', label: '15 days' },
                    { value: '16', label: '16 days' },
                    { value: '17', label: '17 days' },
                    { value: '18', label: '18 days' },
                    { value: '19', label: '19 days' },
                    { value: '20', label: '20 days' },
                    { value: '21', label: '21 days' },
                    { value: '22', label: '22 days' },
                    { value: '23', label: '23 days' },
                    { value: '24', label: '24 days' },
                    { value: '25', label: '25 days' },
                    { value: '26', label: '26 days' },
                    { value: '27', label: '27 days' },
                    { value: '28', label: '28 days' },
                    { value: '29', label: '29 days' },
                    { value: '30', label: '30 days' },
                  ]}
                  size="md"
                  value={duration.toString()}
                  placeholder="Select duration"
                  nothingFoundMessage="Not found"
                  onChange={(value) => {
                    if (!value) return;
                    setDuration(Number(value));
                    handleUpdateDuration(value);
                  }}
                  variant="unstyled"
                  rightSection={
                    <FaCaretDown color="var(--vinaup-blue-link)" size={24} />
                  }
                />
              </Group>
            </Stack>
          </Paper>
          <Paper
            p={'xs'}
            radius={'md'}
            mt={'sm'}
            classNames={{ root: classes.paperBlock }}
          >
            <Group justify="space-between">
              <Group>
                <Text size="lg">Boss:</Text>
                <Text size="lg" c={'var(--vinaup-blue-link)'}>
                  Accept
                </Text>
              </Group>
              <UnlockIcon size={24} />
            </Group>
          </Paper>
          <Paper
            p={'xs'}
            radius={'md'}
            mt={'sm'}
            classNames={{ root: classes.paperBlock }}
          >
            <Stack gap={'xs'}>
              <Group justify="space-between">
                <Text size="lg">Price:</Text>
                <Text size="lg" c={'var(--vinaup-blue-link)'}>
                  VND
                </Text>
              </Group>
              <TextInput
                classNames={{
                  input: classes.priceInput,
                  section: classes.priceInputSection,
                }}
                leftSection="Adult:"
                size="md"
                placeholder="Input a adult price"
                value={normalPrice === 0 ? '' : normalPrice.toLocaleString('vi-VN')}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\./g, '');
                  if (rawValue === '' || /^\d+$/.test(rawValue)) {
                    const newValue = rawValue === '' ? 0 : Number(rawValue);
                    handleUpdateNormalPrice(newValue);
                  }
                }}
              />
              <TextInput
                classNames={{
                  input: classes.priceInput,
                  section: classes.priceInputSection,
                }}
                leftSection="Discount:"
                size="md"
                placeholder="Input a discount price"
                value={
                  discountPrice === 0 ? '' : discountPrice.toLocaleString('vi-VN')
                }
                disabled={normalPrice === 0}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\./g, '');
                  if (rawValue === '' || /^\d+$/.test(rawValue)) {
                    const newValue = rawValue === '' ? 0 : Number(rawValue);
                    handleUpdateDiscountPrice(newValue);
                  }
                }}
              />
              <TextInput
                classNames={{
                  input: classes.priceInput,
                  section: classes.priceInputSection,
                }}
                leftSection="Child:"
                size="md"
                placeholder="Input a child price"
                value={childPrice === 0 ? '' : childPrice.toLocaleString('vi-VN')}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\./g, '');
                  if (rawValue === '' || /^\d+$/.test(rawValue)) {
                    const newValue = rawValue === '' ? 0 : Number(rawValue);
                    handleUpdateChildPrice(newValue);
                  }
                }}
              />
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
                  (png, jpg; jpeg; Size ≤ 2M)
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
            <Button color="red" onClick={handleDeleteTour} loading={isDeleting}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}
