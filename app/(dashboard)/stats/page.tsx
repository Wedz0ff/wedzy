import Statistics from '@/app/components/Stats';
import { getApiUrl } from '@/app/lib/api';
import * as React from 'react';

export const metadata = {
  title: 'Stats',
};

export default async function Stats() {
  const spentHistory = await fetch(getApiUrl('/api/spent-history-stats'), {
    next: { revalidate: 600 },
  }).then((res) => res.json());

  console.log(spentHistory);

  return <Statistics spentHistory={spentHistory} />;
}
