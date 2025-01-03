---
title: Simple Recursion
type: docs
weight: 5
---

## Introduction

Recursion is a powerful concept in Scheme, where a function calls itself to solve smaller sub-problems of the original problem. A **simple recursion** pattern involves a base case to stop the recursion and a recursive case to reduce the problem.

The general structure of a recursive function looks like this:

```scheme
(define (function-name args)
  (if (base-condition)
    base-result
    (recursive-call)))
```

- **Base Condition**: Stops the recursion.
- **Base Result**: The value returned when the base condition is met.
- **Recursive Call**: A call to the function itself with smaller arguments.

---

### Understanding the Stack

When a recursive function is called, each call is added to the **call stack**, where it waits for the base case to return a value. Once the base case is reached, the stack begins to **unwind**, resolving each call in reverse order.

### Example: Sum of Numbers (1 to n)

A simple recursive function to calculate the sum of numbers from 1 to n:

```scheme
(define (sum-to-n n)
  (if (= n 0)                  ; Base case: stop when n is 0
    0                          ; Base result: sum is 0
    (+ n (sum-to-n (- n 1))))) ; Recursive call: sum current n with result of smaller problem
```

---

#### How It Works: Backtracking and Unwinding

Recursion involves **backtracking** and **unwinding**. When a recursive function is called, each call creates a stack frame where its arguments and operations are stored. These frames remain unresolved until the base case is reached. Once the base case is hit, the function **unwinds** by resolving each stack frame, combining results as it returns.

#### Step-by-Step Trace of sum-to-n 3

1. **Initial Call**: sum-to-n 3
   - (if (= 3 0) 0 (+ 3 (sum-to-n 2)))
   - Waits for sum-to-n 2.

2. **Second Call**: sum-to-n 2
   - (if (= 2 0) 0 (+ 2 (sum-to-n 1)))
   - Waits for sum-to-n 1.

3. **Third Call**: sum-to-n 1
   - (if (= 1 0) 0 (+ 1 (sum-to-n 0)))
   - Waits for sum-to-n 0.

4. **Base Case**: sum-to-n 0
   - (if (= 0 0) 0)
   - Returns 0 to the previous call.

---

#### Unwinding: Resolving Calls in Reverse Order

Once the base case is hit, the function begins to **unwind**, combining results:

1. sum-to-n 0: Returns 0.
2. sum-to-n 1: (+ 1 0) = 1.
3. sum-to-n 2: (+ 2 1) = 3.
4. sum-to-n 3: (+ 3 3) = 6.

---

#### Visualizing the Stack

1. **Backtracking (Stack Growth)**:
   - Each call to sum-to-n is added to the stack:

```scheme
sum-to-n 3 -> sum-to-n 2 -> sum-to-n 1 -> sum-to-n 0
```

2. **Unwinding (Stack Reduction)**:
   - Stack frames are resolved in reverse order:

```scheme
sum-to-n 0 -> sum-to-n 1 -> sum-to-n 2 -> sum-to-n 3
```

---

### Example: Printing Each Element of a List

Here’s a simple recursive function to print every element in a list:

```scheme
(define (print-elements lst)
  (if (null? lst)
    (gimp-message "done")
    (begin
      (gimp-message (number->string (car lst))) ; Print the first element
      (print-elements (cdr lst)))))             ; Process the rest of the list
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

### Summary

- Simple recursion consists of:
  1. **Base case**: Stops the recursion.
  2. **Recursive case**: Reduces the problem toward the base case.
- **Backtracking**: Each recursive call is added to the stack and waits for the base case.
- **Unwinding**: The stack resolves in reverse order, combining results.

Recursion mirrors the problem's structure elegantly but may use more memory than iteration due to the stack. Always ensure a base case to avoid infinite recursion.
