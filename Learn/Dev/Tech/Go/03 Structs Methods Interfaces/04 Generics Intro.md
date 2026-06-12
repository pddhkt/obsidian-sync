---
title: Generics Intro
tags:
  - go
  - generics
level: intermediate
duration: 5-min
---

# Generics Intro

## Goal

Understand the basic shape of Go generics.

## React Developer Mental Model

Generics are like TypeScript generics, but Go uses them more conservatively.

## Syntax

```go
func First[T any](items []T) (T, bool) {
	var zero T
	if len(items) == 0 {
		return zero, false
	}
	return items[0], true
}
```

Use it:

```go
title, ok := First([]string{"learn go"})
fmt.Println(title, ok)
```

## Constraint Example

```go
func Keys[K comparable, V any](m map[K]V) []K {
	keys := make([]K, 0, len(m))
	for key := range m {
		keys = append(keys, key)
	}
	return keys
}
```

## Common Mistake

Do not reach for generics too early. Many Go functions are clearer with concrete types.

## 5-Min Practice

Write a generic `Last[T any]` function.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[Learn/Dev/Tech/Go/04 Errors Packages Modules/00 Module Overview]].

