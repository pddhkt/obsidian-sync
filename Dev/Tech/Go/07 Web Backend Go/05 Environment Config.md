---
title: Environment Config
tags:
  - go
  - config
  - backend
level: intermediate
duration: 5-min
---

# Environment Config

## Goal

Read configuration from environment variables.

## React Developer Mental Model

Frontend env vars are often injected at build time. Backend env vars are usually read when the process starts.

## Syntax

```go
func env(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}

func main() {
	port := env("PORT", "8080")
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
```

## Common Mistake

Do not hardcode secrets in Go source files. Use environment variables or a secret manager.

## 5-Min Practice

Make your server use `PORT`, defaulting to `8080`.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[06 Database Basics]].

