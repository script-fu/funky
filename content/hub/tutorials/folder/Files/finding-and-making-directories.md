---
title: Finding and Making Directories
type: docs
weight: 7
---

## Introduction

Let’s explore how to find and create directories in Script-Fu. In some cases, we need to create directories to save files. Additionally, it’s often useful to retrieve the user’s home directory or prompt for a directory using a GUI.

## User's Home Directory

These locations differ between platforms. Linux and Windows use different environment variables.

### Linux

To get the user's home directory as a string:

```scheme
(getenv "HOME")
```

Example output:

```scheme
"/home/username"
```

### Windows

Windows splits the home directory into components.

Partial path:

```scheme
(getenv "HOMEPATH")
```

```scheme
"\\Users\\username"
```

Drive letter:

```scheme
(getenv "HOMEDRIVE")
```

```scheme
"C:"
```

Complete absolute path:

```scheme
(getenv "USERPROFILE")
```

```scheme
"C:\\Users\\username"
```

> Note: These path strings use `\\` because Scheme source requires escaping the backslash. However, `(gimp-message)` will display a single backslash, which can be confusing during debugging.

## DIR-SEPARATOR

There is also the global variable ```DIR-SEPARATOR``` which tells us the platform specific path separator, and incidentally the platform we are on:

### Linux DIR-SEPARATOR

```scheme
> DIR-SEPARATOR
"/"
```

### Windows DIR-SEPARATOR

```scheme
> DIR-SEPARATOR
"\\"
```

We can use this variable to check our system platform if needed with a wrapper that returns #t for a Linux system or #f otherwise:
```scheme
(define (is-linux?)
 (equal? "/" DIR-SEPARATOR))
```

## Getting a Directory Location

We can ask the user for a directory location in the Script-Fu dialogue for a plug-in.

```scheme
(script-fu-register
  "script-fu-almost-autosave-set-up"
  "Set Up"
  "Edit the Almost Autosave Settings"
  "Mark Sweeney"
  "Under GNU GENERAL PUBLIC LICENSE Version 3"
  "2025"
  ""
  SF-ADJUSTMENT "Save E_very...(minutes)" (list 15 1 60 1 5 0 SF-SPINNER)
  SF-ADJUSTMENT "Nu_mber of Saves"        (list 3 1 20 1 10 0 SF-SPINNER)
  SF-DIRNAME    "Loca_tion of Storage"    "" ;; A non-terminal start does not allow a function call here
  SF-STRING     "Storage _Directory Name" "Autosave")
```

The ```SF-DIRNAME``` provides a browser to a directory, and the ```SF-STRING``` lets the user enter a directory name, if your plug-in needs that capacity.

```scheme
;; Main
(define (script-fu-almost-autosave-set-up save-every-minutes max-saves path dir-name)
  (let ((has-set-up? (has-attribute? "global-aa-set-up"))) ; prior state
  ;; User may not have set a path, default to the users home directory
  (when (path-is-invalid? path)
    (set! path (get-home-dir)))
  ;; If dir-name is empty, default to "Autosave"
  (when (folder-name-is-invalid? dir-name)
    (set! dir-name "Autosave"))
```

Here we process those inputs. If the path is invalid or left blank, we assign it the user's home directory. Same deal for the folder name. These commands are simply wrappers for functions. The _how_ of what they do can be seen in the full plug-in download here:

[https://script-fu.github.io/funky/hub/plug-ins/folder/almost-autosave/](https://script-fu.github.io/funky/hub/plug-ins/folder/almost-autosave/)

If you're interested in the implementation details, search the plug-in source for ***path-is-invalid?*** or ***folder-name-is-invalid?*** to see how those checks are performed.

## Making a Directory

Script-Fu provides the ```dir-make``` command to create a directory. This command takes a "/" separated path and creates a single directory with an optional parameter for the privileges. We do not give it platform-specific paths.

Usually we need to create multiple directories for a practical path. We can use a wrapper for ```dir-make``` to help us here.

```scheme

;; Purpose: A wrapper for (dir-make) that creates a given path from a platform
;;          supplied path. Always emits Linux style separators for dir-make.
(define (make-dir-path path)
  (let* ((path-parts (strbreakup path DIR-SEPARATOR))
         (current-path (car path-parts))) ; Root dir
    ;; Create the rest of the directories step-by-step
    (for-each
     (lambda (part)
       (set! current-path (string-append current-path "/" part)) ; build the path
       (if (file-exists? current-path)
         (debug-message "Directory exists: " current-path)
         (if (dir-make current-path)
           (debug-message "Made directory: " current-path)
           (warning-message "Failed to make directory: " current-path))))
     (cdr path-parts))))
```

Note: This function also uses the built-in ```file-exists?``` to skip unnecessary calls. It returns #t if the indicated file or directory exists, and #f if it does not exist or if it is not accessible to the requesting user.

## Constructing a Path

We also need to break down and rebuild paths in Script-Fu.

To split a path into parts, use ```strbreakup```:

### Linux Example

```scheme
> (strbreakup (getenv "HOME") DIR-SEPARATOR)
("" "home" "username")

> (strbreakup "/this/path/" DIR-SEPARATOR)
("" "this" "path" "")
```

> Note: Leading and trailing slashes become empty string elements in the resulting list.

### Windows Example

```scheme
> (strbreakup (getenv "USERPROFILE") DIR-SEPARATOR)
("C:" "Users" "username")

> (strbreakup "E:\\" DIR-SEPARATOR) ;; External Drive
("E:" "")
```

To rebuild a path, use ```string-append```:

### Linux

```scheme
> (string-append (getenv "HOME") DIR-SEPARATOR "myfolder" DIR-SEPARATOR "myfile.xcf")
"/home/username/myfolder/myfile.xcf"
```

### Windows

```scheme
> (string-append (getenv "USERPROFILE") DIR-SEPARATOR "myfolder" DIR-SEPARATOR "myfile.xcf")
"C:\\Users\\username\\myfolder\\myfile.xcf"
```
