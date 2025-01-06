---
title: Variadic Functions
type: docs
weight: 2
---

## Introduction

**Variadic functions** in Script-Fu are functions that accept a variable number of arguments. These functions are highly versatile and allow you to create flexible and reusable code. In functional programming, variadic functions simplify operations that need to process an arbitrary number of inputs, such as summing a list of numbers or concatenating strings.

Variadic functions are especially useful when:

- The number of arguments cannot be determined in advance.
- You need to apply the same operation to a dynamic list of inputs.
- Writing utilities for data aggregation or transformation.

### Syntax of Variadic Functions

Variadic functions are defined using the `.` symbol before the last parameter name. This last parameter collects all remaining arguments into a list.

```scheme
(define (function-name fixed-parameters . variadic-parameter)
  body-expression)
```

- **`fixed-parameters`:** Any required, fixed arguments that the function accepts.
- **`variadic-parameter`:** A special parameter preceded by `.` that collects additional arguments as a list.
- **`body-expression`:** The logic executed when the function is called.

### Examples of Variadic Functions

#### Basic Variadic Function

```scheme
(define (sum . numbers)
  (apply + numbers))
```

- **Explanation**:
  - `numbers` collects all arguments into a list.
  - `apply` applies the `+` function to all elements of the list.

**Usage**:
```scheme
(sum 1 2 3 4 5)  ; Returns 15
```

#### Variadic Function with Fixed Parameters

You can combine fixed parameters with a variadic parameter to create more flexible functions.

```scheme
(define (greet prefix . names)
  (map (lambda (name) (string-append prefix " " name)) names))
```

- **Explanation**:
  - `prefix` is a fixed argument.
  - `names` collects the remaining arguments into a list.
  - Each name is prefixed with the given string using `map` and `lambda`.

**Usage**:
```scheme
(greet "Hello" "Alice" "Bob" "Charlie")  ; Returns ("Hello Alice" "Hello Bob" "Hello Charlie")
```

#### Combining Fixed and Variadic Logic

```scheme
(define (describe-collection collection-name . items)
  (string-append collection-name ": " (string-join items ", ")))
```

- **Explanation**:
  - `collection-name` is a fixed parameter.
  - `items` collects additional arguments into a list.
  - The function concatenates the collection name and items into a single string.

**Usage**:
```scheme
(describe-collection "Fruits" "Apple" "Banana" "Cherry")
; Returns "Fruits: Apple, Banana, Cherry"
```

### Advanced Use Cases

#### Processing Arbitrary Inputs

Variadic functions excel at handling arbitrary data. Here’s an example for summing only positive numbers:

```scheme
(define (sum-positive . numbers)
  (apply + (filter (lambda (x) (> x 0)) numbers)))
```

- Filters out non-positive numbers before summing.

**Usage**:
```scheme
(sum-positive -5 3 7 -2 8)  ; Returns 18
```

#### Variadic Functions with Recursive Logic

```scheme
(define (max-value first . rest)
  (if (null? rest)
      first
      (max first (apply max rest))))
```

- **Explanation**:
  - `first` handles the first argument.
  - `rest` collects remaining arguments into a list.
  - Recursively calculates the maximum value.

**Usage**:
```scheme
(max-value 10 20 5 40 15)  ; Returns 40
```

### Benefits of Variadic Functions

- **Flexibility:** They handle a wide range of input cases.
- **Conciseness:** Reduce the need for multiple overloaded functions.
- **Dynamic Operations:** Enable runtime data processing without knowing argument counts beforehand.

### When to Use Variadic Functions

Use variadic functions when:

- The function needs to process an unknown number of arguments.
- A single operation applies to all inputs (e.g., summing, concatenating, or mapping).
- Simplifying higher-order logic with dynamic arguments.

Avoid variadic functions when:

- Input validation or type-checking is complex.
- Fixed arguments suffice for the required logic.
- Readability is compromised due to overly complex operations.

### Conclusion

Variadic functions in Script-Fu provide a robust mechanism for handling dynamic inputs. By understanding their syntax and usage, you can create flexible and powerful scripts that adapt to various scenarios. Combined with higher-order functions, variadic functions make your code more concise and expressive.

