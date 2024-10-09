---
title: Messaging Library
type: docs
weight: 6
---

## Introduction

Over time, what began as a single function to send messages has evolved into a collection of related functions. These functions now form the foundation of a **Messaging Library**, designed to handle output to different destinations, such as the GUI, Error Console, and Terminal.

### Why a Messaging Library?

As our needs grow, handling messages across multiple outputs requires a more modular and extensible approach. Instead of a single function doing everything, we’ve broken the process down into reusable components, allowing for greater flexibility. This library can now be used as a general-purpose messaging tool that other plug-ins or functions can borrow from.

### What Does the Messaging Library Do?

The Messaging Library currently includes the following functions:

- **send-to-gui**: Sends messages to the GIMP GUI dialog box.
- **send-to-error-console**: Sends messages to the GIMP Error Console.
- **send-to-terminal**: Sends messages to the terminal window.
- **send-message**: A dispatcher function that directs messages to the appropriate output.
- **validate-message**: Ensures that the message and output are valid before sending.

### Expanding the Library

The **Messaging Library** can easily be extended to support additional outputs. For example:

- **send-to-file**: Save messages to a log file.
- **send-to-logger**: Integrate with an external logging system.
- **send-to-notification**: Display messages as system notifications.

By following the same pattern of modular design and reusable functions, this library can grow into a comprehensive tool for handling all kinds of messaging tasks.

## Benefits of a Messaging Library

- **Reusability**: The functions can be reused across different plug-ins or projects.
- **Modularity**: Each function handles one specific task, making the code easier to maintain and extend.
- **Consistency**: Using the same validation and message-handling functions ensures consistent behavior across the application.

The **Messaging Library** is the beginning of a broader framework that could simplify how messages are managed in your project. As the library grows, new plug-ins can easily tap into it to send messages wherever they need to go.

We can adjust the file structure:

```plaintext
/home/your-username/code/
  ├── script-fu/
      ├── library/
      │     └── send-message.scm -> messaging.scm
      └── plug-ins/
            └── hello-world/
                  └── hello-world.scm
```

And remember to adjust the `load` in the main plug-in:

```scheme
#!/usr/bin/env gimp-script-fu-interpreter-3.0

(load "/home/mark/code/github/script-plugins/funky-library/messaging.scm")

(define (script-fu-hello-world)
  (let ((message "Hello world!\n"))
    (send-message message 'gui)
    (send-message message 'error-console)
    (send-message message 'terminal)))

(script-fu-register-procedure "script-fu-hello-world"
  "Hello world!"
  "A Script-Fu procedure plug-in refactored"
  "Mark Sweeney"
  "Under GNU GENERAL PUBLIC LICENSE Version 3"
  "2024")

(script-fu-menu-register
  "script-fu-hello-world"
  "<Image>/Funky")
```
