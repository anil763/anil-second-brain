'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, FileText, Folder, Home, Building2, CheckSquare, HardDrive, Zap, Heart } from 'lucide-react';

const navigationItems = [
  { href: '/', label: 'Business', icon: Home },
  { href: '/personal', label: '📋 Personal Tasks', icon: CheckSquare },
  { href: '/prism', label: '🔮 PRISM\'s Tasks', icon: Zap },
  { href: '/health', label: '❤️ Health', icon: Heart },
  { href: '/memory', label: '💾 Memory Bank', icon: HardDrive },
  { href: '/presidio', label: '🏢 Presidio', icon: Building2 },
  { href: '/documents', label: 'Browse Documents', icon: FileText },
];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 border-r border-slate-800 overflow-y-auto">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white">📚 Second Brain</h1>
          <p className="text-sm text-slate-400 mt-1">Your Command Center</p>
        </div>
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300"
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <main className="flex-1 w-full">
        {/* Mobile Header with Menu Button */}
        <div className="lg:hidden sticky top-0 z-30 bg-black/95 backdrop-blur border-b border-slate-800 p-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">📚 Second Brain</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Sidebar (shown when toggled) */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 top-16 z-20 bg-black/50" onClick={() => setSidebarOpen(false)}>
            <div
              className="bg-black border-r border-slate-800 w-64 h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="p-4 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300"
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
