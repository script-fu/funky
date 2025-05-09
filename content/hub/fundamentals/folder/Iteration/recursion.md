---
title: Simple Recursion
type: docs
weight: 5
---

## Introduction

Recursion is a powerful concept in Scheme, where a function calls itself to solve smaller sub-problems of the original problem. A **simple recursion** pattern involves a base case to stop the recursion and a recursive case to reduce the problem.

The general structure of a recursive function looks like this:

```
(define (function-name args)
  (if (base-condition)
    base-result
    (recursive-call)))
```

- **Base Condition**: Stops the recursion.
- **Base Result**: The value returned when the base condition is met.
- **Recursive Call**: A call to the function itself with modified arguments that move the computation closer to the base case.

---

### Example: Sum of Numbers (1 to n)

A simple recursive function to calculate the sum of numbers from 1 to n:

```
(define (sum-to-n n)
  (if (= n 0)                  ; Base case: stop when n is 0
    0                          ; Base result: sum is 0
    (+ n (sum-to-n (- n 1))))) ; Recursive call: sum current n with result of smaller problem
```

---

#### How It Works: Breaking Down and Reassembling

Recursion works by breaking down the original problem into smaller pieces. Each call to the function handles one piece and passes the rest along. Once the simplest case is reached, the results are reassembled as the computation completes.

#### Step-by-Step Trace of sum-to-n 3

1. **Initial Call**: *sum-to-n 3*  
   → *(+ 3 (sum-to-n 2))*

2. **Second Call**: *sum-to-n 2*  
   → *(+ 2 (sum-to-n 1))*

3. **Third Call**: *sum-to-n 1*  
   → *(+ 1 (sum-to-n 0))*

4. **Base Case**: *sum-to-n 0*  
   → *0*

---

#### Reassembling the Final Result

Once the simplest case is solved, each layer of the computation completes:

1. *sum-to-n 0* gives *0*
2. *sum-to-n 1* becomes *(+ 1 0) = 1*
3. *sum-to-n 2* becomes *(+ 2 1) = 3*
4. *sum-to-n 3* becomes *(+ 3 3) = 6*

---

### Example: Printing Each Element of a List

Here’s a simple recursive function to print every element in a list:

```
(define (print-elements lst)
  (if (null? lst)
    (gimp-message "done")
    (begin
      (gimp-message (number->string (car lst))) ; Print the first element
      (print-elements (cdr lst)))))             ; Process the rest of the list
```

- **Base Case:** If the list is empty (*null? lst*), stop recursion.
- **Recursive Case:** Print the first element (*car lst*), then call the function on the rest of the list (*cdr lst*).

#### Example Usage

```
(print-elements (list 1 2 3))
```

Output:

- *"1"*
- *"2"*
- *"3"*

Result: *"done"*

---

#### How It Works

1. The function retrieves the first element of the list using *car* and processes it.
2. It then calls itself with the rest of the list (*cdr*).
3. This process repeats until the list is empty (*null? lst*).

---

### Summary

- Simple recursion consists of:
  1. **Base case**: Stops the recursion.
  2. **Recursive case**: Reduces the problem toward the base case.
- Each recursive call progresses the computation toward completion.
- Once the base case is reached, the results are combined as the recursion completes.

Recursion mirrors the problem’s structure and provides a clear, logical flow. Always ensure a base case to avoid infinite recursion.
