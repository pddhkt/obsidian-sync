---
title: Composition and Embedding
tags:
  - go
  - composition
level: intermediate
duration: 5-min
---

# Composition and Embedding

## Goal

Reuse behavior without inheritance.

## React Developer Mental Model

Go favors composition. Think of building behavior by combining small pieces, similar to composing hooks and components instead of deep class inheritance.

## Syntax

```go
type Logger struct{}

func (Logger) Info(message string) {
	fmt.Println("info:", message)
}

type TaskService struct {
	Logger
	store TaskStore
}
```

Now `TaskService` can call:

```go
service.Info("created task")
```

## Direct Composition

Often explicit fields are clearer:

```go
type TaskService struct {
	logger Logger
	store  TaskStore
}
```

## Common Mistake

Embedding is not inheritance. Use it when promotion makes the API clearer, not just to save typing.

## 5-Min Practice

Create a `TaskService` that contains a `TaskStore`.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[04 Generics Intro]].

