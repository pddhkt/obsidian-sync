---
title: Defer Panic and Recover
tags:
  - go
  - fundamentals
level: beginner
duration: 5-min
---

# Defer Panic and Recover

## Goal

Understand cleanup and why Go does not use exceptions for normal errors.

## React Developer Mental Model

`defer` is like saying "run this cleanup before the function exits." It is often used for closing files, response bodies, or database rows.

## Syntax

```go
func run() {
	defer fmt.Println("cleanup")
	fmt.Println("working")
}
```

Output:

```text
working
cleanup
```

## Panic

`panic` crashes the current flow. Use it for truly unexpected programmer errors, not normal validation.

```go
panic("missing required config")
```

## Recover

`recover` can catch a panic inside a deferred function, but most beginner code should avoid it.

## Common Mistake

Do not use `panic` like JavaScript `throw` for normal API errors. Return `error` instead.

## 5-Min Practice

Write a function that prints `open file`, defers `close file`, then prints `read file`.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[../02 Data Structures/00 Module Overview]].

