'use client';

import { useState, useEffect } from 'react';

interface RevenueStream {
  name: string;
  emoji: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'flat';
  lastUpdate: string;
  metrics: { label: string; value: string }[];
}

export default function RevenueDashboard() {
  const [revenue, setRevenue] = useState<RevenueStream[]>([
    {
      name: 'UGC',
      emoji: '💼',
      current: 148,
      target: 5000,
      trend: 'up',
      lastUpdate: 'Today 6:00 AM',
      metrics: [
        { label: 'Companies/day', value: '25' },
        { label: 'Response rate', value: '2.1%' },
        { label: 'Booked calls', value: '3' },
        { label: 'Active partners', value: '1' },
      ],
    },
    {
      name: 'Numerology Readings',
      emoji: '🔮',
      current: 500,
      target: 2000,
      trend: 'flat',
      lastUpdate: 'Last 30 days',
      metrics: [
        { label: 'Readings/week', value: '5-6' },
        { label: 'Avg price', value: '$97' },
        { label: 'Conversion rate', value: '8%' },
        { label: 'Repeat rate', value: '15%' },
      ],
    },
    {
      name: 'Vault (March 1)',
      emoji: '🎭',
      current: 0,
      target: 2500,
      trend: 'up',
      lastUpdate: 'Pre-launch',
      metrics: [
        { label: 'Founding members', value: '0' },
        { label: 'Target (launch)', value: '50-60' },
        { label: 'Price/month', value: '$44' },
        { label: 'MRR target', value: '$2,500' },
      ],
    },
    {
      name: 'NEXUS CODE (May 1)',
      emoji: '✨',
      current: 0,
      target: 1500,
      trend: 'up',
      lastUpdate: 'Building',
      metrics: [
        { label: 'Wait list', value: '0' },
        { label: 'Price tiers', value: '$97/$297/$497' },
        { label: 'Target clients', value: '5-10' },
        { label: 'MRR target', value: '$1,500' },
      ],
    },
  ]);

  const [totalCurrent, setTotalCurrent] = useState(648);
  const [totalTarget, setTotalTarget] = useState(10000);

  const percentage = Math.round((totalCurrent / totalTarget) * 100);
  const remaining = totalTarget - totalCurrent;
  const monthsLeft = 4.5;
  const monthlyGrowthNeeded = Math.round(remaining / monthsLeft);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">💰 Revenue Dashboard</h1>
        <p className="text-slate-400">Real-time tracking to $10K/month goal</p>
      </div>

      {/* Overall Progress */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-800/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-sm text-slate-400 mb-1">Current MRR</div>
            <div className="text-3xl font-bold">${totalCurrent}</div>
            <div className="text-xs text-slate-500">+${remaining - monthlyGrowthNeeded} this month</div>
          </div>

          <div>
            <div className="text-sm text-slate-400 mb-1">Target by June 30</div>
            <div className="text-3xl font-bold">${totalTarget}</div>
            <div className="text-xs text-green-400">4.5 months to go</div>
          </div>

          <div>
            <div className="text-sm text-slate-400 mb-1">Monthly Growth Needed</div>
            <div className="text-3xl font-bold">${monthlyGrowthNeeded}</div>
            <div className="text-xs text-yellow-400">To hit target</div>
          </div>

          <div>
            <div className="text-sm text-slate-400 mb-1">Progress</div>
            <div className="text-3xl font-bold">{percentage}%</div>
            <div className="text-xs text-slate-500">${remaining} remaining</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 w-full bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Revenue Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {revenue.map((stream, idx) => {
          const streamPercentage = Math.round((stream.current / stream.target) * 100);
          const gap = stream.target - stream.current;

          return (
            <div
              key={idx}
              className="p-6 bg-slate-800/40 border border-slate-700/50 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{stream.emoji}</span>
                    <div>
                      <h3 className="text-lg font-bold">{stream.name}</h3>
                      <p className="text-xs text-slate-400">{stream.lastUpdate}</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    stream.trend === 'up'
                      ? 'bg-green-900/50 text-green-300'
                      : stream.trend === 'down'
                      ? 'bg-red-900/50 text-red-300'
                      : 'bg-slate-700/50 text-slate-300'
                  }`}
                >
                  {stream.trend === 'up' ? '📈' : stream.trend === 'down' ? '📉' : '➡️'} {stream.trend.toUpperCase()}
                </div>
              </div>

              {/* Current vs Target */}
              <div className="mb-4">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm text-slate-400">Progress</span>
                  <span className="text-2xl font-bold">
                    ${stream.current} <span className="text-sm text-slate-500">/ ${stream.target}</span>
                  </span>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      stream.current > 0
                        ? 'bg-gradient-to-r from-green-500 to-blue-500'
                        : 'bg-slate-700'
                    }`}
                    style={{ width: `${Math.min(streamPercentage, 100)}%` }}
                  />
                </div>

                <div className="text-xs text-slate-400 mt-2">
                  {streamPercentage}% complete • ${gap} remaining
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/50">
                {stream.metrics.map((metric, mIdx) => (
                  <div key={mIdx}>
                    <div className="text-xs text-slate-500 mb-1">{metric.label}</div>
                    <div className="text-sm font-semibold text-white">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Items */}
      <div className="p-6 bg-slate-800/40 border border-slate-700/50 rounded-lg">
        <h3 className="text-lg font-bold mb-4">🎯 This Week's Priorities</h3>
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="text-2xl">1️⃣</div>
            <div>
              <div className="font-semibold">Scale UGC Outreach to 50 companies/day</div>
              <div className="text-sm text-slate-400">Current: 25/day. Target 2-3 new active partnerships by Feb 21</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">2️⃣</div>
            <div>
              <div className="font-semibold">A/B Test Email Templates (3 variations)</div>
              <div className="text-sm text-slate-400">Test new subject lines, track response rate, implement winner</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">3️⃣</div>
            <div>
              <div className="font-semibold">Launch SMS Nurture for Readings</div>
              <div className="text-sm text-slate-400">Weekly numerology insights → warm leads → paid readings ($500→$1.5K)</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">4️⃣</div>
            <div>
              <div className="font-semibold">Finalize Vault Warm List (Size Check)</div>
              <div className="text-sm text-slate-400">How many people can we email on March 1? Need 200+ for 50 signups</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
