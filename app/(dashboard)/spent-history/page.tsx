import SpentHistoryTable from '@/app/components/SpentHistoryTable';
import { getApiUrl } from '@/app/lib/api';

export default async function SpentHistoryPage() {
  const rows = await fetch(getApiUrl('/api/data'), {
    next: { revalidate: 300 },
  }).then((res) => res.json());

  return <SpentHistoryTable rows={rows} />;
}
