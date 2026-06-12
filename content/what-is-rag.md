# What is RAG (Retrieval-Augmented Generation)

*The architectural pattern that gives models access to external knowledge at inference time.*

RAG is an architectural pattern where, instead of relying solely on the model's trained knowledge, the system dynamically fetches relevant information at inference time and injects it into the context before the model generates a response.

The core problem RAG solves: a model's knowledge is frozen at training time. RAG gives it access to external, up-to-date, or domain-specific knowledge on demand — without retraining.

## The Three-Step Loop

1. User submits a query
2. A retrieval system searches an external knowledge store for relevant content
3. The retrieved content is injected into the prompt alongside the query, and the model generates a response grounded in that content

## Key Distinction

RAG is not primarily about context window constraints — it is about **dynamic knowledge injection**. The context window limitation is the reason RAG exists (you cannot dump an entire knowledge base into a prompt), but the purpose is grounding responses in external knowledge that is fetched on demand.

## The Defining Mechanical Component

What separates RAG from simply passing documents to a model is the **retrieval step**: a vector database stores embedded chunks of your documents, and at query time the system finds the most semantically relevant chunks automatically — without you deciding which files matter.
