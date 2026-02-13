import fs from 'fs';
import path from 'path';

interface MemoryItem {
  id: string;
  text: string;
  category?: string;
  date: string;
  tags?: string[];
}

const MEMORIES_FILE = path.join(process.cwd(), 'documents', 'memory', 'memories.json');

// Ensure directory exists
function ensureDir() {
  const dir = path.dirname(MEMORIES_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function loadMemories(): MemoryItem[] {
  try {
    ensureDir();
    if (fs.existsSync(MEMORIES_FILE)) {
      const content = fs.readFileSync(MEMORIES_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.error('Failed to load memories:', e);
  }
  return [];
}

export function saveMemory(
  text: string,
  category?: string,
  tags?: string[]
): MemoryItem {
  ensureDir();
  
  const memories = loadMemories();
  
  const newMemory: MemoryItem = {
    id: Date.now().toString(),
    text,
    category,
    date: new Date().toISOString(),
    tags,
  };
  
  memories.unshift(newMemory); // Add to front
  
  try {
    fs.writeFileSync(MEMORIES_FILE, JSON.stringify(memories, null, 2));
    return newMemory;
  } catch (e) {
    console.error('Failed to save memory:', e);
    throw e;
  }
}

export function deleteMemory(id: string): boolean {
  ensureDir();
  
  const memories = loadMemories();
  const filtered = memories.filter(m => m.id !== id);
  
  try {
    fs.writeFileSync(MEMORIES_FILE, JSON.stringify(filtered, null, 2));
    return true;
  } catch (e) {
    console.error('Failed to delete memory:', e);
    return false;
  }
}
