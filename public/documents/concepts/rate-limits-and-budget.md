# Rate Limits & Budget Management

## Definition
Constraints on API usage to control costs and respect provider rate limits. Strategic work batching keeps us under budget.

---

## Rate Limits (Strict)

### API Calls
- **5 seconds minimum** between API calls
- Wait between each request, don't rush

### Web Searches
- **10 seconds minimum** between searches
- **Max 5 searches per batch**, then **2-minute break**
- Prevents rate limit 429 errors

### Error Handling
- Hit 429 error? → **STOP, wait 5 min, then retry**
- Don't retry immediately
- Plan ahead to avoid errors

---

## Budget (Hard Limits)

### Daily Budget: $5
- Warning threshold: $3.75 (75%)
- If approaching, switch to free models
- Be intentional about API work

### Monthly Budget: $200
- Warning threshold: $150 (75%)
- Plan significant work in advance
- Track spending regularly

---

## Cost-Saving Tactics

### 1. Batch Requests
- Wrong: 10 separate API calls for 10 leads
- Right: 1 request for "analyze these 10 leads"
- Saves: 90% fewer tokens

### 2. Use Free Models First
- Kimi for research, summaries, lookups
- Llama for testing, heartbeats, local work
- Saves: Can be 100% free

### 3. Cache Hits
- Make multiple API calls in 5-min windows
- Shared cache across requests
- Saves: Reduces prompt re-processing

### 4. Plan Ahead
- Don't do expensive work reactively
- Schedule analysis during designated times
- Saves: Avoid duplicate work, mistakes

### 5. Right Tool For The Job
- Kimi for easy tasks
- Haiku for medium
- Sonnet only when needed
- Saves: Avoid premium model waste

---

## Example Budget Breakdown (Daily $5)

```
Model Usage        Cost
─────────────────────────
Kimi (free)       $0.00
Llama (free)      $0.00
Haiku calls (20)  $0.50
Sonnet calls (2)  $1.20
Web searches (3)  $0.30
─────────────────────────
Daily Total       $2.00 ✓ Under budget
```

---

## When To Escalate Models

❌ Don't use Sonnet for:
- Summarization (Kimi/Haiku)
- Lookups (Kimi)
- Routine analysis (Haiku)

✅ Use Sonnet for:
- Architecture decisions
- Security reviews
- Complex reasoning
- Production code review

---

## Related

- [[Model Selection Strategy]]
- [[Cache Hit Strategy]]

## Created

2026-02-07
