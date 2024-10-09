---
title: Refactor Again
type: docs
weight: 5
---

## Introduction

Crikey, that library function has turned into some kind of monster! It’s tricky to understand what is going on without entering a deep state of concentration. Luckily, we can refactor again!

### Breaking Down Complexity

To make the function easier to follow and maintain, we can break it down into smaller, focused functions. Each of these functions can handle a single responsibility, which will make the overall code cleaner and more understandable. Let's start by separating the validation and message-handling logic.

### Create a Validation Function

We can take the part of the function that validates the `message` and `output` arguments and move it into a separate function. This way, the core `send-message` function doesn’t need to worry about validation, making it easier to follow.

```scheme
(define (validate-message message output)
  ;; Check if the message is a non-empty string
  (if (or (not (string? message)) (string=? message ""))
      (error "Message must be a non-empty string"))

  ;; Check if the output is one of the expected destinations
  (if (not (member output '(gui error-console terminal)))
      (error "Invalid output destination: " output)))
```

### Simplify the Message Sending

Now that the validation has been moved to a separate function, the `send-message` function can focus on just sending the message. It will be much simpler, as it only handles the specific task of directing the message to the correct destination.

```scheme
(define (send-message message output)
  ;; Call the validation function before proceeding
  (validate-message message output)

  (cond
    ;; Send to the Error Console
    ((eq? output 'error-console)
       (gimp-message-set-handler 2)
       (gimp-message message))

    ;; Send to the GUI dialog box
    ((eq? output 'gui)
       (gimp-message-set-handler 0)
       (gimp-message message))

    ;; Send to the terminal window
    ((eq? output 'terminal)
       (display message)))

  ;; Restore the default message handler to the Error Console
  (gimp-message-set-handler 2))
```

### Breaking Down Further: Separate Each Output Handler

Each type of message output (GUI, Error Console, Terminal) can be moved into its own function. This allows for easier testing, modification, and potential extension in the future.

```scheme
(define (send-to-gui message)
  (gimp-message-set-handler 0)
  (gimp-message message))

(define (send-to-error-console message)
  (gimp-message-set-handler 2)
  (gimp-message message))

(define (send-to-terminal message)
  (display message))

(define (send-message message output)
  ;; Send to the appropriate output
  (cond
    ((eq? output 'error-console) (send-to-error-console message))
    ((eq? output 'gui) (send-to-gui message))
    ((eq? output 'terminal) (send-to-terminal message)))

  ;; Restore the default message handler to the Error Console
  (gimp-message-set-handler 2))
```

### Reusing Validation in Each Send Function

Since validation is an important part of ensuring that both the message and output are correct, it makes sense for each `send-*` function to perform its own validation. This ensures that no matter which output is called, we always check the inputs first.

```scheme
(define (send-to-gui message)
  ;; Validate the message before proceeding
  (validate-message message 'gui)
  (gimp-message-set-handler 0)
  (gimp-message message))

(define (send-to-error-console message)
  ;; Validate the message before proceeding
  (validate-message message 'error-console)
  (gimp-message-set-handler 2)
  (gimp-message message))

(define (send-to-terminal message)
  ;; Validate the message before proceeding
  (validate-message message 'terminal)
  (display message))
```

See that we've removed the validation from the send-message function and shifted the responsibility to each individual output function. This change ensures that each destination (GUI, Error Console, Terminal) handles its own validation, streamlining the send-message function and keeping the validation logic closer to where it's needed.

This approach can simplify the send-message function, making it a _dispatcher_, while ensuring that each send-to-* function validates the message correctly before processing.

By moving the validation into each send-to-* function, we’ve made them reusable as standalone functions. This means we can call any of the send-to-gui, send-to-error-console, or send-to-terminal functions directly without relying on the send-message dispatcher function. Each of these functions now fully handles its own logic and can be used independently in other parts of the code or in other plug-ins, making your code more modular and flexible.

## Benefits of Refactoring

- **Clear Separation of Concerns**: Each function now handles only one responsibility, making the code easier to understand.
- **Extensibility**: Adding new output types is straightforward. You simply define a new function like `send-to-file` or `send-to-logger`, and then add a case in the `cond` statement.
- **Reusability**: Each of these output handling functions can be reused elsewhere in your project or shared among multiple plug-ins.
- **Consistency**: By reusing the validation function in each `send-to-*` function, you ensure that all outputs are properly validated, making the code more robust.

A refactored library version:

```scheme
;; Purpose: Sends a message to the GUI dialog box
(define (send-to-gui message)
  ;; Validate the message before proceeding
  (validate-message message 'gui)
  (gimp-message-set-handler 0)
  (gimp-message message))

;; Purpose: Sends a message to the Error Console
(define (send-to-error-console message)
  ;; Validate the message before proceeding
  (validate-message message 'error-console)
  (gimp-message-set-handler 2)
  (gimp-message message))

;; Purpose: Sends a message to the terminal window
(define (send-to-terminal message)
  ;; Validate the message before proceeding
  (validate-message message 'terminal)
  (display message))

;; Purpose: Dispatches a message to the appropriate output destination
(define (send-message message output)
  (cond
    ((eq? output 'error-console) (send-to-error-console message))
    ((eq? output 'gui) (send-to-gui message))
    ((eq? output 'terminal) (send-to-terminal message)))

  ;; Restore the default message handler to the Error Console
  (gimp-message-set-handler 2))

;; Purpose: Validates that the message is a non-empty string and the output is valid
(define (validate-message message output)
  ;; Check if the message is a non-empty string
  (if (or (not (string? message)) (string=? message ""))
      (error "Message must be a non-empty string"))

  ;; Check if the output is one of the expected destinations
  (if (not (member output '(gui error-console terminal)))
      (error "Invalid output destination: " output)))
```

Is that all we can do? No! there's more to be done, please read on.
