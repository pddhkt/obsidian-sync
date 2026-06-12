---
title: Handlers and Routing
tags:
  - go
  - http
  - routing
level: intermediate
duration: 5-min
---

# Handlers and Routing

## Goal

Understand HTTP handlers and routes.

## React Developer Mental Model

A Go handler is like an API route handler. It receives a request and writes a response.

## Syntax

```go
func listTasks(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write([]byte("tasks"))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /tasks", listTasks)
	log.Fatal(http.ListenAndServe(":8080", mux))
}
```

## Handler Signature

```go
func(w http.ResponseWriter, r *http.Request)
```

`w` writes the response. `r` reads the request.

## Common Mistake

Do not write the response body before setting status codes and headers.

## 5-Min Practice

Add `GET /tasks` that returns plain text first.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[03 JSON Requests and Responses]].

