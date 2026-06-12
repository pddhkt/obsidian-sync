---
title: Memory Escape and Allocation
tags:
  - go
  - memory
  - performance
level: advanced
duration: 5-min
---

# Memory Escape and Allocation

## Goal

Understand stack, heap, and escape analysis at a high level.

## React Developer Mental Model

JavaScript hides most memory details. Go manages memory for you too, but performance work may require knowing when values allocate.

## Core Concept

The compiler decides whether a value can live on the stack or must escape to the heap.

Check escape decisions:

```bash
go build -gcflags="-m" ./...
```

## Example

```go
func NewTask(title string) *Task {
	return &Task{Title: title}
}
```

Returning a pointer may cause the value to escape.

## Common Mistake

Do not manually optimize allocations before you have a measured problem.

## 5-Min Practice

Run escape analysis on your project and read only the lines mentioning your code.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[02 Profiling]].

