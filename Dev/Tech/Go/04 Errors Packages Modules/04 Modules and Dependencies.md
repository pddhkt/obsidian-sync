---
title: Modules and Dependencies
tags:
  - go
  - modules
level: intermediate
duration: 5-min
---

# Modules and Dependencies

## Goal

Install and manage Go dependencies.

## React Developer Mental Model

`go.mod` and `go.sum` are the Go equivalent of dependency metadata and lock information.

## Commands

```bash
go mod init example.com/taskapi
go get github.com/go-chi/chi/v5
go mod tidy
```

## Syntax

Import installed packages normally:

```go
import "github.com/go-chi/chi/v5"
```

## What `go mod tidy` Does

It removes unused dependencies and adds missing ones based on imports.

## Common Mistake

Do not manually edit `go.sum`. Let Go manage it.

## 5-Min Practice

Install `github.com/go-chi/chi/v5`, import it, then run:

```bash
go mod tidy
```

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[05 Context for Request Lifetimes]].

