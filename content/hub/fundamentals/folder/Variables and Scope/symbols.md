---
title: Symbols
type: docs
weight: 6
---

## Introduction

Symbols are one of the core data types in Scheme, representing unique, immutable identifiers. They are primarily used as keys, markers, or placeholders in programs, making them essential for writing clean and expressive code.

A symbol in Scheme is similar to a string but differs in that symbols are **unique** and **atomic**. This means two symbols with the same name are guaranteed to be the same object, allowing for fast equality checks and efficient use in data structures.

### Syntax

A symbol is written as a sequence of characters:

- Begins with a letter, followed by letters, digits, or special characters like `-`, `+`, or `*`.
- Symbols are case-sensitive by default.

Examples:

```scheme
'hello       ; A symbol named `hello`  
'foo-bar     ; A symbol named `foo-bar`  
'*special*   ; A symbol named `*special*`  
```

## Creating Symbols

Symbols are typically created using the **quote** operator (`'`), which tells Scheme to treat the name as a symbol rather than evaluating it as a variable or function.

### Example

```scheme
'my-symbol   ; Creates the symbol `my-symbol`
```

You can also create symbols programmatically using the `string->symbol` procedure, which converts a string to a symbol.

```scheme
(string->symbol "dynamic-symbol")
```

**Result**: `'dynamic-symbol`


## Comparing Symbols

Because symbols are unique, you can compare them efficiently using `eq?`.

### Example

```scheme
(eq? 'apple 'apple)   ; #t (same symbol)  
(eq? 'apple 'orange)  ; #f (different symbols)  
```

This makes symbols ideal for use as keys in data structures or markers in your code.

## Using Symbols

Symbols are often used in Scheme for:

1. **Keys in Association Lists:**

```scheme
(define alist '((name . "Alice") (age . 30) (city . "Paris")))  
(assoc 'name alist)   ; Returns (name . "Alice")  
```

2. **Identifiers in Code:**

```scheme
   (define my-symbol 'foo)  
   (if (eq? my-symbol 'foo)  
       "It's foo!"  
       "It's something else.")  
```

## Procedures for Working with Symbols

Scheme provides built-in procedures for working with symbols:

| Procedure         | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| **`symbol?`**      | Checks if an object is a symbol.                                            |
| **`eq?`**          | Compares two symbols for identity (fast comparison).                       |
| **`symbol->string`** | Converts a symbol to a string (useful for display or debugging).          |
| **`string->symbol`** | Converts a string to a symbol (useful for dynamic creation of identifiers). |

### Examples

```scheme
(symbol? 'example)            ; #t (true: it's a symbol)  
(symbol->string 'example)     ; "example"  
(string->symbol "new-symbol") ; 'new-symbol  
```

## Summary

Symbols are a lightweight, efficient way to represent identifiers, keys, and markers in Scheme. Their immutability and fast identity checks make them ideal for many programming tasks. Understanding how to use symbols effectively will enhance your ability to write clean and expressive Scheme code.
