import { Suspense } from 'react';
import { getMarqueeAdminActionPrivate } from '@/actions/theme-config-action';
import AdminThemeBannerSliderPageContent from '@/components/mains/admin-theme/admin-theme-marquee-page-content/admin-theme-marquee-page-content';

export default function AdminThemeBannerSliderPage() {
  const marqueePromise = getMarqueeAdminActionPrivate();

  return (
    <Suspense>
      <AdminThemeBannerSliderPageContent marqueePromise={marqueePromise} />
    </Suspense>
  );
}
