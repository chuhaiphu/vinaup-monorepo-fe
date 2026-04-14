'use client';

import { use } from 'react';
import { IAppConfigResponse } from '@/interfaces/app-config-interface';
import { Group, Paper, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './admin-setting-seo-page-content.module.scss';
import { useState } from 'react';
import { updateAppConfigActionPrivate } from '@/actions/app-config-action';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { HiOutlineEye } from 'react-icons/hi';
import { Route } from 'next';
import { ActionResponse } from '@/interfaces/_base-interface';

interface AdminSettingSeoPageContentProps {
  appConfigPromise: Promise<ActionResponse<IAppConfigResponse>>;
}

export default function AdminSettingSeoPageContent({ appConfigPromise }: AdminSettingSeoPageContentProps) {
  const appConfigResponse = use(appConfigPromise);
  const appConfig = appConfigResponse.data;

  const [title, setTitle] = useState(appConfig?.websiteTitle || '');
  const [description, setDescription] = useState(appConfig?.websiteDescription || '');

  const handleUpdateTitle = useDebouncedCallback(async (newTitle: string) => {
    await updateAppConfigActionPrivate({ websiteTitle: newTitle });
    notifications.show({
      message: 'Saved successfully',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  }, 1500);

  const handleUpdateDescription = useDebouncedCallback(async (newDescription: string) => {
    await updateAppConfigActionPrivate({ websiteDescription: newDescription });
    notifications.show({
      message: 'Saved successfully',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  }, 1500);

  return (
    <Stack gap={'md'}>
      <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Stack p={'sm'} gap={'md'}>
          <Stack gap={2}>
            <Group justify="space-between" wrap="nowrap">
              <Text size="lg">Site title</Text>
            </Group>
            <TextInput
              size="md"
              value={title}
              placeholder="A title under 100 characters"
              maxLength={100}
              onChange={(e) => {
                setTitle(e.target.value);
                handleUpdateTitle(e.target.value);
              }}
            />
          </Stack>
          <Stack gap={2}>
            <Group justify="space-between" wrap="nowrap">
              <Text size="lg">Description</Text>
            </Group>
            <Textarea
              size="md"
              value={description}
              placeholder="A description under 300 characters"
              maxLength={300}
              onChange={(e) => {
                setDescription(e.target.value);
                handleUpdateDescription(e.target.value);
              }}
            />
          </Stack>
        </Stack>
      </Paper>
      <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Group justify="space-between" wrap="nowrap" p={'sm'} gap={'md'}>
          <Stack gap={2}>
            <Text size="lg">Sitemap.xml</Text>
            <Text c="dimmed">Activated</Text>
          </Stack>
          <Link href={'/sitemap.xml' as Route} target="_blank">
            <HiOutlineEye color="black" size={28} />
          </Link>
        </Group>
      </Paper>
      <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Group justify="space-between" wrap="nowrap" p={'sm'} gap={'md'}>
          <Stack gap={2}>
            <Text size="lg">Robots.txt</Text>
            <Text c="dimmed">Activated</Text>
          </Stack>
          <Link href={'/robots.txt' as Route} target="_blank">
            <HiOutlineEye color="black" size={28} />
          </Link>
        </Group>
      </Paper>
    </Stack>
  );
}
