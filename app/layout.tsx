import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import HistoryIcon from '@mui/icons-material/History';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Navigation } from '@toolpad/core/AppProvider';
import theme from '../theme';
import Image from 'next/image';

export const metadata = {
  title: {
    default: 'Wedzy',
    template: '%s | Wedzy',
  },
  icons: {
    icon: '/hat.png',
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
    icon: <QueryStatsIcon />,
  },
  {
    segment: 'spent-history',
    title: 'Spent History',
    icon: <HistoryIcon />,
  },
  // {
  //   segment: 'about',
  //   title: 'About',
  //   icon: <PersonIcon />,
  // },
];

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        <React.Suspense>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <NextAppProvider
              branding={{
                title: 'Wedzy',
                logo: (
                  <Image src="/hat.png" alt="Wedzy" width={36} height={36} />
                ),
              }}
              theme={theme}
              navigation={NAVIGATION}
            >
              {children}
            </NextAppProvider>
          </AppRouterCacheProvider>
        </React.Suspense>
      </body>
    </html>
  );
}
