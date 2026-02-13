'use client';

import { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Trash2, Calendar, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface MemoryItem {
  id: string;
  text: string;
  category?: string;
  date: string;
  tags?: string[];
}

export default function MemoryPage() {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load memories from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('anil-memories');
    if (saved) {
      try {
        setMemories(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load memories:', e);
      }
    }
    setMounted(true);
  }, []);

  // Save memories to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('anil-memories', JSON.stringify(memories));
    }
  }, [memories, mounted]);

  // Filter memories by search query and category
  const filteredMemories = useMemo(() => {
    return memories.filter(m => {
      const matchesSearch = m.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (m.category && m.category.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = !selectedCategory || m.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [memories, searchQuery, selectedCategory]);

  const deleteMemory = (id: string) => {
    setMemories(memories.filter(m => m.id !== id));
  };

  const categories = Array.from(new Set(memories.map(m => m.category).filter(Boolean)));

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="p-2 hover:bg-slate-800 rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <h1 className="text-2xl font-bold">💾 Memory Bank</h1>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Categories Filter */}
        {categories.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                selectedCategory === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-all text-sm font-medium flex items-center gap-2 ${
                  selectedCategory === cat
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Tag className="w-4 h-4" />
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Memories List */}
        {filteredMemories.length > 0 ? (
          <div className="space-y-3">
            {filteredMemories.map(memory => (
              <div
                key={memory.id}
                className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-100 whitespace-pre-wrap break-words">
                      {memory.text}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                      {memory.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(memory.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      )}
                      {memory.category && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-800 rounded">
                          <Tag className="w-3 h-3" />
                          {memory.category}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMemory(memory.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg mb-2">
              {memories.length === 0 ? 'No memories yet' : 'No memories match your search'}
            </p>
            <p className="text-slate-600 text-sm">
              I'll save things here as you share them
            </p>
          </div>
        )}

        {/* Stats */}
        {memories.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-slate-500 text-sm">
              📌 {memories.length} total memories
              {filteredMemories.length !== memories.length && ` • ${filteredMemories.length} shown`}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
