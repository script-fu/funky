---
title: Association Lists (Alists)
type: docs
weight: 6
---

## Introduction

An **association list** (or **alist**) is a fundamental data structure in Scheme used to represent collections of key-value pairs. It is implemented as a list of pairs, where each pair associates a key (typically a symbol) with a value. Alists are simple, flexible, and well-suited for small to medium-sized datasets.

### Structure of an Association List

An alist is a list where each element is a **pair** (constructed with `cons`). Each pair consists of:

- **Key**: The first element (typically a symbol).
- **Value**: The second element, which can be of any data type.

```scheme
(define alist '((name . "Alice") (age . 30) (city . "Paris")))
```

- **Key**: `'name`, `'age`, `'city`
- **Value**: `"Alice"`, `30`, `"Paris"`
- **Structure**: A list of pairs:  
  `((name . "Alice") (age . 30) (city . "Paris"))`

### Creating an Alist

You can create an alist by manually constructing pairs or programmatically building it using `cons`.

#### Using the Single Quote (`'`)

The single quote (`'`) is shorthand for **quoting**, which prevents Scheme from evaluating the expression. This makes it ideal for creating static alists where all keys and values are hardcoded.

```scheme
;; Manually define an alist
(define alist '((name . "Alice") (age . 30) (city . "Paris")))

;; Programmatically add a new pair
(define updated-alist (cons '(country . "France") alist))
```

**Result**:  
`((country . "France") (name . "Alice") (age . 30) (city . "Paris"))`

#### Using the Backquote (`` ` ``) and Comma (`,`)

The backquote (`` ` ``) is similar to the single quote but allows you to dynamically insert evaluated expressions using the comma (`,`) operator. This is useful for creating alists where keys or values are computed at runtime.

```scheme
(define key 'name)
(define value "Alice")

(define alist `((,key . ,value) (age . 30) (city . "Paris")))
```

**Result**:  
`((name . "Alice") (age . 30) (city . "Paris"))`

### Example Comparison

Static alist using `'`:

```scheme
(define alist '((name . "Alice") (age . 30) (city . "Paris")))
```

Dynamic alist using `` ` `` and `,`:

```scheme
(define key 'name)
(define value "Alice")
(define alist `((,key . ,value) (age . 30) (city . "Paris")))
```

### Accessing Data in an Alist

To retrieve a value from an alist, you can use the `assoc` function, which looks up a pair by its key.

```scheme
(assoc 'name alist)   ; Returns (name . "Alice")
(assoc 'country alist) ; Returns #f (key not found)
```

### Extracting the Value

Once you retrieve a pair using `assoc`, use `cdr` to extract the value:

```scheme
(cdr (assoc 'name alist))   ; Returns "Alice"
```

### Summary of Key Features

- **Single Quote (`'`)**: Creates a static alist where all elements are literal data.
- **Backquote (`` ` ``)**: Allows dynamic creation of alists by mixing static elements with evaluated expressions (using `,`).
- **Dot Notation (`.`)**: Used to construct pairs, associating a key with a value in an alist.
