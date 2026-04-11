'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import { IAppConfigResponse, IUpdateAppConfig } from '@/interfaces/app-config-interface';
import { executeApi } from '@/actions/_base';
import {
  getAppConfigApiPublic,
  updateAppConfigApiPrivate,
} from '@/apis/app-config-apis';

export async function getAppConfigActionPublic(): Promise<ActionResponse<IAppConfigResponse>> {
  'use cache';
  cacheLife('hours');
  cacheTag('app-config');
  return executeApi(
    async () => getAppConfigApiPublic()
  );
}

export async function updateAppConfigActionPrivate(
  input: IUpdateAppConfig
): Promise<ActionResponse<IAppConfigResponse>> {
  const result = await executeApi(
    async () => updateAppConfigApiPrivate(input)
  );
  if (result.success) {
    updateTag('app-config');
  }
  return result;
}
