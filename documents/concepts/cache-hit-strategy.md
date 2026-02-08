# Cache Hit Strategy

## Definition
Techniques to maximize LLM cache efficiency, reducing redundant token processing and API costs.

---

## Why Cache Matters

LLMs cache the system prompt + context. Multiple API calls in quick succession share the same cache → fewer tokens billed, faster responses.

**Example:**
- Call 1: Process full system prompt (full cost)
- Calls 2-5 (within 5 min): Reuse cached prompt (90% cheaper)

---

## The 4 Core Rules

### 1. Batch Requests in 5-Minute Windows

Make multiple API calls in close succession (all within 5 minutes).

**Why:** Shared cache = reduced processing costs.

**How:**
- Web search #1
- Web search #2  
- API call #3
- All within 5 min → cache hit on calls 2-3

**Don't:**
- Space calls out over an hour
- Each one processes the full context

---

### 2. Keep System Prompts Stable

Don't update `SOUL.md`, `USER.md`, or core docs mid-session.

**Why:** Changes invalidate the cache. New system prompt = fresh processing = 100% cost.

**How:**
- Review docs before session starts
- Batch updates at end-of-day (maintenance window)
- Keep system prompt locked during active work

**Example:**
- ✅ Update SOUL.md after 5 PM (end of session)
- ❌ Don't update SOUL.md mid-morning (cache bust)

---

### 3. Organize Context Hierarchically

**Priority (high to low):**

1. **Core (Cached)**
   - SOUL.md, USER.md, IDENTITY.md
   - Loaded once, reused all session
   - Most important

2. **Stable (Cached)**
   - TOOLS.md, projects/REFERENCE.md
   - Project specifications
   - Don't change during work

3. **Dynamic (Uncached)**
   - memory/YYYY-MM-DD.md
   - project-notes.md, blockers.md
   - Load on-demand only

**Result:** Core context is always cached. Dynamic notes load fresh.

---

### 4. Separate Stable from Dynamic Files

In projects, split documentation:

**Stable (Cached):**
- `product-reference.md` — Specs, architecture, glossary
- `requirements.md` — Feature list, API docs
- Never changes during a session

**Dynamic (Uncached):**
- `project-notes.md` — Daily work logs
- `blockers.md` — Current issues
- `changelog.md` — Recent changes

**Why:** Prevents cache invalidation from routine updates.

**Example:**
- Update `project-notes.md` freely (no cache bust)
- Reference `product-reference.md` (always cached)
- The cache hits reference, ignores notes

---

## Operational Pattern

**Session Start:**
1. Load core + stable files (they're cached)
2. Load today's dynamic memory
3. Don't change core files

**During Work:**
1. Make 3-5 API calls back-to-back (cache reuse)
2. Keep system prompt locked
3. Update only dynamic files

**Session End:**
1. Batch update stable/core docs
2. Store work in dynamic files
3. Let cache reset naturally

---

## Real-World Example

**Good:**
```
09:00 - Session starts
       - SOUL.md, USER.md loaded (cached)
       - Core prompt processed once
09:01 - Web search #1 (cache hit)
09:02 - Web search #2 (cache hit)
09:03 - API call #3 (cache hit)
       Save: 80% on search/API tokens
09:45 - Update project-notes.md (no cache bust)
10:00 - SOUL.md updated (batch update)
```

**Bad:**
```
09:00 - Session starts
09:15 - Update SOUL.md (cache bust!)
       Core prompt reprocessed
09:16 - Web search (no cache hit, full cost)
09:45 - Update SOUL.md again (bust again!)
       Wasted thousands of tokens
```

---

## Cache Lifecycle

```
Stable Files          Reused           Expires
────────────────────────────────────────────────
SOUL.md              Every call       End of session
USER.md              Every call       End of session
project-reference    Every call       End of session
─────────────────────────────────────────────────
Dynamic files        On-demand        Not cached
```

---

## Related

- [[Model Selection Strategy]]
- [[Rate Limits & Budget Management]]

## Created

2026-02-07
