'use client';

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  path: string;
  folder: string;
  type: string;
  preview: string;
}

interface DocumentViewerProps {
  doc: Document;
}

export default function DocumentViewer({ doc }: DocumentViewerProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const response = await fetch(`/api/documents/${encodeURIComponent(doc.path)}`);
        const data = await response.json();
        setContent(data.content || '');
      } catch (error) {
        console.error('Failed to load document:', error);
        setContent('Failed to load document');
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [doc.path]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-black">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-800 p-8">
        <h1 className="text-4xl font-bold text-white mb-2">{doc.title}</h1>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <span className="capitalize bg-slate-900 px-3 py-1 rounded-full text-xs font-medium text-slate-300 border border-slate-700">
            {doc.folder}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <article className="prose prose-slate max-w-4xl mx-auto prose-headings:text-white prose-headings:font-bold prose-p:text-slate-300 prose-a:text-blue-400 prose-strong:text-slate-100 prose-code:text-slate-100 prose-pre:bg-slate-950 prose-pre:border-slate-700">
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </article>
      </div>
    </div>
  );
}
