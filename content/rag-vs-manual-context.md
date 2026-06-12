# RAG vs Manual Context Injection

*The difference between manually injecting context and letting a retrieval system decide what's relevant.*

These two patterns share the same spirit — grounding model responses in external documents — but differ in one critical way: who decides what gets fetched.

## Manual Context Injection

You (or a skill) explicitly tell Claude which files to read. Claude reads them and uses their content to respond. This is what happens when a skill points Claude at specific markdown files or ADRs in a project.

| Property | Manual Context Injection | Full RAG |
|---|---|---|
| External knowledge source | ✅ | ✅ |
| Dynamic at inference time | ✅ | ✅ |
| You decide what gets fetched | ✅ | ❌ |
| Automated semantic retrieval | ❌ | ✅ |
| Vector embeddings | ❌ | ✅ |
| Scales to large knowledge bases | ❌ | ✅ |

## When Manual Injection is Enough

- Small, stable set of documents (under ~20 files)
- You always know which file is relevant to which task
- Documents are short enough to fit comfortably in context

## When You Need Full RAG

- Hundreds of documents where manual curation does not scale
- Users query the knowledge base with natural language without knowing which file to look at
- Documents update frequently and relevance changes over time
