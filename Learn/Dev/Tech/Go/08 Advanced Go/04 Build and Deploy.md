---
title: Build and Deploy
tags:
  - go
  - deploy
  - backend
level: advanced
duration: 5-min
---

# Build and Deploy

## Goal

Build a Go service as a deployable binary.

## React Developer Mental Model

React usually builds static assets. Go builds a binary executable.

## Commands

```bash
go build -o taskapi .
./taskapi
```

Cross-compile:

```bash
GOOS=linux GOARCH=amd64 go build -o taskapi-linux .
```

## Docker Shape

```dockerfile
FROM golang:1.22 AS build
WORKDIR /app
COPY . .
RUN go build -o taskapi .

FROM debian:bookworm-slim
COPY --from=build /app/taskapi /taskapi
CMD ["/taskapi"]
```

## Common Mistake

Make sure runtime config comes from environment variables, not local-only files.

## 5-Min Practice

Build your app into a binary and run the binary directly.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[05 Idiomatic Project Layout]].

