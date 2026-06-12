---
title: Strings Runes and Bytes
tags:
  - go
  - strings
level: beginner
duration: 5-min
---

# Strings Runes and Bytes

## Goal

Understand text in Go.

## React Developer Mental Model

In JavaScript, strings feel like character arrays. In Go, a string is a read-only sequence of bytes, usually UTF-8 encoded.

## Syntax

```go
title := "Learn Go"
fmt.Println(len(title))
```

`len` returns bytes, not characters.

## Runes

A `rune` represents a Unicode code point.

```go
for index, r := range "Go 語言" {
	fmt.Println(index, r, string(r))
}
```

## Bytes

Use bytes when working with files, network data, or raw request bodies:

```go
data := []byte("hello")
```

## Common Mistake

Do not assume `len(s)` is the number of visible characters for all languages.

## 5-Min Practice

Loop over a string with English and Chinese text using `range`.

## Type-It-Yourself Zone

Use this space to type the lesson code by hand from memory. Do not paste from the example above. First type it, then run it, then fix the compiler errors.

```go
// Type your code here.

```

## Next

Read [[04 Structs]].

