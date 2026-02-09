import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const DATA_FILE = path.join(process.cwd(), '.data', 'dashboard.json');

async function ensureDir() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    // Directory might already exist
  }
}

export async function GET() {
  try {
    await ensureDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (err) {
    // File doesn't exist yet, return empty state
    return NextResponse.json({ tasks: [] });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDir();
    const body = await request.json();
    await fs.writeFile(DATA_FILE, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving dashboard:', err);
    return NextResponse.json(
      { error: 'Failed to save' },
      { status: 500 }
    );
  }
}
