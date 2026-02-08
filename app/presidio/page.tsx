'use client';

import { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, Briefcase, Users } from 'lucide-react';

// Types
interface Task {
  id: string;
  text: string;
  client: 'daily' | 'moog' | '311' | 'sulcoptor' | 'vitacoco' | 'vertex';
}

interface WeekData {
  weekStart: Date;
  weekEnd: Date;
  weekLabel: string;
}

// Client colors
const CLIENT_COLORS = {
  daily: { bg: 'bg-slate-500/20', border: 'border-slate-500', text: 'text-slate-300', dot: 'bg-slate-400', label: '📋 Daily Tasks', accent: '#64748b' },
  moog: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400', dot: 'bg-blue-500', label: '👤 MOOG', accent: '#3b82f6' },
  '311': { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-400', dot: 'bg-purple-500', label: '👤 311', accent: '#a855f7' },
  sulcoptor: { bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-400', dot: 'bg-orange-500', label: '👤 SULCOPTOR CAPITAL', accent: '#f97316' },
  vitacoco: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400', dot: 'bg-green-500', label: '👤 VITA COCO', accent: '#22c55e' },
  vertex: { bg: 'bg-pink-500/20', border: 'border-pink-500', text: 'text-pink-400', dot: 'bg-pink-500', label: '👤 VERTEX', accent: '#ec4899' },
};

// Initial tasks data - users can customize after launch
const INITIAL_TASKS: Task[] = [
  // Daily Tasks
  { id: 'daily-1', text: 'Team standup (Monday)', client: 'daily' },
  { id: 'daily-2', text: 'Weekly time tracking submission', client: 'daily' },
  { id: 'daily-3', text: 'Email check-in with management', client: 'daily' },
  { id: 'daily-4', text: 'Client status updates', client: 'daily' },
  { id: 'daily-5', text: 'Review open tickets/requests', client: 'daily' },
  
  // Moog
  { id: 'moog-1', text: 'Review infrastructure health report', client: 'moog' },
  { id: 'moog-2', text: 'Follow up on security audit findings', client: 'moog' },
  { id: 'moog-3', text: 'Prepare quarterly business review deck', client: 'moog' },
  
  // 311
  { id: '311-1', text: 'Network performance analysis', client: '311' },
  { id: '311-2', text: 'Schedule migration planning call', client: '311' },
  
  // Sulcoptor Capital
  { id: 'sulcoptor-1', text: 'Cloud cost optimization review', client: 'sulcoptor' },
  { id: 'sulcoptor-2', text: 'Disaster recovery test scheduling', client: 'sulcoptor' },
  
  // Vita Coco
  { id: 'vitacoco-1', text: 'Endpoint security rollout status', client: 'vitacoco' },
  { id: 'vitacoco-2', text: 'User onboarding tickets review', client: 'vitacoco' },
  
  // Vertex
  { id: 'vertex-1', text: 'Infrastructure assessment proposal', client: 'vertex' },
  { id: 'vertex-2', text: 'SLA compliance report', client: 'vertex' },
];

// Helper functions
function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

function formatWeekLabel(start: Date, end: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const startMonth = months[start.getMonth()];
  const endMonth = months[end.getMonth()];
  const startDay = start.getDate();
  const endDay = end.getDate();
  const year = start.getFullYear();
  
  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}-${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}

function getWeekData(baseDate: Date): WeekData {
  const monday = getMonday(baseDate);
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);
  
  return {
    weekStart: monday,
    weekEnd: friday,
    weekLabel: formatWeekLabel(monday, friday),
  };
}

function getWeekKey(date: Date): string {
  const monday = getMonday(date);
  return monday.toISOString().split('T')[0];
}

export default function PresidioDashboard() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [completedTasks, setCompletedTasks] = useState<Record<string, Set<string>>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('presidio-completed');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const restored: Record<string, Set<string>> = {};
        Object.entries(parsed).forEach(([weekKey, taskIds]) => {
          restored[weekKey] = new Set(taskIds as string[]);
        });
        setCompletedTasks(restored);
      } catch (e) {
        console.error('Failed to load Presidio state:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    const toSave: Record<string, string[]> = {};
    Object.entries(completedTasks).forEach(([weekKey, taskIds]) => {
      toSave[weekKey] = Array.from(taskIds);
    });
    localStorage.setItem('presidio-completed', JSON.stringify(toSave));
  }, [completedTasks, isLoaded]);

  const weekData = useMemo(() => getWeekData(currentDate), [currentDate]);
  const weekKey = useMemo(() => getWeekKey(currentDate), [currentDate]);
  const currentWeekCompleted = completedTasks[weekKey] || new Set<string>();

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
      return newDate;
    });
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const weekTasks = new Set(prev[weekKey] || []);
      if (weekTasks.has(taskId)) {
        weekTasks.delete(taskId);
      } else {
        weekTasks.add(taskId);
      }
      return { ...prev, [weekKey]: weekTasks };
    });
  };

  // Group tasks by client
  const tasksByClient = useMemo(() => {
    const grouped: Record<string, Task[]> = {
      daily: [],
      moog: [],
      '311': [],
      sulcoptor: [],
      vitacoco: [],
      vertex: [],
    };
    INITIAL_TASKS.forEach(task => {
      grouped[task.client].push(task);
    });
    return grouped;
  }, []);

  // Calculate progress
  const totalTasks = INITIAL_TASKS.length;
  const completedCount = currentWeekCompleted.size;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Title */}
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold">PRESIDIO</h1>
              <p className="text-sm text-slate-400">Technical Sales Specialist • Managed Services</p>
            </div>
          </div>

          {/* Week Navigator */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateWeek('prev')}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-sm"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <div className="text-center">
              <div className="text-lg font-semibold">Week of {weekData.weekLabel}</div>
              <div className="text-xs text-slate-500">Mon - Fri</div>
            </div>
            
            <button
              onClick={() => navigateWeek('next')}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-slate-400">Weekly Progress</span>
              <span className="text-slate-300 font-medium">{completedCount} of {totalTasks} complete ({progressPercent}%)</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Client Sections */}
        {(['daily', 'moog', '311', 'sulcoptor', 'vitacoco', 'vertex'] as const).map(clientKey => {
          const clientConfig = CLIENT_COLORS[clientKey];
          const clientTasks = tasksByClient[clientKey];
          const clientCompleted = clientTasks.filter(t => currentWeekCompleted.has(t.id)).length;
          
          return (
            <div 
              key={clientKey}
              className={`rounded-xl border ${clientConfig.border} ${clientConfig.bg} overflow-hidden`}
            >
              {/* Section Header */}
              <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${clientConfig.dot}`} />
                  <span className={`font-semibold ${clientConfig.text}`}>{clientConfig.label}</span>
                </div>
                <span className="text-xs text-slate-500">
                  {clientCompleted}/{clientTasks.length}
                </span>
              </div>
              
              {/* Tasks */}
              <div className="p-3 space-y-1">
                {clientTasks.map(task => {
                  const isCompleted = currentWeekCompleted.has(task.id);
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left
                        ${isCompleted 
                          ? 'bg-slate-800/30 text-slate-500' 
                          : 'hover:bg-slate-800/50 text-slate-200'
                        }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                      )}
                      <span className={isCompleted ? 'line-through' : ''}>{task.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-600 py-4">
          Tasks persist per week • Click to toggle completion
        </div>
      </div>
    </div>
  );
}
