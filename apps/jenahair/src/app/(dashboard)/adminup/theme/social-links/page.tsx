import { Suspense } from 'react';
import { getThemeConfigAdminActionPrivate } from '@/actions/theme-config-action';
import AdminThemeSocialLinksPageContent from '@/components/mains/admin-theme/admin-theme-social-links-page-content/admin-theme-social-links-page-content';

export default function AdminThemeSocialLinksPage() {
  const themeConfigPromise = getThemeConfigAdminActionPrivate();

  return (
    <Suspense>
      <AdminThemeSocialLinksPageContent themeConfigPromise={themeConfigPromise} />
    </Suspense>
  );
}
