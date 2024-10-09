---
title: Return Values
type: docs
weight: 8
---

## Introduction

I forgot to mention return values! A function returns a value, and we can decide what this value is by making the last line of code in the function execute a particular value. Let's look at one of our validation functions, (is-valid-string?)

### What is a Return Value?

In Scheme, the return value of a function is determined by the last expression that the function evaluates. This means whatever the last line of code in the function evaluates to will be returned as the result of the function. If no value is explicitly returned, the function returns `#f` (false) or `undefined`.

Let’s revisit the validation function, (is-valid-string?)

```scheme
;; Purpose: Validates that the message is a non-empty string
(define (is-valid-string? message)
  ;; Check if the message is a non-empty string
  (if (or (not (string? message)) (string=? message ""))
    (error "Message must be a non-empty string")))
```

In this function, if the message is invalid, an error is thrown. However, if the message is valid, no explicit return value is given, and the function returns `#f` by default.

### Making Return Values Explicit

We can improve this by making the return value more explicit. For example, we could return `#t` (true) if the message is valid:

```scheme
;; Purpose: Validates that the message is sent to a valid output
(define (is-valid-output-display? output)
  ;; Check if the output is one of the expected display destinations
  (if (not (member output '(dialog-box status-bar error-console terminal)))
    (error "Invalid output destination: " output)
    #t))
```

In this version, the function will return `#t` when the message is valid, providing a clear result. This allows the function to be used more flexibly in other contexts where a boolean result is needed.

### Using Return Values Effectively

By deciding what our functions return, we can make them more predictable and useful. Returning values like `#t`, `#f`, or a specific result gives us more control over how the function interacts with the rest of the code. For instance, you can use the return value to make further decisions in the calling function or pass it as an argument to another function.

Here’s a simple example of using a return value to control the flow of logic:

```scheme
;; Purpose: Dispatches a message to the appropriate output destination
(define (send-message message output)
  (if (is-valid-output-display? output)
    (cond
      ((eq? output 'error-console) (send-to-error-console message))
      ((eq? output 'dialog-box) (send-to-dialog-box message))
      ((eq? output 'status-bar) (send-to-status-bar message))
      ((eq? output 'terminal) (send-to-terminal message)))))
```

In this case, (send-message) relies on the return value of (is-valid-output-display?) to decide whether to continue.
The conditional statement `cond` will be skipped if the first test fails. Also, notice how it reads in a fairly natural way, if is valid output display?

## If Statement Logic in Scheme

Before we dive into the refactored library example, let's quickly review how conditional logic works in Scheme. Scheme uses `if` statements to perform different actions based on whether a condition is true or false.

Here’s a simple form of an `if` statement:

```scheme
(if (conditional test)
  do if true
  do if false)
```

This structure checks the condition, and if the condition is true, it executes the first action. If the condition is false, it executes the second action.

In cases where you need to perform multiple actions when the condition is true or false, you can use `begin` to group them together:

```scheme
(if (conditional test)
  (begin
    do if true)
  (begin
    do if false))
```

This allows you to handle more complex situations, where multiple expressions or statements need to be executed depending on the outcome of the conditional test.

Okay, here is the library code with return values embedded and used to control the executing process.

### Refactored with Return Values

```scheme
;; Purpose: Sends a message to the status bar, returns #t if successful
(define (send-to-status-bar message)
  (if (is-valid-string? message)
    (begin
      (gimp-message-set-handler MESSAGE-BOX)
      (gimp-message message)
      (gimp-message-set-handler ERROR-CONSOLE)
      #t)
    #f))

;; Purpose: Sends a message to the dialog box, returns #t if successful
(define (send-to-dialog-box message)
  (if (is-valid-string? message)
    (begin
      (gimp-message-set-handler MESSAGE-BOX)
      (gimp-message (string-append message "\n"))
      (gimp-message-set-handler ERROR-CONSOLE)
      #t)
    #f))

;; Purpose: Sends a message to the error console, returns #t if successful
(define (send-to-error-console message)
  (if (is-valid-string? message)
    (begin
      (gimp-message-set-handler ERROR-CONSOLE)
      (gimp-message message)
      #t)
    #f))

;; Purpose: Sends a message to the terminal, returns #t if successful
(define (send-to-terminal message)
  (if (is-valid-string? message)
    (begin
      (display message)
      (gimp-message-set-handler ERROR-CONSOLE)
      #t)
    #f))

;; Purpose: Dispatches a message to the appropriate output, returns #t if successful
(define (send-message message output)
  (if (is-valid-string-output? output)
    (cond
      ((eq? output 'error-console) (send-to-error-console message))
      ((eq? output 'dialog-box) (send-to-dialog-box message))
      ((eq? output 'status-bar) (send-to-status-bar message))
      ((eq? output 'terminal) (send-to-terminal message)))
    #f))

;; Purpose: Validates that the message is a non-empty string, returns #t if valid
(define (is-valid-string? message)
  (if (or (not (string? message)) (string=? message ""))
    (begin
      (error "Message must be a non-empty string")
      #f)
    #t))

;; Purpose: Validates that the output is a valid destination, returns #t if valid
(define (is-valid-string-output? output)
  (if (not (member output '(dialog-box status-bar error-console terminal)))
    (begin
      (error "Invalid output destination: " output)
      #f)
    #t))
```

## Conclusion

Return values are a fundamental part of making functions flexible and reusable. By carefully deciding what each function should return, we can ensure our functions interact well with each other and provide useful information to the rest of the code. Whether it’s returning `#t` or `#f`, or something more specific, return values give us a way to control the flow of our programs and handle various outcomes.
