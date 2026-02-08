'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Folder } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  path: string;
  folder: string;
  type: string;
  preview: string;
}

interface FolderInfo {
  name: string;
  description: string;
}

interface Metadata {
  documents: Document[];
  folders: FolderInfo[];
}

export default function DocumentsPage() {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch('/api/metadata');
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('Failed to load metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-400">Loading documents...</div>
      </div>
    );
  }

  if (!metadata) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-slate-400">No documents found</div>
      </div>
    );
  }

  const docsByFolder = metadata.documents.reduce(
    (acc, doc) => {
      if (!acc[doc.folder]) acc[doc.folder] = [];
      acc[doc.folder].push(doc);
      return acc;
    },
    {} as Record<string, Document[]>
  );

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">📚 All Documents</h1>
          <p className="text-slate-400">Browse all your knowledge base documents</p>
        </div>

        {/* Folders & Documents */}
        <div className="space-y-6">
          {metadata.folders.map((folder) => {
            const docs = docsByFolder[folder.name] || [];
            if (docs.length === 0) return null;

            return (
              <div key={folder.name} className="space-y-3">
                {/* Folder Header */}
                <div className="flex items-center gap-2 mb-3">
                  <Folder size={20} className="text-slate-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-white capitalize">
                      {folder.name.replace('-', ' ')}
                    </h2>
                    <p className="text-xs text-slate-500">{folder.description}</p>
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-2 ml-6">
                  {docs.map((doc) => (
                    <Link
                      key={doc.id}
                      href={`/documents/${doc.id}`}
                      className="block p-4 rounded-lg bg-slate-900/50 border border-slate-800 hover:bg-slate-800/50 hover:border-slate-700 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <FileText size={16} className="text-slate-400 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                            {doc.title}
                          </h3>
                          <p className="text-sm text-slate-400 line-clamp-2 mt-1">
                            {doc.preview}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">
                              {doc.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
