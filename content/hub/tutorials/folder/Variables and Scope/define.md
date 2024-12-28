---
title: define
type: docs
weight: 3
---

## Introduction

The `define` statement in Scheme is a versatile construct used to create global or local bindings. It is most commonly used to define variables and functions, making them reusable and accessible throughout a script or within a specific scope. Understanding `define` is crucial for writing modular, reusable, and readable Scheme programs.

### Purpose of `define`

The `define` construct serves multiple purposes:
- **Defining Variables**: Assigns values to variable names, making them available for later use.
- **Defining Functions**: Creates reusable procedures that encapsulate specific logic.
- **Local Definitions**: When used within a function, `define` creates local bindings that do not affect the global namespace.

---

### Defining Variables with `define`

A basic use of `define` is to create variables that hold constant or computed values.

#### Syntax
```scheme
(define variable-name value)
```

#### Example: Defining a Constant
```scheme
(define pi 3.14159)
(* pi 2) ;; Computes 2π
```

**Result**: `6.28318`

---

### Defining Functions with `define`

You can use `define` to create reusable procedures.

#### Syntax
```scheme
(define (function-name parameter1 parameter2 ...)
  body-expression)
```

#### Example: Defining a Simple Function
```scheme
(define (square x)
  (* x x))
(square 4) ;; Computes 4²
```

**Result**: `16`

---

### Local Definitions with `define`

When used inside a function, `define` creates local bindings that are accessible only within the enclosing function. This avoids polluting the global namespace and helps organize your code.

#### Example: Local Helper Functions
```scheme
(define (process-values a b c)
  (define (square x) (* x x))  ;; Local helper function
  (define (cube x) (* x x x))  ;; Local helper function
  (+ (square a) (cube b) (square c)))
(process-values 2 3 4)
```

**Result**: `41` (Calculates \(2^2 + 3^3 + 4^2\))

---

### Key Features of `define`

1. **Global or Local Scope**:
   - When used at the top level, `define` creates global variables or functions.
   - When used inside another function, `define` creates local bindings.

2. **Reusability**:
   - Functions defined with `define` can be reused multiple times in different contexts.

3. **Improved Readability**:
   - Breaking logic into smaller, well-named functions improves the clarity and maintainability of your code.

---

### Differences Between `define` and `let`

| **Aspect**              | **`define`**                                     | **`let`**                              |
|-------------------------|--------------------------------------------------|----------------------------------------|
| **Purpose**             | Creates global or local bindings for variables or functions. | Creates temporary bindings in a localized scope. |
| **Scope**               | Global when at the top level; local when inside another function. | Always local to the `let` block.       |
| **Reusability**         | Functions and variables can be reused in multiple places. | Variables are bound temporarily for a single block. |
| **Syntax**              | Explicitly defines variables or functions.       | Combines variable binding with expression evaluation. |

