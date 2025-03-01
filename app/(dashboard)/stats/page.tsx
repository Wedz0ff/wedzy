import StatsPage from '@/app/components/StatsPage';
import { getApiUrl } from '@/app/lib/api';
import * as React from 'react';

export const metadata = {
  title: 'Stats',
};

export default async function Stats() {
  return <StatsPage />;
}
