import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const docsPath = path.join(process.cwd(), 'documents', 'metadata.json');
    const fileContents = await fs.readFile(docsPath, 'utf-8');
    const metadata = JSON.parse(fileContents);
    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error reading metadata:', error);
    return NextResponse.json(
      { error: 'Failed to read metadata' },
      { status: 500 }
    );
  }
}
