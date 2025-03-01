import { connectToDatabase } from '@/app/lib/db';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
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

    return NextResponse.json(balanceByYear);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: `Couldn't get data from database.`,
    });
  }
}
