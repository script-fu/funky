---
title: Vectors
type: docs
weight: 5
---

## Introduction

In Scheme, a vector is another fundamental data structure used to group values. Unlike lists, vectors are fixed-size, indexed collections of elements, providing faster random access and updates. Each element in a vector can be of any type, including another vector.

While vectors and lists may appear similar, they serve different purposes in Scheme programming:

- Lists are more commonly used for recursive operations and dynamic structures, as their linked-node implementation allows efficient manipulation of their beginning and traversal through recursive decomposition.

- Vectors, on the other hand, are optimized for scenarios where random access to elements or updates at specific indices are required, making them more suitable for use cases like lookup tables, fixed-size configurations, or performance-critical indexed operations.

In essence, lists are the natural choice for recursive algorithms and dynamically sized data, while vectors shine when fixed-size or indexed access patterns are paramount.

### Example 1: Simple Vector

```scheme
(vector 1 2 3)
```

- Creates a vector of three elements: `1`, `2`, and `3`.

Result: **`#(1 2 3)`**

---

#### Accessing Vector Elements

Elements in a vector are accessed using the `vector-ref` procedure:

- `vector-ref` retrieves the element at a specified index (starting from `0`).

#### Examples

```scheme
(define my-vector (vector 1 2 3))
(vector-ref my-vector 0)  ; Retrieves the element at index 0
(vector-ref my-vector 1)  ; Retrieves the element at index 1
```

Result:
- `(vector-ref my-vector 0)` returns `1`
- `(vector-ref my-vector 1)` returns `2`

---

#### Simple Iteration: Processing Each Element in a Vector

You can iterate through a vector using a loop or recursion. Scheme provides `vector-length` to determine the size of a vector.

#### Example: Printing Each Element of a Vector

Here’s a simple loop to print every element in a vector:

```scheme
(define (print-elements vec)
  (let loop ((i 0))
    (if (< i (vector-length vec))
        (begin
          (gimp-message (number->string (vector-ref vec i))) ; Print the element
          (loop (+ i 1)))                                    ; Process the next index
        (gimp-message "done"))))                             ; End loop
```

- **Base Case:** If the index `i` reaches the length of the vector, stop the loop.
- **Recursive Case:** Print the element at index `i`, then increment `i`.

#### Example Usage

```scheme
(print-elements (vector 1 2 3))
```

Output:
- `"1"`
- `"2"`
- `"3"`

Result: "done"

---

#### How It Works

1. The function retrieves the element at the current index using `vector-ref` and processes it.
2. It then increments the index and repeats until all elements are processed.

---

### Example 2: Mixed Types

Vectors can include elements of different types, including strings, booleans, numbers, other vectors, or even the result of expressions:

```scheme
(vector 42 "hello" #t (vector 1 2) (+ 3 4))
```

- This creates a vector with:
  - A number (`42`)
  - A string (`"hello"`)
  - A boolean (`#t`)
  - Another vector (`#(1 2)`)
  - The result of an expression (`(+ 3 4)`, which evaluates to `7`)

Result: **`#(42 "hello" #t #(1 2) 7)`**

---

### Constructing Vectors

Vectors are created using `vector`, or by using `make-vector` to create a vector of a fixed size with an initial value.

#### Example: Creating a Vector

```scheme
(make-vector 5 0)
```

- Creates a vector of size `5` with all elements initialized to `0`.

Result: **`#(0 0 0 0 0)`**

---

### Updating Vectors

The `vector-set!` procedure updates an element in a vector at a specified index.

#### Example: Updating a Vector

```scheme
(define my-vector (vector 1 2 3))
(vector-set! my-vector 1 42)  ; Sets the second element to 42
my-vector
```

Result: **`#(1 42 3)`**

---

### Checking for Vectors

The `vector?` procedure checks whether a given value is a vector.

```scheme
(vector? value)
```

#### Example

```scheme
(vector? (vector 1 2 3))  ; Checks if #(1 2 3) is a vector
(vector? 42)             ; Checks if 42 is a vector
```

Result:
- `(vector? (vector 1 2 3))` returns `#t` (true)
- `(vector? 42)` returns `#f` (false)

---

### Operations on Vectors

Scheme provides several built-in procedures for working with vectors, including:

- `vector-length`: Returns the number of elements in a vector.
- `vector->list`: Converts a vector into a list.
- `list->vector`: Converts a list into a vector.

#### Examples

```scheme
(vector-length (vector 1 2 3))          ; Returns 3
(vector->list (vector 1 2 3))          ; Converts vector to list: (1 2 3)
(list->vector (list 1 2 3))            ; Converts list to vector: #(1 2 3)
```

Result:
- `(vector-length (vector 1 2 3))` returns `3`
- `(vector->list (vector 1 2 3))` returns `(1 2 3)`
- `(list->vector (list 1 2 3))` returns `#(1 2 3)`

---

### Nested Vectors

Vectors in Scheme can contain other vectors as elements, creating a nested structure.

#### Example: Creating a Nested Vector

```scheme
(define nested-vector (vector (vector 1 2) (vector 3 4) (vector 5)))
```

- Creates a vector of three elements, each of which is itself a vector.

Result: **`#(#(1 2) #(3 4) #(5))`**

---

#### Accessing Nested Data

To access elements within a nested vector, use `vector-ref` multiple times to navigate through the structure.

#### Example: Accessing Elements

```scheme
(vector-ref nested-vector 0)              ; Retrieves the first element: #(1 2)
(vector-ref (vector-ref nested-vector 0) 1) ; Retrieves the second element of the first vector: 2
```

---

### Summary

- **Vectors** in Scheme are fixed-size, indexed data structures.
- Use `vector` to create a vector, `vector-ref` to access elements, and `vector-set!` to update elements.
- Built-in procedures like `vector-length`, `vector->list`, and `list->vector` enable flexible operations.
- Nested vectors allow for complex, hierarchical data structures.
