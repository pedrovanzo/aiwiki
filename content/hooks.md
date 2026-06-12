# Hooks

*Event-driven triggers that attach behavior to Claude's tool calls without modifying prompts or skills.*

Hooks are event-driven triggers that fire automatically before or after specific tool calls in Claude Code. They allow you to attach behavior to Claude's actions without modifying the prompts or skills themselves.

## How Hooks Work

You define a hook by specifying:
1. **The event** — which tool call triggers it (e.g. before Write, after Bash)
2. **The action** — what runs when the event fires (a script, a command, a skill load)

## Common Hook Use Cases

- Run a linter automatically after every file write
- Log all bash commands Claude executes to an audit file
- Trigger a test suite after Claude edits a component
- Load a specific skill before Claude starts a particular type of task
- Block certain actions (e.g. prevent writes to protected directories)

## What Hooks Are in Memory Terms

Hooks are **procedural memory** at the meta level — they encode rules about how Claude's own actions should be governed, rather than how a specific task should be performed.

## Hooks vs CLAUDE.md vs Skills

| Property | CLAUDE.md | Skill | Hook |
|---|---|---|---|
| Trigger | Session start | Explicit or pattern | Tool call event |
| Purpose | Standing rules | Task procedure | Action governance |
| Runs | Always | When triggered | On specific events |
| Controls | Claude's behavior | How a task is done | What happens around tool calls |
