---
title: Fundamentals
type: docs
weight: 2
---

## Introduction

In Script-Fu, every piece of code is an **expression** that evaluates to a value. This includes operations, function calls, and even control structures. For example:

```scheme
(+ 1 2)         ; Adds 1 and 2, resulting in 3  
(if #t 1 0)     ; Evaluates to 1 because the condition is true  
(list 1 2 3)    ; Creates a list of three elements: (1 2 3)  
```

This principle allows for a consistent and predictable approach to programming, where every part of your code contributes to the final result.

### Minimal Syntax

Scheme has a simple and uniform syntax based on **parentheses**. Each expression is enclosed in parentheses, with the operator or function name as the first element, followed by its arguments. For example:

```scheme
(+ 1 2)         ; A function call to add 1 and 2  
(define x 42)   ; Defines a variable `x` with the value 42  
```

This simplicity makes Scheme easy to learn and powerful for creating complex structures with minimal overhead.

### Dynamic Typing

Scheme is dynamically typed, meaning you don’t need to specify data types explicitly. Variables and function arguments can hold values of any type, making development fast and flexible.

```scheme
(define x 42)       ; x is a number  
(set! x "hello")    ; Now x is a string  
```

### Side Effects

Side effects occur when a function or operation modifies some state outside its scope or has observable interactions with its environment, such as altering image data, saving files, or displaying output. In **Script-Fu**, side effects are central to its functionality since its purpose is to manipulate visual content in GIMP.

#### Best Practices for Handling Side Effects

While side effects are necessary, managing them effectively ensures your scripts are maintainable and predictable:

- **Isolate Side Effects:** Encapsulate operations that cause side effects within well-defined functions to improve debugging and readability.
- **Use Descriptive Names:** Clearly name procedures to indicate they cause side effects (e.g., `apply-filter`, `save-image`).
- **Minimize Global State Changes:** Modify global settings (e.g., foreground/background colors) only when necessary, and restore them to avoid unintended behavior. Use `gimp-context-push` to store the global context before making temporary state changes, and `gimp-context-pop` to restore the original state afterward.

## Why These Fundamentals Matter

Understanding these core ideas is essential because they influence how you:

- **Write Code:** Scheme's minimalist syntax and functional approach encourage concise, reusable, and maintainable scripts.  
- **Solve Problems:** Recursive thinking and list manipulation become natural tools for processing data.  
- **Debug and Validate:** Consistent, expression-based evaluation makes it easier to track and debug issues.  

These principles are not only foundational to Scheme but also serve as guiding philosophies for writing effective Script-Fu scripts.
