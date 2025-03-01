import { connectToDatabase } from '@/app/lib/db';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('history');
    const data = await collection.find({}).toArray();

    const dailySpent: Record<string, number> = {};

    const filteredData = data.filter(
      (entry) => entry.desc !== 'Permanent Prey Slot',
    );

    filteredData.forEach(({ date, balance }) => {
      if (!date) return;

      const parsedDate = dayjs(date);
      if (!parsedDate.isValid()) return;

      const dateKey = parsedDate.format('YYYY-MM-DD');

      dailySpent[dateKey] = (dailySpent[dateKey] || 0) + Math.abs(balance);
    });

    return NextResponse.json(dailySpent);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: `Couldn't get data from database.`,
    });
  }
}
