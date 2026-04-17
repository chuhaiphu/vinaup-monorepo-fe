'use client';

import { use } from 'react';
import { updateAppConfigActionPrivate } from '@/actions/app-config-action';
import { ToggleSection } from '@vinaup/ui/landing';
import { Group, Paper, Stack, Text, TextInput, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import classes from './admin-setting-overview-page-content.module.scss';
import UploadImageSection from '@/components/primitives/upload-image-section/upload-image-section';
import { IAppConfigResponse } from '@/interfaces/app-config-interface';
import { ActionResponse } from '@/interfaces/_base-interface';

interface AdminSettingOverviewPageContentProps {
  appConfigPromise: Promise<ActionResponse<IAppConfigResponse>>;
}

export default function AdminSettingOverviewPageContent({
  appConfigPromise,
}: AdminSettingOverviewPageContentProps) {
  const appConfigResponse = use(appConfigPromise);
  const appConfig = appConfigResponse.data;

  const [isMaintenanceMode, setIsMaintenanceMode] = useState(
    appConfig?.maintenanceMode
  );
  const [faviconUrl, setFaviconUrl] = useState(appConfig?.faviconUrl);
  const [logoUrl, setLogoUrl] = useState(appConfig?.logoUrl);
  const [isUpdatingLogoUrl, setIsUpdatingLogoUrl] = useState(false);
  const [isUpdatingFaviconUrl, setIsUpdatingFaviconUrl] = useState(false);
  const [phoneContact, setPhoneContact] = useState(appConfig?.phoneContact ?? '');
  const [isSavingHotline, setIsSavingHotline] = useState(false);

  const handleSelectFaviconUrl = async (imageUrl: string) => {
    setIsUpdatingFaviconUrl(true);
    try {
      await updateAppConfigActionPrivate({ faviconUrl: imageUrl });
      setFaviconUrl(imageUrl);
    } catch (error) {
      notifications.show({
        title: 'Failed to set image',
        message: error instanceof Error ? error.message : '',
        color: 'red',
      });
    } finally {
      setIsUpdatingFaviconUrl(false);
    }
  };

  const handleRemoveFaviconUrl = async () => {
    setIsUpdatingFaviconUrl(true);
    setFaviconUrl('');
    await updateAppConfigActionPrivate({ faviconUrl: '' });
    setIsUpdatingFaviconUrl(false);
  };

  const handleSelectLogoUrl = async (imageUrl: string) => {
    setIsUpdatingLogoUrl(true);
    try {
      await updateAppConfigActionPrivate({ logoUrl: imageUrl });
      setLogoUrl(imageUrl);
    } catch (error) {
      notifications.show({
        title: 'Failed to set image',
        message: error instanceof Error ? error.message : '',
        color: 'red',
      });
    } finally {
      setIsUpdatingLogoUrl(false);
    }
  };

  const handleRemoveLogoUrl = async () => {
    setIsUpdatingLogoUrl(true);
    setLogoUrl('');
    await updateAppConfigActionPrivate({ logoUrl: '' });
    setIsUpdatingLogoUrl(false);
  };

  const handleToggleMaintenanceMode = async (checked: boolean) => {
    const result = await updateAppConfigActionPrivate({ maintenanceMode: checked });
    if (result.success) {
      setIsMaintenanceMode(checked);
      notifications.show({
        title: 'Success',
        message: `Maintenance mode ${checked ? 'enabled' : 'disabled'}`,
        color: 'green',
      });
    } else {
      notifications.show({
        title: 'Error',
        message: result.error || 'Failed to update maintenance mode',
        color: 'red',
      });
    }
  };

  const handleUpdatePhoneContact = async () => {
    setIsSavingHotline(true);
    try {
      await updateAppConfigActionPrivate({ phoneContact });
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
      setIsSavingHotline(false);
    }
  };

  return (
    <div className={classes.overviewPageRoot}>
      <Stack gap="md">
        <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
          <Stack p={'sm'}>
            <Text size="lg" fw={600}>
              Favicon
            </Text>
            <Group align="center">
              <UploadImageSection
                size="lg"
                isLoading={isUpdatingFaviconUrl}
                imageUrl={faviconUrl ?? undefined}
                onImageSelect={handleSelectFaviconUrl}
                onRemoveFile={handleRemoveFaviconUrl}
              />
              <Stack gap={2}>
                <Text size="lg">{faviconUrl ? 'Edit' : 'Upload'}</Text>
                <Text size="sm" c="dimmed">
                  png, jpg; jpeg; Size ≤ 2M
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Paper>
        <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
          <Stack p={'sm'}>
            <Text size="lg" fw={600}>
              Logo website
            </Text>
            <Group align="center">
              <UploadImageSection
                size="lg"
                isLoading={isUpdatingLogoUrl}
                imageUrl={logoUrl ?? undefined}
                onImageSelect={handleSelectLogoUrl}
                onRemoveFile={handleRemoveLogoUrl}
              />
              <Stack gap={2}>
                <Text size="lg">{logoUrl ? 'Edit' : 'Upload'}</Text>
                <Text size="sm" c="dimmed">
                  png, jpg; jpeg; Size ≤ 2M
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Paper>
        <Paper radius={'md'} classNames={{ root: classes.paperBlock }}>
          <Stack p={'sm'} gap={'xs'}>
            <Group justify="space-between">
              <Text size="lg" fw={600}>
                Hotline
              </Text>
              <Button
                loading={isSavingHotline}
                onClick={handleUpdatePhoneContact}
                variant="filled"
                color="teal"
                size="sm"
              >
                Save
              </Button>
            </Group>
            <Stack gap={2}>
              <Text size="lg">Whatsapp</Text>
              <TextInput
                size="md"
                maxLength={15}
                type="number"
                value={phoneContact}
                placeholder="Enter your phone number"
                onChange={(e) => {
                  setPhoneContact(e.target.value);
                }}
              />
            </Stack>
          </Stack>
        </Paper>
        <Paper radius={'md'} classNames={{ root: classes.paperBlock }}>
          <ToggleSection
            checked={isMaintenanceMode ?? false}
            onToggle={handleToggleMaintenanceMode}
            text="Maintenance Mode"
            checkedSubText="Website is currently in maintenance mode"
            uncheckedSubText="Website is currently active"
          />
        </Paper>
      </Stack>
    </div>
  );
}
