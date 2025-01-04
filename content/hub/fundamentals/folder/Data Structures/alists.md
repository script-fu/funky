---
title: Association Lists (Alists)
type: docs
weight: 6
---

## Introduction

An **association list** (or **alist**) is a fundamental data structure in Scheme used to represent collections of key-value pairs. It is implemented as a list of pairs, where each pair associates a key (typically a symbol) with a value. Alists are simple, flexible, and well-suited for small to medium-sized datasets.

## Structure of an Association List

An alist is a list where each element is a **pair** (constructed with `cons`). Each pair consists of:

- **Key**: The first element (typically a symbol).
- **Value**: The second element, which can be of any data type.

### Example

```scheme
(define alist '((name . "Alice") (age . 30) (city . "Paris")))
```

- **Key**: `'name`, `'age`, `'city`
- **Value**: `"Alice"`, `30`, `"Paris"`
- **Structure**: A list of pairs:  
  `((name . "Alice") (age . 30) (city . "Paris"))`

## Creating an Alist

You can create an alist by manually constructing pairs or programmatically building it using `cons`.

### Example

```scheme
;; Manually define an alist
(define alist '((name . "Alice") (age . 30) (city . "Paris")))

;; Programmatically add a new pair
(define updated-alist (cons '(country . "France") alist))
```

**Result**:  
`((country . "France") (name . "Alice") (age . 30) (city . "Paris"))`

---

## Accessing Data in an Alist

### Using `assoc`

The `assoc` function retrieves a pair from an alist based on the key.

```scheme
(assoc 'name alist)   ; Returns (name . "Alice")
(assoc 'country alist) ; Returns #f (key not found)
```

### Extracting the Value

Use `cdr` to extract the value from the pair returned by `assoc`:

```scheme
(cdr (assoc 'name alist))   ; Returns "Alice"
```

If the key does not exist, `cdr` will return an error, so handle missing keys appropriately.
