---
title: Benchmarks
tags:
  - go
  - benchmarks
level: intermediate
duration: 5-min
---

# Benchmarks

## Goal

Measure code performance with Go benchmarks.

## React Developer Mental Model

Benchmarks are not unit tests. They repeatedly run code so you can compare implementations.

## Syntax

```go
func BenchmarkValidateTitle(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_ = validateTitle("Learn Go")
	}
}
```

Run:

```bash
go test -bench=. ./...
```

## Common Mistake

Do not optimize before measuring. Benchmarks are useful only when tied to a real concern.

## 5-Min Practice

Benchmark a function that builds a task label string.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[05 Race Detector]].

