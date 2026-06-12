---
title: WaitGroups
tags:
  - go
  - concurrency
level: advanced
duration: 5-min
---

# WaitGroups

## Goal

Wait for multiple goroutines to finish.

## React Developer Mental Model

A `sync.WaitGroup` is closer to waiting for several async jobs, but it does not collect return values.

## Syntax

```go
var wg sync.WaitGroup

for i := 0; i < 3; i++ {
	wg.Add(1)
	go func(id int) {
		defer wg.Done()
		fmt.Println("worker", id)
	}(i)
}

wg.Wait()
```

## Common Mistake

Call `wg.Add(1)` before starting the goroutine.

## 5-Min Practice

Start three workers that print task IDs, then wait for all workers to finish.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[03 Channels]].

