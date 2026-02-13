import { NextRequest, NextResponse } from 'next/server';
import { loadMemories, saveMemory, deleteMemory } from '../../../lib/saveMemory';

export async function GET() {
  try {
    const memories = loadMemories();
    return NextResponse.json(memories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load memories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text, category, tags } = await request.json();
    
    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }
    
    const memory = saveMemory(text.trim(), category, tags);
    return NextResponse.json(memory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save memory' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const success = deleteMemory(id);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete memory' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete memory' },
      { status: 500 }
    );
  }
}
