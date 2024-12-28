---
title: cond
type: docs
weight: 5
---

## Introduction

In Scheme, the `cond` conditional is used for selecting one of several possible blocks of code to execute, based on multiple tests. It is like a multi-branch `if`, where each branch is checked in order until a match is found.

### Syntax

```scheme
(cond
  (test-1 consequent-1)
  (test-2 consequent-2)
  ...
  (else fallback-consequent))
```

- Each test is evaluated in the order they are written.
- When a test evaluates to true (`#t`), its corresponding **consequent** is executed, and the `cond` expression stops evaluating further tests.
- The `else` clause is optional and serves as a fallback if none of the tests evaluate to true.

### How It Works

1. **Test Each Condition**:
   - `cond` evaluates the tests in the order they are listed.

2. **Execute the Matching Consequent**:
   - When the first test that evaluates to true (`#t`) is found, its **consequent** is executed.
   - If no tests evaluate to true and there is an `else` clause, the **fallback-consequent** is executed.

### Examples

#### Example 1: Single Expression Consequents

```scheme
(cond
  ((< 3 2) "This won't run")
  ((= 3 3) "This will run")
  (else "Fallback"))
```

- The first test `(< 3 2)` evaluates to false (`#f`).
- The second test `(= 3 3)` evaluates to true (`#t`), so `"This will run"` is returned.
- The `else` clause is not executed because a match was already found.

Result: **"This will run"**

#### Example 2: Multiple Actions Using `begin`

When a consequent involves multiple actions, use `begin` to group them:

```scheme
(cond
  ((< 5 3) 
    (begin
      (gimp-message "This won't run")
      (* 2 3)))
  ((> 5 3) 
    (begin
      (gimp-message "Condition met")
      (* 5 5)))
  (else 
    (begin
      (gimp-message "Fallback")
      0)))
```

- The first test `(< 5 3)` evaluates to false (`#f`).
- The second test `(> 5 3)` evaluates to true (`#t`):
  - It prints `"Condition met"`.
  - Then it calculates `(* 5 5)` and returns `25`.

Result: **Prints "Condition met" and returns 25.**

#### Example 3: Using a `let` Block in a Consequent

When you need to introduce local variables, use a `let` block:

```scheme
(cond
  ;; Case 1: If 0 is less than -1
  ((< 0 -1) 
    (let ((x 10))  
      (* x x)))    

  ;; Case 2: If 0 is greater than -1
  ((> 0 -1) 
    (let ((y 20))  
      (gimp-message "Positive condition met")  
      (+ y y)))    

  ;; Default case: If none of the above conditions are met
  (else 
    (let ((z 0))   
      z)))         
```

- The first test `(< 0 -1)` is false.
- The second test `(> 0 -1)` is true, so:
  - A `let` block is executed, binding `y` to `20`.
  - It prints `"Positive condition met"`.
  - Then it calculates `(+ y y)` and returns `40`.

Result: **Prints "Positive condition met" and returns 40.**

#### Example 4: Fallback with `else`

```scheme
(cond
  ((< 5 3) "This won't run")
  ((= 5 3) "This won't run either")
  (else "Fallback value"))
```

- Neither of the first two tests evaluates to true.
- The `else` clause is executed and returns `"Fallback value"`.

Result: **"Fallback value"**

### Summary

- Use `cond` for handling multiple conditions in a clear and concise manner.
- Consequents can be single expressions or grouped actions using `begin`.
- Use `let` in consequents to declare local variables for calculations.
- Always include an `else` clause as a fallback to handle unexpected cases.

This flexibility makes `cond` a powerful and readable tool for handling complex branching logic.
