---
title: map
type: docs
weight: 3
---

## Introduction

The `map` function in Scheme is used to apply a procedure to each element of a list (or multiple lists) and **return a new list** containing the results. This makes it ideal for transforming data.

The simplest form of `map` looks like this:

```scheme
(map procedure list)
```

- **Procedure**: A function to apply to each element of the list.
- **List**: The list whose elements will be transformed.

---

### Example: Double Each Element

```scheme
(define (double x)
  (* x 2))

(map double (list 1 2 3 4))
```

- Here, the function `double` is applied to each element of the list `(1 2 3 4)`.  
- The result is a new list with each element doubled.

**Output**: `(2 4 6 8)`

---

### How It Works

1. **Creates a New List**:
   - `map` applies the provided procedure to each element of the list and collects the results into a new list.

2. **Transforms Data**:
   - It is primarily used for data transformations rather than performing side effects.

---

#### Example: Using with Multiple Lists

If multiple lists are provided, `map` processes corresponding elements from each list.

```scheme
(define (sum x y)
  (+ x y))

(map sum (list 1 2 3) (list 4 5 6))
```

- The function `sum` adds corresponding elements from the two lists and returns the results as a new list.

**Output**: `(5 7 9)`

---

### Summary

- The `map` function is a powerful tool for transforming lists by applying a procedure to each element.
- Unlike `for-each`, `map` **produces a new list** containing the results of applying the procedure.
- It supports multiple lists, allowing element-wise operations across them.

By using `map`, you can efficiently create transformed versions of your data while keeping the original lists unchanged.
