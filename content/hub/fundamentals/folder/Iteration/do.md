---
title: do
type: docs
weight: 5
---

## Introduction

The `do` construct in Scheme is a looping mechanism that allows iteration with initialization, update, and termination conditions. It is particularly useful when you need to perform a sequence of operations a specific number of times or until a condition is met.

The general form of `do` is:

```scheme
(do ((var1 init1 update1)
     (var2 init2 update2)
     (var3 init3 update3))
    (termination-condition result)
  body)
```

- **Variable**: The loop variable(s).
- **Initial-value**: The starting value of each loop variable.
- **Update-expression**: The expression to update the loop variable(s) at the end of each iteration.
- **Termination-condition**: The condition to stop the loop.
- **Result-expression**: The value to return when the loop terminates.
- **Body**: The code to execute in each iteration.

---

### Example: Sum the Numbers from 1 to 5

```scheme
(do ((i 1 (+ i 1))      ; Initialize i to 1, increment by 1
     (sum 0 (+ sum i))) ; Initialize sum to 0, add i to sum
    ((> i 5) sum)       ; Terminate when i > 5, return sum
  (gimp-message (number->string sum))) ; Print sum at each step
```

- The loop variable `i` starts at 1 and increments by 1 in each iteration.
- The variable `sum` accumulates the sum of `i`.
- The loop terminates when `i > 5`, returning the final value of `sum`.

**Output**: `15`

---

### How It Works

1. **Initialization**:
   - Each loop variable is assigned its initial value.

2. **Termination Check**:
   - At the start of each iteration, the termination condition is checked. If true, the loop stops and the result expression is evaluated.

3. **Iteration**:
   - If the termination condition is false, the body is executed, and the loop variables are updated using their respective update expressions.

---

### Summary

- The `do` construct provides a flexible way to implement loops with multiple variables and complex termination conditions.
- It is useful for tasks that require state updates across iterations.
- The termination condition determines when the loop ends and can return a final result.

By using `do`, you can implement iterative algorithms in Scheme with precise control over initialization, updates, and termination. This makes `do` a combination of a **scoped binding mechanism** (like `let`) and an **iterative control structure**, enabling it to handle looping and temporary state in a clean, concise way.
