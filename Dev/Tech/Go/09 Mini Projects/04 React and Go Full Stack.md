---
title: React and Go Full Stack
tags:
  - go
  - react
  - project
  - full-stack
level: intermediate
duration: 5-min
---

# React and Go Full Stack

## Goal

Connect a React frontend to the Go task API.

## Frontend Shape

React calls:

```ts
const response = await fetch("http://localhost:8080/tasks")
const tasks = await response.json()
```

## Backend Needs

- JSON responses
- CORS for local development
- stable response types
- useful HTTP status codes
- validation errors the frontend can display

## Error Response Shape

```json
{
  "error": "title is required"
}
```

## Practice

Create a React page that lists tasks from the Go API and posts a new task.

## Done When

You can add a task in React, see it returned from Go, and refresh the list.
## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

