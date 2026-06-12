---
title: Packages and Exported Names
tags:
  - go
  - packages
level: intermediate
duration: 5-min
---

# Packages and Exported Names

## Goal

Split Go code into packages.

## React Developer Mental Model

Packages are like folders of related modules, but the folder declares one package name and compiles together.

## Example Structure

```text
taskapi/
├── main.go
└── internal/
    └── tasks/
        ├── task.go
        └── store.go
```

## Syntax

`internal/tasks/task.go`:

```go
package tasks

type Task struct {
	ID    int
	Title string
	Done  bool
}
```

Use it:

```go
import "example.com/taskapi/internal/tasks"

task := tasks.Task{Title: "Learn Go"}
```

## Common Mistake

Lowercase names are private to the package. Use capital names only when other packages need them.

## 5-Min Practice

Move `Task` into an `internal/tasks` package.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[04 Modules and Dependencies]].

