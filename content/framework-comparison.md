# Framework Comparison Table

*Side-by-side comparison of all memory and RAG frameworks covered in this knowledge base.*

Side-by-side comparison of all memory and RAG frameworks covered in this knowledge base.

## Memory Frameworks

| Framework | Working | Semantic | Episodic | Procedural | Primary Strength | Best Starting Point |
|---|---|---|---|---|---|---|
| Mem0 | ❌ | ✅ | ✅ | ❌ | Easiest persistent memory to add | Adding cross-session memory to an existing app |
| Zep / Graphiti | ❌ | ✅ | ✅ | ❌ | Relational memory over time | Agents that need to reason about how memories relate |
| Letta / MemGPT | ✅ | ✅ | ✅ | ✅ | Self-directed autonomous memory management | Long-running fully autonomous agents |
| LangMem | ❌ | ✅ | ✅ | ❌ | LangChain-native memory | Projects already in the LangChain ecosystem |
| LangGraph | ✅ | ❌ | ✅ | ✅ | Stateful agent orchestration | Complex multi-step workflows with branching logic |
| LlamaIndex | ❌ | ✅ | ❌ | ❌ | Document retrieval via RAG | Any RAG pipeline over a document collection |
| Cognee | ❌ | ✅ | ❌ | ❌ | Knowledge graph from documents | RAG with relational understanding between concepts |

## RAG Frameworks

| Framework | Type | Best For | Complexity |
|---|---|---|---|
| LlamaIndex | Open source | Pure RAG pipelines, document retrieval | Low — clean API, minimal boilerplate |
| LangChain | Open source | RAG as part of a larger agentic stack | Medium — broad but more verbose |
| Haystack | Open source | Production RAG with evaluation and monitoring | Medium-High — enterprise-oriented |
| Cohere | Managed API | RAG with strong multilingual support | Low — API-first, no infrastructure |
| Vertex AI | Managed cloud | GCP-based enterprise RAG | Medium — requires GCP setup |
| Azure AI Search | Managed cloud | Microsoft ecosystem RAG | Medium — requires Azure setup |

## Vector Databases

| Tool | Type | Best For | Ops Overhead |
|---|---|---|---|
| Chroma | Open source local | Development and prototyping | None |
| Pinecone | Managed cloud | Production with zero ops | None (fully managed) |
| pgvector | PostgreSQL extension | Already on Postgres | Same as existing Postgres |
| Supabase | Managed Postgres | Full-stack projects with good DX | Minimal |
| Weaviate | Open source self-hosted | Hybrid search and complex filtering | Moderate |

## Practical Upgrade Path

```
Stage 1 — Starting out:
→ Manual context injection (skills + markdown files)
→ No frameworks needed

Stage 2 — Knowledge base growing:
→ Add LlamaIndex + Chroma for document retrieval
→ Add Mem0 for cross-session user memory

Stage 3 — Workflows getting complex:
→ Add LangGraph for orchestration
→ Migrate Chroma to Pinecone or Supabase for production

Stage 4 — Fully autonomous agents:
→ Letta/MemGPT for self-directed memory management
→ Zep/Graphiti if relational memory between concepts matters
```
