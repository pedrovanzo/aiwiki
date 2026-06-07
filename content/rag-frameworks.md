# RAG Frameworks & Tools

A full RAG pipeline requires assembling multiple components — ingestion, embedding, retrieval and generation. RAG frameworks handle the plumbing between these components so you focus on the knowledge base and the queries, not the infrastructure.

---

## Framework Options

### LlamaIndex

The most focused RAG framework available. Purpose-built for document ingestion, chunking, embedding and retrieval. It handles the full ingestion pipeline in a few lines of code and gives fine-grained control over chunk size, retrieval strategy and prompt assembly.

**Best for:** Any use case where the core problem is "get knowledge out of documents and into Claude's context accurately." The default choice for RAG pipelines.

**Strengths:**
- Best-in-class document ingestion (supports markdown, PDF, Word, Notion, databases and more)
- Clean query engine abstraction — swap vector DBs or LLMs without rewriting logic
- Strong community and extensive integrations
- Works well with Claude via the Anthropic API

**When to reach for it:** Your primary problem is document retrieval. Start here before evaluating anything else.

---

### LangChain

The broadest AI framework available — RAG is one of many things it does. LangChain provides chains, agents, tools, memory and retrieval all in one ecosystem. Its RAG capabilities are solid but more generic than LlamaIndex.

**Best for:** Projects that need RAG as part of a larger agentic workflow — combining retrieval with tool use, memory and multi-step reasoning in one coherent stack.

**Strengths:**
- Massive ecosystem and community
- RAG + agents + memory + tools all in one framework
- Large library of pre-built integrations

**When to reach for it:** You need more than just retrieval — you are building a full agentic system and want one framework to cover the whole stack. Expect more boilerplate than LlamaIndex for pure RAG use cases.

---

### Haystack

A production-oriented RAG and search framework built by deepset. More opinionated than LangChain, more enterprise-focused than LlamaIndex.

**Best for:** Teams that need production-grade pipelines with strong evaluation tooling, monitoring and support for complex retrieval strategies (hybrid search, re-ranking).

**Strengths:**
- Strong evaluation and benchmarking tools built in
- Hybrid search (vector + keyword combined)
- Production pipeline abstractions with monitoring hooks

**When to reach for it:** Enterprise context, regulated industries, or when retrieval quality needs to be measurable and auditable. Overkill for personal or small team projects.

---

## Vector Database Options

The vector database is the storage and search layer of the RAG pipeline. Swappable independently of the framework.

| Tool | Type | Best For | Notes |
|---|---|---|---|
| **Chroma** | Open source, local | Development and prototyping | Easiest to run locally, Python-first, no infrastructure needed |
| **Pinecone** | Managed cloud | Production with minimal ops | Fully managed, scales automatically, costs money |
| **pgvector** | PostgreSQL extension | Already using PostgreSQL | Adds vector search to an existing Postgres DB — no new infrastructure |
| **Supabase** | Managed Postgres + pgvector | Full-stack projects | Developer-friendly layer on top of pgvector, good DX |
| **Weaviate** | Open source, self-hosted | Complex filtering + vector search | Feature-rich, supports hybrid search, more ops overhead |

---

## Managed RAG Platforms

For teams that want RAG capabilities without assembling the pipeline themselves — the framework, vector DB and embedding model are all managed for you.

**Cohere** — Provides RAG as a first-class API feature. Pass your documents and queries to the API and get grounded responses back. Strong multilingual embedding support, relevant for Portuguese-language knowledge bases.

**Vertex AI (Google)** — Managed RAG pipeline within Google Cloud. Good fit if your infrastructure is already GCP-based. Enterprise support and compliance baked in.

**Azure AI Search** — Microsoft's managed retrieval layer with hybrid search (vector + keyword). Natural fit for organizations in the Microsoft/Azure ecosystem.

---

## How to Choose

```
Starting a new project?
→ LlamaIndex + Chroma locally → Pinecone when going to production

Already on LangChain?
→ Stay there, use LangChain's retrieval modules + LlamaIndex for ingestion if needed

Need production-grade quality measurement?
→ Haystack

Already on PostgreSQL?
→ pgvector — no new infrastructure

Need multilingual retrieval (Portuguese included)?
→ Cohere Embed as the embedding model regardless of framework

Want zero infrastructure management?
→ Managed platform: Cohere, Vertex AI or Azure AI Search depending on your cloud
```

---

## Where This Fits in the Bigger Picture

RAG frameworks sit between your knowledge base and Claude. They are not replacements for Claude — they are the pipeline that prepares what Claude receives. Claude's job starts only after the retrieval step has assembled the augmented prompt.

```
Your Documents → RAG Framework → Vector DB → Augmented Prompt → Claude → Response
                 (the plumbing)  (the search)  (the assembly)    (the generation)
```

Choosing the right framework is an infrastructure and complexity decision, not an intelligence decision. Claude performs the same regardless — what changes is how accurately and efficiently the right context reaches it.
