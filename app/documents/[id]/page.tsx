'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  path: string;
  folder: string;
  type: string;
  preview: string;
}

export default function DocumentPage({ params }: { params: { id: string } }) {
  const [document, setDocument] = useState<Document | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch('/api/metadata');
        const metadata = await response.json();
        const doc = metadata.documents.find((d: Document) => d.id === params.id);
        
        if (doc) {
          setDocument(doc);
          const contentResponse = await fetch(`/api/documents/${doc.path}`);
          const text = await contentResponse.text();
          setContent(text);
        }
      } catch (error) {
        console.error('Failed to load document:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-400">Loading document...</div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-400">Document not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/documents"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Documents
          </Link>
          
          <div className="space-y-2">
            <div className="text-sm text-slate-500 capitalize">{document.folder}</div>
            <h1 className="text-4xl font-bold text-white">{document.title}</h1>
            <div className="flex gap-2 pt-4">
              <span className="px-3 py-1 bg-slate-800 rounded text-slate-300 text-sm">
                {document.type}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 text-slate-100">
          <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
