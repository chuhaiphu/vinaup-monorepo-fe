'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateSectionUICredentials,
  ISectionUICredentialsResponse,
  IUpdateSectionUICredentials,
} from '@/interfaces/section-ui-credentials-interface';
import {
  ICreateDynamicSectionUI,
  IDynamicSectionUIResponse,
  IUpdateDynamicSectionUI,
} from '@/interfaces/dynamic-section-ui-interface';
import { executeApi } from '@/actions/_base';
import {
  createSectionUICredentialsApiPrivate,
  getAllSectionUICredentialsApiPrivate,
  getSectionUICredentialsByCodeApiPrivate,
  getSectionUICredentialsByIdApiPrivate,
  updateSectionUICredentialsApiPrivate,
  deleteSectionUICredentialsApiPrivate,
  createSectionUIApiPrivate,
  getAllSectionUIsApiPublic,
  getUsedSectionUIPositionsApiPublic,
  getSectionUIByPositionApiPublic,
  getSectionUIByIdApiPublic,
  updateSectionUIApiPrivate,
  deleteSectionUIApiPrivate,
} from '@/apis/section-ui-apis';

// ==================== SECTION UI CREDENTIALS ACTIONS ====================

export async function createSectionUICredentialsActionPrivate(
  input: ICreateSectionUICredentials
): Promise<ActionResponse<ISectionUICredentialsResponse>> {
  const result = await executeApi(async () =>
    createSectionUICredentialsApiPrivate(input)
  );
  if (result.success) {
    updateTag('section-ui');
  }
  return result;
}

export async function getAllSectionUICredentialsActionPrivate(): Promise<
  ActionResponse<ISectionUICredentialsResponse[]>
> {
  return executeApi(async () => getAllSectionUICredentialsApiPrivate());
}

export async function getSectionUICredentialsByCodeActionPrivate(
  code: string
): Promise<ActionResponse<ISectionUICredentialsResponse>> {
  return executeApi(async () => getSectionUICredentialsByCodeApiPrivate(code));
}

export async function getSectionUICredentialsByIdActionPrivate(
  id: string
): Promise<ActionResponse<ISectionUICredentialsResponse>> {
  return executeApi(async () => getSectionUICredentialsByIdApiPrivate(id));
}

export async function updateSectionUICredentialsActionPrivate(
  id: string,
  input: IUpdateSectionUICredentials
): Promise<ActionResponse<ISectionUICredentialsResponse>> {
  const result = await executeApi(async () =>
    updateSectionUICredentialsApiPrivate(id, input)
  );
  if (result.success) {
    updateTag('section-ui');
  }
  return result;
}

export async function deleteSectionUICredentialsActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () =>
    deleteSectionUICredentialsApiPrivate(id)
  );
  if (result.success) {
    updateTag('section-ui');
  }
  return result;
}

// ==================== DYNAMIC SECTION UI ACTIONS ====================

export async function createSectionUIActionPrivate(
  input: ICreateDynamicSectionUI
): Promise<ActionResponse<IDynamicSectionUIResponse>> {
  const result = await executeApi(async () => createSectionUIApiPrivate(input));
  if (result.success) {
    updateTag('section-ui');
  }
  return result;
}

export async function getAllSectionUIsActionPublic(): Promise<
  ActionResponse<IDynamicSectionUIResponse[]>
> {
  'use cache';
  cacheLife('hours');
  cacheTag('section-ui');
  return executeApi(async () => getAllSectionUIsApiPublic());
}

export async function getUsedSectionUIPositionsActionPublic(): Promise<
  ActionResponse<number[]>
> {
  'use cache';
  cacheLife('hours');
  cacheTag('section-ui');
  return executeApi(async () => getUsedSectionUIPositionsApiPublic());
}

export async function getSectionUIByPositionActionPublic(
  position: number
): Promise<ActionResponse<IDynamicSectionUIResponse>> {
  'use cache';
  cacheLife('hours');
  cacheTag('section-ui');
  return executeApi(async () => getSectionUIByPositionApiPublic(position));
}

export async function getSectionUIByIdActionPublic(
  id: string
): Promise<ActionResponse<IDynamicSectionUIResponse>> {
  'use cache';
  cacheLife('hours');
  cacheTag('section-ui');
  return executeApi(async () => getSectionUIByIdApiPublic(id));
}

export async function updateSectionUIActionPrivate(
  id: string,
  input: IUpdateDynamicSectionUI
): Promise<ActionResponse<IDynamicSectionUIResponse>> {
  const result = await executeApi(async () => updateSectionUIApiPrivate(id, input));
  if (result.success) {
    updateTag('section-ui');
  }
  return result;
}

export async function deleteSectionUIActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteSectionUIApiPrivate(id));
  if (result.success) {
    updateTag('section-ui');
  }
  return result;
}
