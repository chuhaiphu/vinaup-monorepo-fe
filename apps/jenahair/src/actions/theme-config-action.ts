'use server';

import { cacheLife, cacheTag, updateTag } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  getThemeConfigAdminApiPrivate,
  getThemeConfigApiPublic,
  updateThemeConfigSocialLinksApiPrivate,
  getMarqueeApiPublic,
  getMarqueeAdminApiPrivate,
  updateMarqueeApiPrivate,
} from '@/apis/theme-config-apis';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  IThemeSocialLinksResponse,
  IUpdateThemeConfigSocialLinks,
  IMarqueeSlidesResponse,
  IUpdateThemeConfigMarquee,
} from '@/interfaces/theme-config-interface';

export async function getThemeConfigActionPublic(): Promise<
  ActionResponse<IThemeSocialLinksResponse>
> {
  'use cache';
  cacheLife('default');
  cacheTag('theme-config');
  return executeApi(async () => getThemeConfigApiPublic());
}

export async function updateThemeConfigSocialLinksActionPrivate(
  input: IUpdateThemeConfigSocialLinks
): Promise<ActionResponse<IThemeSocialLinksResponse>> {
  const result = await executeApi(async () =>
    updateThemeConfigSocialLinksApiPrivate(input)
  );

  if (result.success) {
    updateTag('theme-config');
  }

  return result;
}

export async function getThemeConfigAdminActionPrivate(): Promise<
  ActionResponse<IThemeSocialLinksResponse>
> {
  return executeApi(async () => getThemeConfigAdminApiPrivate());
}

export async function getMarqueeActionPublic(): Promise<
  ActionResponse<IMarqueeSlidesResponse>
> {
  'use cache';
  cacheLife('default');
  cacheTag('theme-config');
  return executeApi(async () => getMarqueeApiPublic());
}

export async function getMarqueeAdminActionPrivate(): Promise<
  ActionResponse<IMarqueeSlidesResponse>
> {
  return executeApi(async () => getMarqueeAdminApiPrivate());
}

export async function updateMarqueeActionPrivate(
  input: IUpdateThemeConfigMarquee
): Promise<ActionResponse<IMarqueeSlidesResponse>> {
  const result = await executeApi(async () => updateMarqueeApiPrivate(input));

  if (result.success) {
    updateTag('theme-config');
  }

  return result;
}
