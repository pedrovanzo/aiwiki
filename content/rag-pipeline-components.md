# RAG Pipeline — Components & Architecture

*The four building blocks of a RAG system and how they fit together.*

A full RAG system is assembled from four components. Each one has a distinct role and can be swapped independently — you can change your vector database without touching your embedding model, or switch LLMs without rebuilding the ingestion pipeline.

---

## Component 1 — Knowledge Base

**What it is:** The raw source of truth. The collection of documents, files or records you want the agent to be able to query.

**Format:** Anything text-based — markdown files, PDFs, Word documents, ADRs, API specs, database records, web pages.

**Your current equivalent:** The markdown files and ADRs you leave throughout a project. The difference is that in a full RAG system these are processed and indexed automatically, rather than manually pointed at by a skill.

---

## Component 2 — Embedding Model

**What it is:** A model that converts text into vectors — arrays of numbers that represent the semantic meaning of that text. Similar meaning produces similar vectors, which is what enables semantic search.

**When it runs:** Twice — once at ingestion time (to embed every document chunk into the vector store) and once at query time (to embed the user's question so it can be compared against stored chunks).

**Common choices:**
- `text-embedding-3-small` (OpenAI) — fast, cheap, good general performance
- Cohere Embed — strong multilingual support, relevant for Portuguese usage
- Local models via Ollama — no API cost, runs on your own hardware

**Key property:** The same embedding model must be used for both ingestion and querying. Mixing models breaks the similarity search.

---

## Component 3 — Vector Database

**What it is:** A database purpose-built for storing and searching vectors. At query time it finds the stored chunks whose vectors are most similar to the query vector — this is called **nearest neighbor search**.

**What it stores:** The vector itself plus the original chunk text and metadata (source file, page number, date, etc.) as a payload.

**Common choices:**

| Tool | Best For |
|---|---|
| Chroma | Local development, lightweight, Python-first |
| Pinecone | Managed cloud, production-ready, minimal ops |
| pgvector | Already using PostgreSQL — adds vector search as an extension |
| Supabase | Postgres + pgvector with a developer-friendly layer on top |
| Weaviate | Open source, feature-rich, good for complex filtering |

---

## Component 4 — The LLM Generator

**What it is:** The model that receives the assembled prompt and generates the final response. In this context, Claude.

**What it sees:** Not the entire knowledge base — only the chunks the retrieval step decided were relevant, plus the user's original question. The LLM is the last step in the pipeline, not the first.

**Key property:** The LLM is stateless with respect to the knowledge base. It has no direct access to the vector store. It only knows what the retrieval step passes to it in the augmented prompt.

---

## How the Four Components Connect

```
INGESTION (runs once):
Knowledge Base → Embedding Model → Vector Database
(raw docs)       (converts to vectors)  (stores vectors + chunks)

QUERY (runs per request):
User Query → Embedding Model → Vector Database → Augmented Prompt → LLM → Response
              (embeds query)    (finds top N chunks)  (query + chunks)
```
