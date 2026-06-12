---
title: Custom Errors and Wrapping
tags:
  - go
  - errors
level: intermediate
duration: 5-min
---

# Custom Errors and Wrapping

## Goal

Create errors that callers can inspect.

## React Developer Mental Model

In frontend code you may check an HTTP status code. In Go services, you often check sentinel errors or wrapped errors.

## Syntax

```go
var ErrTaskNotFound = errors.New("task not found")
```

Return it:

```go
func getTask(id int) (Task, error) {
	return Task{}, ErrTaskNotFound
}
```

Check it:

```go
if errors.Is(err, ErrTaskNotFound) {
	http.Error(w, "not found", http.StatusNotFound)
	return
}
```

Wrap context:

```go
return fmt.Errorf("load task %d: %w", id, err)
```

## Common Mistake

Use `%w` when wrapping errors you want callers to inspect with `errors.Is` or `errors.As`.

## 5-Min Practice

Create `ErrEmptyTitle` and check it with `errors.Is`.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[03 Packages and Exported Names]].

