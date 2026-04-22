import '@mantine/carousel/styles.css';

import classes from './layout.module.scss';
import { getAppConfigActionPublic } from '@/actions/app-config-action';
import { Metadata } from 'next';
import { Suspense } from 'react';
import LandingHeader from '@/components/headers/landing-header/landing-header';
import { MaintenanceGuard } from '@/components/guards/maintenance-guard';
import { SalonLandingFooter } from '@/components/primitives/salon-landing-footer/salon-landing-footer';
import { ScrollToTop } from '@vinaup/ui/landing';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const configResponse = await getAppConfigActionPublic();
    const config = configResponse.data;

    return {
      title: config?.websiteTitle,
      description: config?.websiteDescription,
      icons: {
        icon: config?.faviconUrl || '/favicon.ico',
      },
      openGraph: {
        title: config?.websiteTitle || '',
        description: config?.websiteDescription || '',
        url: 'https://jenahair.com',
        siteName: config?.websiteTitle || '',
        locale: 'vi_VN',
        type: 'website',
        images: ['/images/group1.png'],
      },
      alternates: {
        canonical: 'https://jenahair.com',
      },
    };
  } catch {
    // Fallback to default metadata if config not found
    return {
      title: 'Jena Hair',
      description:
        'Jena Hair - Salon tóc cao cấp tại Việt Nam. Dịch vụ tạo kiểu, phục hồi và chăm sóc tóc chuyên nghiệp.',
      icons: {
        icon: '/favicon.ico',
      },
      openGraph: {
        title: 'Jena Hair',
        description:
          'Jena Hair - Salon tóc cao cấp tại Việt Nam. Dịch vụ tạo kiểu, phục hồi và chăm sóc tóc chuyên nghiệp.',
        url: 'https://jenahair.com',
        siteName: 'Jena Hair',
        locale: 'vi_VN',
        type: 'website',
        images: ['/images/group1.png'],
      },
      alternates: {
        canonical: 'https://jenahair.com',
      },
    };
  }
}

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={classes.landingLayout}>
      <Suspense fallback={null}>
        <MaintenanceGuard />
      </Suspense>
      <LandingHeader />
      {children}
      <SalonLandingFooter />
      <ScrollToTop />
    </main>
  );
}
