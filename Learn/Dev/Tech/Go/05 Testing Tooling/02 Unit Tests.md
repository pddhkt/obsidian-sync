---
title: Unit Tests
tags:
  - go
  - testing
level: intermediate
duration: 5-min
---

# Unit Tests

## Goal

Write a basic Go test.

## React Developer Mental Model

Go tests live in files ending with `_test.go`. The built-in test runner finds functions starting with `Test`.

## Syntax

```go
func TestValidateTitle(t *testing.T) {
	err := validateTitle("Learn Go")
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
}
```

Run:

```bash
go test ./...
```

## Common Mistake

Do not use `fmt.Println` as your main testing strategy. Let tests assert behavior.

## 5-Min Practice

Test that `validateTitle("")` returns an error.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[03 Table Tests]].

