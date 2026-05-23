---
title: Profiling
tags:
  - go
  - profiling
  - performance
level: advanced
duration: 5-min
---

# Profiling

## Goal

Find real performance bottlenecks.

## React Developer Mental Model

This is like using React DevTools profiler, but for CPU, memory, and goroutines in Go programs.

## CPU Profile Test Command

```bash
go test -cpuprofile cpu.out -bench=. ./...
go tool pprof cpu.out
```

## HTTP pprof

For services, Go can expose pprof endpoints:

```go
import _ "net/http/pprof"
```

Then run a debug server carefully, usually protected from public access.

## Common Mistake

Do not expose pprof publicly in production.

## 5-Min Practice

Run a benchmark with `-cpuprofile` and open `go tool pprof`.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[03 Reflection]].

