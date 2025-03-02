import { connectToDatabase } from '@/app/lib/db';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

const CACHE_KEY = 'history-spent-data-stats';
const CACHE_TTL = 60 * 60; // 1 hour

async function fetchHistorySpentData() {
  const db = await connectToDatabase();
  const collection = db.collection('history');
  const data = await collection.find({}).toArray();

  const getSpentData = (data: any[]) => {
    const groupedByMonth = data.reduce(
      (acc, transaction) => {
        const parsedDate = dayjs(transaction.date);

        if (!parsedDate.isValid()) {
          console.error('Invalid date:', transaction.date);
          return acc;
        }

        const monthYear = parsedDate.format('MM/YYYY');
        if (!acc.month[monthYear]) {
          acc.month[monthYear] = { monthYear, totalSpent: 0 };
        }
        acc.month[monthYear].totalSpent += transaction.balance;

        const year = parsedDate.format('YYYY');
        if (!acc.year[year]) {
          acc.year[year] = { year, totalSpent: 0 };
        }
        acc.year[year].totalSpent += transaction.balance;

        return acc;
      },
      { month: {}, year: {} },
    );

    const monthlySpentArray = Object.values(
      groupedByMonth.month as { monthYear: string; totalSpent: number }[],
    ).reverse();
    const yearlySpentArray = Object.values(groupedByMonth.year);

    const totalSpentAll = monthlySpentArray.reduce(
      (sum, month: { monthYear: string; totalSpent: number }) =>
        sum + month.totalSpent,
      0,
    );

    const allMonths = Object.keys(groupedByMonth.month).reverse();
    const allYears = Object.keys(groupedByMonth.year);

    const getAllMonthsSpent = () => {
      return allMonths.map(
        (month) => groupedByMonth.month[month]?.totalSpent || 0,
      );
    };

    const getAllYearsSpent = () => {
      return allYears.map((year) => groupedByMonth.year[year]?.totalSpent || 0);
    };

    return {
      total: {
        monthly: monthlySpentArray,
        yearly: yearlySpentArray,
        total: totalSpentAll,
      },
      allData: {
        allMonths,
        allMonthsSpent: getAllMonthsSpent(),
        allYears,
        allYearsSpent: getAllYearsSpent(),
      },
    };
  };

  return getSpentData(data);
}

const getCachedHistorySpentData = unstable_cache(
  fetchHistorySpentData,
  [CACHE_KEY],
  { revalidate: CACHE_TTL },
);

export async function GET() {
  try {
    const cachedData = await getCachedHistorySpentData();
    return NextResponse.json(cachedData);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: `Couldn't get data from database.`,
    });
  }
}
