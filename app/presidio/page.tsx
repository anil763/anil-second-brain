'use client';

import { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, Briefcase, Plus, Trash2, X } from 'lucide-react';

// Types
interface Task {
  id: string;
  text: string;
  client: 'general' | 'moog' | '311' | 'sulcoptor' | 'vitacoco' | 'vertex';
  completed: boolean;
}

interface DayData {
  date: string;
  dateStr: string;
  dayOfWeek: string;
  dayOfWeekShort: string;
}

// Client colors matching the daily dashboard
const CLIENT_COLORS = {
  general: { bg: 'bg-slate-500/20', border: 'border-slate-500', text: 'text-slate-400', dot: 'bg-slate-500', label: '🩶 GENERAL' },
  moog: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400', dot: 'bg-blue-500', label: '🔵 MOOG' },
  '311': { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-400', dot: 'bg-purple-500', label: '🟣 311' },
  sulcoptor: { bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-400', dot: 'bg-orange-500', label: '🟠 SULCOPTOR CAPITAL' },
  vitacoco: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400', dot: 'bg-green-500', label: '🟢 VITA COCO' },
  vertex: { bg: 'bg-pink-500/20', border: 'border-pink-500', text: 'text-pink-400', dot: 'bg-pink-500', label: '💗 VERTEX' },
};

const CLIENT_ORDER: (keyof typeof CLIENT_COLORS)[] = ['general', 'moog', '311', 'sulcoptor', 'vitacoco', 'vertex'];

// Generate 30 days of data (Feb 9 - Mar 10, 2026)
function generate30Days(): DayData[] {
  const days: DayData[] = [];
  const startDate = new Date('2026-02-09');
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayNamesShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayIdx = currentDate.getDay();
    
    days.push({
      date: dateStr,
      dateStr: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dayOfWeek: dayNames[dayIdx],
      dayOfWeekShort: dayNamesShort[dayIdx],
    });
  }

  return days;
}

// Initial sample tasks
const INITIAL_TASKS: Record<string, Task[]> = {
  '2026-02-09': [
    { id: 'init-1', text: 'Finish training', client: 'general', completed: false },
    { id: 'init-2', text: 'Change password', client: 'general', completed: false },
    { id: 'init-3', text: 'Update pricing', client: 'moog', completed: false },
    { id: 'init-4', text: 'Submit new PPT', client: 'moog', completed: false },
    { id: 'init-5', text: 'Update pricing', client: '311', completed: false },
    { id: 'init-6', text: 'Client meeting', client: 'sulcoptor', completed: false },
  ],
};

// Day card component
function DayCard({ 
  day, 
  tasks,
  onToggleTask, 
  onAddTask,
  onDeleteTask,
  isToday,
  isExpanded,
  onToggleExpand 
}: { 
  day: DayData; 
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (client: keyof typeof CLIENT_COLORS, text: string) => void;
  onDeleteTask: (taskId: string) => void;
  isToday: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const [addingToClient, setAddingToClient] = useState<keyof typeof CLIENT_COLORS | null>(null);
  const [newTaskText, setNewTaskText] = useState('');

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isPast = new Date(day.date) < new Date(new Date().toISOString().split('T')[0]);
  const allComplete = totalCount > 0 && completedCount === totalCount;

  const handleAddTask = () => {
    if (addingToClient && newTaskText.trim()) {
      onAddTask(addingToClient, newTaskText.trim());
      setNewTaskText('');
      setAddingToClient(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setAddingToClient(null);
      setNewTaskText('');
    }
  };

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
              <span className={`font-bold ${isToday ? 'text-yellow-400' : 'text-white'}`}>
                {day.dayOfWeekShort}
              </span>
              <span className={`font-semibold ${isToday ? 'text-yellow-400' : 'text-slate-300'}`}>
                {day.dateStr.toUpperCase()}
              </span>
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

      {/* Tasks grouped by client */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-700/50 pt-3">
          {CLIENT_ORDER.map(clientKey => {
            const clientConfig = CLIENT_COLORS[clientKey];
            const clientTasks = tasks.filter(t => t.client === clientKey);
            const clientCompleted = clientTasks.filter(t => t.completed).length;
            
            return (
              <div key={clientKey} className={`rounded-lg border ${clientConfig.border} ${clientConfig.bg} p-3`}>
                {/* Client Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${clientConfig.dot}`} />
                    <span className={`text-sm font-semibold ${clientConfig.text}`}>
                      {clientConfig.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {clientTasks.length > 0 && (
                      <span className="text-xs text-slate-500">
                        {clientCompleted}/{clientTasks.length}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddingToClient(addingToClient === clientKey ? null : clientKey);
                        setNewTaskText('');
                      }}
                      className={`p-1 rounded hover:bg-slate-700/50 transition ${clientConfig.text}`}
                      title="Add task"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Tasks */}
                <div className="space-y-1">
                  {clientTasks.length === 0 && addingToClient !== clientKey && (
                    <p className="text-slate-600 text-xs italic pl-1">No tasks</p>
                  )}
                  {clientTasks.map(task => (
                    <div
                      key={task.id}
                      className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-900/50 group"
                    >
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className="flex-shrink-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 className={`w-4 h-4 ${clientConfig.text}`} />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600" />
                        )}
                      </button>
                      <span className={`flex-1 text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                        {task.text}
                      </span>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-red-400 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Add task input */}
                  {addingToClient === clientKey && (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="New task..."
                        autoFocus
                        className="flex-1 px-2 py-1.5 text-sm rounded bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
                      />
                      <button
                        onClick={handleAddTask}
                        className="px-2 py-1.5 text-xs rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setAddingToClient(null);
                          setNewTaskText('');
                        }}
                        className="p-1.5 text-slate-500 hover:text-slate-300 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Main component
export default function PresidioDashboard() {
  const [tasksByDate, setTasksByDate] = useState<Record<string, Task[]>>({});
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  const days = useMemo(() => generate30Days(), []);
  
  // Get today's date string
  const todayStr = new Date().toISOString().split('T')[0];

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('presidio-unified-tasks');
    if (saved) {
      try {
        setTasksByDate(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load Presidio tasks:', e);
        setTasksByDate(INITIAL_TASKS);
      }
    } else {
      setTasksByDate(INITIAL_TASKS);
    }
    
    // Auto-expand today or first day
    const today = days.find(d => d.date === todayStr);
    if (today) {
      setExpandedDays(new Set([todayStr]));
    } else {
      setExpandedDays(new Set([days[0]?.date]));
    }
    
    setMounted(true);
  }, [days, todayStr]);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('presidio-unified-tasks', JSON.stringify(tasksByDate));
    }
  }, [tasksByDate, mounted]);

  const toggleTask = (date: string, taskId: string) => {
    setTasksByDate(prev => ({
      ...prev,
      [date]: (prev[date] || []).map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    }));
  };

  const addTask = (date: string, client: keyof typeof CLIENT_COLORS, text: string) => {
    const newTask: Task = {
      id: `${date}-${client}-${Date.now()}`,
      text,
      client,
      completed: false,
    };
    setTasksByDate(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), newTask],
    }));
  };

  const deleteTask = (date: string, taskId: string) => {
    setTasksByDate(prev => ({
      ...prev,
      [date]: (prev[date] || []).filter(t => t.id !== taskId),
    }));
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
  const allTasks = Object.values(tasksByDate).flat();
  const totalTasks = allTasks.length;
  const totalCompleted = allTasks.filter(t => t.completed).length;
  const overallProgress = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  const todayTasks = tasksByDate[todayStr] || [];
  const todayCompleted = todayTasks.filter(t => t.completed).length;
  const todayTotal = todayTasks.length;

  const daysWithAllComplete = days.filter(d => {
    const dayTasks = tasksByDate[d.date] || [];
    return dayTasks.length > 0 && dayTasks.every(t => t.completed);
  }).length;

  // Client breakdown
  const clientStats = CLIENT_ORDER.reduce((acc, client) => {
    const clientTasks = allTasks.filter(t => t.client === client);
    acc[client] = {
      total: clientTasks.length,
      completed: clientTasks.filter(t => t.completed).length,
    };
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-slate-400">Loading Presidio Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Title */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold">PRESIDIO</h1>
                <p className="text-sm text-slate-400">Feb 9 - Mar 10, 2026 • Client Task Tracker</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">{overallProgress}%</div>
              <div className="text-sm text-slate-500">Overall Progress</div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-900/50 rounded-lg p-2">
              <div className="text-lg font-bold text-yellow-400">
                {todayTotal > 0 ? `${todayCompleted}/${todayTotal}` : '—'}
              </div>
              <div className="text-xs text-slate-500">Today</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-2">
              <div className="text-lg font-bold text-green-400">{daysWithAllComplete}/30</div>
              <div className="text-xs text-slate-500">Days Complete</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-2">
              <div className="text-lg font-bold text-blue-400">{totalCompleted}</div>
              <div className="text-xs text-slate-500">Tasks Done</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Client Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {CLIENT_ORDER.map(clientKey => {
            const config = CLIENT_COLORS[clientKey];
            const stats = clientStats[clientKey];
            const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
            
            return (
              <div key={clientKey} className={`p-3 rounded-lg border ${config.border} ${config.bg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${config.dot}`} />
                  <span className={`text-xs font-semibold ${config.text}`}>
                    {config.label.split(' ')[1]}
                  </span>
                  <span className="ml-auto text-xs text-slate-500">{progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${config.dot} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Days List */}
        <div className="space-y-3">
          {days.map(day => (
            <DayCard
              key={day.date}
              day={day}
              tasks={tasksByDate[day.date] || []}
              onToggleTask={(taskId) => toggleTask(day.date, taskId)}
              onAddTask={(client, text) => addTask(day.date, client, text)}
              onDeleteTask={(taskId) => deleteTask(day.date, taskId)}
              isToday={day.date === todayStr}
              isExpanded={expandedDays.has(day.date)}
              onToggleExpand={() => toggleExpand(day.date)}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-slate-500 text-sm pb-8">
          <p>📋 Tasks organized by client • Data saved locally</p>
        </footer>
      </main>
    </div>
  );
}
