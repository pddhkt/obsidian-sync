# Reflection — eval-0-multi-q-followup (with skill)

## What was hard

The three incoming questions span different abstraction levels — A1 (concrete feature: RBAC), A2 (concrete feature: PDF uploads on PDP), A3 (strategic / multi-layer: cross-border to Macau). A3 in particular needed the honest scope-splitting pattern: what the architecture already supports vs what's an operational / partner problem. Easy to over-promise.

## What the skill helped with

Massive lift. The skill gave me:
- The frontmatter + body skeleton verbatim, so no decisions to make about structure.
- The anti-pattern table prevented several drafts I'd otherwise have written (e.g. I almost added "建議下一步" subsections per Q; the skill explicitly bans them in favour of the bottom 確認 list; I almost wrote a self-flagellating intro about A3 complexity).
- Voice phrases (「坦白講」, 「唔係我哋強項」, 「想 confirm 一樣嘢」) were directly applicable to A3's cross-border honest framing and A1/A2/A3 ask-backs.
- The PDF pipeline ran first-try with the exact commands in the skill — no debugging.

## Where the skill felt unclear

- Page-count heuristic ("5–8 pages") is calibrated for ~5–7 questions; a 3-question reply lands at 4 pages legitimately. Worth noting the range scales with question count.
- The `AskUserQuestion` guidance is good but the instructions told me to skip it as a subagent — having to silently pick angles for "soft-cap" decisions (e.g. whether to enable Macau pre-emptively or wait) felt like a place a real session would pause. Noted in the 確認 list at the bottom.
- File naming convention assumes work happens in `Imarflex/`; here I had to redirect to a workspace dir, which broke the wikilink/`related:` pointer convention slightly.
