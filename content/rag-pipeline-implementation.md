# RAG Pipeline — Implementation Walkthrough

*A concrete walkthrough of building a RAG pipeline, from ingestion to query.*

## The Edge Case

A development team has 200+ markdown files — docs, ADRs, runbooks, API specs. Developers want to query them in natural language without manually hunting through files.

**Tools used:**
- **LlamaIndex** — RAG framework, handles chunking, embedding orchestration and retrieval
- **Chroma** — local vector store
- **OpenAI `text-embedding-3-small`** — embedding model
- **Claude via Anthropic API** — the generator
- **Python** — glue language

---

## Key Terms

**Ingestion pipeline** — the one-time process of reading, chunking and embedding documents into the vector store.

**Chunk** — a small fragment of a document (typically 300–800 tokens) that gets embedded as a unit. Smaller chunks give more precise retrieval; larger chunks give more context per result.

**Embedding** — the numeric vector representation of a chunk's semantic meaning.

**Vector store** — the database that holds embeddings and enables similarity search.

**Retrieval** — the step that fetches the most semantically relevant chunks for a given query.

**Augmented prompt** — the final prompt sent to the LLM, composed of the user query plus the retrieved chunks.

**Generator** — the LLM that produces the final response grounded in the retrieved content.

---

## Step 1 — Ingestion Pipeline

Runs once when you first set up the system, then reruns whenever documents are added or updated. LlamaIndex reads every file, splits them into chunks, calls the embedding model on each chunk, and stores the resulting vectors in Chroma alongside the original chunk text.

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.vector_stores.chroma import ChromaVectorStore
import chromadb

# Load all documents from the docs folder
documents = SimpleDirectoryReader("./docs").load_data()

# Connect to local Chroma instance
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection("dev_docs")

# Build index — chunks, embeds and stores everything in one call
vector_store = ChromaVectorStore(chroma_collection=collection)
index = VectorStoreIndex.from_documents(documents, vector_store=vector_store)
```

After this step, Chroma holds hundreds of embedded chunks on disk, ready to be searched. This does not need to run again unless documents change.

---

## Step 2 — Query Pipeline

Runs on every user request. The user's question is embedded, Chroma finds the top N most relevant chunks, and LlamaIndex assembles the augmented prompt and sends it to Claude.

```python
# Load existing index from Chroma — no re-ingestion needed
index = VectorStoreIndex.from_vector_store(vector_store)
query_engine = index.as_query_engine(similarity_top_k=5, llm=claude_llm)

# User submits a natural language query
response = query_engine.query("What was the decision on auth strategy?")
print(response)
```

---

## What Claude Actually Receives

LlamaIndex assembles the augmented prompt internally. What Claude sees looks like this:

```
You are a helpful assistant. Use the context below to answer the question.
Only use information present in the context. If the answer is not in the
context, say so.

Context:
[Chunk from ADR-012.md]: "...we decided to use JWT with refresh tokens
because session storage presented scaling issues across microservices..."

[Chunk from auth-runbook.md]: "...tokens expire after 15 minutes,
refresh tokens after 7 days..."

[Chunk from ADR-008.md]: "...OAuth2 was evaluated but ruled out due to
integration complexity at the time..."

Question: What was the decision on auth strategy?
```

---

## The Output

Claude returns a natural language response grounded in the retrieved chunks:

> "Based on ADR-012, the team decided to use JWT with refresh tokens. Session storage was ruled out due to scaling concerns across microservices. Tokens expire after 15 minutes, with refresh tokens valid for 7 days. OAuth2 was evaluated earlier in ADR-008 but dismissed due to integration complexity."

The response is:
- **Grounded** — every claim traces back to a real retrieved chunk
- **Synthesized** — Claude combines information from multiple chunks into a coherent answer
- **Scoped** — Claude only knows what was retrieved, not the entire knowledge base
- **Sourced** — LlamaIndex can optionally return which chunks were used, so you can show the user exactly which files the answer came from
