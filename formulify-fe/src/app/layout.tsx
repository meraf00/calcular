import type { Metadata } from 'next';

import './globals.css';
import '@mantine/core/styles.css';

import { quicksand } from '@/utils/fonts';

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
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
