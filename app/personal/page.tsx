'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface PersonalTask {
  id: string;
  time: string;
  title: string;
  location?: string;
  notes?: string;
  done: boolean;
}

export default function PersonalPage() {
  const [tasks, setTasks] = useState<PersonalTask[]>([
    {
      id: '1',
      time: '7:00 AM',
      title: 'Blood Work',
      location: 'Tomorrow',
      notes: 'Medical appointment',
      done: false,
    },
    {
      id: '2',
      time: '8:20 AM',
      title: 'License Renewal',
      location: 'Freehold DMV',
      notes: 'Bring documents',
      done: false,
    },
    {
      id: '3',
      time: 'Tue or Thu',
      title: 'Call Brace Place',
      location: 'For Aryan',
      notes: 'Orthodontics appointment scheduling',
      done: false,
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const completedCount = tasks.filter(t => t.done).length;

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📋 Personal Tasks</h1>
          <p className="text-slate-400">
            {completedCount} of {tasks.length} completed
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-slate-900/50 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">Progress</span>
            <span className="text-sm text-slate-400">
              {Math.round((completedCount / tasks.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`border rounded-lg p-5 transition-all cursor-pointer group ${
                task.done
                  ? 'bg-slate-900/30 border-slate-800/50'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <div className="flex items-start gap-4">
                <div className="pt-1 flex-shrink-0">
                  {task.done ? (
                    <CheckCircle2 size={24} className="text-emerald-500" />
                  ) : (
                    <Circle size={24} className="text-slate-600 group-hover:text-slate-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        className={`font-semibold transition-all ${
                          task.done
                            ? 'text-slate-500 line-through'
                            : 'text-white text-lg'
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.location && (
                        <p className="text-sm text-slate-400 mt-1">📍 {task.location}</p>
                      )}
                      {task.notes && (
                        <p className="text-sm text-slate-500 mt-1">{task.notes}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 whitespace-nowrap ${
                    task.done
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-blue-900/40 text-blue-300 border border-blue-800/50'
                  }`}
                >
                  <Clock size={14} />
                  {task.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-slate-900/30 border border-slate-800 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">💡 Quick Notes</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>✓ Click any task to mark it complete</li>
            <li>✓ Blood work scheduled for early morning</li>
            <li>✓ Bring renewal documents to DMV</li>
            <li>✓ Call during business hours (Tue/Thu afternoon ideal)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
