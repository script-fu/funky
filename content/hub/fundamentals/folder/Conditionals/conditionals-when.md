---
title: when
type: docs
weight: 5
---

## Introduction

In Scheme, while `if` is elegant and versatile, it can become confusing when used without an explicit `else`. This is particularly true when the intention is to execute a single branch of code only when a condition is true, with no alternative action for the `false` case. In such scenarios, the `when` construct provides a clearer and more concise alternative.

The basic form of `when` looks like this:

```
(when test-is-true
  do-this
  do-that)
```

- If the `test` evaluates to true (`#t`), all the expressions in the body of the `when` construct are executed sequentially.  
- If the `test` evaluates to false (`#f`), nothing happens, and no values are returned.

### Example

```
(when (< 0 1)
  (gimp-message "Condition is true!")
  (gimp-message "Executing additional actions."))
```

### Contrasting `if` and `when`

To better understand the difference between `if` and `when`, consider the following example where both are used together:

```
(if (= 0 1)
  (gimp-message "This will not run")
  (when (< 0 1)
    (gimp-message "The 'when' condition is true!")
    (gimp-message "Executing multiple actions within 'when'.")))
```

#### Explanation:

1. **The `if` Condition**:
   - The test `(= 0 1)` checks if 0 is equal to 1.
   - Since this is false (`#f`), the `else` branch of the `if` is executed.

2. **The `when` Construct in the `else` Branch**:
   - The `when` test `(< 0 1)` checks if 0 is less than 1.
   - Since this is true (`#t`), all the expressions within the body of the `when` are executed sequentially:
     - First, it prints `"The 'when' condition is true!"`.
     - Then, it prints `"Executing multiple actions within 'when'."`.

#### Why Use `when` Here?

- Using `when` instead of another `if` simplifies the logic when there is no need for an explicit `else` branch for the condition.
- `when` makes it clear that only the true branch is relevant, reducing potential confusion.

### Summary

- Use `if` when you need both a true and false branch.  
- Use `when` when there is only a single branch for the true case, especially when multiple actions need to be executed.
- Combining `if` and `when` can help structure more complex conditionals clearly and concisely.
