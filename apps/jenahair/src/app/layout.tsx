import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';

import { Inter, Merriweather, Open_Sans } from 'next/font/google';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

import './globals.scss';

// app/layout.tsx
import type { Metadata } from 'next';
import { MantineConfigProvider } from '@vinaup/ui/libs/mantine';

export const metadata: Metadata = {
  metadataBase: new URL('https://jenahair.com'),
  title: {
    default: 'Jena Hair',
    template: '%s | Jena Hair',
  },
  description:
    'Jena Hair provides premium hair styling, restorative treatments, and personalized beauty services to elevate your daily look.',
  applicationName: 'Jena Hair',
  openGraph: {
    siteName: 'Jena Hair',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://jenahair.com',
  },
};

const inter = Inter({
  subsets: ['latin-ext'],
  variable: '--font-inter',
});

const merriweather = Merriweather({
  variable: '--font-merriweather',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" {...mantineHtmlProps}

      className={`${inter.variable} ${merriweather.variable} ${openSans.variable}`}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${inter.className} antialiased`}>
        <MantineConfigProvider>{children}</MantineConfigProvider>
      </body>
    </html>
  );
}