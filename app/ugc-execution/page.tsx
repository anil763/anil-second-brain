'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Mail, Target, DollarSign, Users, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface UGCMetrics {
  emailsSent: number;
  emailTarget: number;
  responses: number;
  responseRate: number;
  prospectsPipeline: number;
  proposalsSent: number;
  contractsSigned: number;
  clientsActive: number;
  monthlyRecurring: number;
  oneOffProjects: number;
  totalRevenue: number;
  weeklyColdEmails: number;
  weeklyResponses: number;
}

interface PipelineStage {
  name: string;
  count: number;
  icon: string;
  color: string;
}

const initialMetrics: UGCMetrics = {
  emailsSent: 0,
  emailTarget: 300, // 50-75/week target
  responses: 0,
  responseRate: 0,
  prospectsPipeline: 0,
  proposalsSent: 0,
  contractsSigned: 0,
  clientsActive: 1, // Backstage work counts
  monthlyRecurring: 0, // $0 retainers yet
  oneOffProjects: 3, // 3 projects @ ~$250-350 = ~$750-1050
  totalRevenue: 500, // From current Backstage/Fiverr work
  weeklyColdEmails: 0,
  weeklyResponses: 0,
};

export default function UGCExecutionDashboard() {
  const [metrics, setMetrics] = useState<UGCMetrics>(initialMetrics);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ugc-metrics');
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
      localStorage.setItem('ugc-metrics', JSON.stringify(metrics));
    }
  }, [metrics, mounted]);

  const updateMetric = (key: keyof UGCMetrics, value: number) => {
    setMetrics((prev) => {
      const updated = { ...prev, [key]: value };
      // Auto-calculate response rate
      if (key === 'responses' || key === 'emailsSent') {
        updated.responseRate = updated.emailsSent > 0 ? (updated.responses / updated.emailsSent) * 100 : 0;
      }
      return updated;
    });
  };

  const pipelineStages: PipelineStage[] = [
    { name: 'Prospects', count: metrics.prospectsPipeline, icon: '📋', color: 'text-blue-400' },
    { name: 'Proposals Sent', count: metrics.proposalsSent, icon: '📧', color: 'text-purple-400' },
    { name: 'Contracts Signed', count: metrics.contractsSigned, icon: '✅', color: 'text-green-400' },
    { name: 'Active Clients', count: metrics.clientsActive, icon: '💼', color: 'text-cyan-400' },
  ];

  const emailProgress = (metrics.emailsSent / metrics.emailTarget) * 100;
  const revenueTarget = 3000; // 30-day target for UGC alone
  const revenueProgress = (metrics.totalRevenue / revenueTarget) * 100;

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold">🎬 UGC Execution Dashboard</h1>
              <p className="text-slate-400">Cold email → Pipeline → Revenue. Track your path to $5K/month UGC.</p>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400">Total Revenue</div>
              <div className="text-2xl font-bold text-green-400">${metrics.totalRevenue}</div>
              <div className="text-xs text-slate-500 mt-1">Target: $3,000 (30 days)</div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400">Active Clients</div>
              <div className="text-2xl font-bold text-cyan-400">{metrics.clientsActive}</div>
              <div className="text-xs text-slate-500 mt-1">Target: 2-3 retainers</div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400">Response Rate</div>
              <div className="text-2xl font-bold text-purple-400">{metrics.responseRate.toFixed(1)}%</div>
              <div className="text-xs text-slate-500 mt-1">Target: 3-8%</div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400">Monthly Recurring</div>
              <div className="text-2xl font-bold text-orange-400">${metrics.monthlyRecurring}</div>
              <div className="text-xs text-slate-500 mt-1">Retainer revenue</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Cold Email Campaign */}
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-400" />
            Cold Email Campaign
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Emails Sent */}
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">Emails Sent This Month</div>
              <div className="flex items-end gap-3 mb-4">
                <input
                  type="number"
                  value={metrics.emailsSent}
                  onChange={(e) => updateMetric('emailsSent', parseInt(e.target.value) || 0)}
                  className="w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-xl font-bold"
                />
                <span className="text-slate-500">/ {metrics.emailTarget}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden mb-2">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${Math.min(emailProgress, 100)}%` }}
                />
              </div>
              <div className="text-xs text-slate-400">{emailProgress.toFixed(0)}% of target</div>
            </div>

            {/* Responses */}
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">Email Responses</div>
              <div className="flex items-end gap-3 mb-4">
                <input
                  type="number"
                  value={metrics.responses}
                  onChange={(e) => updateMetric('responses', parseInt(e.target.value) || 0)}
                  className="w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-xl font-bold"
                />
                <span className="text-slate-500">replies</span>
              </div>
              <div className="text-sm font-semibold text-purple-300">Response Rate: {metrics.responseRate.toFixed(1)}%</div>
              <div className="text-xs text-slate-500 mt-2">Target: 3-8% (3-24 replies)</div>
            </div>

            {/* Weekly Pace */}
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">Weekly Pace</div>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-slate-400">Emails sent this week:</label>
                  <input
                    type="number"
                    value={metrics.weeklyColdEmails}
                    onChange={(e) => updateMetric('weeklyColdEmails', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Responses this week:</label>
                  <input
                    type="number"
                    value={metrics.weeklyResponses}
                    onChange={(e) => updateMetric('weeklyResponses', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Targets */}
          <div className="mt-6 bg-black/50 p-4 rounded-lg border border-slate-700/50">
            <h3 className="font-semibold text-blue-300 mb-3">📊 Weekly Targets (Mon-Fri)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <div className="text-slate-400">Week 1 (Feb 17-21)</div>
                <div className="font-bold text-blue-300">20-25 emails</div>
              </div>
              <div>
                <div className="text-slate-400">Week 2 (Feb 24-28)</div>
                <div className="font-bold text-blue-300">30 emails</div>
              </div>
              <div>
                <div className="text-slate-400">Week 3+ (Mar)</div>
                <div className="font-bold text-blue-300">50-75 emails</div>
              </div>
              <div>
                <div className="text-slate-400">Expected Responses</div>
                <div className="font-bold text-purple-300">3-8 per 100</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Tracker */}
        <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-400" />
            Brand Pipeline
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {pipelineStages.map((stage, idx) => (
              <div key={idx} className="bg-black/30 rounded-lg p-4 border border-slate-700/50">
                <div className="text-2xl mb-2">{stage.icon}</div>
                <div className={`text-3xl font-bold ${stage.color}`}>
                  <input
                    type="number"
                    value={stage.count}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      if (idx === 0) updateMetric('prospectsPipeline', value);
                      else if (idx === 1) updateMetric('proposalsSent', value);
                      else if (idx === 2) updateMetric('contractsSigned', value);
                      else if (idx === 3) updateMetric('clientsActive', value);
                    }}
                    className="w-16 bg-slate-800/50 border border-slate-700/50 rounded px-1 text-white"
                  />
                </div>
                <div className="text-sm text-slate-400 mt-2">{stage.name}</div>
              </div>
            ))}
          </div>

          {/* Pipeline Flow */}
          <div className="bg-black/50 p-4 rounded-lg border border-slate-700/50">
            <h3 className="font-semibold text-purple-300 mb-3">📈 Expected Pipeline Flow</h3>
            <div className="text-sm text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <span>50-75 cold emails/week</span>
                <ArrowRight className="w-4 h-4" />
                <span>3-6 responses/week (5-8% rate)</span>
              </div>
              <div className="flex items-center gap-2">
                <span>3-6 responses</span>
                <ArrowRight className="w-4 h-4" />
                <span>2-4 qualified prospects/week</span>
              </div>
              <div className="flex items-center gap-2">
                <span>2-4 prospects</span>
                <ArrowRight className="w-4 h-4" />
                <span>1-2 proposals/week</span>
              </div>
              <div className="flex items-center gap-2">
                <span>1-2 proposals</span>
                <ArrowRight className="w-4 h-4" />
                <span>0.5-1 signed contracts/week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Tracker */}
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-400" />
            Revenue Breakdown
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Monthly Recurring */}
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">Monthly Recurring (Retainers)</div>
              <input
                type="number"
                value={metrics.monthlyRecurring}
                onChange={(e) => updateMetric('monthlyRecurring', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-2xl font-bold mb-2"
              />
              <div className="text-xs text-slate-500">Ideal: 2-3 clients @ $2-3K each</div>
            </div>

            {/* One-Off Projects */}
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-2">One-Off Projects This Month</div>
              <input
                type="number"
                value={metrics.oneOffProjects}
                onChange={(e) => updateMetric('oneOffProjects', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-2xl font-bold mb-2"
              />
              <div className="text-xs text-slate-500">${(metrics.oneOffProjects * 300).toLocaleString()} est.</div>
            </div>

            {/* Total Revenue */}
            <div className="bg-black/30 rounded-lg p-4 border border-green-700/50">
              <div className="text-sm text-slate-400 mb-2">Total UGC Revenue</div>
              <input
                type="number"
                value={metrics.totalRevenue}
                onChange={(e) => updateMetric('totalRevenue', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-2xl font-bold mb-2"
              />
              <div className="text-xs text-green-400">Target: $3,000 (30 days)</div>
            </div>
          </div>

          {/* Revenue Progress */}
          <div className="bg-black/50 p-4 rounded-lg border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-green-300">30-Day Revenue Target</span>
              <span className="text-2xl font-bold text-green-400">${metrics.totalRevenue}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${Math.min(revenueProgress, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-400">{revenueProgress.toFixed(0)}% toward $3K target</span>
              <span className="text-slate-500">${(revenueTarget - metrics.totalRevenue).toLocaleString()} remaining</span>
            </div>
          </div>
        </div>

        {/* Pricing Reference */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">💰 Pricing Tiers (Reference)</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-black/30 p-3 rounded border border-slate-700/50">
              <div className="font-semibold text-cyan-300 mb-2">Single Video</div>
              <div className="text-lg font-bold mb-1">$250–$350</div>
              <div className="text-xs text-slate-400">1 video, 1 revision, 72h</div>
            </div>

            <div className="bg-black/30 p-3 rounded border border-slate-700/50">
              <div className="font-semibold text-purple-300 mb-2">Starter Bundle</div>
              <div className="text-lg font-bold mb-1">$750–$1K</div>
              <div className="text-xs text-slate-400">3 videos, 2 revisions, 5d</div>
            </div>

            <div className="bg-black/30 p-3 rounded border border-orange-700/50">
              <div className="font-semibold text-orange-300 mb-2">Growth Retainer</div>
              <div className="text-lg font-bold mb-1">$2–3K/mo</div>
              <div className="text-xs text-slate-400">8–12 videos/mo, priority</div>
            </div>

            <div className="bg-black/30 p-3 rounded border border-slate-700/50">
              <div className="font-semibold text-red-300 mb-2">Enterprise</div>
              <div className="text-lg font-bold mb-1">$5K+/mo</div>
              <div className="text-xs text-slate-400">20+ videos/mo, strategy</div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-8 bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-300 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            This Week's Priorities
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>✓ Warm up domain (anilcreatesllc.com) with GoHighLevel</li>
            <li>✓ Set up Hunter.io or Apollo.io for email finding</li>
            <li>✓ Create email sequence in GoHighLevel (5-email drip)</li>
            <li>✓ Identify first 100 target companies (Tier 1 verticals: SaaS, Fintech, AI Tools)</li>
            <li>✓ Send first 20-25 cold emails (start small, monitor response rate)</li>
            <li>✓ Continue Backstage submissions (maintain income while scaling)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
