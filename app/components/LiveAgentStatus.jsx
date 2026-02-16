'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

export default function LiveAgentStatus() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents');
      if (!response.ok) throw new Error('Failed to fetch agents');
      
      const data = await response.json();
      setAgents(data.agents || []);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Agent fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchAgents, 30000);
    return () => clearInterval(interval);
  }, []);

  const timeAgo = (isoString) => {
    if (!isoString) return 'Never';
    const date = new Date(isoString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'OK':
      case 'ok':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'ERROR':
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Zap className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading && agents.length === 0) {
    return <div className="text-center py-8 text-gray-400">Loading agents...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">🤖 Live Agent Status</h3>
        <button
          onClick={fetchAgents}
          className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 px-3 text-gray-400">Status</th>
              <th className="text-left py-2 px-3 text-gray-400">Agent</th>
              <th className="text-left py-2 px-3 text-gray-400">Last Run</th>
              <th className="text-left py-2 px-3 text-gray-400">Next Run</th>
              <th className="text-left py-2 px-3 text-gray-400">Model</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(agent.status)}
                    <span className="text-xs font-semibold text-gray-300">
                      {agent.status}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3 text-gray-200">{agent.name}</td>
                <td className="py-3 px-3 text-gray-400 text-xs">
                  {timeAgo(agent.lastRun)}
                </td>
                <td className="py-3 px-3 text-gray-400 text-xs">
                  {agent.nextRun ? (
                    <span className="text-blue-400">
                      {new Date(agent.nextRun).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="py-3 px-3 text-gray-400 text-xs">{agent.model}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-gray-500 text-right">
        Last updated: {lastUpdated.toLocaleTimeString()} • Refreshes every 30s
      </div>
    </div>
  );
}
