---
title: If For Switch and Range
tags:
  - go
  - control-flow
level: beginner
duration: 5-min
---

# If For Switch and Range

## Goal

Use Go control flow.

## React Developer Mental Model

Go only has `for` for loops. There is no `while`.

## If

```go
if done {
	fmt.Println("complete")
} else {
	fmt.Println("open")
}
```

## For

```go
for i := 0; i < 3; i++ {
	fmt.Println(i)
}
```

## Range

```go
tasks := []string{"learn go", "build api"}

for index, title := range tasks {
	fmt.Println(index, title)
}
```

## Switch

```go
switch status {
case "open":
	fmt.Println("show in inbox")
case "done":
	fmt.Println("archive")
default:
	fmt.Println("unknown")
}
```

## Common Mistake

In `range`, the first value is the index or key. The second value is the item.

## 5-Min Practice

Loop over three task statuses and print different messages for each.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[07 Defer Panic and Recover]].

