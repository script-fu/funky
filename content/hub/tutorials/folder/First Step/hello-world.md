---
title: Hello World!
type: docs
weight: 1
---

## Introduction

Here we go, slowly, starting at the beginning, let's step through the anatomy of a plug-in. First, there's a coding term called "boilerplate", it refers to lines of code that have to be there for the script to work, but we don’t need to fully understand them. For example, the very first line of a Script-Fu plug-in is just that, a powerful spell passed down from the gods:

```bash
#!/usr/bin/env gimp-script-fu-interpreter-3.0
```

Now, let’s get down to business, we need to do a few things: define a function, register the function with GIMP, and link it to the GIMP menu system. Well, we don't need to do that last one, it doesn't have to be a visible plug-in, it can be a utility that can be called when needed by other plug-ins. Generally though, we tend to select a plug-in from a menu. Finally, we need to install the plug-in, a tricky step indeed.

### Define a Function

A function, also known as a _procedure_, is a chunk of code with a name and purpose, it takes an input and produces output.

**Input** > **_Function_** > **Output** 

### Register the Function

Registering is the act of putting the function name on a list so that GIMP knows about it.

```scheme
(script-fu-register-procedure "script-fu-hello-world"...
```

### Link to the Menu

This tells GIMP where to find your function in its menu system.

```scheme
(script-fu-menu-register "script-fu-hello-world" "<Image>/Funky")
```

This displays the menu "Funky" in the main menu bar. Change the path to put the plug-in somewhere else. The path `<Image>/Funky` means the plug-in will appear under the **Image** menu category. You can change `<Image>` to `<Tools>`, `<Filters>`, etc., depending on where you want the plug-in to appear.

### Comments

In Scheme, Script-Fu's base language, comments are generally done by preceding a helpful line of text with `;;`. Your use of comments will depend on your fluency as a coder—if you code occasionally, more comments will help. If you code all the time, the code is as easy to read as the comment would be. Also, when programming functionally, the code tends to become descriptive enough to read like a script.

### Syntax

Code tends to have little rules around how to place items in a line, so that we can read the line easily. For example, a sentence may have a space after a comma or period. It helps the readability.

Code may arrange things in a similar manner, which may look odd at first:

```scheme
(define (function-name input-a
                       input-b
                       input-c))
```

## Example Code

Okay, now let's see that working together as a practical example. Script-Fu has a lot of helpful commands that let us do things. These commands are usually prefixed with "gimp-", for example, `gimp-message` is a function that outputs a text "string" to a dialog or display. A "message handler" is the code that decides what to do with a message, the post-office sorting system if you like.

```scheme
#!/usr/bin/env gimp-script-fu-interpreter-3.0

(define (script-fu-hello-world)

  ;; Set the message handler to output the message to a GUI dialog box
  (gimp-message-set-handler 0)
  (gimp-message "Hello world!\n")

  ;; Set the message handler to output the message to the Error Console
  (gimp-message-set-handler 2)
  (gimp-message "Hello world!\n")

  ;; Send the message to the terminal, the OS window that launched GIMP
  (display "Hello world!\n"))


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

[hello-world.zip](../../../../../downloads/hello-world.zip)

### Install the Plug-in

1. Go to **GIMP -> Edit -> Preferences -> Folders -> Plug-ins**.
2. Add your [repo](../../../../tools/folder/git) plug-ins folder to the list.
3. Extract the **hello-world.zip** file into this folder, keeping the plug-in inside its own named folder:
   - `your-plug-ins-repo/hello-world/hello-world.scm`
4. Right-click on the `hello-world.scm` file inside the extracted folder.
5. Go to **Properties -> Permissions -> Allow executing file as program**.
6. Restart GIMP.

### Try the Plug-in

The plug-in should now appear under the "Funky" menu in the main GIMP window. Click it, and it should display the "Hello world!" message. Try modifying the code, like changing the message text, and save the file. When you run the plug-in again, your changes will be reflected without restarting GIMP.

Try experimenting by changing the menu path. For example, `"<Image>/File"` will put it inside the File menu, and `"<Image>/File/Funky"` will create a new section in the File menu. This is a great way to customize where your plug-in appears and to organize your tools.
