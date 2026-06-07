# The Task Tool

The Task tool is the internal Claude Code mechanism for spawning subagents. It is not a user-facing feature — it is a tool Claude calls autonomously during agentic execution, the same way it calls Read, Write or Bash.

## Key Facts

- Exists exclusively in Claude Code CLI — not available in claude.ai or the raw API
- Claude calls it, not the user
- Each Task invocation spawns a subagent with its own isolated context window
- The parent passes context explicitly; the subagent receives only what it is given
- The subagent runs to completion and returns a result to the parent

## What It Looks Like in the Terminal

```
→ Task("Refactor auth.ts to use the new middleware pattern")
  └─ Subagent started...
     └─ Subagent reading: src/auth.ts
     └─ Subagent writing: src/auth.ts
     └─ Subagent complete: "Refactored auth.ts, changed 3 functions..."
← Result received by main agent
```

## How You Influence Task Usage

You cannot call Task directly. You influence it through:
- Natural language ("work on these five files in parallel")
- CLAUDE.md instructions ("always use subagents for test execution")
- Skills that include subagent delegation steps
- Hooks that trigger subagent spawning on specific events

For a full technical breakdown of subagents and the Task tool, see [Subagents](/topics/subagents).
