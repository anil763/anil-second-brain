'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DocumentViewer from './components/DocumentViewer';

interface Document {
  id: string;
  title: string;
  path: string;
  folder: string;
  type: string;
  preview: string;
}

interface Metadata {
  documents: Document[];
  folders: Array<{ name: string; description: string }>;
}

export default function Home() {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load metadata
    const loadMetadata = async () => {
      try {
        const response = await fetch('/api/metadata');
        const data = await response.json();
        setMetadata(data);
        if (data.documents.length > 0) {
          setSelectedDoc(data.documents[0]);
        }
      } catch (error) {
        console.error('Failed to load metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMetadata();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-slate-400">Loading Second Brain...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <Sidebar
        metadata={metadata}
        selectedDoc={selectedDoc}
        onSelectDoc={setSelectedDoc}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {selectedDoc ? (
          <DocumentViewer doc={selectedDoc} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-slate-400 text-center">
              <h2 className="text-2xl font-semibold mb-2">Welcome to Second Brain</h2>
              <p>Select a document to get started</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
