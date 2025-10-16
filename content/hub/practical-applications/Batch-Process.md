---
title: Batch Process
type: docs
url: "/hub/practical-applications/Batch-Process"
---

## Introduction

The [**Batch Process**](../../plug-ins/folder/Batch-Process/) plug-in is an advanced practical example that demonstrates building a flexible batch processing framework in Script-Fu. The **standalone version** is approximately **850 lines** (all libraries inlined), providing a complete working example that can be used as-is or customized.

The heavy lifting (directory recursion, file discovery, validation, progress reporting, image lifecycle management) lives in inlined library functions. The plug-in demonstrates a complete workflow:

1. **GUI parameters** - source, destination, display options
2. **Processing logic** - scale down, sharpen, and prepare for export
3. **Export logic** - save as CMYK PSD with color profile
4. **Resource management** - properly handle displays and temporary images

## Getting Started

**This plug-in is ready to use!** Just configure these values at the top of the file:

- **`default-src-dir`** (line 34) - Your default source directory
- **`default-dst-dir`** (line 35) - Your default destination directory
- **`softproof-icc`** (line 33) - Path to your ICC color profile (or set to `""` if not using)

You can also set these paths through the GUI when running the plug-in. The defaults are only used as fallbacks if the GUI paths are invalid.

The example processing function creates a 50% scaled-down version of each image with sharpening applied—a common workflow for creating web/social media versions from high-res originals.

## Two Operating Modes

The plug-in supports two distinct workflows:

### 1. File System Mode (Default)
- Recursively discovers files in a source directory
- Loads each file, processes it, exports to destination, closes it
- Perfect for batch processing entire folder hierarchies
- Uses `.xcf` extension by default (easily configurable)

### 2. Open Images Mode
- Processes images already open in GIMP
- Does **not** close them afterward (preserves user's workspace)
- Ideal for processing multiple images you're actively working on
- Source directory parameter ignored in this mode

## Architecture Overview

Here's the high-level structure of the batch processing plug-in:

```scheme
(define (script-fu-batch-process gui-src-dir
                                 gui-dst-dir
                                 show-images
                                 use-open-images)
  (let ((success (if (is-true? use-open-images)
                     (batch-process-open-images gui-dst-dir
                                                default-dst-dir
                                                image-process
                                                export-process)
                     (batch-process-file-system gui-src-dir
                                                default-src-dir
                                                "xcf"
                                                gui-dst-dir
                                                default-dst-dir
                                                show-images
                                                image-process
                                                export-process))))
    (unless success
      (message-box (if (is-true? use-open-images)
                       "No open images found."
                       "No .xcf files found in source directory.")))))
```

The main function is simple:

1. Chooses the appropriate batch function based on mode
2. Passes custom processing and export functions
3. Reports if nothing was processed

## The Processing Pipeline

Each image goes through this sequence:

### File System Mode:
1. **Discover** - Recursively find all matching files
2. **Load** - Open the file in GIMP
3. **Display** (optional) - Show it on screen during processing
4. **Process** - Call `image-process` function
5. **Export** - Call `export-process` function with result
6. **Clean up** - Close display and image (we loaded it, we close it)

### Open Images Mode:
1. **List** - Get all currently open images
2. **Process** - Call `image-process` function
3. **Export** - Call `export-process` function with result
4. **Clean up** - Close only export image if created (never the original)

## Custom Processing Function

The `image-process` function defines what happens to each image. The example creates a scaled-down, sharpened version:

```scheme
(define (image-process src-image drawables)
  (gimp-context-push)
  (gimp-context-set-interpolation INTERPOLATION-CUBIC)
  ;; Create an image by copying and pasting to a new image
  (gimp-selection-none src-image)
  (gimp-edit-copy-visible src-image)
  (let* ((dst-image (edit-paste-as-new-image))
         (dst-display (display-new dst-image))
         (active-layer (get-active-layers-list dst-image #t))
         (scale 50)
         (sharpen 0.25))
    ;; Image reduction
    (image-scale-by-percent dst-image scale scale)
    ;; Post scale sharpen
    (gegl-sharpen active-layer LAYER-MODE-REPLACE 100 3 sharpen 0 #t #f)
    ;; Name the layer
    (gimp-item-set-name active-layer (image-get-base-name src-image))
    (gimp-displays-flush)
    (gimp-context-pop)
    (message "Prepared image for export")
    ;; Return image ID and display of the created image
    (list dst-image dst-display)))
```

**Key points about this function:**

- **Returns a list**: `(list dst-image dst-display)` - both the processed image ID and its display ID
- **Creates a new image**: Uses copy-paste to avoid modifying the source
- **Shows the result**: Creates a display so you can see processing in real-time (if enabled)
- **Clean processing**: The batch framework handles closing the display afterward

The return value pattern is important: by returning both the image and display IDs, the framework can properly clean up all resources (close the display window and delete the temporary image) after export.

## Custom Export Function

The `export-process` function defines how to save the result:

```scheme
(define (export-process image dst-file)
  (file-cmyk-psd-save image dst-file softproof-icc))
```

This uses the global `softproof-icc` variable defined at the top of the file. The export saves as a PSD with CMYK color conversion using the specified ICC profile.

## Path Validation Strategy

The plug-in implements a robust fallback system:

1. **Try GUI path** - Use what the user entered
2. **Validate format** - Check for invalid characters, empty strings
3. **Validate existence** - Check if directory actually exists
4. **Fall back to default** - Use hardcoded path if GUI path invalid
5. **Exit with error** - If even the fallback is invalid

This ensures the plug-in never tries to process with invalid paths, and provides clear error messages when something is wrong.

## Flat Export Structure

The export uses a **flat directory structure**:

```
Source:
  /art/project/
    image1.xcf
    subdir/
      image2.xcf
      deeper/
        image3.xcf

Destination:
  /export/
    image1.psd
    image2.psd
    image3.psd
```

All files are exported to the destination root, regardless of source subdirectory depth. This simplifies export management and avoids recreating potentially deep directory structures.

## Image Lifecycle Management

The plug-in carefully manages which resources it closes:

### File System Mode:
- **Source image**: Loads image ➜ **Script owns it** ➜ Must close it
- **Source display** (optional): Creates display ➜ **Script owns it** ➜ Must close it
- **Export image**: Processing creates new image ➜ **Script owns it** ➜ Closed via display
- **Export display**: Processing creates display ➜ **Script owns it** ➜ Must close it

### Open Images Mode:
- **Source image**: Already open ➜ **User owns it** ➜ **Never close it**
- **Export image**: Processing creates new image ➜ **Script owns it** ➜ Closed via display
- **Export display**: Processing creates display ➜ **Script owns it** ➜ Must close it

**Important**: When you close a display with `gimp-display-delete`, GIMP automatically deletes the underlying image if it has no other displays. This is why the plug-in only needs to explicitly close displays—the images are cleaned up automatically.

This ensures the plug-in never closes images the user expects to remain open, while properly cleaning up all temporary resources it creates.


### 3. Adjust File Extension

Change which files to process in the main function (around line 50):

```scheme
;; In script-fu-batch-process, change:
(batch-process-file-system ... "xcf" ...)  ; Original - process XCF files
(batch-process-file-system ... "png" ...)  ; Process PNG files instead
(batch-process-file-system ... "jpg" ...)  ; Process JPEG files instead
```

### 4. Modify Default Paths

Update the global variables at the top of the file (lines 33-35):

```scheme
;; Global variables
(define debug #f)
(define softproof-icc "/your/path/to/profile.icc")
(define default-src-dir "/your/default/source/")
(define default-dst-dir "/your/default/destination/")
```

These paths are used as fallbacks if the GUI paths are invalid or empty.

## Debug Mode

Enable debug output by modifying the global variable:

```scheme
;; Global variables
(define debug #f)
```

Change to:

```scheme
;; Global variables
(define debug #t)
```

With debug mode enabled, you'll see detailed output in the Error Console:

## Error Handling

The plug-in includes comprehensive error handling:

- **Invalid paths**: Clear error messages with path shown
- **No files found**: User-friendly message box
- **No open images**: Specific message for open images mode
- **Missing file paths**: Skips untitled images with warning

## Performance Considerations

For large batch operations:

- **Show images = OFF** is significantly faster (no display overhead)
- **File system mode** processes files one at a time, freeing memory between files
- **Open images mode** requires all images in memory simultaneously
- Progress bar updates can slow processing slightly but provide valuable feedback

## Conclusion

The Batch Process framework demonstrates advanced Script-Fu techniques:

- **Dual-mode operation** - Process files from disk OR already-open images
- **Robust validation** - Path validation with fallbacks and error handling
- **Flexible architecture** - Easy to customize for different processing needs
- **Clean resource management** - Proper handling of images, displays, and temporary resources
- **Progress reporting** - User feedback during long operations
- **Return value patterns** - Demonstrates returning both image and display IDs for proper cleanup
- **Complete example** - All libraries inlined, ready to use and learn from

This is a **working example** that you can use as-is for creating scaled-down versions of images, or easily customize for your own batch processing needs. The standalone version (850+ lines) includes all necessary library functions, making it easy to study and understand the complete workflow.
