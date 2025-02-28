import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaidIcon from '@mui/icons-material/Paid';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Navigation } from '@toolpad/core/AppProvider';
import theme from '../theme';
import Image from 'next/image';

export const metadata = {
  title: {
    default: 'Wedzy',
    template: '%s | Wedzy',
  },
};

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: '',
  },
  {
    title: 'Home',
    icon: <DashboardIcon />,
  },
  {
    segment: 'stats',
    title: 'Statistics',
    icon: <DashboardIcon />,
  },
  {
    segment: 'spent-history',
    title: 'Spent History',
    icon: <PaidIcon />,
  },
];

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <NextAppProvider
            branding={{
              title: 'Wedzy',
              logo: <Image src="/hat.png" alt="Wedzy" width={36} height={36} />,
            }}
            theme={theme}
            navigation={NAVIGATION}
          >
            {children}
          </NextAppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
