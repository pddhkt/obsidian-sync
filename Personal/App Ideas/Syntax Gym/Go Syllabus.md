---
type: syllabus
project: Syntax Gym
language: go
status: draft-for-review
created: 2026-06-13
---

# Go Track — Syllabus (draft for review)

> [!abstract] What this is
> The full lesson map for the Go track, from zero to interview-ready. **Language mastery only** — no DS&A (that stays on LeetCode, decision #10). Every lesson is **learn→do interleaved** (decision #14): concept cards teach, exercises drill exactly what was taught. Ordering is a strict ramp — each lesson only uses what earlier ones established.
>
> Review this, cut/reorder/rename freely, then I author lessons stage by stage in the repo (`content/go/<unit>/`).

## How to read the tables

- **⭐ count** = interview weight for Go specifically (⭐⭐⭐ = classic trick-question territory, ⭐ = nice-to-have).
- **Status**: ✅ live · ♻️ exists but pre-dates learn cards, needs reformat · ☐ to author.
- Each lesson ≈ 3 learn cards + 3–4 exercises (~6–7 items), 5–10 min.

---

## Stage 1 — Getting Started
*The edit-compile-run loop and the absolute basics. Low interview weight, non-negotiable prerequisite.*

| # | Lesson | Teaches | Interview hook | Status |
|---|---|---|---|---|
| 1.1 | Hello, Go | `package main`, `Println`, `:=` vs `var`, type inference | unused var/import = compile error | ✅ |
| 1.2 | Functions & if | type-after-name, multiple returns, mandatory braces | `q, r := divmod()` multi-return | ✅ |
| 1.3 | Numbers, strings & conversion | int/float/string/bool, **no implicit conversion**, `strconv` | ⭐ `7/2 == 3` (int division); can't add `int + float64` | ✅ |
| 1.4 | Constants & `iota` | `const`, untyped constants, `iota` enums | iota auto-increment patterns | ✅ |
| 1.5 | Loops: the only `for` | 3 forms (C-style, while-style, infinite), `break`/`continue`, range | ⭐ Go has no `while`/`do` — just `for` | ✅ |

## Stage 2 — Collections
*Where Go's value-vs-reference model starts biting. High interview density.*

| # | Lesson | Teaches | Interview hook | Status |
|---|---|---|---|---|
| 2.1 | Arrays vs slices | fixed arrays are **values** (copied), slices are views | ⭐⭐ passing an array to a func copies it | ☐ |
| 2.2 | Slice internals: len, cap, backing array | `len` vs `cap`, nil slice, slicing aliases shared memory | ⭐⭐⭐ `b := a[:2]; append` overwrites `a` | ♻️ |
| 2.3 | append, copy & growth | reallocation, the `s = append(s,…)` rule, `copy` | ⭐⭐⭐ append shares *or* copies depending on spare cap | ♻️ |
| 2.4 | Maps & the comma-ok idiom | `make`, **nil map write panics**, `v, ok :=`, `delete`, random order | ⭐⭐ nil map read ok / write panics; iteration order randomized | ☐ |
| 2.5 | Strings, bytes & runes | immutable byte sequences, `range` yields runes, UTF-8 | ⭐⭐ `len("héllo")` is bytes, not characters | ☐ |

## Stage 3 — Types & Methods
*Building your own types. Contains the single most-asked Go interview topic (3.3).*

| # | Lesson | Teaches | Interview hook | Status |
|---|---|---|---|---|
| 3.1 | Structs & composite literals | definition, field access, struct comparison, anonymous structs | structs are comparable if fields are | ☐ |
| 3.2 | Pointers | `&`/`*`, **no pointer arithmetic**, nil, auto-deref on struct fields | ⭐ why Go pointers are "safe" | ☐ |
| 3.3 | Methods: value vs pointer receivers | receiver copies vs mutation, method sets | ⭐⭐⭐ value receiver can't mutate; when each is required | ☐ |
| 3.4 | Embedding & composition | struct embedding, promoted methods, **no inheritance** | ⭐ composition-over-inheritance, the Go way | ☐ |

## Stage 4 — Interfaces
*Go's polymorphism. The nil-interface gotcha (4.3) is a notorious filter question.*

| # | Lesson | Teaches | Interview hook | Status |
|---|---|---|---|---|
| 4.1 | Interfaces & implicit satisfaction | no `implements` keyword, structural satisfaction, "accept interfaces, return structs" | ⭐⭐ duck typing, checked at compile time | ☐ |
| 4.2 | Type assertions & type switches | `x.(T)`, comma-ok, `switch v := x.(type)` | ⭐⭐ safe assertion vs panic | ☐ |
| 4.3 | The nil interface gotcha | interface = **(type, value)** pair | ⭐⭐⭐ a nil `*T` inside an interface is **not** `== nil` | ☐ |

## Stage 5 — Errors & Control Flow
*Idiomatic error handling and the defer/panic/recover trio.*

| # | Lesson | Teaches | Interview hook | Status |
|---|---|---|---|---|
| 5.1 | The error interface | errors are values, `if err != nil`, `fmt.Errorf` | ⭐⭐ why Go has no exceptions | ☐ |
| 5.2 | Wrapping & inspection | `%w`, `errors.Is`, `errors.As`, sentinel & custom errors | ⭐⭐ unwrap chains | ☐ |
| 5.3 | defer, panic, recover | `defer` LIFO order, **args evaluated at defer time**, `recover` | ⭐⭐⭐ `defer` argument-evaluation timing | ☐ |

## Stage 6 — Concurrency
*The biggest Go interview surface area. Five lessons because it earns them.*

| # | Lesson | Teaches | Interview hook | Status |
|---|---|---|---|---|
| 6.1 | Goroutines & WaitGroups | `go`, `sync.WaitGroup`, the loop-variable capture trap | ⭐⭐⭐ loop var capture (and the Go 1.22 change) | ☐ |
| 6.2 | Channels | unbuffered (sync) vs buffered, `close`, `range`, directions | ⭐⭐⭐ send-on-closed panics; recv-from-closed gives zero | ☐ |
| 6.3 | `select` & timeouts | multiplexing, `default` (non-blocking), `time.After` | ⭐⭐ the timeout pattern | ☐ |
| 6.4 | Mutexes, sync & the race detector | `sync.Mutex`/`RWMutex`/`Once`, `-race` | ⭐⭐ never copy a mutex; channels vs mutexes | ☐ |
| 6.5 | Concurrency patterns | worker pool, fan-out/fan-in, `context` cancellation | ⭐⭐ context propagation | ☐ |

## Stage 7 — Polish & Advanced
*Interview-finishing touches and modern Go.*

| # | Lesson | Teaches | Interview hook | Status |
|---|---|---|---|---|
| 7.1 | Zero values & initialization | zero-value table, **`new` vs `make`**, composite literals | ⭐⭐ `new(T)` vs `make` for slice/map/chan | ☐ |
| 7.2 | Generics | type parameters, constraints, `comparable`/`any` | ⭐ when generics help vs interfaces | ☐ |
| 7.3 | stdlib essentials | `fmt` verbs (`%v %+v %T`), `slices`/`maps` pkgs, `sort`, `encoding/json` + struct tags | ⭐ JSON marshalling & tags | ☐ |
| 7.4 | Idioms & gotcha grab-bag | naming conventions, named returns, comma-ok family, `gofmt` | reads-like-Go polish | ☐ |

---

## Interview fast-track

If the goal is "ready for a Go interview fastest," these ~10 lessons (plus Stage 1 as prerequisite) carry the most weight. Could be a marked path through the track, or just author order:

> 2.2 · 2.3 · 2.4 · 2.5 · 3.3 · 4.3 · 5.3 · 6.1 · 6.2 · 6.4

## Counts & status

- **28 lessons / 7 stages.** ~6–7 items each ≈ 170–190 authored items total.
- Live now: **5** — all of Stage 1 (1.1–1.5). Need reformat to learn-card style: **2** (2.2, 2.3).
- To author from scratch: **21**.

## Open review questions
- [ ] **Scope** — keep all 28, or trim? (Candidates to cut/merge if you want leaner: 1.4 iota, 7.4 grab-bag, maybe fold 7.1 earlier.)
- [ ] **Author order** — linear (1.1→7.4) or interview-fast-track first? I lean **linear through Stage 3, then jump to the fast-track** so foundations are solid before cherry-picking.
- [ ] **Generics (7.2)** — in or out for v1? Rising in real codebases, lighter in interviews.
- [ ] **Reformat 2.2/2.3 now** or leave until we reach Stage 2 in author order?
- [ ] **File naming** — adopt consistent `go-<unit>-NN` ids (rename existing `go-basics-*`, `go-slices-*`)? Cheap now, churn later.

## Log
- 2026-06-13 drafted full 7-stage syllabus for review
- 2026-06-13 authored Stage 1 in full (1.3 conversion, 1.4 constants/iota, 1.5 loops) — Getting Started complete, 5 lessons live; all snippets runner-verified
