---
type: retention-direction
project: Pet Social Vlog
mechanic: social-loop
status: direction
tags:
  - pet-app
  - retention
  - social
---

# Social Loop — Leaderboards, Groups, FOMO

The loop that pulls users back because *someone else did something*. Operates on days-to-weeks.

> [!warning] Cold-start
> The social loop is the strongest retention engine in this product **once it has critical mass**. But it does nothing on day 1. Plan growth so friends arrive together.

---

## Leaderboards

The [[../features/friends-walking-chart|friends walking chart]] is the headline social mechanic.

### Why leaderboards work

- **Social comparison** — humans involuntarily compare themselves to peers.
- **Loss aversion** — dropping from #2 to #4 hurts more than climbing from #4 to #2 feels good.
- **Visible, persistent** — unlike a one-shot like, a leaderboard position lingers.

### Design choices

- **Small N, not global.** Limit to friends/group (5–20 people). A global leaderboard is meaningless to anyone outside the top 100.
- **Multiple periods.** Daily, weekly, monthly, all-time. So users who can't compete on volume can still win "longest walk today."
- **Multiple metrics.** Distance, walks-per-week, longest-single-walk, most-photos. Different users dominate different boards = more wins to go around.
- **Pet avatars over user avatars.** It's the pet's leaderboard, not the owner's. Feels less like ego competition.

### Anti-patterns

- ❌ Public global ranking — meaningless and discouraging.
- ❌ "You dropped from #2 to #3" notification — punishment without recourse.
- ✅ "You're 0.8km from passing Biscuit this week" — actionable, near-peer.

---

## Group challenges

A group of friends agrees on a collective target. Everyone's walks count.

### Examples

- **Walk 100km together this month** — pooled distance.
- **Everyone walks 3 times this week** — completion, not distance.
- **Park sticker hunt** — group collects unique parks.
- **Halloween costume challenge** — themed, time-boxed.

### Why this works

- **Shared goal** — your walk benefits the group, not just you. Reduces selfish-skip behaviour.
- **Social accountability** — you're letting friends down by skipping, not just yourself.
- **Recurring** — a new challenge every month = fresh hook.

### Mechanics

- Anyone in the group can propose a challenge.
- 2/3 must accept to start it.
- Progress bar visible to all members.
- Group recap video at the end (re-uses [[../features/auto-vlog-export|auto-vlog]] but multi-pet).

---

## Friend activity feed

Not a public discovery feed (cold-start trap). A **friend-only** chronological feed.

- "Mochi walked 3.2km this morning" → tap → see route + photos.
- React with paw / treat / heart (cheap, low-friction).
- Comment thread per activity.
- **No algorithmic ranking in MVP** — chronological only. Algorithms are expensive to get right and breed manipulation.

---

## Reciprocity loops

People walk more when their friends walk. Surface that:

- **"Your 5 closest friends walked X km this week. You walked Y."**
- **"Biscuit and Mochi walked together yesterday."** (Co-location detection — opt-in.)
- **Pet playdate matching** — friends who walked in the same park at the same time get a "you crossed paths" card.

---

## Group-only "rooms"

For close friend circles (3–10 people) — a private space:

- Shared timeline.
- Shared map showing everyone's walks for the week.
- Group chat tied to walks ("nice route" attached to a specific walk).
- Group leaderboard separate from the global friend leaderboard.

Mirrors how Strava clubs / Discord servers / WhatsApp groups work — small, intimate, sticky.

---

## Dog walker reciprocity (later)

If [[../features/dog-walker-mode]] ships:

- A user walking a friend's dog counts toward shared totals.
- Multi-pet walks (group walks with multiple dogs) feed multiple leaderboards.
- Creates real-world co-located behaviour, not just app-mediated.

---

## What I'd ship in v1.1 (post-MVP)

1. **Friend invites via contacts + QR.**
2. **Small-N leaderboard** (friends + groups).
3. **One concurrent group challenge per group.**
4. **Chronological friend activity feed.**
5. **Paw / treat / heart reactions.**

Hold public discovery, algorithmic ranking, and playdate matching for v2.

---

## See also

- [[1-hook-model]]
- [[2-daily-loop]] — the daily mechanics that *feed* the social loop with content
- [[4-progression-loop]] — group challenges intersect with progression
- [[5-ethical-guardrails]] — leaderboards have real dark sides
- [[../features/friends-walking-chart]]
- [[../features/social-sharing]]
