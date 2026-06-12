# What is Agentic AI

*AI systems that plan, decide, and act across multi-step tasks with minimal human intervention.*

Agentic AI refers to AI systems that go beyond single-turn question-and-answer interactions. An agentic system can plan, make decisions, use tools, and execute multi-step tasks autonomously — with minimal or no human intervention at each step.

## What Makes an AI System "Agentic"

Four properties define an agentic system:

**Autonomy** — The system decides what to do next based on its current state and goal, without requiring a human prompt at every step.

**Tool Use** — The agent can call external tools: read and write files, run code, query databases, call APIs, search the web, or spawn other agents.

**Multi-Step Reasoning** — The agent breaks a goal into steps, executes them in sequence (or in parallel), evaluates intermediate results, and adjusts its plan accordingly.

**Memory** — The agent retains information across steps and sessions to inform future decisions. Without memory, an agent resets to zero after every interaction.

## Agentic AI vs Standard LLM Usage

| Property | Standard LLM | Agentic AI |
|---|---|---|
| Interaction model | Single turn: one prompt, one response | Multi-turn: goal → plan → execute → evaluate → continue |
| Tool access | None (text in, text out) | Files, APIs, code execution, other agents |
| Memory | Context window only | Working + semantic + episodic + procedural |
| Human involvement | Every turn | At goal-setting only (or not at all) |
| Duration | Seconds | Minutes, hours or days |

## Where Claude Fits

Claude can operate as both a standard LLM (as in this conversation) and as an agentic system (via Claude Code CLI). In agentic mode, Claude has access to tools like file read/write, bash execution, and subagent spawning — enabling it to autonomously execute complex, multi-step development workflows.
