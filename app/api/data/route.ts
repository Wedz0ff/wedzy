import { connectToDatabase } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('history');
    const data = await collection.find({}).toArray();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: `Couldn't get data from database.`,
    });
  }
}
