---
title: if
type: docs
weight: 4
---

## The if Conditional

In its simplest form, the `if` conditional in Scheme evaluates a test and, based on the result, executes one of two possible code blocks. The simplest form looks like this:

```scheme
(if test-is-true
  do-this)
```

- If the `test` evaluates to true (`#t`), the **code block in the consequent** is executed. The block may return a value or perform other actions, such as assigning a variable or printing output.

### Example

```scheme
(if (< 0 1)
  (gimp-message "True!"))
```

- In this case, the `test` is `(< 0 1)` (checking if 0 is less than 1).  
- Since the test evaluates to true (`#t`), the code block `(gimp-message "True!")` is executed, which prints `"True!"`.

### Adding an Else Condition: `if-else`

When using an `if` conditional with an alternative code block (the `else` case), the structure looks like this:

```scheme
(if test
  do-this
  else-do-this)
```

- If the `test` evaluates to true (`#t`), the **consequent** code block is executed.  
- If the `test` evaluates to false (`#f`), the **alternative** code block is executed.

```scheme
(if test
  consequent
  alternative)
```

### How It Works

1. **Test Expression**:
   - The `test` expression is evaluated first. 

2. **Result Based on Test**:
   - If the `test` evaluates to true (`#t`), the **consequent code block** is executed.
   - If the `test` evaluates to false (`#f`), the **alternative code block** is executed.

Both the `consequent` and `alternative` code blocks can perform any valid Scheme operation, including returning values, modifying variables, or running procedures.

### Examples

#### Example 1: Returning a Value

```scheme
(if (< 0 1)
  1
  0)
```

- Here, the `test` is `(< 0 1)` (checking if 0 is less than 1).  
- Since the test evaluates to true (`#t`), the **consequent** block (`1`) is executed and its value is returned.  

Result: **1**

#### Example 2: Evaluating a begin Block

In cases where you need to perform multiple actions when the condition is true or false, you can use `begin` or a `let` to group them together. 

```scheme
(if (= 0 1)
  (begin
    (gimp-message "This won't run")
    1)
  (begin
    (gimp-message "False condition met, calculating...")
    (* 3 4)))
```

- In this example, the `test` is `(= 0 1)` (checking if 0 equals 1).  
- Since the test evaluates to false (`#f`), the **alternative** block is executed:
  - First, it prints `"False condition met, calculating..."`.  
  - Then, it calculates `(* 3 4)` and returns `12`.

Result: **Prints "False condition met, calculating..." and returns 12.**

#### Example 3: Evaluating a let Statement

Using a `let` allows us to declare local scope variables withing the code block.

```scheme
(if (= 1 1)
  (let (x -1)
    (gimp-message "True condition met, calculating...")
    (* x 10))
  (let (y 4)
    (gimp-message "This won't run")
    (* 3 y)))
```

- In this example, the `test` is `(= 1 1)` (checking if 1 equals 1).  
- Since the test evaluates to true (`#t`), the **consequent** block is executed:
  - First, it prints `"True condition met, calculating..."`.  
  - Then, it calculates `(* -1 10)` and returns `-10`.

Result: **Prints "True condition met, calculating..." and returns -10.**

### Summary

- The `if` conditional is a powerful tool in Scheme for evaluating tests and executing corresponding code blocks.  
- It can handle both simple expressions and complex code blocks that return values, modify variables, or perform side effects.  
- Remember: If there is no explicit `else` block, the `if` only evaluates and executes the **consequent** if the test is true. Otherwise it evaluates and executes the **alternative**.

