import { NextRequest, NextResponse } from 'next/server';
import csvParser from 'csv-parser';
import { Readable } from 'stream';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name.toLowerCase();

    let numbers: string[] = [];

    if (fileName.endsWith('.txt')) {
      const text = buffer.toString('utf8');
      numbers = text
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => /^\+?\d{8,15}$/.test(line)); // Basic validation
    } else if (fileName.endsWith('.csv')) {
      const rows: string[] = [];
      const stream = Readable.from(buffer.toString());
      const parser = stream.pipe(csvParser());

      for await (const row of parser) {
        Object.values(row).forEach(value => {
          const num = String(value).trim();
          if (/^\+?\d{8,15}$/.test(num)) rows.push(num);
        });
      }
      numbers = rows;
    } else {
      return NextResponse.json({ success: false, error: 'Unsupported file type' }, { status: 400 });
    }

    if (numbers.length === 0) {
      return NextResponse.json({ success: false, error: 'No valid phone numbers found' }, { status: 400 });
    }

    return NextResponse.json({ success: true, numbers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'File processing failed' }, { status: 500 });
  }
}
