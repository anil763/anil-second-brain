'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, DollarSign, Users, Zap, AlertCircle, CheckCircle2, Clock, Target } from 'lucide-react';

interface RevenueMetrics {
  readings: {
    current: number;
    target: number;
    leads: number;
    bookings: number;
    conversionRate: number;
  };
  ugc: {
    current: number;
    target: number;
    submissions: number;
    approvals: number;
    conversionRate: number;
    pending: number;
  };
  vault: {
    current: number;
    target: number;
    signups: number;
    members: number;
    conversionRate: number;
  };
  affiliate: {
    current: number;
    target: number;
  };
}

const initialMetrics: RevenueMetrics = {
  readings: {
    current: 500,
    target: 2000,
    leads: 12,
    bookings: 5,
    conversionRate: 42,
  },
  ugc: {
    current: 148,
    target: 5000,
    submissions: 8,
    approvals: 3,
    conversionRate: 37,
    pending: 200,
  },
  vault: {
    current: 0,
    target: 2500,
    signups: 0,
    members: 0,
    conversionRate: 0,
  },
  affiliate: {
    current: 0,
    target: 500,
  },
};

export default function Dashboard10K() {
  const [metrics, setMetrics] = useState<RevenueMetrics>(initialMetrics);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('revenue-metrics');
    if (saved) {
      try {
        setMetrics(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load metrics:', e);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('revenue-metrics', JSON.stringify(metrics));
    }
  }, [metrics, mounted]);

  const totalCurrent = metrics.readings.current + metrics.ugc.current + metrics.vault.current + metrics.affiliate.current;
  const totalTarget = 10000;
  const progressPercent = (totalCurrent / totalTarget) * 100;
  const remainingTarget = totalTarget - totalCurrent;

  const streams = [
    {
      name: 'Numerology Readings',
      icon: '🔮',
      color: 'purple',
      current: metrics.readings.current,
      target: metrics.readings.target,
      data: metrics.readings,
      actions: [
        `Send follow-up to ${metrics.readings.leads - metrics.readings.bookings} warm leads`,
        `Target: 8-10 bookings/month (currently ${metrics.readings.bookings})`,
        'Upsell to Deep Dive Coaching ($297+)',
      ],
    },
    {
      name: 'UGC Content',
      icon: '🎬',
      color: 'blue',
      current: metrics.ugc.current + metrics.ugc.pending,
      target: metrics.ugc.target,
      data: metrics.ugc,
      actions: [
        `Film 2-3 videos/week (currently ${metrics.ugc.submissions} submissions)`,
        `Pending: $${metrics.ugc.pending} waiting to clear`,
        'Target: 20-30 brand deals/month at $150-400 each',
      ],
    },
    {
      name: "Gentleman's Vault",
      icon: '💎',
      color: 'orange',
      current: metrics.vault.current,
      target: metrics.vault.target,
      data: metrics.vault,
      actions: [
        `Launch March 1 (${metrics.vault.members} members target: 60)`,
        `Tier 1: $44/mo | Tier 2: $297/mo | Tier 3: $497/mo`,
        'Pre-launch warm list: 50+ GenX entrepreneurs',
      ],
    },
    {
      name: 'Affiliate',
      icon: '🔗',
      color: 'green',
      current: metrics.affiliate.current,
      target: metrics.affiliate.target,
      data: { current: 0 },
      actions: [
        'Sign up: ClickUp, Monday, Notion, Coda (20-30% commission)',
        'Add affiliate links to blog + numerology site',
        'Target: $500/month passive income',
      ],
    },
  ];

  const colorMap: Record<string, string> = {
    purple: 'from-purple-500/20 to-purple-900/10 border-purple-700/50',
    blue: 'from-blue-500/20 to-blue-900/10 border-blue-700/50',
    orange: 'from-orange-500/20 to-orange-900/10 border-orange-700/50',
    green: 'from-green-500/20 to-green-900/10 border-green-700/50',
  };

  const progressColorMap: Record<string, string> = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Header */}
      <header className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold">$10K/Month Mission</h1>
              <p className="text-slate-400">Track revenue across 4 income streams. Real data. Real progress.</p>
            </div>
          </div>

          {/* Main Progress Bar */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total Progress</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-cyan-400">${totalCurrent.toLocaleString()}</span>
                <span className="text-lg text-slate-500">/ ${totalTarget.toLocaleString()}</span>
              </div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyan-400 font-semibold">{progressPercent.toFixed(1)}% complete</span>
              <span className="text-slate-500">${remainingTarget.toLocaleString()} to go</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">Confirmed Revenue</div>
                <div className="text-2xl font-bold text-green-400">${totalCurrent}</div>
              </div>
              <DollarSign className="w-8 h-8 text-green-500/30" />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">Pending Payments</div>
                <div className="text-2xl font-bold text-yellow-400">${metrics.ugc.pending}</div>
              </div>
              <Clock className="w-8 h-8 text-yellow-500/30" />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">Remaining Target</div>
                <div className="text-2xl font-bold text-cyan-400">${remainingTarget.toLocaleString()}</div>
              </div>
              <Target className="w-8 h-8 text-cyan-500/30" />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">Target Date</div>
                <div className="text-2xl font-bold text-blue-400">June 30</div>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500/30" />
            </div>
          </div>
        </div>

        {/* Revenue Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {streams.map((stream) => {
            const streamProgress = (stream.current / stream.target) * 100;
            const colorClass = colorMap[stream.color];
            const progressColor = progressColorMap[stream.color];

            return (
              <div
                key={stream.name}
                className={`bg-gradient-to-br ${colorClass} border rounded-lg p-6 backdrop-blur`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{stream.icon}</span>
                    <h3 className="text-lg font-semibold">{stream.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${stream.current.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">of ${stream.target.toLocaleString()}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-slate-300">{streamProgress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${progressColor} transition-all duration-300`}
                      style={{ width: `${Math.min(streamProgress, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Metrics Grid */}
                {stream.data && Object.keys(stream.data).length > 2 && (
                  <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-black/30 rounded">
                    {stream.name === 'Numerology Readings' && (
                      <>
                        <div>
                          <div className="text-xs text-slate-400">Leads</div>
                          <div className="font-semibold">{(stream.data as any).leads}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400">Bookings</div>
                          <div className="font-semibold">{(stream.data as any).bookings}</div>
                        </div>
                      </>
                    )}
                    {stream.name === 'UGC Content' && (
                      <>
                        <div>
                          <div className="text-xs text-slate-400">Submissions</div>
                          <div className="font-semibold">{(stream.data as any).submissions}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400">Approvals</div>
                          <div className="font-semibold">{(stream.data as any).approvals}</div>
                        </div>
                      </>
                    )}
                    {stream.name === "Gentleman's Vault" && (
                      <>
                        <div>
                          <div className="text-xs text-slate-400">Signups</div>
                          <div className="font-semibold">{(stream.data as any).signups}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400">Members</div>
                          <div className="font-semibold">{(stream.data as any).members}</div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Action Items */}
                <div className="border-t border-slate-700/50 pt-3">
                  <div className="text-xs font-semibold text-slate-300 mb-2">👉 Priority Actions:</div>
                  <ul className="space-y-1">
                    {stream.actions.map((action, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex gap-2">
                        <span className="text-slate-500">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strategy Section */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            $10K Strategy Breakdown
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-purple-300 font-semibold mb-2">Readings → $2K</div>
              <div className="text-xs text-slate-400 space-y-1">
                <p>Current: $500 (5 bookings @ $100 avg)</p>
                <p>Target: 20 bookings @ $100</p>
                <p>Strategy: 4x conversion rate</p>
                <p className="text-purple-300 mt-2">Focus: Lead nurture email sequence</p>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-blue-300 font-semibold mb-2">UGC → $5K</div>
              <div className="text-xs text-slate-400 space-y-1">
                <p>Current: $148 + $200 pending</p>
                <p>Target: 25 deals @ $200 avg</p>
                <p>Strategy: 10x submission volume</p>
                <p className="text-blue-300 mt-2">Focus: ClickUp, Monday, Notion</p>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-orange-300 font-semibold mb-2">Vault → $2.5K</div>
              <div className="text-xs text-slate-400 space-y-1">
                <p>Current: $0 (pre-launch)</p>
                <p>Target: 50-60 members @ $44-497</p>
                <p>Strategy: 3-tier pricing, warm list</p>
                <p className="text-orange-300 mt-2">Focus: March 1 launch execution</p>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-green-300 font-semibold mb-2">Affiliate → $500</div>
              <div className="text-xs text-slate-400 space-y-1">
                <p>Current: $0 (not activated)</p>
                <p>Target: 3-5 referrals/month</p>
                <p>Strategy: Add links to content</p>
                <p className="text-green-300 mt-2">Focus: Setup + affiliate posts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-cyan-900/20 border border-cyan-700/50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            $10K Timeline
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="font-semibold text-cyan-300 mb-2">📅 Now - Feb 28</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>✓ Reading conversion: Get to 8 bookings/month</li>
                <li>✓ UGC: Submit 5-7 videos/week</li>
                <li>✓ Vault: Complete launch materials</li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-cyan-300 mb-2">📅 March 1 - April 30</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>✓ Vault: Launch + 20+ founding members</li>
                <li>✓ Readings: 12 bookings/month</li>
                <li>✓ UGC: 15+ brand deals signed</li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-cyan-300 mb-2">📅 May - June 30</div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>🎯 Hit $10K/month revenue</li>
                <li>💰 Exit corporate job (ready by June 30)</li>
                <li>🚀 Plan $30K next phase</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
