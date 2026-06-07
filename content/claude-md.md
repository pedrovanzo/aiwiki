# CLAUDE.md

CLAUDE.md is a persistent instruction file that defines behavior, conventions and rules for Claude Code sessions. It is Claude Code's primary mechanism for procedural memory — encoding how Claude should behave throughout a project without repeating instructions in every prompt.

## What It Does

When Claude Code starts a session, it reads CLAUDE.md automatically and treats its contents as standing instructions for the entire session. Everything in CLAUDE.md is always in working memory for that session.

## What Goes in CLAUDE.md

- Project conventions (naming, file structure, code style)
- Technology stack and architectural decisions
- Behaviors to always follow ("always run tests after editing a component")
- Behaviors to never do ("never delete files without confirming")
- Instructions for when and how to use subagents
- Instructions for when to apply specific skills

## What It Is in Memory Terms

CLAUDE.md is **procedural memory** — it encodes how to act. It can also carry **semantic memory** — project facts and context that Claude needs to know throughout the session.

## Scope

CLAUDE.md files can be scoped:
- **Project root** — applies to the entire project session
- **Subdirectory** — applies only when Claude is working within that directory

This lets you have global project rules alongside module-specific conventions.
