---
title: CLI Task Manager
tags:
  - go
  - project
  - cli
level: beginner
duration: 5-min
---

# CLI Task Manager

## Goal

Build a command-line task manager before building the API.

## Features

- add a task
- list tasks
- mark a task done
- save tasks to a JSON file

## Concepts Used

- structs
- slices
- JSON encoding
- files
- errors

## First Step

```go
type Task struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
}
```

## Practice

Start with hardcoded tasks. Add file saving only after list and add work in memory.

## Done When

You can run:

```bash
go run . add "Learn Go"
go run . list
```

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[02 REST Task API]].

