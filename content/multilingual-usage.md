# Multilingual Usage in Claude

For the full breakdown of language quality, mid-session switching and writing skills for multilingual teams, see [Language & Output Quality](/topics/language-output-quality).

## Quick Reference for Multilingual Claude Code Workflows

- Write all system-level artifacts (CLAUDE.md, skills, hooks) in **English**
- Let output language follow the user's input naturally
- Add "Always respond in the same language the user writes in" to any skill consumed by non-English speakers
- For Portuguese-language knowledge bases in RAG pipelines, consider Cohere Embed as the embedding model — it has stronger multilingual support than OpenAI's default embedding models
