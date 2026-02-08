'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  client: string;
  text: string;
  completed: boolean;
}

interface DayTasks {
  [date: string]: Task[];
}

const CLIENTS = [
  { name: 'Moog', color: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400', dot: 'bg-blue-500' },
  { name: '311', color: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-400', dot: 'bg-purple-500' },
  { name: 'Sulcoptor Capital', color: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-400', dot: 'bg-orange-500' },
  { name: 'Vita Coco', color: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400', dot: 'bg-green-500' },
  { name: 'Vertex', color: 'bg-pink-500/20', border: 'border-pink-500', text: 'text-pink-400', dot: 'bg-pink-500' },
];

export default function PresidioDailyPage() {
  const [currentDate, setCurrentDate] = useState(new Date('2026-02-09'));
  const [dayTasks, setDayTasks] = useState<DayTasks>({});
  const [newTask, setNewTask] = useState({ client: 'Moog', text: '' });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('presidio-daily-tasks');
    if (saved) {
      setDayTasks(JSON.parse(saved));
    } else {
      // Initialize with Monday tasks
      setDayTasks({
        '2026-02-09': [
          { id: '1', client: 'Moog', text: 'Update pricing', completed: false },
          { id: '2', client: 'Moog', text: 'Submit new PPT', completed: false },
          { id: '3', client: '311', text: 'Update pricing', completed: false },
          { id: '4', client: 'Sulcoptor Capital', text: 'Client meeting', completed: false },
        ],
      });
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('presidio-daily-tasks', JSON.stringify(dayTasks));
  }, [dayTasks]);

  const dateStr = currentDate.toISOString().split('T')[0];
  const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const displayDate = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const todayTasks = dayTasks[dateStr] || [];
  const clientTasks = CLIENTS.map((client) => ({
    ...client,
    tasks: todayTasks.filter((t) => t.client === client.name),
  }));

  const completedCount = todayTasks.filter((t) => t.completed).length;
  const totalCount = todayTasks.length;

  const handleToggleTask = (id: string) => {
    setDayTasks((prev) => ({
      ...prev,
      [dateStr]: prev[dateStr]?.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)) || [],
    }));
  };

  const handleAddTask = () => {
    if (!newTask.text.trim()) return;
    const id = Date.now().toString();
    setDayTasks((prev) => ({
      ...prev,
      [dateStr]: [
        ...(prev[dateStr] || []),
        { id, client: newTask.client, text: newTask.text, completed: false },
      ],
    }));
    setNewTask({ client: 'Moog', text: '' });
  };

  const handleDeleteTask = (id: string) => {
    setDayTasks((prev) => ({
      ...prev,
      [dateStr]: prev[dateStr]?.filter((t) => t.id !== id) || [],
    }));
  };

  const handlePrevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrevDay} className="p-2 hover:bg-slate-800 rounded-lg">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-3xl font-bold">{dayName}</h1>
              <p className="text-slate-400 text-lg">{displayDate}</p>
            </div>
            <button onClick={handleNextDay} className="p-2 hover:bg-slate-800 rounded-lg">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress */}
          {totalCount > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{completedCount} of {totalCount} complete</span>
                <span className="text-blue-400 font-medium">{Math.round((completedCount / totalCount) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Client Tasks */}
        <div className="space-y-6 mb-8">
          {clientTasks.map((client) => (
            <div key={client.name} className={`rounded-xl border p-6 ${client.color} border-gray-700`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${client.dot}`} />
                <h2 className="text-xl font-semibold">{client.name}</h2>
                {client.tasks.length > 0 && (
                  <span className="ml-auto text-sm text-slate-400">
                    {client.tasks.filter((t) => t.completed).length}/{client.tasks.length}
                  </span>
                )}
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                {client.tasks.length === 0 ? (
                  <p className="text-slate-500 text-sm italic">No tasks for {client.name}</p>
                ) : (
                  client.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900/50">
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className="flex-shrink-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 className={`w-5 h-5 ${client.text}`} />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-600" />
                        )}
                      </button>
                      <span className={`flex-1 ${task.completed ? 'line-through text-slate-500' : ''}`}>
                        {task.text}
                      </span>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-slate-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Form */}
        <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/30">
          <h3 className="text-lg font-semibold mb-4">Add Task for {dayName}</h3>
          <div className="flex flex-col gap-3 md:flex-row">
            <select
              value={newTask.client}
              onChange={(e) => setNewTask({ ...newTask, client: e.target.value })}
              className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
            >
              {CLIENTS.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newTask.text}
              onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="What needs to be done?"
              className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500"
            />
            <button
              onClick={handleAddTask}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
