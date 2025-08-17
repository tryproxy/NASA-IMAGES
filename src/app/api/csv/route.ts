import { generateCsvString } from '@/features/pinned/lib/generateCsvString';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { count, items } = await req.json();
  const csv = generateCsvString(items);

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${count}_items.csv"`,
    },
  });
}
