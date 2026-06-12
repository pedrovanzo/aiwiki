# Claude Products Overview

*The family of Claude models and surfaces — from the API to Claude Code.*

Claude is not a single product — it is a family of models accessible through different surfaces, each with different capabilities, use cases and levels of control.

## The Surfaces

**claude.ai**
The web, mobile and desktop chat interface. What most people think of when they think of Claude. Conversational, session-based, no persistent memory by default. Where this conversation is happening. Supports file uploads, web search, artifacts and basic memory (lightweight, summarized facts only).

**Claude Code CLI**
A command-line tool for agentic coding workflows. Claude operates autonomously on your codebase — reading files, writing code, running bash commands, spawning subagents. This is where CLAUDE.md, skills, hooks and the Task tool live. The most powerful Claude surface for developers.

**Claude API**
Direct programmatic access to Claude models. No interface — raw input/output. Used to build applications, pipelines and integrations on top of Claude. Gives full control over the system prompt, model choice, tool definitions and context management. RAG pipelines, memory frameworks and custom agents all go through the API.

**Claude in Chrome, Excel, PowerPoint**
Beta products that embed Claude as an agent inside specific tools — browsing, spreadsheets and slides respectively. Purpose-built for non-developer workflows.

**Cowork**
A desktop tool for non-developers to automate file and task management using Claude.

---

## Model Tiers

Claude models are organized into tiers balancing capability and cost:

| Tier | Current Models | Best For |
|---|---|---|
| **Opus** | claude-opus-4-6 | Most complex reasoning, highest capability |
| **Sonnet** | claude-sonnet-4-6 | Balanced — strong capability at reasonable cost |
| **Haiku** | claude-haiku-4-5 | Fast, lightweight, high-volume tasks |

In Claude Code, the model used is configured in your environment. Via the API, you specify the model string per request.

---

## Which Surface for Which Use Case

| Use Case | Surface |
|---|---|
| Learning, research, writing, conversation | claude.ai |
| Autonomous coding, refactoring, agentic dev workflows | Claude Code CLI |
| Building apps and pipelines on top of Claude | API |
| Non-developer workflow automation | Cowork |
