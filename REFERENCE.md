# 2nd Brain - Project Reference

## Vision

A personal knowledge base that captures our daily conversations and surfaces important concepts. Feels like a blend of Obsidian (knowledge graph) + Linear (polished UI).

---

## Core Features

### 1. Document Viewer
- Beautiful markdown renderer with syntax highlighting
- Sidebar navigation (folder structure)
- Search across all documents
- Linked references (concept connections)
- Full-screen reading mode

### 2. Document Generation
- **Concept Documents:** Explored during conversations (high-signal ideas, frameworks, decisions)
- **Daily Journals:** High-level summary of each day's discussions and outcomes
- **Linked Concepts:** Auto-link related ideas across documents

### 3. Folder Structure
```
2nd-brain/
├── documents/
│   ├── concepts/          # Big ideas, frameworks
│   ├── daily-journal/     # Daily recaps (YYYY-MM-DD.md)
│   ├── projects/          # Project-specific docs
│   └── decisions/         # Key decisions + rationale
├── metadata.json          # Document index, tags, links
└── .gitignore
```

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Markdown:** remark + rehype
- **Icons:** Lucide React
- **Storage:** Local filesystem (documents/) + metadata.json

---

## Workflow

**During conversations:**
1. I identify concept-worthy ideas
2. At session end, I create/update concept docs
3. Generate daily journal entry
4. Update metadata.json (index, tags, links)

**Daily:**
- Journal entries capture session summary
- Concepts link to related ideas
- Metadata auto-indexes everything

**Reading:**
- Open the app
- Browse sidebar
- Click document → view in editor
- Search across all docs
- See linked concepts

---

## Phase 1 (MVP)
- [ ] Next.js app scaffold
- [ ] Document folder + metadata.json
- [ ] Basic document viewer (read-only)
- [ ] Sidebar navigation
- [ ] Search

## Phase 2
- [ ] Markdown rendering with syntax highlighting
- [ ] Linked references
- [ ] Tags/filtering
- [ ] Document cards (preview)

## Phase 3
- [ ] Daily journal automation
- [ ] Concept doc generator
- [ ] Metadata updater

---

## Document Examples

**Concept Doc** (`concepts/batch-requests.md`):
```markdown
# Batch Requests

## Definition
Grouping multiple similar API calls into a single request to reduce overhead.

## Why It Matters
- Saves tokens
- Reduces cache misses
- Respects rate limits

## Related
- [[Rate Limits]]
- [[Cache Strategy]]

## Created
2026-02-07
```

**Daily Journal** (`daily-journal/2026-02-07.md`):
```markdown
# Daily Journal - 2026-02-07

## Topics Discussed
- Model selection strategy (Kimi for easy tasks)
- Cache hit optimization
- Second brain project planning

## Key Decisions
- Kimi is primary for easy/routine work
- Batch requests in 5-min windows

## Tomorrow
- Build Second Brain MVP
- Establish document generation workflow

## Mood
🚀 Excited about second brain
```

---

_Last updated: 2026-02-07_
