---
title: Functions and Return Values
tags:
  - go
  - functions
level: beginner
duration: 5-min
---

# Functions and Return Values

## Goal

Write Go functions and return multiple values.

## React Developer Mental Model

Go functions look simpler than JavaScript functions. There are no default parameters, no optional parameters, and no function overloading.

## Syntax

```go
func add(a int, b int) int {
	return a + b
}
```

Shorter parameter syntax:

```go
func add(a, b int) int {
	return a + b
}
```

## Multiple Return Values

Go commonly returns a result and an error:

```go
func findTask(id int) (string, bool) {
	if id == 1 {
		return "Learn Go", true
	}
	return "", false
}
```

## Common Mistake

Do not ignore the second return value when it tells you whether the result is valid.

## 5-Min Practice

Write:

```go
func taskLabel(title string, done bool) string
```

Return `"done: Learn Go"` or `"open: Learn Go"`.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[06 If For Switch and Range]].

