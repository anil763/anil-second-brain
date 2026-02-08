# Model Selection Strategy

## Definition
A tiered approach to choosing which AI model to use for a task, balancing cost, speed, and capability.

## The Model Hierarchy

### Tier 1: Free/Cheap (Always Try First)
- **Kimi (moonshot/kimi-k2.5)** — Free, 256K context, surprisingly capable
  - Use for: research, summaries, lookups, batch work, anything "easy"
  - Saves budget significantly

### Tier 2: Fast & Balanced (Default)
- **Haiku (claude-haiku-4-5)** — Default primary model
  - Fast, cheap enough, good for medium-complexity tasks
  - Use for: most daily work, analysis, general coding

### Tier 3: Specialized (When Needed)
- **Sonnet (claude-sonnet-4)** — Premium reasoning
  - Use ONLY for: architecture decisions, security analysis, complex reasoning
- **Opus (claude-opus-4-5)** — The heavyweight
  - Use ONLY for: numerology calculations, the hardest problems

### Tier 4: Local (Free)
- **Llama (ollama/llama3.2:3b)** — Local, instant
  - Use for: heartbeats, warm-ups, testing
  - Zero API cost

## Decision Framework

**Ask yourself:**
1. Can Kimi handle it? → Use Kimi (save $$$)
2. Is it routine/medium complexity? → Use Haiku (default)
3. Does it need advanced reasoning? → Use Sonnet
4. Is it numerical/esoteric? → Use Opus
5. Running locally? → Use Llama

## Why This Matters

- **Budget control:** Free models first = smaller bills
- **Speed:** Cheap models are fast → better UX
- **Quality:** Right tool for the job = better outputs
- **Efficiency:** Don't waste premium models on easy tasks

## Examples

✅ Good:
- "Search for competitor pricing" → Kimi (free research)
- "Summarize this article" → Kimi (lookup task)
- "Review this code" → Haiku (balanced analysis)
- "Design the database schema" → Sonnet (architecture)

❌ Bad:
- Using Opus for spell-check
- Using Sonnet for summarization
- Not trying Kimi first on easy tasks

## Related

- [[Rate Limits & Budget Management]]
- [[Cache Hit Strategy]]

## Created

2026-02-07
