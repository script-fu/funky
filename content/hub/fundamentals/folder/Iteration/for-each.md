---
title: for-each
type: docs
weight: 5
---

## Introduction

The `for-each` function in Scheme is used to apply a procedure to each element of a list (or multiple lists). Unlike `map`, which returns a new list with the results, `for-each` is used for its **side effects**, such as printing or updating variables.

The simplest form of `for-each` looks like this:

```scheme
(for-each procedure list)
```

- **Procedure**: A function to apply to each element of the list.
- **List**: The list whose elements will be processed.

---

### Example: Print a List

```scheme
(define (print-item x)
  (gimp-message (number->string x)))

(for-each print-item (list 1 2 3 4))
```

- Here, the function `print-item` is applied to each element of the list `(1 2 3 4)`.  
- This causes each number to be printed sequentially.

**Output**: `1 2 3 4`

---

### How It Works

1. **Iterates Over Each Element**:
   - The provided procedure is executed for every element in the list, in order.

2. **Performs Side Effects**:
   - Common side effects include printing, logging, or modifying external variables. Unlike `map`, `for-each` does not return a new list.

---

#### Example: Using with Multiple Lists

If multiple lists are provided, `for-each` processes corresponding elements from each list.

```scheme
(define (sum-and-print x y)
  (gimp-message (number->string (+ x y))))

(for-each sum-and-print (list 1 2 3) (list 4 5 6))
```

- The function `sum-and-print` sums corresponding elements from the two lists and prints the results.

**Output**: `5 7 9`

---

### Summary

- The `for-each` function is useful for performing side effects on each element of a list.
- Unlike `map`, `for-each` does not produce a new list—it focuses solely on the procedure's side effects.
- It can handle multiple lists simultaneously, applying the procedure to corresponding elements.

By using `for-each`, you can effectively process lists when the goal is to perform actions rather than transform data.
