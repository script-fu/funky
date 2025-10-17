---
title: Manage Parasites
type: docs
url: "/hub/practical-applications/Manage-Parasites"
---

## Introduction

The [**Manage Parasites**](../../plug-ins/folder/Manage-Parasites/) plug-in is a comprehensive practical example that demonstrates building a complete parasite management system in Script-Fu. The **standalone version** is approximately **1,100 lines** (all libraries inlined), providing a fully-featured tool for working with parasites across all three scopes in GIMP.

### What are Parasites?

Parasites are GIMP's mechanism for attaching custom data to different parts of your workspace. Think of them as **key-value pairs** that can store settings, metadata, or any other information your plug-ins need to persist.

Parasites exist in **three scopes**:

1. **Global parasites** - Attached to GIMP itself, available across all images and sessions
2. **Image parasites** - Attached to a specific image, saved with the XCF file
3. **Item parasites** - Attached to individual layers, channels, or paths

### Common Uses for Parasites

- **Plug-in settings** - Store user preferences that persist between sessions
- **Image metadata** - Track processing history, copyright info, or custom attributes
- **Layer annotations** - Mark layers with special purposes or processing flags
- **Workflow data** - Store temporary processing state or cross-plug-in communication
- **EXIF/IPTC data** - GIMP stores image metadata as parasites (e.g., `exif-data`, `gimp-comment`)

### Persistence Modes

Parasites can operate in two modes:

- **Session mode** - Data exists only during the current GIMP session (lost on exit)
- **Persist mode** - Data is saved and restored between GIMP sessions

This plug-in lets you control which mode to use when adding or modifying parasites.

## Architecture Overview

The plug-in provides four main operations, each with precise scope control:

```scheme
(define (script-fu-manage-parasites image drawables
                                    list-option
                                    remove-option
                                    remove-specific-name
                                    add-parasite
                                    parasite-name
                                    parasite-value
                                    parasite-scope
                                    persist-mode)
  ;; Main logic orchestrates four operations:
  ;; 1. List parasites based on precise option (9 choices)
  ;; 2. Remove parasites based on precise option (9 choices)
  ;; 3. Remove specific parasite by name (searches all scopes)
  ;; 4. Add new parasite with automatic scope prefixing
```

The structure is straightforward:

1. **Set attachment mode** based on persist-mode toggle
2. **List parasites** using the selected list-option
3. **Remove parasites** using the selected remove-option
4. **Remove specific** parasite by name (if enabled)
5. **Add new** parasite (if enabled)

## Nine Scope Options

Both the **List** and **Remove** operations support the same nine precision options:

### Individual Scopes

- **None** - Do nothing
- **Global** - Only global parasites (GIMP-wide)
- **Active Image** - Only the current image's parasites
- **Active Item** - Only the active layer's parasites

### Compound Scopes

- **Active Image (all layers)** - All layer parasites on current image
- **Active Image + Item + Global** - Everything related to current image plus global
- **All Open Images** - Image parasites across all open images
- **All Open Images (all layers)** - All layer parasites across all images
- **Everything** - Absolutely everything (global + all images + all items)

This granular control lets you precisely target the parasites you want to inspect or remove, from a single layer to your entire GIMP environment.

## Parasite Naming Convention

The plug-in uses **scope prefixes** to organize parasites:

- **Global parasites**: `"global-name"`
- **Image parasites**: `"image-name"`
- **Item parasites**: `"item-name"`

When **adding** parasites through this plug-in, you provide the **base name** without the prefix. The plug-in automatically adds the appropriate prefix based on your scope selection:

```scheme
;; You provide: "my-setting"
;; Plug-in creates:
;;   "global-my-setting"  (if scope is Global)
;;   "image-my-setting"   (if scope is Image)
;;   "item-my-setting"    (if scope is Item)
```

When **removing by name**, the plug-in is smart about searching - it will try all scope variations:

```scheme
;; You provide: "test"
;; Plug-in searches for:
;;   "global-test", "image-test", "item-test"
;; And removes any it finds
```

## Listing Parasites

The listing functions display parasite names and values to the Error Console:

```scheme
(define (list-global-parasites)
  (let ((parasites (global-get-parasite-list)))
    (if (null? parasites)
        (message "No global parasites found")
        (begin
          (message "=== GLOBAL PARASITES ===")
          (for-each
            (lambda (name)
              (let ((data (global-get-parasite-data name)))
                (message "  " name ": " data)))
            parasites)
          (message "Total: " (length parasites) " global parasite(s)")))))
```

Example output when listing everything:

```text
=== COMPREHENSIVE LIST (EVERYTHING) ===
=== GLOBAL PARASITES ===
  global-settings: #t
  global-last-folder: /home/user/images
Total: 2 global parasite(s)

Image: landscape.xcf
  image-copyright: © 2025 John Doe
  image-processed: 2025-10-17
Total: 2 parasite(s) across 1 image(s)

Image: portrait.xcf | Layer: Background
  item-blend-mode: overlay
Total: 1 parasite(s) across 3 layer(s) in 2 image(s)
```

## Removing Parasites

The removal functions mirror the listing structure, providing the same granular control:

```scheme
(define (remove-all-global-parasites)
  (let ((parasites (global-get-parasite-list)))
    (if (null? parasites)
        (message "No global parasites to remove")
        (begin
          (for-each
            (lambda (name)
              (gimp-detach-parasite name))
            parasites)
          (message "Removed " (length parasites) " global parasite(s)")))))
```

The **remove everything** option provides a clean sweep:

```scheme
(define (remove-everything-parasites)
  (remove-all-global-parasites)
  (remove-all-images-parasites)
  (remove-all-items-all-images-parasites)
  (message "Removed all parasites from everywhere"))
```

## Remove Specific by Name

The **Remove Specific by Name** feature is particularly powerful. It searches all three scopes and removes any matching parasites:

```scheme
(define (remove-parasite-by-name name image item)
  (let ((removed-count 0)
        (global-name (if (string-prefix? "global-" name) 
                         name 
                         (string-append "global-" name)))
        (image-name (if (string-prefix? "image-" name) 
                        name 
                        (string-append "image-" name)))
        (item-name (if (string-prefix? "item-" name) 
                       name 
                       (string-append "item-" name))))
    ;; Try all three scopes and report what was found
    ...
    (if (= removed-count 0)
        (message "Parasite '" name "' not found in any scope")
        (message "Total removed: " removed-count " parasite(s)"))))
```

This is useful when you know the base name of a parasite but aren't sure which scope(s) it exists in.

## Adding Parasites

The add operation automatically handles scope prefixing and data type conversion:

```scheme
(define (add-parasite-with-scope name value scope image item)
  (let ((prefixed-name (case scope
                         ((global) (string-append "global-" name))
                         ((image) (string-append "image-" name))
                         ((item) (string-append "item-" name)))))
    (case scope
      ((global)
       (set-attr prefixed-name value)
       (message "Added global parasite: " prefixed-name " = " value))
      ((image)
       (set-attr prefixed-name image value)
       (message "Added image parasite: " prefixed-name " = " value))
      ((item)
       (if item
           (begin
             (set-attr prefixed-name item value)
             (message "Added item parasite to '" 
                     (item-get-name item) 
                     "': " prefixed-name " = " value))
           (message "Error: No active layer selected"))))))
```

## Conclusion

The Manage Parasites plug-in demonstrates advanced Script-Fu techniques:

- **Comprehensive scope control** - Nine precision options for listing and removing
- **Flexible naming** - Automatic prefix handling for cleaner code
- **Smart searching** - Find and remove parasites across all scopes
- **Data type handling** - Automatic serialization and deserialization
- **Persistence control** - Choose between session and permanent storage

This is a **working tool** that you can use to inspect, debug, and manage parasites in your GIMP workflow, while also serving as a comprehensive example of how to work with GIMP's parasite system in Script-Fu. The standalone version (1,100+ lines) includes all necessary library functions, making it easy to study the complete implementation.

Whether you need to debug plugin data, clean up orphaned parasites, or simply understand what's attached to your images and layers, this plug-in provides all the tools you need.
