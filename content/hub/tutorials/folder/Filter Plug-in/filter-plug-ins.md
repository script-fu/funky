---
title: The Filter Plugin
type: docs
weight: 2
---

## Introduction

We used a _procedure_ plug-in for the [First Step](https://script-fu.github.io/funky/hub/tutorials/folder/first-step/) tutorial. Those types of plug-ins work without needing an image or drawable as input. Usually, we use a plug-in to change an image and its drawables. Plug-ins like these are called _filter_ plug-ins.

### What is a Drawable?

A **drawable** in GIMP refers to an image element that can be drawn on, such as a layer or channel. Filter plug-ins typically operate on these elements.

### A Simple Filter Plug-in Example

```scheme
#!/usr/bin/env gimp-script-fu-interpreter-3.0

(define (script-fu-simple-filter-plug-in image drawables)
  ;; Use a let statement to define a message variable and core code
  (let ((message "hello, world"))
    ;; Display the message in GIMP's error console
    (gimp-message message)
    ;; Invert the colors of the first selected drawable
    (gimp-drawable-invert (vector-ref drawables 0) TRUE)))

;; Register the plug-in
(script-fu-register-filter 
  "script-fu-simple-filter-plug-in"        ;; Main procedure name
  "Simple Filter Plug-in Demo"             ;; The name as it appears in the GIMP menu
  "Tests a basic Script-Fu filter plug-in" ;; Tool-tip description
  "Author Name"                            ;; Give yourself some credit
  "License"                                ;; License
  "Date written"                           ;; Date written
  "*"                                      ;; Indicates this plug-in requires an image
  SF-ONE-OR-MORE-DRAWABLE)                 ;; Requires one or more selected drawables

;; Specify the menu location for the plug-in
(script-fu-menu-register 
  "script-fu-simple-filter-plug-in" 
  "<Image>/Plug-in")
```

Copy the text and save it as `simple-filter-plug-in.scm` in a folder called `simple-filter-plug-in` within one of GIMP's plug-ins folders. A GIMP plug-ins folder is _any_ folder listed under:  
 **GIMP > Edit > Preferences > Folders > Plug-ins**  

In Linux, right-click the `simple-filter-plug-in.scm` file, go to **Properties > Permissions**, and check **Allow executing file as program**. Once the file is in the right place, executable and free from syntax errors, when GIMP is restarted, it will appear in the top menu header bar, inside a menu called **Plug-in**.

### Running the Plug-in

1. Open an image (this filter plug-in requires an image to work).  
2. Open **Windows > Dockable Dialogs > Error Console** to see a message.  
3. Select **Simple Filter Plug-in Demo** from the **Plug-in** menu.  
4. One of the selected layers will have its colors inverted and a message will be printed to the error console.  

### Editing the Plug-in

You can customize the plug-in by editing its `.scm` file. For example, to change the message displayed:

1. Open the file and locate the line defining `message`.  
2. Replace `"hello, world"` with your custom text.  
3. Save the file.  

In GIMP version 3, plug-ins do not need refreshing for saved changes to take effect. Simply re-run the plug-in to see the updated message.

### Plug-in Examination

#### Shebang Line

The first line ensures the script works as a plug-in in GIMP 3:

```scheme
#!/usr/bin/env gimp-script-fu-interpreter-3.0  
```

#### Procedure Definition

The procedure accepts two arguments: the active image and the selected drawables.

```scheme
(define (script-fu-simple-filter-plug-in image drawables)
```

#### Core Logic

A `let` statement defines a variable and performs operations on the drawable.

```scheme
(let ((message "hello, world"))
  (gimp-message message) ;; Displays a message in GIMP's error console
  (gimp-drawable-invert (vector-ref drawables 0) TRUE)) ;; Inverts the colors of the first selected drawable
```

### Plug-in Registration

The plug-in is registered with GIMP as a filter plug-in:

```scheme
(script-fu-register-filter
  "script-fu-simple-filter-plug-in"        ;; Register the main procedure
  "Simple Filter Plug-in Demo"             ;; The name as it appears in the GIMP menu
  "Tests a basic Script-Fu filter plug-in" ;; Tool-tip description
  "Author Name"                            ;; Author's name
  "License"                                ;; License type
  "Date written"                           ;; Date written
  "*"                                      ;; Indicates the plug-in requires an image
  SF-ONE-OR-MORE-DRAWABLE)                 ;; Requires one or more selected drawables
```

#### Menu Registration
This line specifies the menu location for the plug-in:

```scheme
(script-fu-menu-register 
  "script-fu-simple-filter-plug-in" 
  "<Image>/Plug-in")
```

### Troubleshooting

If a plug-in does not appear, check its location, name, and executable property.  

The location must be in a plug-in search path.  
The file name must match the name of the containing folder.  
The file must be set as executable.  
 

The **Error Console** is a valuable tool for troubleshooting custom plug-ins. If your plug-in doesn't behave as expected, check here for error messages or logs. The **Terminal** window can also provide debugging information and report loading issues.
