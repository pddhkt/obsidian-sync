---
title: REST Task API
tags:
  - go
  - project
  - rest-api
  - backend
level: intermediate
duration: 5-min
---

# REST Task API

## Goal

Build a JSON API that a React frontend can call.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | server health |
| GET | `/tasks` | list tasks |
| POST | `/tasks` | create task |
| PUT | `/tasks/{id}` | update task |
| DELETE | `/tasks/{id}` | delete task |

## Concepts Used

- `net/http`
- handlers
- JSON
- validation
- errors
- middleware

## Practice

Implement `GET /tasks` with an in-memory slice first. Add persistence later.

## Done When

Your React app can call `GET /tasks` and render the result.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[03 Worker Queue]].

