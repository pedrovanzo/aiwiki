# Subagents

A subagent is a separate model inference call (or series of calls) that runs with its own isolated context window, is initiated and orchestrated by a parent agent, receives only explicitly passed context, and returns a result back to the parent.

---

## The Core Mental Model

A subagent is best understood as a **single-purpose autonomous session with no interactivity and a defined exit point.**

Contrast with a regular session:
- A session (like a chat conversation) is interactive — back and forth, stateful over time, user-driven
- A subagent is non-interactive — it receives a job, runs to completion autonomously, and returns a result. No back and forth. No user input mid-execution.

```
Main Agent (your conversation)
│
├── has full context of your chat
│
└── spawns subagent
    ├── receives only what parent explicitly sends
    ├── runs independently (can read files, run code, use tools)
    └── returns result → parent incorporates it
```

---

## Key Technical Properties

| Property | Value |
|---|---|
| **Isolation** | Own context window, no shared memory with parent |
| **Lifecycle** | Ephemeral — created for a task, destroyed after |
| **Interface** | Input prompt + optional context in, text result out |
| **Tool access** | Has its own tool calls (Read, Write, Bash, etc.) |
| **Statefulness** | Stateless — no memory persists after it returns |
| **Interactivity** | None — runs to completion without user input |

---

## Token Cost

Each subagent has its own independent token count billed separately from the parent:
- **Input tokens:** everything the parent passes to the subagent (task description + any context)
- **Output tokens:** the result the subagent returns to the parent

If the parent passes 5k tokens of context and the subagent produces 2k tokens of output, that is 7k tokens billed for that subagent invocation — on top of whatever the parent context costs. This makes it important to be intentional about what you pass into a subagent.

---

## The Task Tool

In Claude Code CLI, subagents are spawned via the **Task tool** — an internal tool Claude has available during agentic execution, alongside Read, Write, Bash and others.

**Key facts about the Task tool:**
- It is not a user-facing feature — Claude calls it, not you
- It exists exclusively in Claude Code CLI — not in claude.ai, not in the raw API
- When Claude invokes it, you see it in the terminal output as Claude works
- You never write `Task(...)` yourself

What it looks like in the terminal when Claude spawns a subagent:

```
→ Task("Refactor auth.ts to use the new middleware pattern")
  └─ Subagent started...
     └─ Subagent reading: src/auth.ts
     └─ Subagent writing: src/auth.ts
     └─ Subagent complete: "Refactored auth.ts, changed 3 functions..."
← Result received by main agent
```

---

## What Triggers a Subagent

You do not call subagents directly. You influence whether and how Claude uses them through:

| Trigger | How it works |
|---|---|
| **Natural language request** | Asking Claude to parallelize or delegate hints it toward subagent use |
| **CLAUDE.md instructions** | Instruct Claude to always use subagents for certain patterns |
| **Skills** | A skill can include instructions like "use a subagent for the test execution step" |
| **Hooks** | A hook can programmatically trigger a subagent as part of a pre/post-tool action |
| **Orchestrator pattern** | An outer agent whose only job is to spawn and coordinate multiple subagents |

---

## The Power of Subagents — Parallelism and Isolation

The primary value of subagents is running multiple tasks simultaneously without their contexts interfering with each other, and without bloating the main context window.

Example: instead of one Claude instance sequentially refactoring five files, the parent spawns five subagents that each refactor one file in parallel. The parent collects all five results and assembles the final output. Wall-clock time drops from the sum of all tasks to the duration of the longest single task.

---

## Error Handling

Subagents have no built-in error handling contract. When a subagent hits an unexpected error:

1. It encounters the error (network failure, unexpected API response, missing file)
2. It attempts to reason about it and recover if a plausible path exists
3. If it cannot recover, it returns the failure as its result to the parent
4. The **parent** is then responsible for deciding what to do — retry, skip, or escalate

**The critical risk — silent failures:** The dangerous scenario is when the subagent does not recognize it failed. For example, an API returns 200 with an error payload in the body. The subagent misreads it as success and returns a result that looks valid but is wrong. The parent has no way to detect this.

**Defensive prompting pattern** to force loud, detectable failures:

```
Call GET /api/users.
If the response status is not 200, return FAILED:<status>:<body>.
If the response body does not contain a "users" array, return FAILED:unexpected_shape.
Only return SUCCESS:<data> if both conditions pass.
```

This gives the parent a reliable signal to detect and handle failures rather than silently propagating bad data.

---

## Can Subagents Run Skills?

Yes. Since skills are structured prompt files, a subagent can be instructed to read and follow a skill just like the main agent. The parent typically passes the skill path or its contents explicitly as part of the context handed to the subagent.

---

## Subagents vs Sessions vs Standard LLM Calls

| Property | Standard LLM Call | Session (chat) | Subagent |
|---|---|---|---|
| Initiated by | User | User | Parent agent |
| Interactive | Single turn | Yes | No |
| Context | Fresh each call | Accumulated | Explicitly passed |
| Lifecycle | Instant | Open-ended | Task-scoped |
| Memory after | None | Session history | None |
| Tool access | Depends | Depends | Yes (in Claude Code) |
