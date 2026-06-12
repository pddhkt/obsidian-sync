---
title: Format Vet and Test Commands
tags:
  - go
  - tooling
level: intermediate
duration: 5-min
---

# Format Vet and Test Commands

## Goal

Use the everyday Go quality commands.

## React Developer Mental Model

Go ships with standard formatting and test tooling. You do not need to choose a formatter.

## Commands

```bash
go fmt ./...
go vet ./...
go test ./...
```

## Build Command

```bash
go build ./...
```

This checks all packages compile.

## Common Mistake

Do not argue with `gofmt`. Go code uses one standard style.

## 5-Min Practice

Run all four commands on your current project:

```bash
go fmt ./...
go vet ./...
go test ./...
go build ./...
```

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[02 Unit Tests]].

