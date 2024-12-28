---
title: let
type: docs
weight: 4
---

## Introduction

The name `let` is used because it reflects its mathematical origins of introducing temporary bindings, as in _"Let \( x = 2 \) and \( y = 3 \)"_.

A `let` statement in Scheme is a **binding construct** used to define variables within a localized scope. It allows you to create temporary bindings for variables and then execute a block of code using those bindings. This is particularly useful for keeping code modular and avoiding global variable pollution.

There are three main forms of `let` in Scheme:

- **`let`**: Standard let for creating simple local bindings.
- **`let*`**: Sequential let, where bindings can depend on the results of previous bindings.
- **Named `let`**: A special form of `let` that creates recursive loops or named procedures.

In its simplest form, `let` creates local variable bindings and evaluates an expression with those bindings.

```scheme
(let ((variable1 value1)
      (variable2 value2))
  expression)
```

- **Bindings**: A list of pairs where each pair assigns a `value` to a `variable`.
- **Expression**: The body of the `let`, which can use the locally defined variables.

### Example

```scheme
(let ((x 10)
      (y 20))
  (+ x y))
```

- This defines two local variables, `x` (10) and `y` (20).  
- It then computes `(+ x y)` using these variables.  

**Result**: `30`

---

## The `let*` Construct

The `let*` construct is similar to `let`, but bindings are evaluated **sequentially**. This means later bindings can depend on earlier ones.

```scheme
(let* ((variable1 value1)
       (variable2 expression-using-variable1))
  expression)
```

### Example

```scheme
(let* ((x 10)
       (y (+ x 5)))
  (* x y))
```

- The first binding assigns `10` to `x`.  
- The second binding calculates `y` as `(+ x 5)`, using the value of `x`.  
- The body computes `(* x y)`.

**Result**: `150`

---

## Named `let`

A named `let` is a special form of `let` that provides a name for the `let` block itself, turning it into a recursive procedure. This is useful for creating loops or recursive computations.

```scheme
(let name ((variable1 initial-value1)
           (variable2 initial-value2))
  body-expression)
```

- **Name**: The `let` block is given a name, effectively defining a function.  
- **Bindings**: Initial values for variables, similar to a standard `let`.  
- **Body**: The expression can call the named `let` recursively.

### Example: Looping with Named `let`

```scheme
(let loop ((n 5)
           (result 1))
  (if (= n 0)
      result
      (loop (- n 1) (* result n))))
```

- The `loop` function starts with `n = 5` and `result = 1`.  
- If `n` is `0`, it returns the `result`.  
- Otherwise, it calls itself recursively with `n - 1` and `result * n`.

**Result**: `120` (Factorial of 5)

---

## Summary Table

| Construct  | Description                              | Use Case                                                                 |
|------------|------------------------------------------|--------------------------------------------------------------------------|
| **`let`**  | Defines local bindings for variables.    | Use when all bindings are independent and do not rely on each other.     |
| **`let*`** | Defines sequential local bindings.       | Use when later bindings depend on the results of earlier ones.           |
| **Named `let`** | Defines recursive local procedures. | Use for loops, iterative computations, or recursion in a local context. |

---

## Examples

### Using `let` for Local Computation

```scheme
(let ((x 2)
      (y 3))
  (+ (* x x) (* y y)))
```

**Result**: `13` (Calculates `x² + y²`)

---

### Using `let*` for Sequential Dependencies

```scheme
(let* ((x 2)
       (y (* x x))
       (z (* y x)))
  z)
```

**Result**: `8` (Calculates `x³`)

---

### Using Named `let` for Recursive Computation

```scheme
(let factorial ((n 5)
                (result 1))
  (if (= n 0)
      result
      (factorial (- n 1) (* result n))))
```

**Result**: `120` (Factorial of 5)

---

By using `let`, `let*`, and named `let`, Scheme enables modular, recursive, and sequential programming with clear scoping rules.
