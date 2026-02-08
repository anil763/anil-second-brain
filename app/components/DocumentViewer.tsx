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
        <article className="max-w-4xl mx-auto">
          <style>{`
            article h1 {
              font-size: 2em;
              font-weight: bold;
              color: white;
              margin-top: 1em;
              margin-bottom: 0.5em;
            }
            article h2 {
              font-size: 1.5em;
              font-weight: bold;
              color: #f0f9ff;
              margin-top: 0.83em;
              margin-bottom: 0.417em;
            }
            article h3 {
              font-size: 1.25em;
              font-weight: bold;
              color: #e0e7ff;
              margin-top: 0.67em;
              margin-bottom: 0.33em;
            }
            article h4, article h5, article h6 {
              font-weight: bold;
              color: #d4d8e8;
              margin-top: 0.5em;
              margin-bottom: 0.25em;
            }
            article p {
              color: #cbd5e1;
              margin: 1em 0;
              line-height: 1.6;
            }
            article a {
              color: #60a5fa;
              text-decoration: underline;
            }
            article a:hover {
              color: #93c5fd;
            }
            article strong, article b {
              color: #f1f5f9;
              font-weight: bold;
            }
            article em, article i {
              color: #cbd5e1;
              font-style: italic;
            }
            article code {
              background-color: #1e293b;
              color: #94d82d;
              padding: 0.125em 0.25em;
              border-radius: 3px;
              font-family: 'Monaco', 'Courier New', monospace;
              font-size: 0.9em;
            }
            article pre {
              background-color: #0f172a;
              border: 1px solid #334155;
              border-radius: 6px;
              padding: 1em;
              overflow-x: auto;
              margin: 1em 0;
            }
            article pre code {
              background-color: transparent;
              color: #94d82d;
              padding: 0;
            }
            article ul, article ol {
              margin: 1em 0;
              padding-left: 2em;
              color: #cbd5e1;
            }
            article li {
              margin: 0.5em 0;
            }
            article blockquote {
              border-left: 4px solid #475569;
              padding-left: 1em;
              margin: 1em 0;
              color: #94a3b8;
              font-style: italic;
            }
            article table {
              border-collapse: collapse;
              width: 100%;
              margin: 1em 0;
            }
            article th {
              background-color: #1e293b;
              color: #f1f5f9;
              padding: 0.75em;
              border: 1px solid #334155;
              text-align: left;
              font-weight: bold;
            }
            article td {
              color: #cbd5e1;
              padding: 0.75em;
              border: 1px solid #334155;
            }
            article hr {
              border: none;
              border-top: 1px solid #334155;
              margin: 2em 0;
            }
            article img {
              max-width: 100%;
              height: auto;
              border-radius: 6px;
              margin: 1em 0;
            }
          `}</style>
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
