# Choosing a Vector Database

The vector database is the storage and search layer of a RAG pipeline. The right choice depends on your infrastructure situation, scale requirements and how much operational overhead you are willing to accept.

## The Options

### Chroma

Open source, runs locally, Python-first. No infrastructure to set up — it runs as a library inside your Python process or as a lightweight local server. Data persists to disk.

- **Best for:** local development, prototyping, personal projects
- **Not best for:** production systems with high query volume or multiple concurrent users
- **Operational overhead:** none

### Pinecone

Fully managed cloud vector database. You send vectors to their API, they handle storage, indexing and scaling entirely. Costs money but eliminates all operational concerns.

- **Best for:** production systems where you want zero infrastructure management
- **Not best for:** cost-sensitive projects or situations where data cannot leave your infrastructure
- **Operational overhead:** none (fully managed)

### pgvector

A PostgreSQL extension that adds vector storage and similarity search to an existing Postgres database. No new infrastructure if you are already running Postgres.

- **Best for:** projects already on PostgreSQL that want to avoid introducing a new database
- **Not best for:** very high vector query volume where a dedicated vector DB would outperform
- **Operational overhead:** same as your existing Postgres

### Supabase

A developer-friendly managed platform built on PostgreSQL with pgvector included. Adds a clean API, dashboard and authentication layer on top.

- **Best for:** full-stack projects that want Postgres + vector search + a good developer experience in one place
- **Not best for:** pure vector search at scale where Pinecone would be more performant
- **Operational overhead:** minimal (managed)

### Weaviate

Open source, self-hosted vector database with advanced features: hybrid search (vector + keyword combined), filtering, multi-tenancy and built-in vectorization modules.

- **Best for:** production systems needing hybrid search or complex filtering alongside vector search
- **Not best for:** simple use cases where the added complexity is not warranted
- **Operational overhead:** moderate (self-hosted)

---

## Quick Selection Guide

```
Already on PostgreSQL?
→ pgvector — no new infrastructure

Just prototyping or building locally?
→ Chroma — zero setup

Going to production, want zero ops?
→ Pinecone

Want Postgres + vector + good DX in one place?
→ Supabase

Need hybrid search (vector + keyword) or complex filtering?
→ Weaviate
```
