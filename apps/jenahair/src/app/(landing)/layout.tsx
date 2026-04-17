import '@mantine/carousel/styles.css';

import { MaintenanceGuard } from '@/components/guards/maintenance-guard';
import classes from './layout.module.scss';
import { getAppConfigActionPublic } from '@/actions/app-config-action';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { JenhairIcon } from '@vinaup/ui/cores';
import FacebookIcon from '@vinaup/ui/cores/icons/facebook-icon.svg';
import InstagramIcon from '@vinaup/ui/cores/icons/instagram-icon.svg';
import TiktokIcon from '@vinaup/ui/cores/icons/tiktok.svg';
import GoogleMapIcon from '@vinaup/ui/cores/icons/google-map.svg';
import { HeaderSplitSearchWithSocialMedia } from '@vinaup/ui/landing';
import { SalonLandingFooter } from '@vinaup/ui/landing';

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

const NAV_LINKS = [
  { label: 'Home', href: '/', active: true },
  { label: 'Danh mục', href: '/' },
  { label: 'Dịch vụ', href: '/' },
  { label: 'Blog', href: '/' },
  { label: 'Nhật ký', href: '/' },
];

const SOCIAL_LINKS = [
  {
    icon: <GoogleMapIcon width={36} height={38} />,
    href: 'https://google.com/maps',
    label: 'Google Map',
  },
  {
    icon: <TiktokIcon width={36} height={38} />,
    href: 'https://tiktok.com',
    label: 'Tiktok',
  },
  {
    icon: <FacebookIcon width={36} height={38} />,
    href: 'https://facebook.com',
    label: 'Facebook',
  },
  {
    icon: <InstagramIcon width={36} height={38} />,
    href: 'https://instagram.com',
    label: 'Instagram',
  },
];

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={classes.landingLayout}>
      <Suspense fallback={null}>{/* <MaintenanceGuard /> */}</Suspense>
      <HeaderSplitSearchWithSocialMedia
        navLinks={NAV_LINKS}
        socialLinks={SOCIAL_LINKS}
        logo={<JenhairIcon size={42} fill="var(--vinaup-amber)" />}
      />
      {children}
      <SalonLandingFooter />
    </main>
  );
}
