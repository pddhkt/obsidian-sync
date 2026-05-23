---
title: Auth Concepts
tags:
  - go
  - auth
  - backend
level: intermediate
duration: 5-min
---

# Auth Concepts

## Goal

Understand where auth fits in a Go backend.

## React Developer Mental Model

React can store a token or rely on cookies, but the Go backend must verify every protected request.

## Common Approaches

| Approach | Notes |
|---|---|
| Cookie session | good for web apps, server controls session |
| JWT bearer token | common for APIs, must validate signature and expiry |
| OAuth/OIDC | delegate identity to a provider |

## Middleware Shape

```go
func requireUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID := r.Header.Get("X-User-ID")
		if userID == "" {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}
```

## Common Mistake

Do not trust user IDs sent by the browser unless they come from a verified session or token.

## 5-Min Practice

Add temporary middleware that rejects requests without `X-User-ID`.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[08 CORS for React]].

