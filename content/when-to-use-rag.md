# When to Use RAG

The decision between manual context injection and a full RAG pipeline comes down to three factors: scale, dynamism and who decides what is relevant.

## Use Manual Context Injection When

- Your knowledge base is small and stable (under ~20 files)
- You always know which file is relevant to which task
- Documents are short enough to fit comfortably in context without hitting token limits
- The set of people querying the knowledge base understand the file structure

This is the current approach with markdown files and ADRs in a project — a skill points Claude at specific files, Claude reads them, Claude responds. Simple, effective at small scale, zero infrastructure.

## Use Full RAG When

- Your knowledge base has grown too large to curate manually
- Users query with natural language without knowing which file to look at
- Documents update frequently and relevance changes over time
- Multiple people with different mental models need to query the same knowledge base
- You need the system to find relevant content you might not have thought to include

## The Upgrade Signal

The clearest signal that you have outgrown manual context injection is when you find yourself:
- Forgetting which file contains which information
- Writing skills that load more and more files "just in case"
- Getting incomplete answers because the relevant file was not included
- Spending time maintaining lists of which skill loads which files

When any of these appear, it is time to build a retrieval layer.

## Decision Table

| Condition | Manual Injection | Full RAG |
|---|---|---|
| Under 20 documents | ✅ | Overkill |
| Over 100 documents | ❌ Too slow to curate | ✅ |
| You know which file is relevant | ✅ | Unnecessary |
| Users query with natural language | ❌ | ✅ |
| Documents change frequently | ❌ | ✅ |
| Zero infrastructure budget | ✅ | ❌ |
| Production system with many users | ❌ | ✅ |
