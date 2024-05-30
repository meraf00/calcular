import type { Metadata } from 'next';

import './globals.css';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript } from '@mantine/core';

import Providers from './providers';
import { cn } from '@/shared/cn';
import { quicksand } from '@/shared/fonts';

export const metadata: Metadata = {
  title: 'Formulify',
  description:
    'Plug in your variables and formulas, Formulify gets you the answer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={cn(quicksand.className, 'relative')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
