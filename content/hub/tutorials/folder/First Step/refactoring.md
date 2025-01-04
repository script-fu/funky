---
title: Refactoring
type: docs
weight: 2
---

## Introduction

Once we have a function working, we can take a step back and think about how best to structure our code. The goal is to make our plug-in as clear, understandable, and maintainable as possible. This process of improving and refining the structure of existing code without changing its behavior is known as refactoring.

Here is the initial function again:

```scheme
(define (script-fu-hello-world)
  ;; Set the message handler to output the message to a GUI dialog box
  (gimp-message-set-handler 0)
  (gimp-message "Hello world!\n")

  ;; Set the message handler to output the message to the Error Console
  (gimp-message-set-handler 2)
  (gimp-message "Hello world!\n")

  ;; Send the message to the terminal, the OS window that launched GIMP
  (display "Hello world!\n"))
```

The function-name is the name of the function, and parameter is what the function accepts as input. The body is the block of code that runs when the function is called.

Abstract form:

```scheme
(define (function-name parameter)
  body)
```

### Code Repetition

Let's hunt down and remove any repetition, as it is generally a bad thing. `(gimp-message "Hello world!\n")` is repeated twice, and the parameter to gimp-message, "Hello world!\n", is repeated three times. The latter repetition can be solved with a variable.

### Variables

In Scheme a variable has a "scope", where it is known about, and that scope is set using a `let` statement. The variable is bound to a value in the binding part, and the variable has scope in the let body. The variable is only known inside the let block and cannot be accessed outside of it.

```scheme
(let ((variable value)) 
  body)
```

Introducing a variable called "message":

```scheme
(define (script-fu-hello-world)
  (let ((message "Hello world!\n"))

    ;; Set the message handler to output the message to a GUI dialog box
    (gimp-message-set-handler 0)
    (gimp-message message)

    ;; Set the message handler to output the message to the Error Console
    (gimp-message-set-handler 2)
    (gimp-message message)

    ;; Send the message to the terminal, the OS window that launched GIMP
    (display message)))
```

In our example we have used a variable called "message" bound to a string "Hello world!\n". This allows us to change the message contents once instead of three times, reducing the chance of errors and making the code more flexible.

### Extracting Functions

In functional programming, refactoring code to extract reusable logic into separate functions is a common practice. By doing this, the **main function** becomes much simpler and more focused on its high-level goal, while the **extracted function** appears more complex because it handles the detailed logic. This is intentional and aligns with core principles of functional programming, like modularity, separation of concerns, and readability. Here is the refactored
Hello World! after extraction.

Extracting the logic:
```scheme
#!/usr/bin/env gimp-script-fu-interpreter-3.0

;; Main Function
(define (script-fu-hello-world)
  (let ((message "Hello world!\n"))

    (send-message message 'gui)
    (send-message message 'error-console)
    (send-message message 'terminal)))

;; Function to handle message output to various destinations
(define (send-message message output)
  (cond
    ;; Send to the Error Console
    ((eq? output 'error-console)
       ;; Set the handler to Error Console
       (gimp-message-set-handler 2)
       (gimp-message message))

    ;; Send to the GUI dialog box
    ((eq? output 'gui)
       ;; Set the handler to GUI dialog
       (gimp-message-set-handler 0)
       (gimp-message message))

    ;; Send to the terminal window
    ((eq? output 'terminal)
       ;; Terminal output is handled with display
       (display message)))

  ;; Restore the default message handler to the Error Console
  (gimp-message-set-handler 2))

(script-fu-register-procedure "script-fu-hello-world"
  "Hello world!"
  "A Script-Fu procedure plug-in"
  "Mark Sweeney"
  "Under GNU GENERAL PUBLIC LICENSE Version 3"
  "2024")

(script-fu-menu-register
  "script-fu-hello-world"
  "<Image>/Funky")
```

#### Symbols
In the example above, a data type called a symbol is used, such as 'gui. Symbols are passed as parameters to the send-message function and can be used to make simple conditional decisions. Like symbolic keys, they are unique identifiers. For more information on symbols, visit [this page.](https://script-fu.github.io/funky/hub/fundamentals/folder/variables-and-scope/symbols/)

### Simplifying the Main Function

In the original (script-fu-hello-world) function, all the logic for sending messages to different outputs (GUI, Error Console, Terminal) was mixed into the main function. After refactoring, the main function simply focuses on **what needs to be done**, sending the message to different destinations.

The refactored main function is simpler:

- It clearly states its purpose: send the same message to multiple outputs.
- It avoids cluttering the main logic with repetitive code like setting message handlers for different outputs.
- It's easier to read and understand at a glance.

### The Extracted Function's Complexity

In contrast, the **(send-message) function** is where the detailed logic resides. It now handles the variations in behavior for each output (GUI, Error Console, Terminal). The function is a bit more complex than before, but it is now **centralized** and **isolated**.

## Relating This to Functional Programming

In functional programming, functions are seen as **first-class citizens**, meaning they can be reused, passed around, and combined to form more complex behavior. The goal is to:

- **Decompose problems** into smaller, independent pieces.
- **Isolate complexity** into smaller functions that handle specific tasks, like `send-message`.
- **Keep higher-level functions simple** so they can focus on orchestrating the flow of data and actions, without needing to know the details of how each task is accomplished.
- **Separation of concerns**: The function takes care of how the message is sent based on the output type, which isolates this logic from the main function.
- **Modularity**: By handling all the message sending logic in one place, we can easily make changes (like adding new output options) without altering the main function.
- **Reusability**: The `send-message` function is reusable, meaning that if we need to send a message to multiple outputs elsewhere in our code, we can simply call this function rather than rewriting similar logic.

By refactoring, the main function in this example becomes a **declarative** statement of what is happening ("send a message to three places"), while the complexity of how to send those messages is abstracted away into the `send-message` function.


