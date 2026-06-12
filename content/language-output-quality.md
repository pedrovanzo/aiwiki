# Language & Output Quality

*How language choice affects model output quality, and what that means for non-English workflows.*

## Is There a Significant Difference Between English and Portuguese?

Yes, but smaller than most people assume for Brazilian Portuguese specifically. Portuguese is a major world language with strong online presence, so it is well-represented in training data. The gap is most visible in:

- Highly specific technical topics (obscure libraries, cutting-edge research, new frameworks)
- Nuanced reasoning chains where precise word choice matters
- Prompt engineering — the instruction layer benefits from English precision

For general tasks, conversation, and moderate-complexity coding the gap is small.

## What Kind of Difference to Expect

The degradation is not in reasoning capability — the model is the same. What changes is:

- Slightly less precise outputs on highly technical topics due to thinner Portuguese training signal for those domains
- More generic phrasing on topics where Portuguese technical vocabulary maps loosely to English concepts
- No difference in instruction following, general intelligence or code generation quality

Think of it as Claude having a slightly thinner reference library for that specific domain in that language — not a weaker Claude.

## Mixing Languages Mid-Session

Claude handles language switching remarkably well:
- Detects the shift and follows along naturally
- Maintains full context continuity across the language boundary
- Defaults to responding in whichever language your most recent message used
- Code stays in English regardless of the conversation language

The main edge case to watch: switching to Portuguese mid-way through a complex technical reasoning chain may slightly reduce precision on terms with no clean Portuguese equivalent. Claude will typically use the English term anyway in those cases.

## Writing Skills for Multilingual Teams

The recommended pattern is to separate the instruction layer from the output layer:

- Write skills, CLAUDE.md, hooks and all system-level artifacts in **English** — better precision, easier to maintain, more aligned with Claude's strongest instruction-following register
- Let output language be determined by the user's input naturally
- Add one explicit line to skills consumed by non-English speakers: *"Always respond in the same language the user writes in"*

This works because Claude processes skill instructions as directives (instruction layer) independently from the user's input language (execution layer). A Portuguese-speaking user triggers an English-written skill and receives a Portuguese response with no loss.
