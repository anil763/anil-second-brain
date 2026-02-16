// Live agent status API endpoint
// TEMP: Returns hardcoded status while we rebuild the gateway integration

export async function GET(request) {
  // Hardcoded agent list from Feb 16 cron audit
  const agents = [
    { id: "b1fbfbe0-c71a-47ca-9927-7aa4676b7d48", name: "GKANJ - GurujiKaAshram Action Items", schedule: "0 8 * * *", status: "OK", model: "haiku" },
    { id: "3a54cd3a-232f-49a9-9741-cec92fe13769", name: "Memory Bank Sync", schedule: "0 6 * * *", status: "OK", model: "haiku" },
    { id: "494c6c59-a0f4-4c3e-bed8-f1374901e391", name: "UGC Optimization Agent", schedule: "0 12 * * *", status: "PENDING", model: "haiku" },
    { id: "2608f57e-797a-4af8-85b1-cd983532dd84", name: "Readings Monetization Agent", schedule: "0 18 * * *", status: "PENDING", model: "haiku" },
    { id: "5f7f11ec-f723-4cc9-9f68-5df516cd63df", name: "Daily Revenue Briefing", schedule: "0 6 * * *", status: "OK", model: "haiku" },
    { id: "e11f335b-eed7-4eca-a3a1-6d0a59547988", name: "UGC Email Agent", schedule: "0 6 * * 1-5", status: "OK", model: "opus" },
    { id: "37ad1c78-acb6-45d5-8c6d-994d275ea140", name: "Daily Morning Brief", schedule: "0 7 * * *", status: "OK", model: "haiku" },
    { id: "0499bdc8-ab39-405c-9650-a768d75a85cf", name: "NEXUS CODE Agent", schedule: "0 7 * * *", status: "OK", model: "opus" },
    { id: "8a967d9d-13d6-42e1-8ce9-679f18b769d9", name: "Spiritual Business Agent", schedule: "45 7 * * *", status: "OK", model: "opus" },
    { id: "d8e104a7-f893-471d-89bf-34e78cd9c843", name: "AI Trends Agent", schedule: "0 8 * * *", status: "OK", model: "opus" },
    { id: "2dfc8a62-f82f-437d-83ca-556b6658e213", name: "Managed Services Agent", schedule: "15 8 * * *", status: "OK", model: "opus" },
    { id: "6bde57f2-08f4-4d25-9c82-344815d4285d", name: "Notes Analyzer", schedule: "0 9 * * *", status: "PENDING", model: "haiku" },
    { id: "bbb70307-d31a-485f-a04e-d7a4db1d745f", name: "Vault Growth Agent", schedule: "0 10 * * *", status: "PENDING", model: "haiku" },
    { id: "50d714b1-c91e-45a2-a720-fec26e11a781", name: "Weekly Operations Report", schedule: "0 7 * * 1", status: "OK", model: "haiku" },
    { id: "549f745e-9223-4d64-8571-622c35bed88d", name: "Backup & Disaster Recovery", schedule: "0 5 * * *", status: "OK", model: "system" },
  ];

  return Response.json({
    agents,
    lastUpdated: new Date().toISOString(),
    total: agents.length,
    note: "TEMP: Hardcoded data. Live sync in progress."
  });
}
