---
title: Database Basics
tags:
  - go
  - database
  - backend
level: intermediate
duration: 5-min
---

# Database Basics

## Goal

Understand how Go usually talks to SQL databases.

## React Developer Mental Model

The React app should not talk directly to the database. It calls the Go API, and the Go API uses the database.

## Standard Shape

```go
db, err := sql.Open("postgres", databaseURL)
if err != nil {
	return err
}
defer db.Close()
```

Query with context:

```go
row := db.QueryRowContext(ctx, "select id, title from tasks where id = $1", id)
```

Scan:

```go
var task Task
err := row.Scan(&task.ID, &task.Title)
```

## Common Mistake

`sql.Open` does not always verify the connection immediately. Use `db.PingContext(ctx)` during startup checks.

## 5-Min Practice

Sketch a `TaskStore` interface that could be implemented by either memory or Postgres.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[07 Auth Concepts]].

