---
title: Reflection
tags:
  - go
  - reflection
level: advanced
duration: 5-min
---

# Reflection

## Goal

Know what reflection is and when to avoid it.

## React Developer Mental Model

Reflection lets code inspect types at runtime. It is powerful but less explicit, similar to dynamic JavaScript behavior inside otherwise typed Go.

## Syntax

```go
value := reflect.ValueOf(Task{Title: "Learn Go"})
fmt.Println(value.Type().Name())
```

## Where You See It

Reflection appears in libraries such as:

- JSON encoding
- validation
- ORM tools
- dependency injection frameworks

## Common Mistake

Do not use reflection for normal business logic. Prefer concrete types and interfaces.

## 5-Min Practice

Use `reflect.TypeOf` and `reflect.ValueOf` on a `Task`.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[04 Build and Deploy]].

