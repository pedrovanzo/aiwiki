# Memory Types & Usage Guide

The four memory types are not interchangeable — each one serves a distinct role in an agentic system. Understanding which type to reach for in a given situation is one of the core design decisions when building an agent.

---

## Working Memory

**What it is:** The agent's active mental workspace. Everything currently loaded into the context window — the conversation history, injected documents, tool outputs, and the current task description. It is temporary by definition: when the session ends, working memory is gone.

**Analogy:** RAM in a computer. Fast, immediately accessible, but wiped on shutdown.

**In Claude:** The context window itself. Every token currently in the prompt is working memory.

**Limitations:** Finite size (context window limit). Cannot persist across sessions. Gets expensive fast if you try to use it as a substitute for other memory types by stuffing large documents into every prompt.

---

## Semantic Memory

**What it is:** Timeless, decoupled facts and knowledge that persist across sessions and are independent of any specific event or interaction. User preferences, system rules, domain knowledge, architectural decisions, and project conventions all live here.

**Analogy:** A reference manual or encyclopedia. It doesn't record what happened — it records what is true.

**In Claude:** Internally, Claude's training data is its semantic memory. Externally, your markdown files, ADRs, and CLAUDE.md instructions are semantic memory you provide. For production systems, semantic memory is stored in a vector database and retrieved via RAG.

**Key distinction from episodic:** Semantic memory is timeless ("we use JWT for auth"). Episodic memory is time-bound ("on Tuesday we switched from sessions to JWT because of the scaling incident").

---

## Episodic Memory

**What it is:** Records of specific past interactions and events, anchored in time. The agent can reference what happened before, learn from past outcomes, and avoid repeating mistakes.

**Analogy:** A personal diary or activity log. Entries are dated and event-specific.

**In Claude:** Chat history within a single session is episodic memory. Across sessions, Claude has none natively. External episodic memory requires a memory store (Mem0, Zep, LangMem) that records interactions and makes them retrievable in future sessions.

**Common use cases:**
- "Last time this user asked for a summary they wanted bullet points, not prose"
- "This API endpoint failed with a 429 error yesterday — add retry logic"
- "The client rejected the first design proposal because of the color palette"

---

## Procedural Memory

**What it is:** Encoded instructions, workflows and behavioral patterns that define how the agent performs specific tasks. Not what to know, but how to act.

**Analogy:** Muscle memory or a standard operating procedure (SOP). You don't think about it — you just follow the pattern.

**In Claude:** CLAUDE.md files, skills, and hooks are all procedural memory. They encode the rules and step-by-step behaviors Claude follows when executing tasks.

**Key distinction from semantic:** Semantic memory answers "what is true." Procedural memory answers "what to do and how."

---

## Memory Types — Decision Guide

Use this table to identify which memory type (and which tool) fits a given edge case:

| Edge Case | Memory Type | Recommended Tools |
|---|---|---|
| Input and output of a current conversation | Working Memory | Native context window, LangGraph state |
| User preferences, guidelines and rules | Semantic Memory | Mem0, Zep, LangMem |
| Document data retrieval (search and analysis) | Semantic Memory + RAG | LlamaIndex, Chroma, Pinecone, Cognee |
| Use previous logs to learn for future prompts | Episodic Memory | Zep/Graphiti, Mem0, LangMem |
| Analyse information through time | Episodic Memory | Zep/Graphiti, Cognee, LangGraph |
| Follow and improve procedures | Procedural Memory | Skills, CLAUDE.md, Letta/MemGPT |
| Operate hours/days autonomously | All types (self-managed) | Letta/MemGPT, LangGraph |

## Important Clarifications

**RAG is a mechanism, not a memory type.** RAG is the retrieval system that implements semantic memory externally. The memory type is semantic — RAG is the tool that makes it work at scale.

**"Temporal" is not a fifth memory type.** Tracking how information changes over time is a use case of episodic memory, not a separate category. Semantic memory is timeless; episodic memory is time-bound by definition — temporal analysis lives there.

**Autonomous agents use all four types simultaneously.** When an agent operates over hours or days, it is not using a special fifth memory type — it is orchestrating all four, with a framework like Letta/MemGPT managing what gets stored, retrieved and evicted automatically.
