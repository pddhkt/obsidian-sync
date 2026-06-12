---
title: Race Detector
tags:
  - go
  - concurrency
  - testing
level: intermediate
duration: 5-min
---

# Race Detector

## Goal

Detect unsafe concurrent memory access.

## React Developer Mental Model

Frontend state bugs are often timing bugs. Go has real parallel execution, so shared memory can race.

## Command

```bash
go test -race ./...
```

## Example Risk

```go
var count int

go func() {
	count++
}()

go func() {
	count++
}()
```

Two goroutines can write `count` at the same time.

## Fix Direction

Use a mutex, channel, or avoid shared mutable state.

## Common Mistake

Passing normal tests does not prove concurrent code is safe. Use `-race` when goroutines are involved.

## 5-Min Practice

Run `go test -race ./...` after you add any goroutine-based code.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[Learn/Dev/Tech/Go/06 Concurrency/00 Module Overview]].

