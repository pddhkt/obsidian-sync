---
title: Mutexes and Shared State
tags:
  - go
  - concurrency
  - mutex
level: advanced
duration: 5-min
---

# Mutexes and Shared State

## Goal

Protect shared state in concurrent code.

## React Developer Mental Model

In React you usually avoid shared mutable state. In Go backend code, shared state can exist, but concurrent access must be protected.

## Syntax

```go
type Counter struct {
	mu    sync.Mutex
	value int
}

func (c *Counter) Inc() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.value++
}
```

## Read Method

```go
func (c *Counter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.value
}
```

## Common Mistake

Do not copy a struct that contains a mutex after it is used.

## 5-Min Practice

Protect an in-memory task map with `sync.Mutex`.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[../07 Web Backend Go/00 Module Overview]].

