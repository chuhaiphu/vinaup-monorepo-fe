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
  UnstyledButton,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './admin-page-detail-page-content.module.scss';
import { TextEditor } from '@vinaup/ui/admin';
import UploadImageSection from '@/components/primitives/upload-image-section/upload-image-section';
import { use, useEffect, useRef, useState } from 'react';
import {
  createPageActionPrivate,
  deletePageActionPrivate,
  updatePageActionPrivate,
} from '@/actions/page-action';
import { IPageResponse } from '@/interfaces/page-interface';
import {
  generateUniqueEndpoint,
  stripHtmlAndTruncate,
} from '@/utils/function-helpers';
import { MAX_IMAGE_COUNT_ALLOWED, PAGE_TYPES } from '@/constants';
import { FaCaretDown } from 'react-icons/fa6';
import { GrTrash } from 'react-icons/gr';
import UploadIconV2 from '@/components/icons/vinaup-upload-icon-v2.svg';
import UploadIconV3 from '@/components/icons/vinaup-upload-icon-v3.svg';
import PenIcon from '@/components/icons/vinaup-pen-icon.svg';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { sanitizeEndpoint } from '@/utils/function-helpers';
import { useRouter } from 'next/navigation';
import { Route } from 'next';
import dayjs from 'dayjs';
import { ActionResponse } from '@/interfaces/_base-interface';
import { useAuth } from '@/providers/auth-provider';

interface AdminPageDetailPageContentProps {
  currentPagePromise: Promise<ActionResponse<IPageResponse>>;
}

export default function AdminPageDetailPageContent({
  currentPagePromise,
}: AdminPageDetailPageContentProps) {
  const currentPageResult = use(currentPagePromise);
  const { getUser } = useAuth();

  if (!currentPageResult.success || !currentPageResult.data) {
    return <div>Page not found</div>;
  }

  const currentPageData = currentPageResult.data;

  return (
    <AdminPageDetailPageContentInner
      currentPageData={currentPageData}
      userId={getUser()?.id ?? ''}
    />
  );
}

interface AdminPageDetailPageContentInnerProps {
  currentPageData: IPageResponse;
  userId: string;
}

function AdminPageDetailPageContentInner({
  currentPageData,
  userId,
}: AdminPageDetailPageContentInnerProps) {
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>(
    currentPageData.additionalImageUrls
  );
  const [additionalImagesPosition, setAdditionalImagesPosition] = useState<string>(
    currentPageData.additionalImagesPosition || 'top'
  );
  const [videoUrl, setVideoUrl] = useState<string>(currentPageData.videoUrl || '');
  const [videoThumbnailUrl, setVideoThumbnailUrl] = useState<string>(
    currentPageData.videoThumbnailUrl || ''
  );
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    currentPageData.mainImageUrl || ''
  );
  const [videoPosition, setVideoPosition] = useState<string>(
    currentPageData.videoPosition || 'bottom'
  );
  const [loadingImageIndex, setLoadingImageIndex] = useState<number | null>(null);
  const [videoThumbnailLoading, setVideoThumbnailLoading] =
    useState<boolean>(false);
  const [mainImageLoading, setMainImageLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(currentPageData.title);
  const [content, setContent] = useState<string>(currentPageData.content || '');
  const [status, setStatus] = useState<string>(currentPageData.visibility);
  const [pageType, setPageType] = useState<string>(currentPageData.type);
  const [endpoint, setEndpoint] = useState<string>(currentPageData.endpoint);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isSavingAll, setIsSavingAll] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setEndpoint(currentPageData.endpoint);
  }, [currentPageData.endpoint]);

  const videoUrlInputRef = useRef<HTMLInputElement>(null);
  const endpointInputRef = useRef<HTMLInputElement>(null);
  const handleFocusAndSelectInput = (
    ref: React.RefObject<HTMLInputElement | null>
  ) => {
    if (ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  };

  const handleAddNewPage = async () => {
    setIsCreating(true);
    const newTitle = 'Untitled';
    const endpoint = await generateUniqueEndpoint(newTitle, 'page');

    const response = await createPageActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: [],
      userId: userId,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create page failed',
        message: response.error || 'Failed to create page',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }
    const pageId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/page/${pageId}` as Route);
    notifications.show({
      title: 'New page created',
      message: 'New page has been successfully created',
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
      await updatePageActionPrivate(currentPageData.id, {
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
    await updatePageActionPrivate(currentPageData.id, {
      additionalImageUrls: newImages,
    });
    setLoadingImageIndex(null);
  };

  const handleSelectVideoThumbnail = async (imageUrl: string) => {
    setVideoThumbnailLoading(true);
    try {
      await updatePageActionPrivate(currentPageData.id, {
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
    await updatePageActionPrivate(currentPageData.id, {
      videoThumbnailUrl: '',
    });
    setVideoThumbnailLoading(false);
  };

  const handleSelectMainImage = async (imageUrl: string) => {
    setMainImageLoading(true);
    try {
      await updatePageActionPrivate(currentPageData.id, { mainImageUrl: imageUrl });
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
    await updatePageActionPrivate(currentPageData.id, {
      mainImageUrl: '',
    });
    setMainImageLoading(false);
  };

  const handleUpdateTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleUpdateEndpoint = (newEndpoint: string) => {
    setEndpoint(newEndpoint);
  };

  const handleUpdateContent = (newContent: string) => {
    setContent(newContent);
  };

  const handleUpdateAdditionalImagesPosition = (newPosition: string) => {
    setAdditionalImagesPosition(newPosition);
  };

  const handleUpdateStatus = (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleUpdatePageType = (newPageType: string) => {
    setPageType(newPageType);
  };

  const handleUpdateVideoPosition = (newPosition: string) => {
    setVideoPosition(newPosition);
  };

  const handleUpdateVideoUrl = (newUrl: string) => {
    setVideoUrl(newUrl);
  };

  // Generate SEO title and description
  const seoTitle = title ? stripHtmlAndTruncate(title, 100) : '';
  const seoContent = content ? stripHtmlAndTruncate(content, 300) : '';

  const handleCopyLink = () => {
    const link = `https://jenahair.com/${endpoint}`;
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
    const link = `https://jenahair.com/${endpoint}`;
    window.open(link, '_blank');
  };

  const handleSaveAll = async () => {
    setIsSavingAll(true);
    try {
      let finalEndpoint = endpoint;
      if (
        title !== currentPageData.title &&
        endpoint === currentPageData.endpoint
      ) {
        finalEndpoint = await generateUniqueEndpoint(
          title,
          'page',
          currentPageData.id
        );
      } else if (endpoint !== currentPageData.endpoint) {
        finalEndpoint = await generateUniqueEndpoint(
          endpoint,
          'page',
          currentPageData.id
        );
      }

      await updatePageActionPrivate(currentPageData.id, {
        title,
        endpoint: finalEndpoint,
        content,
        additionalImageUrls,
        additionalImagesPosition,
        visibility: status,
        type: pageType,
        videoPosition,
        videoUrl,
        videoThumbnailUrl,
        mainImageUrl,
      });

      setEndpoint(finalEndpoint);

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

  const handleDeletePage = async () => {
    setIsDeleting(true);
    try {
      const result = await deletePageActionPrivate(currentPageData.id);
      if (result.success) {
        router.replace('/adminup/page' as Route);
        notifications.show({
          message: 'Page has been successfully deleted',
          color: 'green',
          position: 'top-center',
        });
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete page',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: error instanceof Error ? error.message : 'Failed to delete page',
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpened(false);
    }
  };

  return (
    <div className={classes.adminPageDetailPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Page detail</Text>
        <Group gap="xs">
          <UnstyledButton onClick={handleAddNewPage} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon
            variant="transparent"
            onClick={handleAddNewPage}
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
                <Group gap={'xs'} justify="space-between" wrap="nowrap">
                  <Group gap={0} wrap="nowrap" className={classes.urlGroup}>
                    <Group gap={4}>
                      <Text size="md" c="dark.3">
                        Custom URL:
                      </Text>
                      <Text size="md">jenahair.com/</Text>
                    </Group>
                    <Group gap={0}>
                      <TextInput
                        ref={endpointInputRef}
                        classNames={{ input: classes.endpointInput }}
                        variant="unstyled"
                        value={endpoint}
                        onChange={(e) => {
                          const sanitized = sanitizeEndpoint(e.target.value);
                          handleUpdateEndpoint(sanitized);
                        }}
                      />
                      <ActionIcon
                        size="md"
                        variant="transparent"
                        onClick={() => handleFocusAndSelectInput(endpointInputRef)}
                      >
                        <PenIcon width={24} height={24} />
                      </ActionIcon>
                    </Group>
                  </Group>
                  <Group gap={'xs'}>
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
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <Paper
            p={'xs'}
            radius={'md'}
            classNames={{
              root: classes.pageConfiguration,
            }}
          >
            <Stack gap={'0'}>
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
              <Group justify="space-between" wrap="nowrap" mt={'0'}>
                <Text size="lg">Theme</Text>
                <Select
                  classNames={{
                    root: classes.selectRoot,
                    input: classes.selectInput,
                    section: classes.selectSection,
                  }}
                  size="md"
                  data={PAGE_TYPES}
                  value={pageType}
                  variant="unstyled"
                  rightSection={
                    <FaCaretDown color="var(--vinaup-blue-link)" size={24} />
                  }
                  onChange={(value) => {
                    if (!value) return;
                    handleUpdatePageType(value);
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
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => {
                      router.push('/adminup/page' as Route);
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
      <Paper
        p={'md'}
        radius={'md'}
        mt={'md'}
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
              href={`https://jenahair.com/${endpoint}`}
              target="_blank"
              size="lg"
              fw={500}
              c={'var(--vinaup-teal)'}
            >
              {seoTitle || currentPageData.title}
            </Text>
            <Text
              component="a"
              href={`https://jenahair.com/${endpoint}`}
              target="_blank"
              size="md"
              c={'var(--vinaup-blue-link)'}
            >
              https://jenahair.com/{endpoint}
            </Text>
            <Text size="sm">
              {dayjs(currentPageData.updatedAt).format('MMM DD, YYYY')}
            </Text>
            <div
              dangerouslySetInnerHTML={{ __html: seoContent || '' }}
              className={classes.htmlContent}
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
            <Button color="red" onClick={handleDeletePage} loading={isDeleting}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}
