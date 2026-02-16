// Live agent status API endpoint
// Queries cron jobs directly for real-time data

export async function GET(request) {
  try {
    // Fetch cron job list from OpenClaw gateway
    const response = await fetch('http://127.0.0.1:18789/api/cron/jobs', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return Response.json({
        error: 'Could not fetch agent status',
        status: response.status
      }, { status: 500 });
    }

    const jobs = await response.json();

    // Transform cron jobs into agent status format
    const agents = jobs
      .filter(job => job.name && job.enabled)
      .map(job => {
        const lastRun = job.state?.lastRunAtMs ? new Date(job.state.lastRunAtMs) : null;
        const nextRun = job.state?.nextRunAtMs ? new Date(job.state.nextRunAtMs) : null;
        
        return {
          id: job.id,
          name: job.name,
          status: job.state?.lastStatus === 'ok' ? 'OK' : job.state?.lastStatus || 'PENDING',
          lastRun: lastRun?.toISOString(),
          nextRun: nextRun?.toISOString(),
          schedule: job.schedule?.expr || job.schedule?.kind,
          model: job.payload?.model || 'system',
          delivery: job.delivery?.channel || 'internal'
        };
      });

    return Response.json({
      agents,
      lastUpdated: new Date().toISOString(),
      total: agents.length
    });
  } catch (error) {
    console.error('Agent status API error:', error);
    return Response.json({
      error: 'Failed to fetch agent status',
      message: error.message
    }, { status: 500 });
  }
}
