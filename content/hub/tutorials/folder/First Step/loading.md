---
title: Loading
type: docs
weight: 3
---

## Introduction

It seems a little crazy to turn a single function into two functions, one of which is more complex. What if we can take
that complex one, and put it out of sight. We know what it does, we may never have to change it again. Let's put it in a library, other plug-ins can borrow it, and our example plug-in becomes very simple.

### Make a Library Function

We can take the send-message function and make a new file with that as its content. Save the file into your repo folder, not the plugins part, perhaps near the top level;

```plaintext
/home/your-username/code/
  ├── script-fu/
      ├── library/
      │     └── send-message.scm
      └── plug-ins/
            └── hello-world/
                  └── hello-world.scm
```

- **script-fu/**: This is your main directory for storing your Script-Fu code.
  - **library/**: This is where shared functions like `send-message.scm` live.
  - **plug-ins/**: This is where your individual plug-ins are stored.
    - **hello-world/**: A folder for the specific "Hello World!" plug-in.
      - **hello-world.scm**: The script file for the plug-in.

Example of a library function send-message.scm

```scheme
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
```

### Load the Library Function

We can load that library function with the Scheme `load` command;

Loading a library file:

```scheme
#!/usr/bin/env gimp-script-fu-interpreter-3.0

(load "/home/mark/code/github/script-plugins/funky-library/send-message.scm")

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

Hey! We've now got something simpler and shorter to read, that kind of describes itself without comments. This is the satisfying conclusion of refactoring.
