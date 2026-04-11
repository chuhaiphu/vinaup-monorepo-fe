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
import { apiPrivate, apiPublic } from './_base';

// ==================== SECTION UI CREDENTIALS ROUTES ====================

export async function createSectionUICredentialsApiPrivate(
  data: ICreateSectionUICredentials
) {
  return apiPrivate<ISectionUICredentialsResponse>('/section-ui/admin/credentials', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllSectionUICredentialsApiPrivate() {
  return apiPrivate<ISectionUICredentialsResponse[]>('/section-ui/admin/credentials', {
    method: 'GET',
  });
}

export async function getSectionUICredentialsByCodeApiPrivate(code: string) {
  return apiPrivate<ISectionUICredentialsResponse>(
    `/section-ui/admin/credentials/code/${code}`,
    {
      method: 'GET',
    }
  );
}

export async function getSectionUICredentialsByIdApiPrivate(id: string) {
  return apiPrivate<ISectionUICredentialsResponse>(`/section-ui/admin/credentials/${id}`, {
    method: 'GET',
  });
}

export async function updateSectionUICredentialsApiPrivate(
  id: string,
  data: IUpdateSectionUICredentials
) {
  return apiPrivate<ISectionUICredentialsResponse>(`/section-ui/admin/credentials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteSectionUICredentialsApiPrivate(id: string) {
  return apiPrivate<void>(`/section-ui/admin/credentials/${id}`, {
    method: 'DELETE',
  });
}

// ==================== DYNAMIC SECTION UI ROUTES ====================
// Public GETs: /section-ui/sections; Admin mutate: /section-ui/admin/sections

export async function createSectionUIApiPrivate(data: ICreateDynamicSectionUI) {
  return apiPrivate<IDynamicSectionUIResponse>('/section-ui/admin/sections', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllSectionUIsApiPublic() {
  return apiPublic<IDynamicSectionUIResponse[]>('/section-ui/sections', {
    method: 'GET',
  });
}

export async function getUsedSectionUIPositionsApiPublic() {
  return apiPublic<number[]>('/section-ui/sections/positions/used', {
    method: 'GET',
  });
}

export async function getSectionUIByPositionApiPublic(position: number) {
  return apiPublic<IDynamicSectionUIResponse>(
    `/section-ui/sections/position/${position}`,
    {
      method: 'GET',
    }
  );
}

export async function getSectionUIByIdApiPublic(id: string) {
  return apiPublic<IDynamicSectionUIResponse>(`/section-ui/sections/${id}`, {
    method: 'GET',
  });
}

export async function updateSectionUIApiPrivate(
  id: string,
  data: IUpdateDynamicSectionUI
) {
  return apiPrivate<IDynamicSectionUIResponse>(`/section-ui/admin/sections/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteSectionUIApiPrivate(id: string) {
  return apiPrivate<void>(`/section-ui/admin/sections/${id}`, {
    method: 'DELETE',
  });
}
