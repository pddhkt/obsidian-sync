---
title: Install and Run Go
tags:
  - go
  - fundamentals
level: beginner
duration: 5-min
---

# Install and Run Go

## Goal

Run your first Go program and understand the basic commands.

## React Developer Mental Model

Go has fewer moving parts than a typical React project. You install Go, create a module, write `.go` files, then run or build them.

## Core Commands

```bash
go version
go mod init example.com/taskapi
go run .
go build .
go fmt ./...
go test ./...
```

## Syntax

Create `main.go`:

```go
package main

import "fmt"

func main() {
	fmt.Println("task api starts here")
}
```

## Common Mistake

Do not name random files with different packages in the same folder. One folder usually has one package.

## 5-Min Practice

Create a folder, run `go mod init example.com/taskapi`, add `main.go`, then run:

```bash
go run .
```

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[02 Go Project Mental Model]].

