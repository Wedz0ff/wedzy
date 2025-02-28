import { connectToDatabase } from '@/app/lib/db';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
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

      const monthlySpentArray = Object.values(groupedByMonth.month).reverse();
      const yearlySpentArray = Object.values(groupedByMonth.year);

      const totalSpentAll = monthlySpentArray.reduce(
        (sum, month) => sum + month.totalSpent,
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
        return allYears.map(
          (year) => groupedByMonth.year[year]?.totalSpent || 0,
        );
      };

      const allData = {
        allMonths,
        allMonthsSpent: getAllMonthsSpent(), // Array of monthly spends
        allYears,
        allYearsSpent: getAllYearsSpent(), // Array of yearly spends
      };

      return {
        total: {
          monthly: monthlySpentArray,
          yearly: yearlySpentArray,
          total: totalSpentAll,
        },
        allData,
      };
    };

    const result = getSpentData(data);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: `Couldn't get data from database.`,
    });
  }
}
