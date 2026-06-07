# Skills

A skill is a structured prompt file (typically a markdown file with a SKILL.md name) that encodes how Claude should perform a specific recurring task. Skills are Claude Code's mechanism for reusable, composable behavior.

## What a Skill Contains

- A description of when the skill should activate (the trigger)
- Step-by-step instructions for how to perform the task
- Constraints, conventions and acceptance criteria
- Optionally: references to other files, tools or subagents to use

## What Skills Are in Memory Terms

Skills are **procedural memory** — they encode a procedure. When a skill is loaded into context, it becomes part of working memory for that task execution.

## How Skills Are Triggered

- Explicitly by you in a prompt ("use the refactor skill on this file")
- By CLAUDE.md instructions ("always use the test-runner skill after editing")
- By Claude recognizing a pattern that matches the skill's description
- By a hook firing and loading the skill as part of its action

## Skills vs CLAUDE.md

| Property | CLAUDE.md | Skill |
|---|---|---|
| Scope | Entire session | Specific task |
| Always loaded | Yes | Only when triggered |
| Purpose | General behavior rules | Specific task procedure |
| Granularity | Broad | Focused |

## Skills and Multilingual Teams

Skills written in English work seamlessly for Portuguese-speaking users. The skill is the instruction layer (processed by Claude in English) and the user input is the execution layer (processed in whatever language the user writes in). Adding the line "Always respond in the same language the user writes in" to any skill removes ambiguity entirely.
