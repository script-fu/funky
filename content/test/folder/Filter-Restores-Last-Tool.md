---
type: docs
---

### Objective

Removes a longstanding GUI issue.

### Key Concepts and Definitions

- **Filter**: A plug-in that processes pixels in a drawable, Hue, Blur etc.
- **Tool Palette**: The grid of tool buttons, Move Tool, Paintbrush Tool ect.

### Related Links

- Branches: Artbox and [feature-filter-restores-last-tool](https://gitlab.gnome.org/pixelmixer/artbox/-/tree/feature-filter-restores-last-tool?ref_type=heads)
- old [Merge Request](https://gitlab.gnome.org/GNOME/gimp/-/merge_requests/1572)

### Design Revisions

| **Revision**  | **Current Design**  | **Issues**  | **Changes** |
|--------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **1. Restore the previous tool after using a filter** | The filter is the active tool | Confusing to the user to deselect the active tool when a filter is used, and to keep the filter as the active tool | Restore the previous tool when a filter dialog is closed |

