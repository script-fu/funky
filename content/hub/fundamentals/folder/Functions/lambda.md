---
title: Lambda Functions
type: docs
weight: 1
---

## Introduction

**Lambda functions** in Script-Fu are anonymous functions, meaning they are functions without a name. These functions are defined inline and are typically used for short, one-off operations. The `lambda` construct is a powerful tool in functional programming, allowing you to create concise and flexible logic on the fly.

Lambda functions are especially useful when:

- You need a small function for a specific, temporary purpose.
- Passing functions as arguments to higher-order functions like `map`, `filter`, or `fold`.
- Returning functions from other functions.

### Syntax of Lambda Functions

Lambda functions can be defined on their own...

```scheme
(lambda (parameter1 parameter2 ...)
  body-expression)
```

...or invoked immediately:

```scheme
((lambda (parameter1 parameter2 ...)
   body-expression)
 argument1 argument2 ...)
```

- **`parameter1, parameter2, ...`:** The parameters the function accepts.
- **`body-expression`:** The logic executed when the function is called.
- **Immediate Invocation:** The second form shows a lambda being immediately called with arguments.

### Examples of Lambda Functions

#### Using Lambda for Simple Calculations

```scheme
((lambda (x y) (+ x y)) 3 5)  ; Returns 8
```

Here:

- A lambda function is created to add two numbers (`x` and `y`).
- The function is immediately invoked with the arguments `3` and `5`.

#### Inline Lambda Functions

The following example demonstrates how to use `for-each` with both a named function and a lambda function:

**Using a Named Function:**

```scheme
(define (print-item x)
  (gimp-message (number->string x)))

(for-each print-item (list 1 2 3 4))
```

- **Explanation**:
  - `print-item` is a named function that converts a number to a string (`number->string`) and prints it using `gimp-message`.
  - `for-each` applies `print-item` to each element in the list `(1 2 3 4)`.

**Output**: 1 2 3 4

**Using a Lambda Function:**

The same logic can be written inline with a lambda function, avoiding the need for a separate named function:

```scheme
(for-each (lambda (x) (gimp-message (number->string x)))
  (list 1 2 3 4))
```

- **Explanation**:
  - The `(lambda (x) (gimp-message (number->string x)))` defines an anonymous function.
  - This function is applied to each element of the list `(1 2 3 4)` by `for-each`.

**Output**: 1 2 3 4

#### Lambda Functions as Arguments

Lambda functions are often passed directly to higher-order functions like `map` or `filter`.

#### Squaring a List of Numbers

```scheme
(map (lambda (x) (* x x)) '(1 2 3 4))  ; Returns (1 4 9 16)
```

- The `lambda` function squares each element of the list.
- The `map` function applies the `lambda` to each element.

#### Lambda Functions as Return Values

You can return a lambda function from another function to create dynamic behavior.

#### Generating an Adder Function

```scheme
(define (make-adder n)
  (lambda (x) (+ x n)))

(define add5 (make-adder 5))
(add5 10)  ; Returns 15
```

- `make-adder` generates a new lambda function that adds a specific number (`n`).
- The returned lambda is stored in `add5`, which adds `5` to its input.

#### Using Lambda with `let`

Lambdas are often used with `let` to create locally scoped, temporary functions.

#### Local Lambda for Addition

```scheme
(let ((add (lambda (a b) (+ a b))))
  (add 3 4))  ; Returns 7
```

- The `let` binds a lambda function to the name `add`.
- The lambda is then used as a normal function within the `let` scope.

#### Combining Lambdas with Higher-Order Functions

Lambdas shine when combined with higher-order functions to perform complex data transformations.

#### Filtering Even Numbers

```scheme
(filter (lambda (x) (= (modulo x 2) 0)) '(1 2 3 4 5 6))  ; Returns (2 4 6)
```

- The `lambda` checks if a number is even.
- The `filter` function uses the lambda to keep only even numbers from the list.

### Benefits of Lambda Functions

- **Conciseness:** Lambdas reduce boilerplate code by removing the need to define separate named functions.
- **Flexibility:** You can define and use them wherever they are needed, making code more modular.
- **Improved Readability:** For short, specific tasks, lambdas make the intent clear without cluttering the code with additional named functions.

### When to Use Lambda Functions

Use lambda functions when:

- The logic is short and self-contained.
- The function is only needed temporarily or within a specific scope.
- You are working with higher-order functions like `map`, `filter`, or `reduce`.

Avoid using lambdas for complex, multi-line logic, as this can reduce readability. For more extensive operations, use a named function instead.

### Conclusion

Lambda functions in Script-Fu provide a concise and powerful way to define anonymous functions for specific tasks. Their flexibility and ease of use make them an essential tool for any Script-Fu programmer. Understanding how to use `lambda` effectively will help you write cleaner, more modular, and efficient scripts.
