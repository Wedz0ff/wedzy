import SpentHistoryTable from '@/app/components/SpentHistoryTable';
import { getApiUrl } from '@/app/lib/api';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Spent History',
};

export default async function SpentHistoryPage() {
  const rows = await fetch(getApiUrl('/api/spent-history'), {
    next: { revalidate: 600 },
  }).then((res) => res.json());

  return <SpentHistoryTable rows={rows} />;
}
