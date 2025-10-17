---
title: Manage Parasites
type: docs
url: "/hub/plug-ins/folder/Manage-Parasites"
---

## Introduction

A comprehensive parasite management tool for Script-Fu that lets you inspect, add, and remove parasites across all three scopes (global, image, and item). Parasites are GIMP's mechanism for attaching custom data—think of them as key-value pairs that can store plug-in settings, metadata, or any other information that needs to persist.

The standalone version includes all library functions inlined (~1,100 lines), making it a complete working example and a reusable library for your own scripts.

**Key Features:**

- List parasites with nine precision options (from single items to everything)
- Remove parasites with matching granular control
- Remove specific parasites by name (searches all scopes)
- Add new parasites with automatic scope prefixing
- Control persistence mode (session vs. persist between sessions)
- Comprehensive library functions for parasite operations

[manage-parasites.zip](../../../../downloads/manage-parasites.zip)  
[Installation](../#installation)  

### Plug-in Menu Location

Tools -> Manage Parasites

### Parasite Scopes

Parasites exist in three scopes:

- **Global** - Attached to GIMP itself, available across all images and sessions
- **Image** - Attached to a specific image, saved with the XCF file
- **Item** - Attached to individual layers, channels, or paths

### Nine Precision Options

Both **List Parasites** and **Remove Parasites** support the same nine options:

1. **None** - Do nothing
2. **Global** - Only global parasites
3. **Active Image** - Only the current image's parasites
4. **Active Item** - Only the active layer's parasites
5. **Active Image (all layers)** - All layer parasites on current image
6. **Active Image + Item + Global** - Everything on current image plus global
7. **All Open Images** - Image parasites across all open images
8. **All Open Images (all layers)** - All layer parasites across all images
9. **Everything** - Absolutely everything (global + all images + all items)

### Additional Operations

- **Remove Specific by Name** - Searches all scopes and removes matching parasites
- **Add Parasite** - Creates new parasites with automatic scope prefixing
- **Persist Mode** - Toggle between session-only and persistent storage

### Common Use Cases

- **Store plug-in preferences** globally for reuse across sessions
- **Track image processing history** with metadata attached to images
- **Mark special layers** for automated processing or exclusion
- **Debug plug-in data** by listing what's attached where
- **Clean up orphaned parasites** from development or testing
