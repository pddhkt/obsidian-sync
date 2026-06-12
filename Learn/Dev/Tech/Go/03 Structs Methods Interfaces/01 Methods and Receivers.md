---
title: Methods and Receivers
tags:
  - go
  - methods
level: intermediate
duration: 5-min
---

# Methods and Receivers

## Goal

Attach behavior to a type.

## React Developer Mental Model

Methods feel a bit like class methods, but Go does not have classes. A method is a function with a receiver.

## Syntax

```go
type Task struct {
	Title string
	Done  bool
}

func (t Task) Label() string {
	if t.Done {
		return "done: " + t.Title
	}
	return "open: " + t.Title
}
```

Pointer receiver for mutation:

```go
func (t *Task) MarkDone() {
	t.Done = true
}
```

## Common Mistake

Use pointer receivers when the method mutates the value. Use value receivers for read-only behavior on small structs.

## 5-Min Practice

Add `Label()` and `MarkDone()` to your `Task` struct.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[02 Interfaces Are Implicit]].

