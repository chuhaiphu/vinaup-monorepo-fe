import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

import './globals.scss';

// app/layout.tsx
import type { Metadata } from 'next';
import { MantineConfigProvider } from '@vinaup/ui/libs/mantine';
import { openSans } from './font';

export const metadata: Metadata = {
  metadataBase: new URL('https://jenahair.com'),
  title: {
    default: 'Jena Hair',
    template: '%s | Jena Hair',
  },
  description:
    'Jena Hair - Salon tóc cao cấp tại Việt Nam. Dịch vụ tạo kiểu, phục hồi và chăm sóc tóc chuyên nghiệp.',
  applicationName: 'Jena Hair',
  openGraph: {
    siteName: 'Jena Hair',
    type: 'website',
    locale: 'vi_VN',
    images: ['/images/group1.png'],
  },
  alternates: {
    canonical: 'https://jenahair.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="vi" {...mantineHtmlProps} className={openSans.variable}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineConfigProvider>
          {children}
        </MantineConfigProvider>
      </body>
    </html>
  );
}
