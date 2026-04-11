'use client';

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ActionIcon, Button, Group, Modal, Pagination, Popover, Stack } from '@mantine/core';
import { TbEdit } from 'react-icons/tb';
import { SlOptionsVertical } from 'react-icons/sl';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { GrTrash } from 'react-icons/gr';
import classes from './blogs-table.module.scss';
import { IBlogResponse } from '@/interfaces/blog-interface';
import { EntitiesTable, EntitiesTableColumnProps } from '@vinaup/ui/admin';
import { DatePicker } from '@mantine/dates';

import { StatusDisplayMap } from '@/constants';
import { useRouter } from 'next/navigation';
import { deleteBlogActionPrivate } from '@/actions/blog-action';
import { notifications } from '@mantine/notifications';

interface BlogsTableProps {
  blogsData: IBlogResponse[];
}

const ITEMS_PER_PAGE = 20;

export default function BlogsTable({
  blogsData,
}: BlogsTableProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [datePickerOpened, setDatePickerOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | string | null>(null);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const totalPages = Math.ceil(blogsData.length / ITEMS_PER_PAGE) || 1;
  useEffect(() => {
    setPage((p) => (p > totalPages ? totalPages : p));
  }, [blogsData.length, totalPages]);

  const handleDeleteBlog = async () => {
    if (!selectedBlogId) return;

    setIsDeleting(true);
    try {
      const result = await deleteBlogActionPrivate(selectedBlogId);
      if (result.success) {
        notifications.show({
          message: 'Blog has been successfully deleted',
          color: 'green',
          position: 'top-center',
        });
        router.refresh();
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
      setSelectedBlogId(null);
    }
  };

  const columns: EntitiesTableColumnProps<IBlogResponse>[] = [
    {
      key: 'date',
      width: '5%',
      headerAlign: 'left',
      header: (
        <Popover opened={datePickerOpened} onChange={setDatePickerOpened} position='bottom-start'>
          <Popover.Target>
            <ActionIcon
              variant="transparent"
              onClick={() => setDatePickerOpened((o) => !o)}
            >
              <MdOutlineCalendarMonth size={24} color="#01426e" />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <DatePicker
              value={selectedDate}
              onChange={(value) => setSelectedDate(value)}
            />
          </Popover.Dropdown>
        </Popover>
      ),
      render: ({ entity }) => <>{dayjs(entity.updatedAt).format('DD/MM')}</>,
    },
    {
      key: 'title',
      width: '35%',
      header: 'Title',
      render: ({ entity }) => (
        <>
          {entity.title}
        </>
      ),
    },
    {
      key: 'category',
      width: '25%',
      headerAlign: 'left',
      cellAlign: 'left',
      header: 'Category',
      render: ({ entity }) => {
        if (entity.blogCategoryBlogs.length === 0) {
          return <>(No category selected)</>;
        }
        return <>{entity.blogCategoryBlogs.map((blogCategoryBlog) => blogCategoryBlog.blogCategory?.title).join(', ')}</>;
      },
    },
    {
      key: 'creator',
      width: '15%',
      headerAlign: 'left',
      cellAlign: 'left',
      header: 'Author',
      render: ({ entity }) => {

        return <>{entity?.createdBy?.name}</>;
      },
    },
    {
      key: 'status',
      width: '10%',
      header: 'Status',
      render: ({ entity }) => (StatusDisplayMap[entity.visibility]),
    },
    {
      key: 'actions',
      width: '10%',
      headerAlign: 'right',
      header: (
        <div className={`${classes.columnHeaderContent} ${classes.actionColumnHeaderContent}`}>
          <ActionIcon variant="transparent">
            <SlOptionsVertical size={24} color="#01426e" />
          </ActionIcon>
        </div>
      ),
      cellAlign: 'right',
      render: ({ entity }) => (
        <Group gap="xs" justify="flex-end">
          <ActionIcon
            variant="transparent"
            onClick={() => {
              setSelectedBlogId(entity.id);
              setDeleteModalOpened(true);
            }}
          >
            <GrTrash size={20} color="#01426e" />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            onClick={() => router.push(`/adminup/blog/${entity.id}`)}
          >
            <TbEdit size={24} color="#01426e" />
          </ActionIcon>
        </Group>
      ),
    },
  ];


  const paginatedData = blogsData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <Stack gap="md">
        <EntitiesTable<IBlogResponse>
          data={paginatedData}
          loading={false}
          columns={columns}
          classNames={{
            wrapper: classes.tableWrapper,
            table: {
              table: classes.table,
              thead: classes.thead,
              tbody: classes.tbody,
              tr: classes.tr,
              th: classes.th,
              td: classes.td,
            },
          }}
        />
        <Group justify="center">
          <Pagination
            value={page}
            onChange={setPage}
            total={totalPages}
            size="sm"
          />
        </Group>
      </Stack>
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
            <Button
              color="red"
              onClick={handleDeleteBlog}
              loading={isDeleting}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

