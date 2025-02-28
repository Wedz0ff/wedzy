import { connectToDatabase } from '@/app/lib/db';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('history');
    const data = await collection.find({}).toArray();
    const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY');

    const formattedData = data.map((entry) => ({
      ...entry,
      id: parseInt(entry.id),
      date: formatDate(entry.date),
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: `Couldn't get data from database.`,
    });
  }
}
