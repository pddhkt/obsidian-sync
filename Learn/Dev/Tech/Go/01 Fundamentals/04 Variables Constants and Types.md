---
title: Variables Constants and Types
tags:
  - go
  - syntax
level: beginner
duration: 5-min
---

# Variables Constants and Types

## Goal

Use Go variables, constants, and basic types.

## React Developer Mental Model

Go is statically typed like TypeScript, but the compiler is stricter and there is no `any` escape hatch for normal code.

## Syntax

```go
var title string = "Buy milk"
done := false
count := 3

const statusOpen = "open"
```

Common types:

```go
string
bool
int
int64
float64
```

## Type Inference

`:=` declares and assigns inside a function:

```go
taskID := 42
```

Outside a function, use `var` or `const`.

## Common Mistake

`:=` creates a new variable. Use `=` when updating an existing variable.

## 5-Min Practice

Create variables for a task:

```go
title := "Learn Go"
priority := 1
done := false
```

Print them with `fmt.Println`.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[05 Functions and Return Values]].

