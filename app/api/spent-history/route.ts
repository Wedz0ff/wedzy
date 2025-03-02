import { connectToDatabase } from '@/app/lib/db';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

const CACHE_KEY = 'spent-history';
const CACHE_TTL = 60 * 60; // 1 hour

async function fetchHistoryData() {
  const db = await connectToDatabase();
  const collection = db.collection('history');
  const data = await collection.find({}).toArray();
  const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY');

  const filteredData = data.filter(
    (entry) => entry.desc !== 'Permanent Prey Slot',
  );

  return filteredData.map((entry) => ({
    ...entry,
    id: parseInt(entry.id),
    date: formatDate(entry.date),
  }));
}

const getCachedHistoryData = unstable_cache(fetchHistoryData, [CACHE_KEY], {
  revalidate: CACHE_TTL,
});

export async function GET() {
  try {
    const cachedData = await getCachedHistoryData();
    return NextResponse.json(cachedData);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: `Couldn't get data from database.`,
    });
  }
}
