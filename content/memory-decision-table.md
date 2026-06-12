# Memory Type Decision Table

*A lookup table for matching edge cases to the right memory type and tooling.*

Use this table to identify the right memory type and tooling for a given edge case.

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

**Temporal analysis is not a fifth memory type.** Tracking how information changes over time is a use case of episodic memory. Semantic memory is timeless; episodic memory is time-bound — temporal analysis lives there.

**Autonomous agents use all four types simultaneously.** When an agent operates over hours or days, it is orchestrating all four memory types, with a framework like Letta/MemGPT managing what gets stored, retrieved and evicted automatically.
