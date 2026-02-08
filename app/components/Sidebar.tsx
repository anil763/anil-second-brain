'use client';

import { useState } from 'react';
import { ChevronDown, FileText, Folder } from 'lucide-react';

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

interface SidebarProps {
  metadata: {
    documents: Document[];
    folders: FolderInfo[];
  } | null;
  selectedDoc: Document | null;
  onSelectDoc: (doc: Document) => void;
}

export default function Sidebar({ metadata, selectedDoc, onSelectDoc }: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['daily-journal'])
  );

  if (!metadata) return null;

  const toggleFolder = (folder: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder);
    } else {
      newExpanded.add(folder);
    }
    setExpandedFolders(newExpanded);
  };

  const docsByFolder = metadata.documents.reduce(
    (acc, doc) => {
      if (!acc[doc.folder]) acc[doc.folder] = [];
      acc[doc.folder].push(doc);
      return acc;
    },
    {} as Record<string, Document[]>
  );

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">Second Brain</h1>
        <p className="text-sm text-slate-400 mt-1">Knowledge Base</p>
      </div>

      {/* Folders & Documents */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {metadata.folders.map((folder) => {
          const isExpanded = expandedFolders.has(folder.name);
          const docs = docsByFolder[folder.name] || [];

          return (
            <div key={folder.name}>
              {/* Folder Header */}
              <button
                onClick={() => toggleFolder(folder.name)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isExpanded ? '' : '-rotate-90'
                  }`}
                />
                <Folder size={16} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-200 flex-1 text-left">
                  {folder.name}
                </span>
                <span className="text-xs text-slate-500">{docs.length}</span>
              </button>

              {/* Documents */}
              {isExpanded && (
                <div className="ml-4 space-y-1 mt-1">
                  {docs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => onSelectDoc(doc)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                        selectedDoc?.id === doc.id
                          ? 'bg-blue-900 text-blue-100'
                          : 'text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <FileText size={14} />
                      <span className="truncate">{doc.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        <p>Total documents: {metadata.documents.length}</p>
      </div>
    </aside>
  );
}
