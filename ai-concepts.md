# AI Concepts Knowledge Base

## Claude Ecosystem

- **Subagents** — COVERED
  - What they are (separate context, ephemeral, non-interactive)
  - Token cost per subagent invocation
  - The Task tool (Claude Code CLI only)
  - Error handling behavior (silent failures, defensive prompting)
  - Can run skills

- **MCP Servers** — NOT COVERED

- **CLAUDE.md** — COVERED (briefly — referenced as procedural/semantic memory, not explained in depth)

- **Skills** — COVERED (briefly — referenced as procedural memory and context injection)

- **Hooks** — COVERED (briefly — referenced as triggers for subagents)

- **Claude Code vs claude.ai** — COVERED (briefly — Task tool only exists in Claude Code CLI)

---

## Language and Multilingual Usage

- **English vs Portuguese output quality in Claude** — COVERED
- **Mixing languages mid-session** — COVERED
- **Writing skills in English for Portuguese-speaking users** — COVERED

---

## RAG (Retrieval-Augmented Generation)

- **Definition and purpose** — COVERED
- **Four components: knowledge base, embedding model, vector DB, LLM** — COVERED
- **Ingestion pipeline** — COVERED
- **Query pipeline and augmented prompt** — COVERED
- **RAG vs manual context injection (current markdown/ADR approach)** — COVERED
- **RAG frameworks: LangChain, LlamaIndex, Haystack** — COVERED (briefly)
- **Managed RAG platforms: Cohere, Vertex AI, Azure AI Search** — COVERED (briefly)
- **Full RAG implementation walkthrough (LlamaIndex + Chroma + Claude)** — COVERED
- **When to upgrade from manual injection to full RAG** — COVERED

---

## AI Memory Types

- **Working Memory** — COVERED
- **Semantic Memory** — COVERED
- **Episodic Memory** — COVERED
- **Procedural Memory** — COVERED
- **RAG as semantic memory retrieval mechanism** — COVERED
- **Cross-session memory gap in Claude** — COVERED

---

## Memory Frameworks

- **Mem0** — COVERED
- **Zep / Graphiti** — COVERED
- **Letta / MemGPT** — COVERED
- **LangMem** — COVERED
- **LangGraph** — COVERED
- **LlamaIndex** — COVERED
- **Cognee** — COVERED

---

## NOT COVERED — Topics for Future Sessions

- MCP Servers (what they are, how they work, how to use them)
- Claude Code in depth (installation, configuration, CLAUDE.md authoring)
- Hooks in depth (types, triggers, configuration)
- Skills in depth (authoring, structure, best practices)
- Orchestrator agent pattern
- LangGraph in depth (stateful workflows, graph nodes, branching)
- Vector databases in depth (Chroma, Pinecone, pgvector comparison)
- Embedding models in depth (how they work, how to choose one)
- Prompt engineering patterns
- Agent evaluation and testing
