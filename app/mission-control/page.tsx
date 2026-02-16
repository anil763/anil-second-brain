'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Agent {
  id: string;
  name: string;
  emoji: string;
  schedule: string;
  timeDisplay: string;
  status: 'ok' | 'late' | 'error';
  lastRun: string;
  nextRun: string;
  documentCount: number;
  lastDocument: string;
  discordChannel: string;
}

interface CronJob {
  status: 'ok' | 'late' | 'error';
  job: string;
  schedule: string;
  lastRun: string;
  next: string;
  agent: string;
}

export default function MissionControl() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [crons, setCrons] = useState<CronJob[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize agents
    const agentData: Agent[] = [
      {
        id: 'ugc_email_agent',
        name: 'UGC Email Agent',
        emoji: '💼',
        schedule: '0 6 * * 1-5',
        timeDisplay: '6:00 AM Mon-Fri',
        status: 'ok',
        lastRun: '2 hours ago',
        nextRun: 'Tomorrow 6:00 AM',
        documentCount: 15,
        lastDocument: 'ugc-outreach-2026-02-16.md',
        discordChannel: 'ugc-opportunities',
      },
      {
        id: 'spiritual_business_agent',
        name: 'Spiritual Business Agent',
        emoji: '✨',
        schedule: '30 7 * * *',
        timeDisplay: '7:30 AM EST',
        status: 'ok',
        lastRun: '1 day ago',
        nextRun: 'Today 7:30 AM',
        documentCount: 8,
        lastDocument: 'spiritual-business-opportunities-2026-02-16.md',
        discordChannel: 'spiritual-business',
      },
      {
        id: 'ai_trends_agent',
        name: 'AI Trends Agent',
        emoji: '🤖',
        schedule: '0 8 * * *',
        timeDisplay: '8:00 AM EST',
        status: 'ok',
        lastRun: '23 hours ago',
        nextRun: 'Today 8:00 AM',
        documentCount: 12,
        lastDocument: 'daily-ai-digest-2026-02-16.md',
        discordChannel: 'ai-trends',
      },
      {
        id: 'managed_services_agent',
        name: 'Managed Services Agent',
        emoji: '☁️',
        schedule: '30 8 * * *',
        timeDisplay: '8:30 AM EST',
        status: 'ok',
        lastRun: '1 day ago',
        nextRun: 'Today 8:30 AM',
        documentCount: 10,
        lastDocument: 'cloud-msp-landscape-2026-02-16.md',
        discordChannel: 'managed-services',
      },
    ];

    const cronData: CronJob[] = [
      {
        status: 'ok',
        job: 'UGC Email Agent',
        schedule: '0 6 * * 1-5',
        lastRun: '2d 6h ago',
        next: 'Tomorrow 6:00 AM',
        agent: 'ugc_email_agent',
      },
      {
        status: 'ok',
        job: 'Spiritual Business Agent',
        schedule: '30 7 * * *',
        lastRun: '1d 7h ago',
        next: 'Today 7:30 AM',
        agent: 'spiritual_business_agent',
      },
      {
        status: 'ok',
        job: 'AI Trends Agent',
        schedule: '0 8 * * *',
        lastRun: '23h ago',
        next: 'Today 8:00 AM',
        agent: 'ai_trends_agent',
      },
      {
        status: 'ok',
        job: 'Managed Services Agent',
        schedule: '30 8 * * *',
        lastRun: '1d 8h ago',
        next: 'Today 8:30 AM',
        agent: 'managed_services_agent',
      },
    ];

    setAgents(agentData);
    setCrons(cronData);
    setSelectedAgent(agentData[0].id);
    setLoading(false);
  }, []);

  const selectedAgentData = agents.find((a) => a.id === selectedAgent);

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {/* Left Sidebar - Agent List */}
      <div className="w-72 border-r border-slate-700 bg-slate-900/50 overflow-y-auto">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Agents
          </h2>
        </div>

        <div className="space-y-2 p-3">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedAgent === agent.id
                  ? 'bg-slate-700 border border-slate-600'
                  : 'bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{agent.emoji}</span>
                <div>
                  <div className="font-semibold text-sm">{agent.name}</div>
                  <div className="text-xs text-slate-400">{agent.timeDisplay}</div>
                </div>
                <div className="ml-auto">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      agent.status === 'ok'
                        ? 'bg-green-500'
                        : agent.status === 'late'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>

              <div className="text-xs text-slate-400 space-y-1 ml-10">
                <div>📁 {agent.documentCount} files</div>
                <div>⏱️ {agent.lastRun}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Center - Main Content */}
      <div className="flex-1 flex flex-col border-r border-slate-700">
        {/* Tabs */}
        <div className="border-b border-slate-700 bg-slate-900/50 px-6">
          <div className="flex gap-8">
            <button className="py-4 px-2 text-sm font-medium border-b-2 border-blue-500 text-blue-400">
              Crons
            </button>
            <button className="py-4 px-2 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-white">
              Documents
            </button>
            <button className="py-4 px-2 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-white">
              Signals
            </button>
            <button className="py-4 px-2 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-white">
              Costs
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Crons Table */}
          <div className="p-6">
            <div className="space-y-3 mb-6">
              <div className="flex gap-2 text-xs">
                <span className="text-yellow-400">🟠 4 agents overdue</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">2 high-priority decisions</span>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-lg border border-slate-700 overflow-hidden">
              <div className="grid grid-cols-5 gap-4 p-4 bg-slate-900/50 border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <div>Status</div>
                <div>Job</div>
                <div>Schedule</div>
                <div>Last Run</div>
                <div>Next</div>
              </div>

              {crons.map((cron, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-5 gap-4 p-4 border-b border-slate-700/50 items-center text-sm hover:bg-slate-800/20 transition-colors"
                >
                  <div>
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        cron.status === 'ok'
                          ? 'bg-green-500'
                          : cron.status === 'late'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <span className="ml-2 text-xs uppercase">
                      {cron.status === 'ok' ? 'OK' : cron.status === 'late' ? 'LATE' : 'ERROR'}
                    </span>
                  </div>
                  <div className="font-medium">{cron.job}</div>
                  <div className="font-mono text-xs text-slate-400">{cron.schedule}</div>
                  <div className="text-slate-400">{cron.lastRun}</div>
                  <div className="text-slate-400">{cron.next}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Agent Details */}
      {selectedAgentData && (
        <div className="w-80 border-l border-slate-700 bg-slate-900/50 overflow-y-auto">
          <div className="p-6">
            {/* Agent Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{selectedAgentData.emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold">{selectedAgentData.name}</h3>
                      <p className="text-xs text-slate-400">{selectedAgentData.timeDisplay}</p>
                    </div>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-white">✕</button>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 border-b border-slate-700 mb-4">
                <button className="py-2 text-sm font-medium border-b-2 border-blue-500 text-blue-400">
                  Overview
                </button>
                <button className="py-2 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-white">
                  Files
                </button>
              </div>
            </div>

            {/* Status Section */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Status
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Focus:</span>
                  <span>No status available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last run:</span>
                  <span>{selectedAgentData.lastRun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next run:</span>
                  <span>{selectedAgentData.nextRun}</span>
                </div>
              </div>
            </div>

            {/* Discord Channel */}
            <div className="mb-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Discord Channel
              </h4>
              <a
                href={`https://discord.com/channels/1472794487934812173/${selectedAgentData.discordChannel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 font-mono"
              >
                #{selectedAgentData.discordChannel}
              </a>
            </div>

            {/* Latest Document */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Latest Output
              </h4>
              <Link
                href={`/documents/${selectedAgentData.lastDocument}`}
                className="block p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-colors"
              >
                <div className="text-sm font-medium text-blue-400 hover:text-blue-300 mb-1">
                  {selectedAgentData.lastDocument.replace(/.md$/, '')}
                </div>
                <div className="text-xs text-slate-400">Latest document</div>
              </Link>
            </div>

            {/* Files Summary */}
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Files
              </h4>
              <div className="text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Total documents:</span>
                  <span className="font-medium">{selectedAgentData.documentCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
