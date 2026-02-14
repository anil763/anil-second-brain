'use client';

import { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, Circle, Zap, Calendar, ArrowLeft, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

interface PRISMTask {
  id: string;
  title: string;
  description: string;
  category: 'ugc' | 'spiritual' | 'vault' | 'strategy' | 'tracking';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: string;
  impact: string; // How this helps toward $1K/month
  status: 'pending' | 'in-progress' | 'blocked' | 'completed';
  notes?: string;
}

const CATEGORY_CONFIG = {
  ugc: { label: '📹 UGC', color: 'blue', icon: '🎬' },
  spiritual: { label: '✨ Numerology', color: 'purple', icon: '🔮' },
  vault: { label: '🏰 Gentleman\'s Vault', color: 'orange', icon: '💎' },
  strategy: { label: '🧠 Strategy', color: 'green', icon: '📊' },
  tracking: { label: '📈 Tracking', color: 'yellow', icon: '📉' },
};

const PRIORITY_CONFIG = {
  high: { label: 'High Priority', color: 'red' },
  medium: { label: 'Medium', color: 'yellow' },
  low: { label: 'Low', color: 'green' },
};

export default function PRISMDashboard() {
  const [tasks, setTasks] = useState<PRISMTask[]>([]);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('prism-tasks');
    if (saved) {
      try {
        const initialTasks = JSON.parse(saved);
        setTasks(initialTasks);
      } catch (e) {
        console.error('Failed to load tasks:', e);
        initializeDefaultTasks();
      }
    } else {
      initializeDefaultTasks();
    }
    setMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('prism-tasks', JSON.stringify(tasks));
    }
  }, [tasks, mounted]);

  function initializeDefaultTasks() {
    const defaultTasks: PRISMTask[] = [
      // UGC Tasks
      {
        id: '1',
        title: 'Research top 20 UGC brands by budget',
        description: 'Find brands paying $1K-5K per video. Prioritize: ClickUp, Monday.com, Notion, Coda, Nifty, Loom, Zapier, etc.',
        category: 'ugc',
        priority: 'high',
        completed: false,
        status: 'pending',
        impact: 'Directly lead to brand partnerships ($2K-4K per deal)',
        dueDate: '2026-02-15',
      },
      {
        id: '2',
        title: 'Write 10 UGC email outreach templates',
        description: 'Personalized pitch templates for different brand types. Focus: "How I saved 10 hrs/week with [tool]"',
        category: 'ugc',
        priority: 'high',
        completed: false,
        status: 'pending',
        impact: 'Enable 20+ daily outreach emails with professional pitches',
        dueDate: '2026-02-14',
      },
      {
        id: '3',
        title: 'Analyze top 5 competitor UGC creators',
        description: 'Find GenX UGC creators doing project management/business tools. Study their scripts, hooks, CTAs.',
        category: 'ugc',
        priority: 'medium',
        completed: false,
        status: 'pending',
        impact: 'Improve video scripts → Higher approval rates → More deals',
        dueDate: '2026-02-16',
      },
      {
        id: '4',
        title: 'Create 5 UGC video script templates',
        description: 'Problem-agitate-solution format. Ready for Anil to film. Topics: switching tools, setup walkthroughs, automation wins.',
        category: 'ugc',
        priority: 'high',
        completed: false,
        status: 'pending',
        impact: 'Faster video creation → More submissions → More revenue',
        dueDate: '2026-02-17',
      },

      // Numerology/Spiritual Tasks
      {
        id: '5',
        title: 'Create 30-day numerology content calendar',
        description: 'Daily energy readings + themes for TikTok, Instagram, YouTube, Facebook. Mix: Life Path insights, Daily Numbers, Angel Numbers.',
        category: 'spiritual',
        priority: 'high',
        completed: false,
        status: 'pending',
        impact: 'Consistent daily content → Build followers → Lead gen for $97-497 readings',
        dueDate: '2026-02-14',
      },
      {
        id: '6',
        title: 'Write 7 deep numerology guides (1500+ words)',
        description: 'Comprehensive guides for: Life Path numbers, Master Numbers, Angel Numbers, Numerology for business/finance.',
        category: 'spiritual',
        priority: 'medium',
        completed: false,
        status: 'pending',
        impact: 'SEO + authority → Organic traffic → Reading bookings',
        dueDate: '2026-02-20',
      },
      {
        id: '7',
        title: 'Design 30 social graphics (numerology themes)',
        description: 'Daily numerology post graphics. Template: Date + energy message + numerology insight + CTA to readings.',
        category: 'spiritual',
        priority: 'high',
        completed: false,
        status: 'pending',
        impact: 'Professional visuals → Higher engagement → More reading inquiries',
        dueDate: '2026-02-18',
      },
      {
        id: '8',
        title: 'Create "Book a Numerology Reading" funnel',
        description: 'Email sequence (welcome → value → social proof → offer). Lead magnet: "Free numerology life path snapshot"',
        category: 'spiritual',
        priority: 'high',
        completed: false,
        status: 'pending',
        impact: 'Convert followers → Paying reading clients ($97-497 each)',
        dueDate: '2026-02-16',
      },

      // Gentleman's Vault Tasks
      {
        id: '9',
        title: 'Create complete Skool community outline',
        description: 'Structure: 3 membership tiers, 5 module courses, community rules, welcome sequence, launch day plan.',
        category: 'vault',
        priority: 'high',
        completed: false,
        status: 'pending',
        impact: 'Recurring revenue: $297-$497/member. Target: 10+ members = $3K-5K/month',
        dueDate: '2026-02-13',
      },
      {
        id: '10',
        title: 'Write landing page copy (Gentleman\'s Vault)',
        description: 'Compelling copy for $97/$297/$497 tiers. Focus: Who it\'s for, transformation, social proof, urgency.',
        category: 'vault',
        priority: 'high',
        completed: false,
        status: 'pending',
        impact: 'Conversion-optimized landing = Higher sign-ups',
        dueDate: '2026-02-14',
      },
      {
        id: '11',
        title: 'Create 5 launch day email sequences',
        description: 'Welcome, onboarding, value delivery, second upsell, retention. Copy + sequencing ready to send.',
        category: 'vault',
        priority: 'high',
        completed: false,
        status: 'pending',
        impact: 'First-week member retention + upsells',
        dueDate: '2026-02-15',
      },

      // Strategy Tasks
      {
        id: '12',
        title: 'Build affiliate partnership strategy',
        description: 'Sign Anil up for 10 affiliate programs: ClickUp, Monday, Nifty, Hive, Coda, Motion, etc. Get him links/tracking.',
        category: 'strategy',
        priority: 'high',
        completed: false,
        status: 'pending',
        impact: 'Passive revenue: 20-30% commissions on referred customers',
        dueDate: '2026-02-13',
      },
      {
        id: '13',
        title: 'Create 30-day revenue tracking dashboard',
        description: 'Track: UGC submissions, approvals, payments, numerology readings, Vault signups. Weekly reports.',
        category: 'tracking',
        priority: 'high',
        completed: false,
        status: 'pending',
        impact: 'Visibility into $1K/month progress. Identify what\'s working.',
        dueDate: '2026-02-15',
      },
      {
        id: '14',
        title: 'Research Anil\'s GenX audience (demographic deep-dive)',
        description: 'Who is Anil\'s ideal customer? Age, pain points, platforms, spending habits. Create customer avatar.',
        category: 'strategy',
        priority: 'medium',
        completed: false,
        status: 'pending',
        impact: 'Sharper messaging → Better conversions across all 3 income streams',
        dueDate: '2026-02-16',
      },
    ];
    setTasks(defaultTasks);
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchCategory = !filterCategory || t.category === filterCategory;
      const matchStatus = !filterStatus || t.status === filterStatus;
      return matchCategory && matchStatus;
    });
  }, [tasks, filterCategory, filterStatus]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id 
        ? { ...t, completed: !t.completed, status: !t.completed ? 'completed' : 'pending' }
        : t
    ));
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length,
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="p-2 hover:bg-slate-800 rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="w-7 h-7 text-cyan-400" />
                PRISM's Autonomous Tasks
              </h1>
              <p className="text-slate-400 text-sm">Building toward $1K/month by March 8, 2026</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-400">{stats.completed}/{stats.total}</div>
            <div className="text-xs text-slate-400 mt-1">Completed</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-400">{stats.inProgress}</div>
            <div className="text-xs text-slate-400 mt-1">In Progress</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-3xl font-bold text-red-400">{stats.highPriority}</div>
            <div className="text-xs text-slate-400 mt-1">High Priority</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-400">${(stats.completed * 50).toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-1">Est. Value*</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filterCategory === null
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Categories
          </button>
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setFilterCategory(filterCategory === key ? null : key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterCategory === key
                  ? `bg-${config.color}-500 text-white`
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {config.icon} {config.label}
            </button>
          ))}
        </div>

        {/* Task Lists by Status */}
        {(['pending', 'in-progress', 'blocked', 'completed'] as const).map(status => {
          const statusTasks = filteredTasks.filter(t => t.status === status);
          if (statusTasks.length === 0) return null;

          const statusLabel = {
            pending: '📋 To Do',
            'in-progress': '⚡ In Progress',
            blocked: '🚫 Blocked',
            completed: '✅ Done',
          }[status];

          return (
            <div key={status} className="mb-8">
              <h2 className="text-lg font-semibold text-slate-200 mb-3">{statusLabel}</h2>
              <div className="space-y-3">
                {statusTasks.map(task => {
                  const catConfig = CATEGORY_CONFIG[task.category];
                  const priorityConfig = PRIORITY_CONFIG[task.priority];

                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border transition ${
                        task.status === 'completed'
                          ? 'bg-green-500/5 border-green-500/30'
                          : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="mt-1 flex-shrink-0"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                              {task.title}
                            </h3>
                          </div>

                          <p className="text-sm text-slate-400 mb-2">
                            {task.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className={`px-2 py-0.5 rounded bg-${catConfig.color}-500/20 text-${catConfig.color}-300`}>
                              {catConfig.icon} {catConfig.label}
                            </span>
                            <span className={`px-2 py-0.5 rounded bg-${priorityConfig.color}-500/20`}>
                              {priorityConfig.label}
                            </span>
                            {task.dueDate && (
                              <span className="flex items-center gap-1 text-slate-500">
                                <Calendar className="w-3 h-3" />
                                {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            )}
                          </div>

                          {task.impact && (
                            <div className="mt-2 p-2 bg-slate-800/50 rounded text-xs text-slate-300">
                              💰 {task.impact}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <footer className="mt-12 pt-6 border-t border-slate-800 text-sm text-slate-500">
          <p>*Est. Value based on $50 per task completion toward revenue goals</p>
          <p className="mt-2">I'm working autonomously on these tasks 24/7. Check back daily for progress updates.</p>
        </footer>
      </main>
    </div>
  );
}
