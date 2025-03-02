import { connectToDatabase } from '@/app/lib/db';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

const CACHE_KEY = 'spent-monthly';
const CACHE_TTL = 60 * 60; // 1 hour

async function fetchHistorySpentData() {
  const db = await connectToDatabase();
  const collection = db.collection('history');
  const data = await collection.find({}).toArray();

  const balanceByYear: Record<string, number[]> = {};

  data.forEach(({ date, balance }) => {
    if (!date) return;

    const parsedDate = dayjs(date);
    if (!parsedDate.isValid()) return;

    const yearKey = parsedDate.year().toString();
    const monthIndex = parsedDate.month();

    const monthsLimit = yearKey === '2025' ? 2 : 12;

    if (!balanceByYear[yearKey]) {
      balanceByYear[yearKey] = Array(monthsLimit).fill(0);
    }

    if (yearKey !== '2025' || monthIndex < 2) {
      balanceByYear[yearKey][monthIndex] += Math.abs(balance);
    }
  });

  return balanceByYear;
}

const getCachedBalanceByYear = unstable_cache(
  fetchHistorySpentData,
  [CACHE_KEY],
  { revalidate: CACHE_TTL },
);

export async function GET() {
  try {
    const cachedData = await getCachedBalanceByYear();
    return NextResponse.json(cachedData);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: `Couldn't get data from database.`,
    });
  }
}
