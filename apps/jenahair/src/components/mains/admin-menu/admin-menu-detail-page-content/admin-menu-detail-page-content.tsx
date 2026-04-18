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
import classes from './admin-menu-detail-page-content.module.scss';
import { use, useEffect, useMemo, useState } from 'react';
import {
  updateMenuActionPrivate,
  deleteMenuActionPrivate,
} from '@/actions/menu-action';
import { IMenuResponse } from '@/interfaces/menu-interface';
import { FaCaretDown } from 'react-icons/fa6';
import { GrTrash } from 'react-icons/gr';
import { TreeManager } from '@vinaup/utils/tree-manager';
import { useRouter } from 'next/navigation';
import { ActionResponse } from '@/interfaces/_base-interface';

interface AdminMenuDetailPageContentProps {
  currentMenuPromise: Promise<ActionResponse<IMenuResponse>>;
  menusPromise: Promise<ActionResponse<IMenuResponse[]>>;
  availableSortOrdersPromise: Promise<ActionResponse<number[]>>;
}

export default function AdminMenuDetailPageContent({
  currentMenuPromise,
  menusPromise,
  availableSortOrdersPromise,
}: AdminMenuDetailPageContentProps) {
  const currentMenuResult = use(currentMenuPromise);
  const menusResult = use(menusPromise);
  const availableSortOrdersResult = use(availableSortOrdersPromise);

  if (!currentMenuResult.success || !currentMenuResult.data) {
    return <div>Menu not found</div>;
  }

  const currentMenu = currentMenuResult.data;
  const menusData = menusResult.data ?? [];
  const availableSortOrdersData = availableSortOrdersResult.data ?? [];

  return (
    <AdminMenuDetailPageContentInner
      currentMenu={currentMenu}
      menusData={menusData}
      availableSortOrdersData={availableSortOrdersData}
    />
  );
}

interface AdminMenuDetailPageContentInnerProps {
  currentMenu: IMenuResponse;
  menusData: IMenuResponse[];
  availableSortOrdersData: number[];
}

function AdminMenuDetailPageContentInner({
  currentMenu,
  menusData,
  availableSortOrdersData,
}: AdminMenuDetailPageContentInnerProps) {
  const [title, setTitle] = useState<string>(currentMenu.title);
  const [parentId, setParentId] = useState<string | null>(
    currentMenu.parent?.id || null
  );
  const [sortOrder, setSortOrder] = useState<number>(currentMenu.sortOrder || 0);
  const [customUrl, setCustomUrl] = useState<string>(currentMenu.customUrl || '');

  const [isSavingAll, setIsSavingAll] = useState<boolean>(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    setSortOrder(currentMenu.sortOrder);
  }, [currentMenu.sortOrder]);

  const router = useRouter();

  const menuTreeManager = useMemo(() => {
    if (menusData.length === 0) {
      return null;
    }
    return new TreeManager(menusData);
  }, [menusData]);

  // Filter out current menu and its children from parent options
  const excludedIds = menuTreeManager?.toIds(
    menuTreeManager?.toFlatList(currentMenu.id) ?? []
  );
  excludedIds?.add(currentMenu.id);

  const parentOptions = menusData
    .filter((menu) => !excludedIds?.has(menu.id))
    .map((menu) => ({ value: menu.id, label: menu.title }));

  const handleSaveAll = async () => {
    setIsSavingAll(true);
    try {
      await updateMenuActionPrivate(currentMenu.id, {
        title,
        parentId: parentId || undefined,
        sortOrder,
        customUrl: customUrl || undefined,
      });
      notifications.show({
        message: 'Saved successfully',
        color: 'green',
        position: 'top-right',
        autoClose: 1500,
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Unknown error',
        color: 'red',
        position: 'top-right',
      });
    } finally {
      setIsSavingAll(false);
    }
  };

  const handleDeleteMenu = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteMenuActionPrivate(currentMenu.id);
      if (result.success) {
        router.replace('/adminup/menu');
        notifications.show({
          message: 'Menu has been successfully deleted',
          color: 'green',
          position: 'top-center',
        });
      } else {
        notifications.show({
          title: 'Delete failed',
          message: result.error || 'Failed to delete menu',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Delete failed',
        message: error instanceof Error ? error.message : 'Failed to delete menu',
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpened(false);
    }
  };

  return (
    <div className={classes.menuDetailRoot}>
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
                    setTitle(e.target.value);
                  }}
                />
              </Stack>

              <Stack gap={'xs'} mt={'md'}>
                <Text>Parent Menu</Text>
                <Select
                  size="md"
                  placeholder="---"
                  data={parentOptions}
                  value={parentId}
                  searchable
                  nothingFoundMessage="No menu found"
                  onChange={(value) => setParentId(value)}
                />
              </Stack>

              <Stack gap={'xs'} mt={'md'}>
                <Text>Custom URL</Text>
                <TextInput
                  size="md"
                  placeholder="Enter custom URL"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
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
            classNames={{ root: classes.menuConfiguration }}
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
                  onChange={(value) => setSortOrder(value ? parseInt(value) : 0)}
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
                    loading={isSavingAll}
                    onClick={handleSaveAll}
                    variant="filled"
                    color="teal"
                    size="xs"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      router.push('/adminup/menu');
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
        </GridCol>
      </Grid>

      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="Confirm Delete"
        centered
      >
        <Stack>
          <Text>Are you sure you want to delete this menu?</Text>
          <Group justify="flex-end" mt="sm">
            <Button
              variant="default"
              onClick={() => setDeleteModalOpened(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button color="red" onClick={handleDeleteMenu} loading={isDeleting}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}
