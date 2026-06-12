---
title: Select Timeouts and Cancellation
tags:
  - go
  - concurrency
  - context
level: advanced
duration: 5-min
---

# Select Timeouts and Cancellation

## Goal

Wait on multiple channel operations.

## React Developer Mental Model

`select` is a control flow statement for channels. It is useful for timeouts, cancellation, and receiving from whichever channel is ready first.

## Syntax

```go
select {
case job := <-jobs:
	fmt.Println("got job", job)
case <-time.After(2 * time.Second):
	fmt.Println("timeout")
}
```

## With Context

```go
select {
case <-ctx.Done():
	return ctx.Err()
case jobs <- task:
	return nil
}
```

## Common Mistake

Do not use `time.After` inside a hot loop without understanding allocation cost. For simple learning examples it is fine.

## 5-Min Practice

Write a worker that exits when `ctx.Done()` is closed.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[05 Mutexes and Shared State]].

