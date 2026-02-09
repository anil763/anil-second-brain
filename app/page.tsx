'use client';

import { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, Calendar, Target, Flame, BookOpen, DollarSign } from 'lucide-react';

// Types
interface Task {
  id: string;
  text: string;
  category: 'ugc' | 'spiritual' | 'vault';
}

interface DayData {
  date: string;
  dateStr: string;
  dayOfWeek: string;
  weekNum: number;
  tasks: Task[];
  milestone?: string;
}

// Category colors
const CATEGORY_COLORS = {
  ugc: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400', dot: 'bg-blue-500', label: '🔵 UGC' },
  spiritual: { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-400', dot: 'bg-purple-500', label: '🟣 Spiritual' },
  vault: { bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-400', dot: 'bg-orange-500', label: '🟠 Gentleman\'s Vault' },
};

// Generate task templates based on week and day
function getTasksForDay(date: Date, weekNum: number): Task[] {
  const dayOfWeek = date.getDay();
  const tasks: Task[] = [];
  const dateStr = date.toISOString().split('T')[0];

  // UGC Tasks (Daily)
  tasks.push({ id: `${dateStr}-ugc-film`, text: 'Film 1-2 UGC videos', category: 'ugc' });
  tasks.push({ id: `${dateStr}-ugc-outreach`, text: 'Send 20 brand outreach emails', category: 'ugc' });
  tasks.push({ id: `${dateStr}-ugc-edit`, text: 'Review/edit video footage', category: 'ugc' });
  tasks.push({ id: `${dateStr}-ugc-upload`, text: 'Upload to Bento Backstage', category: 'ugc' });

  // Spiritual Tasks (Daily)
  tasks.push({ id: `${dateStr}-spiritual-post`, text: 'Post numerology energy reading (4 platforms)', category: 'spiritual' });
  tasks.push({ id: `${dateStr}-spiritual-film`, text: 'Film 1 spiritual video', category: 'spiritual' });
  tasks.push({ id: `${dateStr}-spiritual-respond`, text: 'Respond to coach inquiries', category: 'spiritual' });

  // Gentleman's Vault Tasks (Week-dependent, specific day-by-day)
  if (weekNum === 1) {
    // Week 1: Skool Setup (Feb 9-15)
    if (dateStr === '2026-02-09') {
      tasks.push({ id: `${dateStr}-vault-1`, text: 'Create Skool account, reserve community name', category: 'vault' });
    } else if (dateStr === '2026-02-10') {
      tasks.push({ id: `${dateStr}-vault-1`, text: 'Set up 3 membership tiers ($97/$297/$497)', category: 'vault' });
    } else if (dateStr === '2026-02-11') {
      tasks.push({ id: `${dateStr}-vault-1`, text: 'Create landing page (description, benefits, pricing)', category: 'vault' });
    } else if (dateStr === '2026-02-12') {
      tasks.push({ id: `${dateStr}-vault-1`, text: 'Set up email sequences (welcome, onboarding, value)', category: 'vault' });
    } else if (dateStr === '2026-02-13') {
      tasks.push({ id: `${dateStr}-vault-1`, text: 'Create course/module structure in Skool', category: 'vault' });
    } else if (dateStr === '2026-02-14') {
      tasks.push({ id: `${dateStr}-vault-1`, text: 'Upload first 5 video scripts to Skool', category: 'vault' });
    } else if (dateStr === '2026-02-15') {
      tasks.push({ id: `${dateStr}-vault-1`, text: 'Test member experience (sign up, access content)', category: 'vault' });
    } else {
      tasks.push({ id: `${dateStr}-vault-1`, text: 'Continue Skool setup & refinement', category: 'vault' });
    }
  } else if (weekNum === 2) {
    // Week 2: Content & Pre-Launch (Feb 16-22)
    if (dateStr === '2026-02-16') {
      tasks.push({ id: `${dateStr}-vault-2`, text: 'Film launch video #1 (5 total needed)', category: 'vault' });
    } else if (dateStr === '2026-02-19') {
      tasks.push({ id: `${dateStr}-vault-2`, text: 'Create founding member offer (limited time, bonus)', category: 'vault' });
    } else if (dateStr === '2026-02-20') {
      tasks.push({ id: `${dateStr}-vault-2`, text: 'Set up Telegram group for members', category: 'vault' });
    } else if (dateStr === '2026-02-21') {
      tasks.push({ id: `${dateStr}-vault-2`, text: 'Create & test welcome email sequence (3 emails)', category: 'vault' });
    } else if (dateStr === '2026-02-22') {
      tasks.push({ id: `${dateStr}-vault-2`, text: 'Set up waitlist/early access link', category: 'vault' });
    } else {
      tasks.push({ id: `${dateStr}-vault-2`, text: 'Film & edit launch videos (target: 5 total)', category: 'vault' });
      tasks.push({ id: `${dateStr}-vault-2b`, text: '1 launch countdown social post (TikTok/LinkedIn)', category: 'vault' });
    }
  } else if (weekNum === 3) {
    // Week 3: Launch Push (Feb 23 - Mar 1)
    if (dateStr === '2026-02-23') {
      tasks.push({ id: `${dateStr}-vault-3`, text: 'Announce launch date (March 1) to email list', category: 'vault' });
    } else if (dateStr === '2026-02-24') {
      tasks.push({ id: `${dateStr}-vault-3`, text: 'Start daily launch countdown posts (TikTok, LinkedIn, YouTube)', category: 'vault' });
    } else if (dateStr === '2026-02-25' || dateStr === '2026-02-26') {
      tasks.push({ id: `${dateStr}-vault-3`, text: 'Launch teaser posts (testimonials, benefits, stories)', category: 'vault' });
    } else if (dateStr === '2026-02-27' || dateStr === '2026-02-28') {
      tasks.push({ id: `${dateStr}-vault-3`, text: 'Final 3-day urgency push (2-3 social posts)', category: 'vault' });
      tasks.push({ id: `${dateStr}-vault-3b`, text: 'Send urgency email to list', category: 'vault' });
    } else if (dateStr === '2026-03-01') {
      tasks.push({ id: `${dateStr}-vault-3`, text: '🚀 LAUNCH DAY - Go live, start accepting members', category: 'vault' });
      tasks.push({ id: `${dateStr}-vault-3b`, text: 'First day onboarding (welcome calls, answer questions)', category: 'vault' });
    } else {
      tasks.push({ id: `${dateStr}-vault-3`, text: 'Continue launch push & member onboarding', category: 'vault' });
    }
  } else {
    // Week 4+: Scale (Mar 2-10)
    tasks.push({ id: `${dateStr}-vault-4`, text: 'Scale outreach (20+ emails to prospects)', category: 'vault' });
    tasks.push({ id: `${dateStr}-vault-4b`, text: 'Member growth & community engagement', category: 'vault' });
  }

  return tasks;
}

// Generate 30 days of data
function generate30DayPlan(): DayData[] {
  const days: DayData[] = [];
  const startDate = new Date('2026-02-09');
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const milestones: Record<string, string> = {
    '2026-02-09': '🚀 Week 1 Start: UGC pipeline ready, Gentleman\'s Vault Skool live',
    '2026-02-15': '✅ Week 1 End: Review progress',
    '2026-02-16': '🎬 Week 2 Start: 5+ UGC videos completed, GV pre-launch content',
    '2026-02-22': '✅ Week 2 End: Review progress',
    '2026-02-23': '🔥 Week 3 Start: Gentleman\'s Vault LAUNCHES!',
    '2026-03-01': '✅ Week 3 End: 10+ UGC videos in pipeline',
    '2026-03-02': '📈 Week 4 Start: Scale UGC outreach, GV reaching 10+ members',
    '2026-03-08': '🎯 TARGET: $1K/month achieved!',
    '2026-03-10': '🏁 30-Day Challenge Complete!',
  };

  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const dateStr = currentDate.toISOString().split('T')[0];
    const weekNum = Math.floor(i / 7) + 1;
    
    days.push({
      date: dateStr,
      dateStr: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dayOfWeek: dayNames[currentDate.getDay()],
      weekNum: Math.min(weekNum, 4),
      tasks: getTasksForDay(currentDate, Math.min(weekNum, 4)),
      milestone: milestones[dateStr],
    });
  }

  return days;
}

// Custom checkbox component
function TaskCheckbox({ 
  task, 
  checked, 
  onToggle 
}: { 
  task: Task; 
  checked: boolean; 
  onToggle: () => void;
}) {
  const colors = CATEGORY_COLORS[task.category];
  
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-3 w-full p-2 rounded-lg transition-all duration-200 hover:bg-slate-800/50 group ${
        checked ? 'opacity-60' : ''
      }`}
    >
      <div className={`flex-shrink-0 transition-transform duration-200 ${checked ? 'scale-110' : 'group-hover:scale-105'}`}>
        {checked ? (
          <CheckCircle2 className={`w-5 h-5 ${colors.text}`} />
        ) : (
          <Circle className={`w-5 h-5 text-slate-600 group-hover:${colors.text}`} />
        )}
      </div>
      <span className={`text-sm text-left ${checked ? 'line-through text-slate-500' : 'text-slate-300'}`}>
        {task.text}
      </span>
      <div className={`w-2 h-2 rounded-full ${colors.dot} ml-auto flex-shrink-0`} />
    </button>
  );
}

// Day card component
function DayCard({ 
  day, 
  completedTasks, 
  onToggleTask, 
  isToday,
  isExpanded,
  onToggleExpand 
}: { 
  day: DayData; 
  completedTasks: Set<string>;
  onToggleTask: (taskId: string) => void;
  isToday: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const completedCount = day.tasks.filter(t => completedTasks.has(t.id)).length;
  const totalCount = day.tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isPast = new Date(day.date) < new Date(new Date().toISOString().split('T')[0]);
  const allComplete = completedCount === totalCount;

  return (
    <div className={`rounded-xl border transition-all duration-300 ${
      isToday 
        ? 'border-yellow-500/50 bg-yellow-500/5 ring-2 ring-yellow-500/20' 
        : allComplete
        ? 'border-green-500/30 bg-green-500/5'
        : isPast
        ? 'border-slate-700/50 bg-slate-900/30 opacity-75'
        : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
    }`}>
      {/* Header */}
      <button
        onClick={onToggleExpand}
        className="w-full p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-500" />
          )}
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${isToday ? 'text-yellow-400' : 'text-white'}`}>
                {day.dateStr}
              </span>
              <span className="text-slate-500 text-sm">{day.dayOfWeek}</span>
              {isToday && (
                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full font-medium">
                  TODAY
                </span>
              )}
              {allComplete && !isToday && (
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">
                  ✓ COMPLETE
                </span>
              )}
            </div>
            {day.milestone && (
              <div className="text-sm text-amber-400 mt-1">{day.milestone}</div>
            )}
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${
            allComplete ? 'text-green-400' : completedCount > 0 ? 'text-blue-400' : 'text-slate-500'
          }`}>
            {completedCount}/{totalCount}
          </span>
          <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                allComplete ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </button>

      {/* Tasks */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-1 border-t border-slate-700/50 pt-3">
          {/* Group by category */}
          {(['ugc', 'spiritual', 'vault'] as const).map(category => {
            const categoryTasks = day.tasks.filter(t => t.category === category);
            if (categoryTasks.length === 0) return null;
            
            const colors = CATEGORY_COLORS[category];
            return (
              <div key={category} className="mb-3">
                <div className={`text-xs font-semibold ${colors.text} mb-1 px-2`}>
                  {colors.label}
                </div>
                {categoryTasks.map(task => (
                  <TaskCheckbox
                    key={task.id}
                    task={task}
                    checked={completedTasks.has(task.id)}
                    onToggle={() => onToggleTask(task.id)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Stats card component
function StatsCard({ icon: Icon, label, value, color }: { 
  icon: React.ElementType; 
  label: string; 
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-xs text-slate-400">{label}</div>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function ActionKanban() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  const days = useMemo(() => generate30DayPlan(), []);
  
  // Get today's date string (EST timezone)
  const getTodayStr = () => {
    const now = new Date();
    const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    return estTime.toISOString().split('T')[0];
  };
  const todayStr = getTodayStr();
  // For demo/testing, use this to simulate being in the challenge period:
  // const todayStr = '2026-02-15';

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('kanban-completed-tasks');
    if (saved) {
      setCompletedTasks(new Set(JSON.parse(saved)));
    }
    
    // Auto-expand today
    const today = days.find(d => d.date === todayStr);
    if (today) {
      setExpandedDays(new Set([todayStr]));
    } else {
      // If not in challenge period, expand first day
      setExpandedDays(new Set([days[0]?.date]));
    }
    
    setMounted(true);
  }, [days, todayStr]);

  // Load from cloud on mount
  useEffect(() => {
    const loadFromCloud = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        if (data.tasks && Array.isArray(data.tasks)) {
          setCompletedTasks(new Set(data.tasks));
        }
      } catch (err) {
        console.log('Cloud load failed, using local:', err);
      }
    };
    
    if (mounted) {
      loadFromCloud();
    }
  }, [mounted]);

  // Save to localStorage & cloud
  useEffect(() => {
    if (mounted) {
      const tasks = Array.from(completedTasks);
      localStorage.setItem('kanban-completed-tasks', JSON.stringify(tasks));
      
      // Sync to cloud
      fetch('/api/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks }),
      }).catch(err => console.log('Cloud save failed:', err));
    }
  }, [completedTasks, mounted]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const toggleExpand = (date: string) => {
    setExpandedDays(prev => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };

  // Calculate stats
  const totalTasks = days.reduce((sum, d) => sum + d.tasks.length, 0);
  const totalCompleted = completedTasks.size;
  const overallProgress = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
  
  const todayData = days.find(d => d.date === todayStr);
  const todayCompleted = todayData 
    ? todayData.tasks.filter(t => completedTasks.has(t.id)).length 
    : 0;
  const todayTotal = todayData?.tasks.length || 0;

  const daysCompleted = days.filter(d => 
    d.tasks.every(t => completedTasks.has(t.id))
  ).length;

  // Category stats
  const categoryStats = {
    ugc: { total: 0, completed: 0 },
    spiritual: { total: 0, completed: 0 },
    vault: { total: 0, completed: 0 },
  };
  
  days.forEach(d => {
    d.tasks.forEach(t => {
      categoryStats[t.category].total++;
      if (completedTasks.has(t.id)) {
        categoryStats[t.category].completed++;
      }
    });
  });

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-slate-400">Loading Action Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Flame className="w-7 h-7 text-orange-500" />
                30-Day Action Dashboard
              </h1>
              <p className="text-slate-400 text-sm">Feb 9 - Mar 10, 2026 • Mission: $1K/month</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">{overallProgress}%</div>
              <div className="text-sm text-slate-500">Overall Progress</div>
            </div>
          </div>
          
          {/* Overall progress bar */}
          <div className="mt-4 h-3 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            icon={Target} 
            label="Today's Progress" 
            value={todayData ? `${todayCompleted}/${todayTotal}` : 'N/A'} 
            color="bg-yellow-500/20 text-yellow-400"
          />
          <StatsCard 
            icon={Calendar} 
            label="Days Completed" 
            value={`${daysCompleted}/30`}
            color="bg-green-500/20 text-green-400"
          />
          <StatsCard 
            icon={CheckCircle2} 
            label="Total Tasks Done" 
            value={totalCompleted}
            color="bg-blue-500/20 text-blue-400"
          />
          <StatsCard 
            icon={DollarSign} 
            label="Target" 
            value="$1K/mo"
            color="bg-orange-500/20 text-orange-400"
          />
        </div>

        {/* Category Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {(['ugc', 'spiritual', 'vault'] as const).map(category => {
            const stats = categoryStats[category];
            const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
            const colors = CATEGORY_COLORS[category];
            
            return (
              <div key={category} className={`p-4 rounded-xl border ${colors.border} ${colors.bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold ${colors.text}`}>{colors.label}</span>
                  <span className="text-white font-bold">{progress}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${colors.dot} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {stats.completed} / {stats.total} tasks
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-slate-400">UGC Tasks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-slate-400">Spiritual Tasks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-slate-400">Gentleman's Vault</span>
          </div>
        </div>

        {/* Days List */}
        <div className="space-y-3">
          {days.map(day => (
            <DayCard
              key={day.date}
              day={day}
              completedTasks={completedTasks}
              onToggleTask={toggleTask}
              isToday={day.date === todayStr}
              isExpanded={expandedDays.has(day.date)}
              onToggleExpand={() => toggleExpand(day.date)}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-slate-500 text-sm pb-8">
          <p>💪 Every task checked is a step toward $1K/month</p>
          <p className="mt-1">☁️ Cloud synced • Updates across all devices</p>
        </footer>
      </main>
    </div>
  );
}
