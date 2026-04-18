'use client';

import { use, useState } from 'react';
import { Button, Group, Paper, Stack, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  updateThemeConfigSocialLinksActionPrivate,
} from '@/actions/theme-config-action';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  IThemeSocialLinksResponse,
  IThemeSocialLinkItem,
} from '@/interfaces/theme-config-interface';
import classes from './admin-theme-social-links-page-content.module.scss';

interface AdminThemeSocialLinksPageContentProps {
  themeConfigPromise: Promise<ActionResponse<IThemeSocialLinksResponse>>;
}

interface SocialLinkFields {
  youtube: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  googlemap: string;
  whatsapp: string;
}

interface SocialLinkErrors {
  youtube?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  googlemap?: string;
  whatsapp?: string;
}

const PLATFORM_ORDER: Array<keyof SocialLinkFields> = [
  'youtube',
  'facebook',
  'instagram',
  'tiktok',
  'googlemap',
  'whatsapp',
];

function toInitialFields(socialLinks: IThemeSocialLinkItem[] = []): SocialLinkFields {
  const fields: SocialLinkFields = {
    youtube: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    googlemap: '',
    whatsapp: '',
  };

  for (const item of socialLinks) {
    const platform = item.platform?.toLowerCase() as keyof SocialLinkFields;
    if (platform in fields) {
      fields[platform] = item.url ?? '';
    }
  }

  return fields;
}

export default function AdminThemeSocialLinksPageContent({
  themeConfigPromise,
}: AdminThemeSocialLinksPageContentProps) {
  const themeConfigResult = use(themeConfigPromise);
  const themeConfig = themeConfigResult.data;
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<SocialLinkErrors>({});
  const [fields, setFields] = useState<SocialLinkFields>(
    toInitialFields(themeConfig?.value)
  );

  const existingIdByPlatform = (themeConfig?.value ?? []).reduce(
    (acc, item) => {
      acc[item.platform.toLowerCase()] = item.id;
      return acc;
    },
    {} as Record<string, string>
  );

  const validateUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const validateFields = (): boolean => {
    const nextErrors: SocialLinkErrors = {};

    for (const platform of PLATFORM_ORDER) {
      const input = fields[platform].trim();
      if (input.length > 0 && !validateUrl(input)) {
        nextErrors[platform] = 'Please enter a valid HTTPS URL';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      notifications.show({
        title: 'Invalid input',
        message: 'Please fix invalid social links before saving',
        color: 'red',
        position: 'top-right',
      });
      return;
    }

    setIsSaving(true);
    try {
      const socialLinks = PLATFORM_ORDER.map((platform) => ({
        id: existingIdByPlatform[platform] || `${platform}-link`,
        platform,
        url: fields[platform].trim(),
        isActive: true,
      })).filter((item) => item.url.length > 0);

      const result = await updateThemeConfigSocialLinksActionPrivate({ value: socialLinks });

      if (!result.success) {
        notifications.show({
          title: 'Error',
          message: result.error || 'Failed to save social links',
          color: 'red',
          position: 'top-right',
        });
        return;
      }

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
      setIsSaving(false);
    }
  };

  return (
    <div className={classes.socialLinksPageRoot}>
      <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Stack p={'sm'} gap={'md'}>
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Social Links
            </Text>
            <Button loading={isSaving} onClick={handleSave} color="teal" size="sm">
              Save
            </Button>
          </Group>

          <TextInput
            label="YouTube"
            placeholder="https://youtube.com/@your-page"
            value={fields.youtube}
            error={errors.youtube}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, youtube: e.target.value }));
              setErrors((prev) => ({ ...prev, youtube: undefined }));
            }}
          />
          <TextInput
            label="Facebook"
            placeholder="https://facebook.com/your-page"
            value={fields.facebook}
            error={errors.facebook}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, facebook: e.target.value }));
              setErrors((prev) => ({ ...prev, facebook: undefined }));
            }}
          />
          <TextInput
            label="Instagram"
            placeholder="https://instagram.com/your-page"
            value={fields.instagram}
            error={errors.instagram}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, instagram: e.target.value }));
              setErrors((prev) => ({ ...prev, instagram: undefined }));
            }}
          />
          <TextInput
            label="TikTok"
            placeholder="https://tiktok.com/@your-page"
            value={fields.tiktok}
            error={errors.tiktok}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, tiktok: e.target.value }));
              setErrors((prev) => ({ ...prev, tiktok: undefined }));
            }}
          />
          <TextInput
            label="Google Map"
            placeholder="https://maps.google.com/..."
            value={fields.googlemap}
            error={errors.googlemap}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, googlemap: e.target.value }));
              setErrors((prev) => ({ ...prev, googlemap: undefined }));
            }}
          />
          <TextInput
            label="WhatsApp"
            placeholder="https://wa.me/your-number"
            value={fields.whatsapp}
            error={errors.whatsapp}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, whatsapp: e.target.value }));
              setErrors((prev) => ({ ...prev, whatsapp: undefined }));
            }}
          />
        </Stack>
      </Paper>
    </div>
  );
}
