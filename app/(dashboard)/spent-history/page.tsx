import SpentHistoryTable from '@/app/components/SpentHistoryTable';
import { getApiUrl } from '@/app/lib/api';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Spent History',
};

export default async function SpentHistoryPage() {
  return <SpentHistoryTable />;
}
