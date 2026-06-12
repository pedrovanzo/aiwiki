# Agentic Memory

*How agents persist knowledge across interactions, sessions, and tasks.*

Memory is what separates a capable agent from a forgetful one. Without memory, every interaction starts from zero — the agent has no awareness of past decisions, user preferences, accumulated knowledge or learned procedures.

## Why Memory Matters in Agentic Systems

Consider an agent tasked with managing a development project over several days:
- It needs to remember architectural decisions made on day one when writing code on day three *(semantic memory)*
- It needs to recall that a specific API endpoint failed yesterday and was replaced *(episodic memory)*
- It needs to follow the team's established code review procedure *(procedural memory)*
- It needs to hold the current task's details actively while executing *(working memory)*

No single memory type covers all of these. A robust agentic system uses all four types in combination, each serving a distinct role.

## The Four Memory Types — Overview

| Memory Type | Analogy | Lifespan | Stored Where |
|---|---|---|---|
| Working | RAM | Single session | Context window |
| Semantic | Reference manual | Persistent | Vector DB / files |
| Episodic | Personal diary | Persistent | Memory store |
| Procedural | Muscle memory | Persistent | Skills / instructions |

## The Memory Gap in Claude

Claude natively covers working memory (context window) and procedural memory (CLAUDE.md, skills, hooks) out of the box. The gap is in **cross-session episodic and semantic memory** — Claude remembers nothing between conversations unless you explicitly feed it back in.

Claude.ai has a basic built-in memory feature that patches this partially, but it stores only lightweight summarized facts — not full episodic records. For production agentic systems, this gap is filled by external memory frameworks assembled around Claude.
