---
type: docs
---

# Objective

Improve the quality of the painting experience in Artbox

## Related Links

- Branches: Artbox and [feature-painttool](https://gitlab.gnome.org/pixelmixer/artbox/-/tree/feature-painttool?ref_type=heads)

## Design Revisions

| **Revision**  | **Current Design**  | **Issues**  | **Changes** |
|--------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **1. Easy Cursor Location** | The Tool Cursor can be turned off in Preferences, and the pointer, leaving the only the brush outline. This is good, but causes issues. | A small and minimal cursor can be hard to locate | There is a minimum screen size for the cursor, and a small 'filled' 'contact' circle is always drawn |
| **2. Indicate Erase Mode**   | New Feature | It's not possible to tell if the paintbrush is about to erase whilst looking at the cursor | Detect the 'Eraser Tool' and 'Erase Paint' mode, change the cursor to a dashed circle |
| **3. Simple Brush Boundary**   | Image brushes are drawn as complex outlines based on the image | They can make a distracting paintbrush when the image is large and noisy  | Draw a simple circular boundary if the 'Simple Brush Boundary' option is checked in the Paintbrush Options |


## Notes

This feature branch only works when merged with the 'artbox' branch or rebased onto the 'options-paintbrush-simple-boundary' branch
