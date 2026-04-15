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
import classes from './admin-blog-detail-page-content.module.scss';
import { TextEditor } from '@vinaup/ui/admin';
import UploadImageSection from '@/components/primitives/upload-image-section/upload-image-section';
import { use, useEffect, useMemo, useRef, useState } from 'react';
import {
  createBlogActionPrivate,
  deleteBlogActionPrivate,
  updateBlogActionPrivate,
} from '@/actions/blog-action';
import { IBlogResponse } from '@/interfaces/blog-interface';
import { useDebouncedCallback } from 'use-debounce';
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
import { IBlogCategoryResponse } from '@/interfaces/blog-category-interface';
import { IBlogCategoryBlogResponse } from '@/interfaces/blog-category-blog-interface';
import {
  createBlogCategoryBlogActionPrivate,
  deleteBlogCategoryBlogActionPrivate,
} from '@/actions/blog-category-blog-action';
import { TreeManager } from '@vinaup/utils/tree-manager';
import { Route } from 'next';
import dayjs from 'dayjs';
import { ActionResponse } from '@/interfaces/_base-interface';
import { useAuth } from '@/providers/auth-provider';

interface AdminBlogDetailPageContentProps {
  currentBlogPromise: Promise<ActionResponse<IBlogResponse>>;
  blogCategoriesPromise: Promise<ActionResponse<IBlogCategoryResponse[]>>;
}

export default function AdminBlogDetailPageContent({
  currentBlogPromise,
  blogCategoriesPromise,
}: AdminBlogDetailPageContentProps) {
  const currentBlogResult = use(currentBlogPromise);
  const blogCategoriesResult = use(blogCategoriesPromise);
  const { getUser } = useAuth();

  if (!currentBlogResult.success || !currentBlogResult.data) {
    return <div>Blog not found</div>;
  }

  const currentBlogData = currentBlogResult.data;
  const blogCategoriesData = blogCategoriesResult.data ?? [];

  return (
    <AdminBlogDetailPageContentInner
      currentBlogData={currentBlogData}
      blogCategoriesData={blogCategoriesData}
      userId={getUser()?.id ?? ''}
    />
  );
}

interface AdminBlogDetailPageContentInnerProps {
  currentBlogData: IBlogResponse;
  blogCategoriesData: IBlogCategoryResponse[];
  userId: string;
}

function AdminBlogDetailPageContentInner({
  currentBlogData,
  blogCategoriesData,
  userId,
}: AdminBlogDetailPageContentInnerProps) {
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>(
    currentBlogData.additionalImageUrls
  );
  const [additionalImagesPosition, setAdditionalImagesPosition] = useState<string>(
    currentBlogData.additionalImagesPosition || 'top'
  );
  const [videoUrl, setVideoUrl] = useState<string>(currentBlogData.videoUrl || '');
  const [videoThumbnailUrl, setVideoThumbnailUrl] = useState<string>(
    currentBlogData.videoThumbnailUrl || ''
  );
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    currentBlogData.mainImageUrl || ''
  );
  const [videoPosition, setVideoPosition] = useState<string>(
    currentBlogData.videoPosition || 'bottom'
  );
  const [loadingImageIndex, setLoadingImageIndex] = useState<number | null>(null);
  const [videoThumbnailLoading, setVideoThumbnailLoading] =
    useState<boolean>(false);
  const [mainImageLoading, setMainImageLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(currentBlogData.title);
  // const [description, setDescription] = useState<string>(currentBlogData.description || '');
  const [content, setContent] = useState<string>(currentBlogData.content || '');
  const [destinations, setDestinations] = useState<string[]>(
    currentBlogData.destinations
  );
  const [status, setStatus] = useState<string>(currentBlogData.visibility);
  const [sortOrder, setSortOrder] = useState<number>(currentBlogData.sortOrder);
  const [blogCategoryBlogs, setBlogCategoryBlogs] = useState<
    IBlogCategoryBlogResponse[]
  >(currentBlogData.blogCategoryBlogs);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setBlogCategoryBlogs(currentBlogData.blogCategoryBlogs);
  }, [currentBlogData.blogCategoryBlogs]);

  const treeManager = useMemo(() => {
    if (blogCategoriesData.length === 0) {
      return null;
    }
    return new TreeManager(blogCategoriesData);
  }, [blogCategoriesData]);

  const videoUrlInputRef = useRef<HTMLInputElement>(null);
  const handleFocusAndSelectInput = (
    ref: React.RefObject<HTMLInputElement | null>
  ) => {
    if (ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  };

  const handleAddNewBlog = async () => {
    setIsCreating(true);
    const newTitle = '';
    const endpoint = await generateUniqueEndpoint(newTitle, 'blog');
    const response = await createBlogActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: ['Ho Chi Minh'],
      userId: userId,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create blog failed',
        message: response.error || 'Failed to create blog',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }
    const blogId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/blog/${blogId}` as Route);
    notifications.show({
      title: 'New blog created',
      message: 'New blog has been successfully created',
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
      await updateBlogActionPrivate(currentBlogData.id, {
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
    await updateBlogActionPrivate(currentBlogData.id, {
      additionalImageUrls: newImages,
    });
    setLoadingImageIndex(null);
  };

  const handleSelectVideoThumbnail = async (imageUrl: string) => {
    setVideoThumbnailLoading(true);
    try {
      await updateBlogActionPrivate(currentBlogData.id, {
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
    await updateBlogActionPrivate(currentBlogData.id, {
      videoThumbnailUrl: '',
    });
    setVideoThumbnailLoading(false);
  };

  const handleSelectMainImage = async (imageUrl: string) => {
    setMainImageLoading(true);
    try {
      await updateBlogActionPrivate(currentBlogData.id, { mainImageUrl: imageUrl });
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
    await updateBlogActionPrivate(currentBlogData.id, {
      mainImageUrl: '',
    });
    setMainImageLoading(false);
  };

  const handleUpdateTitle = useDebouncedCallback(async (newTitle: string) => {
    const endpoint = await generateUniqueEndpoint(
      newTitle,
      'blog',
      currentBlogData.id
    );

    await updateBlogActionPrivate(currentBlogData.id, {
      title: newTitle,
      endpoint: endpoint,
    });
    setIsSaving(false);
    notifications.show({
      message: 'Saved successfully',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  }, 1500);

  // const handleUpdateDescription = useDebouncedCallback(async (newDescription: string) => {
  //   await updateBlogActionPrivate(
  //     currentBlogData.id,
  //     { description: newDescription }
  //   );
  //   setIsSaving(false);
  // }, 1500)

  const handleUpdateContent = useDebouncedCallback(async (newContent: string) => {
    await updateBlogActionPrivate(currentBlogData.id, { content: newContent });
    setIsSaving(false);
  }, 1500);

  const handleUpdateAdditionalImagesPosition = (newPosition: string) => {
    setAdditionalImagesPosition(newPosition);
    updateBlogActionPrivate(currentBlogData.id, {
      additionalImagesPosition: newPosition,
    });
    notifications.show({
      message: 'Saved successfully',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  };

  const handleUpdateDestinations = (newDestinations: string[]) => {
    setDestinations(newDestinations);
    updateBlogActionPrivate(currentBlogData.id, { destinations: newDestinations });
    notifications.show({
      message: 'Saved successfully',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  };

  const handleUpdateStatus = (newStatus: string) => {
    setStatus(newStatus);
    updateBlogActionPrivate(currentBlogData.id, { visibility: newStatus });
    notifications.show({
      message: 'Saved successfully',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  };

  const handleUpdateSortOrder = (newSortOrder: string) => {
    const sortOrderNumber = Number(newSortOrder);
    setSortOrder(sortOrderNumber);
    updateBlogActionPrivate(currentBlogData.id, { sortOrder: sortOrderNumber });
    notifications.show({
      message: 'Saved successfully',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  };

  const handleUpdateVideoPosition = (newPosition: string) => {
    setVideoPosition(newPosition);
    updateBlogActionPrivate(currentBlogData.id, { videoPosition: newPosition });
    notifications.show({
      message: 'Saved successfully',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  };

  const handleUpdateVideoUrl = useDebouncedCallback(async (newUrl: string) => {
    await updateBlogActionPrivate(currentBlogData.id, { videoUrl: newUrl });
    setIsSaving(false);
    notifications.show({
      message: 'Saved successfully',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  }, 1500);

  // Generate SEO title and description
  const seoTitle = title ? stripHtmlAndTruncate(title, 100) : '';
  const seoContent = content ? stripHtmlAndTruncate(content, 300) : '';

  const handleCopyLink = () => {
    const link = `https://jenahair.com/blogs/${currentBlogData.endpoint}`;
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
    const link = `https://jenahair.com/blogs/${currentBlogData.endpoint}`;
    window.open(link, '_blank');
  };

  const handleDeleteBlog = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteBlogActionPrivate(currentBlogData.id);
      if (result.success) {
        router.replace('/adminup/blog');
        notifications.show({
          message: 'Blog has been successfully deleted',
          color: 'green',
          position: 'top-center',
        });
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete blog',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: error instanceof Error ? error.message : 'Failed to delete blog',
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpened(false);
    }
  };

  // blog category options record for renderBlogCategoryOption to reference the id from option value
  const blogCategoryOptionsData: Record<string, IBlogCategoryResponse> =
    blogCategoriesData.reduce(
      (acc, blogCategory) => {
        acc[blogCategory.id] = blogCategory;
        return acc;
      },
      {} as Record<string, IBlogCategoryResponse>
    );

  // Helper function to get parent chain recursively
  const getOptionChain = (blogCategoryId: string): IBlogCategoryResponse[] => {
    const blogCategoryChain = blogCategoryOptionsData[blogCategoryId];
    if (!blogCategoryChain) return [];
    if (blogCategoryChain.parent) {
      return [...getOptionChain(blogCategoryChain.parent.id), blogCategoryChain];
    }
    return [blogCategoryChain];
  };

  const getOptionChainWithoutRoot = (
    blogCategoryId: string
  ): IBlogCategoryResponse[] => {
    const parentChain = getOptionChain(blogCategoryId);
    return parentChain.slice(1);
  };

  const renderBlogCategoryOption: MultiSelectProps['renderOption'] = ({
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
          {blogCategoryOptionsData[option.value].title}
        </Text>
      </Group>
    );
  };

  const handleUpdateBlogCategories = async (newBlogCategoryIds: string[]) => {
    // Find blog categories to add (have in selected but not in current)
    const currentBlogCategoryIds = blogCategoryBlogs.map(
      (bcb) => bcb.blogCategoryId
    );
    const toAdd = newBlogCategoryIds.filter(
      (id) => !currentBlogCategoryIds.includes(id)
    );
    const toRemove = currentBlogCategoryIds.filter(
      (id) => !newBlogCategoryIds.includes(id)
    );

    // Add new blog categories
    for (const blogCategoryId of toAdd) {
      await createBlogCategoryBlogActionPrivate({
        blogId: currentBlogData.id,
        blogCategoryId: blogCategoryId,
        sortOrder: 0,
      });
    }

    // Remove blog categories that are not selected
    for (const blogCategoryId of toRemove) {
      const blogCategoryBlog = blogCategoryBlogs.find(
        (bcb) => bcb.blogCategoryId === blogCategoryId
      );
      if (blogCategoryBlog) {
        await deleteBlogCategoryBlogActionPrivate(blogCategoryBlog.id);
      }
    }
    notifications.show({
      message: 'Saved successfully',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  };

  return (
    <div className={classes.adminBlogDetailPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Blog detail</Text>
        <Group gap="xs">
          <UnstyledButton onClick={handleAddNewBlog} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon
            variant="transparent"
            onClick={handleAddNewBlog}
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
                    setTitle(e.target.value);
                    setIsSaving(true);
                    handleUpdateTitle(e.target.value);
                  }}
                />
                <Group gap={'xs'} justify="space-between">
                  <Text size="md">
                    URL: jenahair.com/blogs/{currentBlogData.endpoint}
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
                    setContent(newContent);
                    setIsSaving(true);
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
                      value={currentBlogData.country}
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
                    href={`https://jenahair.com/blogs/${currentBlogData.endpoint}`}
                    target="_blank"
                    size="lg"
                    fw={500}
                    c={'var(--vinaup-teal)'}
                  >
                    {seoTitle || currentBlogData.title}
                  </Text>
                  <Text
                    component="a"
                    href={`https://jenahair.com/blogs/${currentBlogData.endpoint}`}
                    target="_blank"
                    size="md"
                    c={'var(--vinaup-blue-link)'}
                  >
                    https://jenahair.com/blogs/{currentBlogData.endpoint}
                  </Text>
                  <Text size="sm">
                    {dayjs(currentBlogData.updatedAt).format('MMM DD, YYYY')}
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
              root: classes.blogConfiguration,
            }}
          >
            <Stack gap={'0'}>
              <Group justify="space-between" wrap="nowrap">
                <Text size="lg">Updated at</Text>
                <Group>
                  <Text size="md" fw={500} lh={'2.5rem'}>
                    {dayjs(currentBlogData.updatedAt).format('DD/MM/YYYY')}
                  </Text>
                  <Text size="md" fw={500} lh={'2.5rem'}>
                    {dayjs(currentBlogData.updatedAt).format('HH:mm')}
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
                  <Text
                    size="lg"
                    c="dark.3"
                    className={isSaving ? classes.savingText : classes.savedText}
                  >
                    {isSaving ? 'Saving...' : 'Saved'}
                  </Text>
                  <Button
                    onClick={() => {
                      router.push('/adminup/blog');
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
            classNames={{ root: classes.paperBlock }}
          >
            <Group justify="space-between" wrap="nowrap">
              <MultiSelect
                placeholder={
                  blogCategoryBlogs.length < 3
                    ? 'Select up to 3 blog categories'
                    : ''
                }
                maxValues={3}
                w={'100%'}
                searchable
                nothingFoundMessage="Not found"
                value={blogCategoryBlogs.map(
                  (blogCategoryBlog) => blogCategoryBlog.blogCategoryId
                )}
                renderOption={renderBlogCategoryOption}
                data={treeManager?.toFlatListWithoutRoot().map((blogCategory) => ({
                  value: blogCategory.id,
                  label: blogCategory.title,
                }))}
                onChange={(blogCategoryIds) => {
                  if (!blogCategoryIds) return;
                  handleUpdateBlogCategories(blogCategoryIds);
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
                        setVideoUrl(e.target.value);
                        setIsSaving(true);
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
            <Button color="red" onClick={handleDeleteBlog} loading={isDeleting}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}
