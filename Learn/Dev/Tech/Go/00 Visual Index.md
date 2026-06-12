---
title: Go Visual Index
tags:
  - go
  - visual-learning
  - memory
level: beginner-to-advanced
---

# Go Visual Index

Use this note as a quick visual review before coding. The diagrams are embedded in the lesson notes, and the prompt bank is in [[go-visual-prompts]].

## Core Mental Models

| Concept | Lesson | Visual Memory |
|---|---|---|
| Go project shape | [[02 Go Project Mental Model]] | module contains packages |
| package and main | [[03 Packages Imports and Main]] | executable entry point |
| slice | [[01 Arrays and Slices]] | window over backing array |
| map lookup | [[02 Maps]] | key, value, ok |
| struct | [[04 Structs]] | fixed shape data model |
| pointer | [[05 Pointers]] | address pointing to value |
| JSON tags | [[06 JSON Tags]] | Go field to React JSON name |
| interface | [[02 Interfaces Are Implicit]] | method shape plug |
| errors | [[01 Error Values]] | value path plus error path |
| context | [[05 Context for Request Lifetimes]] | cancellation signal through request |
| test flow | [[03 Table Tests]] | many cases, one test |
| goroutine | [[01 Goroutines]] | independent lightweight worker |
| channel | [[03 Channels]] | typed pipe between workers |
| HTTP request | [[01 Net HTTP Server]] | request to mux to handler to response |
| JSON API | [[03 JSON Requests and Responses]] | React fetch to Go decode and encode |
| middleware | [[04 Middleware]] | wrapper around handler |
| CORS | [[08 CORS for React]] | browser origin check |
| project layout | [[05 Idiomatic Project Layout]] | command, internal packages, module |

## When to Generate Bitmap Images

Generate real image assets for memory-heavy ideas:

- slice as a window over a backing array
- pointer as an address label pointing at a value
- interface as a socket that accepts any matching plug
- goroutines as small workers
- channel as a typed conveyor belt
- context as a cancellation signal flowing through the request
- HTTP backend flow from React to Go and back

Keep generated images small and consistent. Save them in `_assets/images/` and embed them from the lesson.

