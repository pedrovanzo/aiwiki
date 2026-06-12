# AIWiki — Post-Grilling TODO

## Structure Changes (AppSidebar.tsx)

- [ ] Remove dead `num` fields from `NavSection` and `NavItem` interfaces and all data entries
- [ ] Remove emoji icons from all section headers
- [ ] Reorganise sections into 8-section learning path (see structure below)
- [ ] Remap all existing topics to new sections
- [ ] Update section labels to final names (pending grilling — section names TBD)

### New 8-Section Structure

| Section | Label (draft) | Topics |
|---|---|---|
| A | Fundaments | what-is-rag, what-is-agentic-ai, context-windows, language-output-quality |
| B | Core Concepts | rag-vs-manual-context, memory-types, agentic-memory, subagents, multi-llm-usage, multilingual-usage, mcp-servers |
| C | AI Products | claude-products + gaps (see below) |
| D | AI Solutions | when-to-use-rag, rag-pipeline-components, rag-pipeline-implementation, memory-frameworks, rag-frameworks, vector-databases, embedding-models, prompt-engineering-rag |
| E | Claude Ecosystem | claude-md, skills, hooks, task-tool, mcp-servers-claude |
| F | Other AI Ecosystems | llm-preferences + gaps (see below) |
| G | Reference & Practice | memory-decision-table, rag-vs-skills-vs-claude-md, framework-comparison |
| H | Personal Thoughts | learning-with-llms, delegating-to-ai |

---

## Content Gaps (new .md files needed)

- [ ] `content/what-is-llm.md` — Baby Steps: the most basic entry point, what is an LLM
- [ ] `content/gpt-openai-overview.md` — Core AI Products: GPT / OpenAI platform overview
- [ ] `content/gemini-overview.md` — Core AI Products: Gemini platform overview
- [ ] `content/gemini-tooling.md` — Other Tooling: Gemini-specific developer tools
- [ ] `content/openai-codex-tooling.md` — Other Tooling: OpenAI / Codex-specific tools

---

## UI Changes (pending grilling decisions)

- [ ] Replace `notCovered` dot + `partiallyCovered` badge with a single muted/dimmed visual treatment — visibly listed, not linked, lower opacity. No separate badge needed.
- [ ] Decide on helper descriptions for topics (where they appear, what they say)
- [ ] Update home page copy — knowledge showcase framing, no mention of "session by session with Claude"
- [x] Finalise section label names: Fundaments, Core Concepts, AI Products, AI Solutions, Claude Ecosystem, Other AI Ecosystems, Reference & Practice, Personal Thoughts

---

## Decisions Still Open

- Section label names (A–H draft labels above are placeholders)
- notCovered visual treatment
- Helper descriptions placement and scope
