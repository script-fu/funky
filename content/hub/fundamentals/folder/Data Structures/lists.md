---
title: Lists
type: docs
weight: 4
---

## Introduction

In Scheme, a **list** is a fundamental data structure used to group values. Lists are ordered collections of elements where each element can be of any type, including another list. Lists are widely used in Scheme for both data storage and program structure.

### Example 1: Simple List

```scheme
(list 1 2 3)
```

- Creates a list of three elements: `1`, `2`, and `3`.

Result: **`(1 2 3)`**

---

#### Accessing List Elements

Elements in a list are accessed using the `car` and `cdr` procedures:

- `car` retrieves the first element of a list.
- `cdr` retrieves the rest of the list (everything except the first element).

#### Examples

```scheme
(define my-list (list 1 2 3))
(car my-list)  ; Retrieves the first element
(cdr my-list)  ; Retrieves the rest of the list
```

Result:

- `(car my-list)` returns `1`
- `(cdr my-list)` returns `(2 3)`

---

#### Simple Recursion: Iterating Through a List

By recursively calling `car` on the `cdr` of a list, you can process each element one by one until the list is traversed. This forms the basis of many list-processing algorithms.

#### Example: Printing Each Element of a List

Here’s a simple recursive function to print every element in a list:

```scheme
(define (print-elements lst)
  (if (null? lst)
    (gimp-message "done")
    (begin
      (gimp-message (number->string (car lst))) ;; Print the first element
      (print-elements (cdr lst)))))             ;; Process the rest of the list
```

- **Base Case:** If the list is empty (`null? lst`), stop recursion.
- **Recursive Case:** Print the first element (`car lst`), then call the function on the rest of the list (`cdr lst`).

#### Example Usage

```scheme
(print-elements (list 1 2 3))
```

Output:

- `"1"`
- `"2"`
- `"3"`

Result: "done"

---

#### How It Works

1. The function retrieves the first element of the list using `car` and processes it.
2. It then calls itself with the rest of the list (`cdr`).
3. This process repeats until the list is empty (`null? lst`).

---

### Example 2: Mixed Types

Lists can include elements of different types, including strings, booleans, numbers, other lists, or even the result of expressions:

```scheme
(list 42 "hello" #t (list 1 2) (+ 3 4))
```

- This creates a list with:
  - A number (`42`)
  - A string (`"hello"`)
  - A boolean (`#t`)
  - Another list (`(1 2)`)
  - The result of an expression (`(+ 3 4)`, which evaluates to `7`)

Result: **`(42 "hello" #t (1 2) 7)`**

---

These examples demonstrate the versatility of lists in Script-Fu, making them a powerful tool for organizing and manipulating data.

### Constructing Lists

The `cons` procedure is used to construct a new list by combining an element with an existing list.

```scheme
(cons new-element existing-list)
```

#### Example

```scheme
(cons 0 (list 1 2 3))
```

- Adds `0` to the beginning of the list `(1 2 3)`.

Result: **`(0 1 2 3)`**

---

### Checking for Lists

The `list?` procedure checks whether a given value is a list.

```scheme
(list? value)
```

#### Example: list?

```scheme
(list? (list 1 2 3))  ; Checks if (list 1 2 3) is a list
(list? 42)            ; Checks if 42 is a list
```

Result:

- `(list? (list 1 2 3))` returns `#t` (true)
- `(list? 42)` returns `#f` (false)

---

### Operations on Lists

Scheme provides several built-in procedures for working with lists, including:

- `length`: Returns the number of elements in a list.
- `append`: Combines two or more lists into one.
- `reverse`: Returns a new list with elements in reverse order.

```scheme
(length (list 1 2 3))          ; Returns 3
(append (list 1 2) (list 3 4)) ; Returns (1 2 3 4)
(reverse (list 1 2 3))         ; Returns (3 2 1)
```

Result:

- `(length (list 1 2 3))` returns `3`
- `(append (list 1 2) (list 3 4))` returns `(1 2 3 4)`
- `(reverse (list 1 2 3))` returns `(3 2 1)`

#### Using `list-ref`

The `list-ref` procedure retrieves the element at a specified index of a list (zero-based index).

```scheme
(list-ref lst index)
```

- **`lst`**: The list from which to retrieve the element.
- **`index`**: A zero-based index indicating which element to return.

##### Example: list-ref

```scheme
(list-ref (list 10 20 30 40) 2)  ; Retrieves the element at index 2
```

Result: `30`

---

### Nested Lists

Lists in Scheme can contain other lists as elements, creating a nested structure.

#### Example: Creating a Nested List

```scheme
(define nested-list (list (list 1 2) (list 3 4) (list 5)))
```

- Creates a list of three elements, each of which is itself a list.

Result: **`((1 2) (3 4) (5))`**

---

#### Accessing Nested Data

To access elements within a nested list, you can use combinations of `car` and `cdr` to navigate through the structure.

#### Example: Accessing Elements

```scheme
(car nested-list)              ; Retrieves the first element: (1 2)
(car (car nested-list))        ; Retrieves the first element of the first sublist: 1
(cdr (car nested-list))        ; Retrieves the rest of the first sublist: (2)
(car (cdr (car nested-list)))  ; Retrieves the second element of the first sublist: 2
```

---

#### Explanation

1. **`car nested-list`**:
   - Retrieves the first element of `nested-list`, which is `(1 2)`.

2. **`car (car nested-list)`**:
   - Retrieves the first element of `(1 2)`, which is `1`.

3. **`cdr (car nested-list)`**:
   - Retrieves the rest of `(1 2)`, which is `(2)`.

4. **`car (cdr (car nested-list))`**:
   - Retrieves the first element of `(2)`, which is `2`.

---

#### Example: Accessing Elements from Other Sublists

```scheme
(car (cdr nested-list))        ; Retrieves the second sublist: (3 4)
(car (car (cdr nested-list)))  ; Retrieves the first element of the second sublist: 3
```

---

This approach allows you to systematically navigate and access specific elements in a nested list, providing powerful flexibility for working with hierarchical data.

### Summary

- **Lists** in Scheme are versatile and essential data structures.
- Use `list` to create a list, `car` and `cdr` to access elements, and `cons` to construct lists.
- Built-in procedures like `length`, `append`, `reverse`, and `list-ref` make list operations easy and efficient.
- Lists can be nested, enabling complex data structures for advanced use cases.
