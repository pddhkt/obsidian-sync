---
title: Worker Queue
tags:
  - go
  - project
  - concurrency
level: advanced
duration: 5-min
---

# Worker Queue

## Goal

Process background jobs with goroutines and channels.

## Real-World Case

When a task is created, the API can enqueue an event:

- send notification
- sync search index
- write audit log

## Concepts Used

- goroutines
- channels
- select
- context cancellation
- wait groups

## Simple Shape

```go
type Job struct {
	Type string
	Task Task
}
```

## Practice

Create a worker that reads jobs from a channel and logs each job.

## Done When

The API can enqueue jobs without blocking request handling for a long time.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[04 React and Go Full Stack]].

