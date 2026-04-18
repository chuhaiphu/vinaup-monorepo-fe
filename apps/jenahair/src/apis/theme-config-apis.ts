import {
  IThemeSocialLinksResponse,
  IUpdateThemeConfigSocialLinks,
} from '@/interfaces/theme-config-interface';
import { apiPrivate, apiPublic } from './_base';

// ==================== PUBLIC ROUTES ====================

export async function getThemeConfigApiPublic() {
  return apiPublic<IThemeSocialLinksResponse>('/theme-config/social-links', {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function getThemeConfigAdminApiPrivate() {
  return apiPrivate<IThemeSocialLinksResponse>('/theme-config/admin/social-links', {
    method: 'GET',
  });
}

export async function updateThemeConfigSocialLinksApiPrivate(
  data: IUpdateThemeConfigSocialLinks
) {
  return apiPrivate<IThemeSocialLinksResponse>('/theme-config/admin/social-links', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
