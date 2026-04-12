import type { Metadata } from 'next';
import { Poppins, Montserrat } from 'next/font/google';
import './global.scss';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import '@mantine/carousel/styles.css';
import { MantineConfigProvider } from '@vinaup/ui/libs/mantine';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'The Local Travel',
  description:
    'Discover the world with us! Explore hidden gems, local culture, and unforgettable experiences. Your adventure starts here.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
      className={`${poppins.variable} ${montserrat.variable}`}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <MantineConfigProvider>{children}</MantineConfigProvider>
      </body>
    </html>
  );
}
