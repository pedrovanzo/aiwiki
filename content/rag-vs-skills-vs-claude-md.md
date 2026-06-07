# RAG vs Skills vs CLAUDE.md — When to Use What

These three mechanisms all inject knowledge or behavior into Claude, but they serve distinct roles and operate at different layers.

| Question | Best Mechanism |
|---|---|
| How should Claude behave throughout this entire project? | CLAUDE.md |
| How should Claude perform this specific recurring task? | Skill |
| How should Claude answer questions about a large document collection? | RAG |
| What conventions and rules apply to this codebase? | CLAUDE.md |
| What step-by-step process should Claude follow for code review? | Skill |
| How should Claude retrieve information from 200+ ADRs? | RAG |
| What should Claude always and never do in this session? | CLAUDE.md |
| How should Claude generate a weekly report in a specific format? | Skill |
| How should Claude answer natural language queries over a knowledge base? | RAG |

## The Key Distinctions

**CLAUDE.md vs Skills:**
CLAUDE.md is always loaded and governs the entire session. Skills are loaded on demand and govern a specific task. If the instruction applies everywhere, it belongs in CLAUDE.md. If it applies only to a particular workflow, it belongs in a skill.

**Skills vs RAG:**
Skills encode *how to do something*. RAG retrieves *what to know about something*. A skill can instruct Claude to use a RAG pipeline as part of its procedure — they are not mutually exclusive.

**CLAUDE.md vs RAG:**
CLAUDE.md is for procedural and semantic memory that is small enough to always keep in context. RAG is for semantic memory that is too large to keep in context and needs to be fetched on demand.

## Combined Usage Pattern

In a mature Claude Code setup, all three work together:

```
CLAUDE.md    → defines standing rules and loads relevant skills
Skills       → encode task-specific procedures, may trigger RAG queries
RAG pipeline → serves knowledge from large document collections on demand
```
