# Memory Frameworks

*External tools and libraries that give LLMs persistent memory beyond the native context window.*

Memory frameworks are the external tools you assemble around an LLM to give it persistent memory capabilities beyond the native context window. Each framework has a different philosophy, strength and target use case.

---

## Mem0

**What it is:** A plug-and-play persistent memory layer designed specifically for LLM applications. Mem0 automatically extracts facts and preferences from conversations, stores them, and retrieves them in future sessions.

**Memory types covered:** Semantic, Episodic

**Philosophy:** Minimal friction. Drop it between your app and the LLM and it handles memory automatically without you building the storage logic yourself.

**Best for:** Adding cross-session memory to a Claude-powered app quickly. The lowest-effort entry point for persistent memory.

**When to reach for it:** You want Claude to remember user preferences, past interactions and accumulated facts across sessions without building a custom memory pipeline.

---

## Zep / Graphiti

**What it is:** Zep is a memory store built specifically for LLM apps. Graphiti is its newer graph-based memory engine — it stores memories as a knowledge graph (nodes and relationships) rather than flat vectors.

**Memory types covered:** Semantic, Episodic

**Philosophy:** Relationships between memories matter as much as the memories themselves. Instead of asking "what do I know about auth?" it can answer "how does the auth decision relate to the scaling incident and the microservices migration?"

**Best for:** Long-running agents that accumulate complex, interconnected knowledge over time where the relationships between facts are as important as the facts themselves.

**When to reach for it:** Your agent needs to reason about how concepts relate to each other over time, not just retrieve isolated facts.

---

## Letta / MemGPT

**What it is:** The most sophisticated memory framework available. Formerly called MemGPT, Letta gives agents OS-inspired memory management — the agent itself decides what to move into long-term storage, what to evict from working memory, and what to retrieve, mimicking how an operating system manages RAM vs disk.

**Memory types covered:** Working (self-managed), Semantic, Episodic, Procedural

**Philosophy:** The agent is responsible for its own memory. It is not just a consumer of memory — it is the manager of it.

**Best for:** Fully autonomous, long-lived agents that need to self-manage knowledge accumulation without human intervention.

**When to reach for it:** You are building an agent that operates over days or weeks, accumulates large amounts of knowledge, and needs to decide for itself what is worth remembering. Overkill for most use cases — powerful for complex ones.

---

## LangMem

**What it is:** LangChain's native memory module. Handles storing and retrieving conversation history and extracted facts across sessions, integrated tightly into the LangChain ecosystem.

**Memory types covered:** Semantic, Episodic

**Philosophy:** Memory as a first-class feature of the LangChain stack — consistent API, familiar patterns, minimal context switching if you're already in that ecosystem.

**Best for:** Projects already built on LangChain that need to add persistent memory without introducing a separate dependency.

**When to reach for it:** You are in the LangChain ecosystem and need memory. Lighter than Letta, more opinionated than Mem0.

---

## LangGraph

**What it is:** Not purely a memory framework — it is a stateful agent orchestration framework built on LangChain. It models your agent as a graph of nodes (steps) with persistent state that flows between them across the entire workflow.

**Memory types covered:** Working (as graph state), Episodic, Procedural (as graph structure)

**Philosophy:** Memory is state, and state lives in the graph. The graph defines what the agent does and remembers at each step — memory and orchestration are unified.

**Best for:** Complex multi-step agentic workflows with branching logic, parallel execution and state that must survive across many steps and cycles.

**When to reach for it:** You need to orchestrate a workflow, not just remember facts. LangGraph is the container that holds and moves state — it is the orchestration layer that other memory tools plug into.

---

## LlamaIndex

**What it is:** Primarily a data ingestion and semantic retrieval framework. Its core strength is chunking documents, generating embeddings, storing them in a vector database, and retrieving the most relevant chunks at query time.

**Memory types covered:** Semantic (via RAG)

**Philosophy:** Getting knowledge out of documents and into LLM context efficiently and accurately. The best tool for the document retrieval problem specifically.

**Best for:** RAG pipelines. When the problem is "my agent needs to search and reason over a large document collection," LlamaIndex is the go-to.

**When to reach for it:** Your knowledge base has grown too large to curate manually and you need automated semantic retrieval. Not the right tool for conversational or episodic memory.

---

## Cognee

**What it is:** A newer framework that builds a knowledge graph from your documents automatically — ingesting files, extracting entities and relationships, and storing them as a graph that an LLM can query with richer relational understanding than flat vector search.

**Memory types covered:** Semantic (graph-based)

**Philosophy:** Documents contain not just facts but relationships between facts. A knowledge graph preserves that relational structure, enabling queries like "what concepts are connected to the auth system?" rather than just "find chunks about auth."

**Best for:** When RAG-like document querying is needed but with richer understanding of how concepts in the documents relate to each other.

**When to reach for it:** LlamaIndex gives you good retrieval but you need the agent to understand the relationships between retrieved concepts, not just the concepts themselves.

---

## Framework Comparison Table

| Framework | Working | Semantic | Episodic | Procedural | Primary Strength |
|---|---|---|---|---|---|
| Mem0 | ❌ | ✅ | ✅ | ❌ | Easiest persistent memory to add |
| Zep / Graphiti | ❌ | ✅ | ✅ | ❌ | Relational memory over time |
| Letta / MemGPT | ✅ | ✅ | ✅ | ✅ | Self-directed autonomous memory |
| LangMem | ❌ | ✅ | ✅ | ❌ | LangChain-native memory |
| LangGraph | ✅ | ❌ | ✅ | ✅ | Stateful agent orchestration |
| LlamaIndex | ❌ | ✅ | ❌ | ❌ | Document retrieval via RAG |
| Cognee | ❌ | ✅ | ❌ | ❌ | Knowledge graph from documents |

## Practical Recommendation by Stage

**Starting out — add memory to an existing Claude app:**
→ Mem0. Lowest friction, broadest coverage of the common cases.

**Knowledge base is growing too large to curate manually:**
→ LlamaIndex. Purpose-built for this exact problem.

**Agent needs to reason about relationships between concepts:**
→ Zep/Graphiti or Cognee depending on whether the data is conversational or document-based.

**Workflows are getting complex with branching and parallel steps:**
→ LangGraph as the orchestration layer, with Mem0 or LlamaIndex plugged in for memory.

**Agent needs to run fully autonomously for days:**
→ Letta/MemGPT. Accept the complexity — it is warranted at that scale.
