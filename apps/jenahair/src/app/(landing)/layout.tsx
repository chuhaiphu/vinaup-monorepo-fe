import { MaintenanceGuard } from '@/components/guards/maintenance-guard';
import classes from './layout.module.scss';
import { LandingHeader } from '@/components/headers/landing-header/landing-header';
import { getAppConfigActionPublic } from '@/actions/app-config-action';
import { Metadata } from 'next';
import { Suspense } from 'react';

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
        images: [
          {
            url: 'https://jenahair.com/images/vietnam-sightseeing-sample.jpg',
            width: 1200,
            height: 630,
            alt: 'Jena Hair signature salon services',
          },
        ],
        locale: 'en_US',
        type: 'website',
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
        'Jena Hair offers premium salon experiences, modern cuts, and restorative hair care tailored to your style.',
      icons: {
        icon: '/favicon.ico',
      },
      openGraph: {
        title: 'Jena Hair',
        description:
          'Jena Hair offers premium salon experiences, modern cuts, and restorative hair care tailored to your style.',
        url: 'https://jenahair.com',
        siteName: 'Jena Hair',
        images: [
          {
            url: 'https://jenahair.com/images/vietnam-sightseeing-sample.jpg',
            width: 1200,
            height: 630,
            alt: 'Jena Hair signature salon services',
          },
        ],
        locale: 'en_US',
        type: 'website',
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
    <div className={classes.landingLayout}>
      <Suspense fallback={null}>
        <MaintenanceGuard />
      </Suspense>
      <LandingHeader />
      {children}
    </div>
  );
}
