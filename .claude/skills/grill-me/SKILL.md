---
name: grill-me
description: Interview the user relentlessly about a plan, design, or idea until reaching shared understanding, checkpointing resolved decisions into vault notes as you go so long chats never lose progress. Use whenever the user says "grill me", "stress-test this plan/idea", "interview me about", "challenge this design", "幫我諗清楚", drops a new app/business/feature idea and wants to think it through, or wants to resolve open questions on an existing project. Also use to resume a previous grill session ("continue grilling", "pick up where we left off on X").
---

# Grill Me — Interview with Checkpoints

Interview the user relentlessly about every aspect of their plan or idea until you reach shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one by one. The twist over a plain interview: this vault is a second brain, so resolved decisions get written into a note *during* the conversation, not only at the end — a long chat that compacts or dies should never lose what was already decided.

## Step 0 — Set up the checkpoint note first

Before asking the first question:

1. Identify the topic and which project it belongs to. Use the vault map in the root `CLAUDE.md` to pick the location:
   - Imarflex work → `Imarflex/decisions/<topic>.md`
   - CTINT work → `ctint/<project>/<topic>.md`
   - New personal idea → `Personal/App Ideas/<Idea Name>/<Idea Name>.md` (create the folder)
   - Existing personal project → its folder (e.g. `Personal/Personal Website/`)
   - If genuinely ambiguous, ask — it's the first interview question.
2. Check for an existing grill note on this topic (`Grep` for the topic, look for `type: grill-session`). If found, read it, summarize its state back to the user, and continue from its open questions instead of starting over.
3. Otherwise create the note immediately from the template below, status `in-progress`. Tell the user where it lives.

## The interview

- Ask **one question at a time**. With each question, give your own recommended answer and why — the user reacts faster to a concrete position than a blank prompt.
- When a question has a few clear options, use AskUserQuestion with your recommendation as the first option; otherwise ask in plain text.
- If a question can be answered by exploring the vault or a codebase, explore instead of asking. Don't spend the user's attention on facts you can look up.
- Track the decision tree explicitly: when an answer opens new branches, note them in the checkpoint note's **Open questions** before moving on, so nothing is silently dropped. Resolve dependencies in order — don't ask about details whose premise is still undecided.
- Push back. If an answer conflicts with an earlier one, or with something written in the vault, say so and resolve the conflict — that's the point of being grilled.

## Checkpointing

Update the note whenever **either** happens:

- a branch of the decision tree is fully resolved, or
- ~4–5 questions have been answered since the last checkpoint (even if mid-branch — partial state beats no state).

A checkpoint means: move resolved items into the **Decisions** table (with rationale, not just the choice), refresh **Open questions**, and append one line to the **Log**. Then tell the user in one short line, e.g. "Checkpointed 3 decisions to `Imarflex/decisions/pricing-model.md`." Don't make a ceremony of it; the interview keeps moving.

If the user changes their mind about a recorded decision, update the table row and note the reversal in the Log — the history of changed minds is often the most useful part later.

## Wrap-up

When all branches are resolved (or the user stops):

1. Final checkpoint. Set status to `resolved` (or `parked` if stopped early) and write the **Summary** — the shared understanding in a few sentences, plus next actions.
2. Link related vault notes with wikilinks, and add a link to this note in the project's `_index.md` if one exists.

## Note template

```markdown
---
type: grill-session
project: <project name>
status: in-progress | resolved | parked
created: <YYYY-MM-DD>
---

# <Topic> — Grill Session

## Summary
(written at wrap-up)

## Decisions
| # | Question | Decision | Rationale |
|---|---|---|---|

## Open questions
- [ ] ...

## Log
- <YYYY-MM-DD> session start
```
