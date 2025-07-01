---
title: Debugging
type: docs
weight: 5
url: "hub/tutorials/folder/debugging"
---

## Introduction

In scripting, no function is infallible. Even the most reliable commands can fail when faced with unexpected inputs or conditions. To safeguard against this, we can implement a custom debugging system and adopt defensive programming techniques. By wrapping standard functions with error-handling mechanisms and providing informative feedback, we can make our scripts more robust and easier to troubleshoot.

A key part of this strategy is using a global debug flag to control verbose output, allowing us to enable detailed debugging information when needed while keeping output clean during normal execution.

## Global Debug Flag

A global debug flag is a simple yet effective way to control the level of information output during script execution. When enabled, it provides detailed debugging messages that can be invaluable for tracking down issues. When disabled, it keeps the output concise for production use.

```scheme
;; Purpose: Global flag to control debug output.
(define debug #f)
```

By default, debugging is turned off. To enable verbose output during development, simply set the flag to `#t`:

```scheme
;; Purpose: Global flag to control debug output.
(define debug #t)
```

We can also temporarily enable or disable debugging for specific sections of code using helper functions.

### Local Debug Control

For finer control, we can turn debugging on or off within specific parts of the script using helper functions.

```scheme
;; Purpose: Turn off debug mode for a section of code.
(define (debug-off)
  (set! debug #f))

;; Purpose: Turn on debug mode for a section of code.
(define (debug-on)
  (set! debug #t))
```

This allows us to control debugging dynamically:

```scheme
(debug-on)  ;; Enable verbose output

;; Some script logic here

(debug-off) ;; Disable verbose output
```

## Debug Messaging System

To efficiently handle debug output in Script-Fu, we use a structured approach involving multiple helper functions. These functions ensure that debug and warning messages are clear, readable, and maintainable.

### Overview of the Debug Messaging System

Our debug messaging system consists of the following components:

1. `debug-message` – Displays debug messages when debugging is enabled.
2. `serialize-item` – Converts various Scheme data types into a string representation.
3. `concat` – Concatenates multiple items into a single string.
4. `list->string` – Formats a list into a readable string.
5. `message` – Displays output in GIMP's message console.
6. `warning-message` – Displays warning messages when warnings are enabled.

Each function plays a role in formatting and displaying structured messages.

---

### Debug Message Function

The `debug-message` function is the core method for displaying debug output. It ensures messages are only shown when debugging is enabled.

```scheme
;; Purpose: Display a debug message.
(define (debug-message . items)
  (when debug (message "> " (apply concat items))))
```

- The `when debug` condition ensures messages appear only when debugging is enabled.
- Messages are prefixed with `"> "` for clarity.
- The function uses `concat` to format message content.
- Finally, it calls `message` to send the output to GIMP's message console.

Example usage:

```scheme
;; Purpose: Returns the item's tree position or #f if the item is invalid
(define (get-item-tree-position image item)
  (if (item-is-valid? item)
    (let ((position (list->item (gimp-image-get-item-position image item))))
      (debug-message "item : " (item-get-name item) " has tree position : " position)
      position)
    #f))
```

With debugging enabled, the output might be:

```scheme
> item: background-layer has tree position : 3
```

### Serializing Data for Debug Messages

Messages may contain different data types such as lists, vectors, and numbers. To ensure they are properly formatted, we use `serialize-item`.

```scheme
;; Purpose: Converts various Scheme data types (lists, vectors, pairs, etc.)
;;          into a string representation.
(define (serialize-item item)
  (cond
    ((and (list? item) (null? item)) "\"\"")          ; Empty list
    ((and (string? item) (string=? item "")) "\"\"")  ; Empty string
    ((list? item) (list->string item))                ; Nested list
    ((vector? item)                                   ; Handle vectors
     (string-append "#("
                    (string-join (map serialize-item (vector->list item)) " ")
                    ")"))
    ((pair? item)                                     ; Handle pairs
     (string-append "("
                    (serialize-item (car item))
                    " . "
                    (serialize-item (cdr item))
                    ")"))
    ((number? item) (number->string item))            ; Numbers
    ((symbol? item) (symbol->string item))            ; Symbols
    ((boolean? item) (if item "#t" "#f"))             ; Booleans
    ((string? item) item)                             ; Strings
    (else (warning-message "serialize-item: Unsupported item type!" item))))
```

Example usage:

```scheme
(serialize-item '(1 2 3))
```

Output:

```scheme
list:
1
2
3
```

### Concatenation for Messages

To merge multiple message components into a single string, we use `concat`.

```scheme
;; Purpose: Concatenate multiple items into a single string.
(define (concat . items)
  (apply string-append (map serialize-item items)))
```

Example usage:

```scheme
(concat "Image size: " 1920 "x" 1080)
```

### Formatting Lists as Strings

The `list->string` function converts a list into a formatted string.

```scheme
;; Purpose: Convert a list of items into a readable string.
(define (list->string list)
  (if (list? list)
      (string-append "list: \n" (string-join (map serialize-item list) "\n"))
      (warning-message "list->string: Input is not a list!")))
```

### Warning Messages

The `warning-message` function works similarly to `debug-message`, but it displays warnings even when debugging is disabled.

```scheme
;; Purpose: Display a warning message.
(define (warning-message . items)
  (if warning
    (message "Warning: " (apply concat items)))
    #f)
```

- Ensures messages are only shown when warnings are enabled (the `warning` flag is set in `common.scm` as `#t`).
- Calls `concat` to format message content.
- Uses `message` to send output to GIMP.

## Enhancing Standard Functions

Once a debugging system is in place, we can enhance our library of functions by incorporating detailed messages. This provides insight into item states, variable values, and function calls.

A common example is `item-is-valid?`, which wraps `gimp-item-id-is-valid` to return `#t` or `#f`. If `#f` is returned, we can trigger a `warning-message` in the calling code, if the input is not a number we a can give a warning in the function.

```scheme
;; Purpose: Check if an item is valid, returning #t or #f.
;;          Issues a warning if the item is not a number.
(define (item-is-valid? item)
  (if (number? item)
      (= (list->item (gimp-item-id-is-valid item)) 1)
      (begin
        (warning-message "item-is-valid?: Expected a number, but received: " item)
        #f)))
```

## Practical Usage

When developing Script-Fu plug-ins, wrapping functions in this manner significantly reduces debugging time and ensures robust, maintainable code. With our debugging system in place, we can generate a structured debug stream in the error-console at the flick of a switch.

In this debug stream, function calls are marked with an asterisk (*), making it easier to track script execution and pinpoint failures, particularly in complex plug-ins. This visibility helps us understand the flow of operations and diagnose unexpected behaviors efficiently.

A wrapper for our message function to use a `*`

```scheme
(define (call . items)
  (when debug (message "* (" (apply concat items) ")")))
```

Example of `call` being used in practice:

```scheme
;; Purpose: Apply the texturing process to the given list of group masks
(define (process-masks groups pattern) (call 'process-masks)
  (for-each
    (lambda (group)
      (let ((mask (add-mask-to-layer group ADD-MASK-WHITE)))
        (message "Process mask : " (item-get-name group))
        (fill-and-adjust-group-mask group mask pattern)
        (gimp-layer-set-opacity group (get 'color-opacity))
        (gimp-item-set-expanded (item-get-parent group) 0)
        (gimp-selection-none (get-image))))
    (ensure-list groups)))
```

Example of a debug stream as a plug-in executes:

```scheme
> Recording the plug-in settings
* (convert-gui-settings)
> all-masks : 1
> strokes : 1
> color : 1
> plate-layer : 1
> drawables : #(37)
* (filter-list-for-matching-groups)
> all-masks : #t
> sub-groups of group : root
blue
blue_strokes
blue_colour
yellow
yellow_strokes
yellow_colour
gray
gray_strokes
gray_colour
> groups with identifier in name: _colour
blue_colour
yellow_colour
gray_colour
* (filter-list-for-matching-groups)
> all-masks : #t
> sub-groups of group : root
blue
blue_strokes
blue_colour
yellow
yellow_strokes
yellow_colour
gray
gray_strokes
gray_colour
> groups with identifier in name: _strokes
blue_strokes
yellow_strokes
gray_strokes
* (begin-apply-texture)

Start Apply Texture

> color : #t

Texturing color group masks
> color-pattern : 2655
* (process-masks)
Process mask : blue_colour
* (fill-and-adjust-group-mask)
> Fill-and-adjust : blue_colour mask
> using pattern for fill : 2655
* (apply-color-effect)
> color-contrast : 64
> color-levels-gamma : 10
> levels on drawable: blue_colour mask
>   gamma: 8.2
>   low-in: 0.7278  high-in: 0.9222
>   low-out: 0  high-out: 1
> light-opacity : 6
> light-opacity : 6
* (apply-light-effect)
> apply-light-effect opacity : 6
> from layer : light_blue
> edit-copy light_blue
> edit-paste blue_colour mask
> shade-opacity : 60
> shade-opacity : 60
* (apply-light-effect)
> apply-light-effect opacity : 60
> from layer : shad_blue_opa*5
> edit-copy shad_blue_opa*5
> edit-paste blue_colour mask
* (apply-opaque-effect)
> children in : blue_colour
blue_colour
hue_blue
light_blue
shad_blue_opa*5
base_blue
...
...
...
Finished Apply Texture!
```

This structured log provides a clear timeline of function calls and data changes, making debugging and performance analysis significantly easier.

## Conclusion

By implementing a structured debugging system, we create safer, more maintainable scripts that offer real-time insights into their execution.

### Key Takeaways

- **Control verbosity** – Use a global debug flag to manage output levels.
- **Provide clear feedback** – Wrap standard functions with informative debug messages.
- **Enhance robustness** – Handle unexpected inputs gracefully to prevent errors.
- **Simplify troubleshooting** – Structured debug messages make it easier to diagnose and fix issues.

With this approach, our scripts effectively "explain themselves" as they process data, reducing frustration and improving workflow efficiency. Debugging becomes a proactive tool rather than a reactive chore, making our scripting process both smoother and more rewarding.
