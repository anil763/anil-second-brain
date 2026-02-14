'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, Calendar, TrendingUp, AlertCircle, Zap } from 'lucide-react';

interface DailyAction {
  id: string;
  stream: 'readings' | 'ugc' | 'vault' | 'health';
  action: string;
  target: number;
  completed: number;
  priority: 'high' | 'medium' | 'low';
  Monday?: number;
  Tuesday?: number;
  Wednesday?: number;
  Thursday?: number;
  Friday?: number;
  Saturday?: number;
  Sunday?: number;
}

const dailyActions: DailyAction[] = [
  {
    id: '1',
    stream: 'readings',
    action: 'Send reading follow-ups to warm leads',
    target: 3,
    completed: 0,
    priority: 'high',
    Monday: 3,
    Tuesday: 3,
    Wednesday: 3,
    Thursday: 3,
    Friday: 3,
    Saturday: 1,
    Sunday: 1,
  },
  {
    id: '2',
    stream: 'readings',
    action: 'Respond to reading inquiries',
    target: 5,
    completed: 0,
    priority: 'high',
    Monday: 5,
    Tuesday: 5,
    Wednesday: 5,
    Thursday: 5,
    Friday: 5,
    Saturday: 2,
    Sunday: 2,
  },
  {
    id: '3',
    stream: 'ugc',
    action: 'Film UGC video',
    target: 1,
    completed: 0,
    priority: 'high',
    Monday: 1,
    Tuesday: 1,
    Wednesday: 1,
    Thursday: 1,
    Friday: 1,
    Saturday: 0,
    Sunday: 0,
  },
  {
    id: '4',
    stream: 'ugc',
    action: 'Submit UGC videos to brands',
    target: 2,
    completed: 0,
    priority: 'high',
    Monday: 2,
    Tuesday: 2,
    Wednesday: 2,
    Thursday: 2,
    Friday: 2,
    Saturday: 1,
    Sunday: 0,
  },
  {
    id: '5',
    stream: 'ugc',
    action: 'Send brand outreach emails',
    target: 10,
    completed: 0,
    priority: 'high',
    Monday: 10,
    Tuesday: 10,
    Wednesday: 10,
    Thursday: 10,
    Friday: 10,
    Saturday: 5,
    Sunday: 0,
  },
  {
    id: '6',
    stream: 'vault',
    action: 'Vault outreach (DMs, emails, calls)',
    target: 3,
    completed: 0,
    priority: 'high',
    Monday: 3,
    Tuesday: 3,
    Wednesday: 3,
    Thursday: 3,
    Friday: 3,
    Saturday: 2,
    Sunday: 1,
  },
  {
    id: '7',
    stream: 'health',
    action: 'Morning grounding + breathwork',
    target: 1,
    completed: 0,
    priority: 'medium',
    Monday: 1,
    Tuesday: 1,
    Wednesday: 1,
    Thursday: 1,
    Friday: 1,
    Saturday: 1,
    Sunday: 1,
  },
  {
    id: '8',
    stream: 'readings',
    action: 'Post daily numerology reading',
    target: 1,
    completed: 0,
    priority: 'medium',
    Monday: 1,
    Tuesday: 1,
    Wednesday: 1,
    Thursday: 1,
    Friday: 1,
    Saturday: 1,
    Sunday: 1,
  },
];

const streamColors = {
  readings: { bg: 'bg-purple-500/10', border: 'border-purple-700/50', text: 'text-purple-300', icon: '🔮' },
  ugc: { bg: 'bg-blue-500/10', border: 'border-blue-700/50', text: 'text-blue-300', icon: '🎬' },
  vault: { bg: 'bg-orange-500/10', border: 'border-orange-700/50', text: 'text-orange-300', icon: '💎' },
  health: { bg: 'bg-green-500/10', border: 'border-green-700/50', text: 'text-green-300', icon: '❤️' },
};

export default function DailyActionsPage() {
  const [actions, setActions] = useState<DailyAction[]>(dailyActions);
  const [today] = useState(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('daily-actions');
    if (saved) {
      try {
        setActions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load actions:', e);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('daily-actions', JSON.stringify(actions));
    }
  }, [actions, mounted]);

  const toggleAction = (id: string) => {
    setActions(
      actions.map((action) => {
        const isComplete = action.completed > 0;
        return action.id === id ? { ...action, completed: isComplete ? 0 : action.target } : action;
      })
    );
  };

  const todaysTarget = actions
    .filter((a) => a[today as keyof typeof a] !== undefined)
    .reduce((sum, a) => sum + (a[today as keyof typeof a] || 0), 0);

  const todaysCompleted = actions.filter((a) => a.completed > 0).length;
  const completionPercent = (todaysCompleted / actions.length) * 100;

  const criticalActions = actions.filter((a) => a.priority === 'high');
  const supportActions = actions.filter((a) => a.priority === 'medium');

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-3xl font-bold">Daily Actions</h1>
              <p className="text-slate-400">Today: {today}</p>
            </div>
          </div>

          {/* Daily Progress */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Today's Completion</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-yellow-400">{todaysCompleted}</span>
                <span className="text-lg text-slate-500">/ {actions.length} actions</span>
              </div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-yellow-400 font-semibold">{completionPercent.toFixed(0)}% done</span>
              <span className="text-slate-500">Target today: {todaysTarget} actions</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Critical Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-400" />
            🔴 Critical Actions (Must Do Today)
          </h2>

          <div className="space-y-3">
            {criticalActions.map((action) => {
              const color = streamColors[action.stream];
              const isComplete = action.completed > 0;
              const todayTarget = action[today as keyof typeof action] as number | undefined || 0;

              return (
                <div
                  key={action.id}
                  className={`${color.bg} border ${color.border} rounded-lg p-4 transition ${
                    isComplete ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleAction(action.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{color.icon}</span>
                        <h3 className={`font-semibold text-lg ${isComplete ? 'line-through text-slate-500' : 'text-white'}`}>
                          {action.action}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <span className={`px-3 py-1 rounded-full ${color.bg} ${color.text} font-semibold`}>
                          {todayTarget} today
                        </span>
                        <span className="text-slate-400">/ {action.target} target</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Critical Daily Targets */}
          <div className="mt-6 bg-red-900/20 border border-red-700/50 rounded-lg p-4">
            <h3 className="font-semibold text-red-300 mb-3">📊 Today's Critical Targets</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <div className="text-slate-400">Readings Follow-ups</div>
                <div className="text-2xl font-bold text-purple-300">3</div>
              </div>
              <div>
                <div className="text-slate-400">UGC Videos</div>
                <div className="text-2xl font-bold text-blue-300">1</div>
              </div>
              <div>
                <div className="text-slate-400">Brand Outreach</div>
                <div className="text-2xl font-bold text-blue-300">10</div>
              </div>
              <div>
                <div className="text-slate-400">Vault Outreach</div>
                <div className="text-2xl font-bold text-orange-300">3</div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            🟢 Support Actions (Nice to Have)
          </h2>

          <div className="space-y-3">
            {supportActions.map((action) => {
              const color = streamColors[action.stream];
              const isComplete = action.completed > 0;

              return (
                <div
                  key={action.id}
                  className={`${color.bg} border ${color.border} rounded-lg p-4 transition ${
                    isComplete ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleAction(action.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{color.icon}</span>
                        <h3 className={`font-semibold ${isComplete ? 'line-through text-slate-500' : 'text-white'}`}>
                          {action.action}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Pattern */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Weekly Pattern
          </h2>

          <div className="text-sm text-slate-300 space-y-2 mb-6">
            <p>
              <strong>Monday-Friday:</strong> Full action days (15 brand emails, 2 UGC submissions, 3 reading follow-ups, 3 vault outreach)
            </p>
            <p>
              <strong>Saturday:</strong> Lighter day (1 video, 1-2 submissions, 1 reading follow-up, easier pace)
            </p>
            <p>
              <strong>Sunday:</strong> Rest day with light activities (daily numerology post, morning routine, planning)
            </p>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
              const dayTotal = actions
                .filter((a) => a[day as keyof typeof a] !== undefined)
                .reduce((sum, a) => sum + (a[day as keyof typeof a] || 0), 0);
              const isToday = day === today;

              return (
                <div
                  key={day}
                  className={`p-3 rounded-lg text-center ${
                    isToday
                      ? 'bg-yellow-500/20 border-2 border-yellow-500'
                      : 'bg-slate-800/50 border border-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold text-slate-400 mb-1">{day.slice(0, 3)}</div>
                  <div className="text-lg font-bold text-slate-200">{dayTotal}</div>
                  <div className="text-xs text-slate-500">actions</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-300 mb-3">💡 Daily Execution Tips</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>✓ <strong>Do the hard thing first:</strong> UGC filming or reading follow-ups before lunch</li>
            <li>✓ <strong>Batch similar work:</strong> Send all 10 brand emails at once (saves context switching)</li>
            <li>✓ <strong>Track as you go:</strong> Check off actions as completed (momentum feels good)</li>
            <li>✓ <strong>Weekly review:</strong> Sunday evening - what worked? What needs adjustment?</li>
            <li>✓ <strong>Rest matters:</strong> Saturday is lighter intentionally. Sunday is planning day.</li>
            <li>✓ <strong>Emergency escape:</strong> If something urgent comes up, cut vault outreach first (most flexible)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
