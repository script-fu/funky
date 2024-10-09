---
title: Validation
type: docs
weight: 4
---

## Introduction

When building robust plug-ins, it’s important to ensure that our functions handle errors gracefully and work as expected, even in cases of misuse or unexpected inputs. Validation helps protect the integrity of the function and prevent crashes or unintended behavior.

Let’s look at how we can improve the `send-message` function by adding validation checks to ensure it handles inputs correctly.

### Validate Inputs

Before sending a message, we should ensure the `output` argument passed to the `send-message` function is valid. We can add a check to confirm that the output destination is one of the expected values (gui, error-console, or terminal).

Example:

```scheme
(define (send-message message output)
  ;; Validate the output argument
  (if (not (member output '(gui error-console terminal)))
    (error "Invalid output destination: " output)
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
         (display message))))

  ;; Restore the default message handler to the Error Console
  (gimp-message-set-handler 2))
```

In this example, we use `member` to check if the `output` argument is valid. If not, the function raises an error with a clear message, preventing invalid values from causing issues.

### Handle Empty Messages

It’s also useful to ensure that the `message` argument is valid. For example, if an empty string or #f (false) is passed as the message, the function should handle this gracefully.

Example of handling an empty message:

```scheme
(define (send-message message output)
  ;; Check if the message is empty
  (if (or (not message) (string=? message ""))
    (error "Message cannot be empty")
    (cond
      ((eq? output 'error-console)
         (gimp-message-set-handler 2)
         (gimp-message message))
      ((eq? output 'gui)
         (gimp-message-set-handler 0)
         (gimp-message message))
      ((eq? output 'terminal)
         (display message))))

  (gimp-message-set-handler 2))
```

This approach ensures that the function always receives valid input, improving its reliability and preventing unexpected behavior.

### Combined Validation Example

```scheme
;; Function to handle message output to various destinations
(define (send-message message output)

  ;; Validate the message and output arguments
  (if (or (not (string? message)) (string=? message ""))
    (error "Message must be a non-empty string")
    (if (not (member output '(gui error-console terminal)))
      (error "Invalid output destination: " output)
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
           (display message)))))

  ;; Restore the default message handler to the Error Console
  (gimp-message-set-handler 2))
```

In this version:
- The function checks if the `message` is empty or invalid first. If the message is valid, it moves on to checking if the `output` is one of the accepted values (`gui`, `error-console`, or `terminal`).
- If both checks pass, the message is sent to the appropriate output. Otherwise, an error message is raised with a clear explanation.
- An additional check is made to ensure the message is also a string.
  
This combined validation function keeps the code cleaner and ensures that both inputs are validated before any action is taken, making the function more robust. Notice, we are also building in a debug messaging system. When the
code fails, we get a reason, a reason we wrote ourselves.

```
Execution error for 'Hello loaded!':
Error: Message must be a non-empty string
```

```
Execution error for 'Hello loaded!':
Error: Invalid output destination:  gu 
```
