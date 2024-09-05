---
type: docs
---

### Objective

Improve the usability and data saving of resources and Tool Presets in Artbox.

### Key Concepts and Definitions

- **Resources**: Tool Presets, Patterns, Gradients, Brushes, Palettes, and Dynamics.
- **Tool Options**: The set of adjustable parameters presented to the user for each Tool in Artbox.
- **Tool Presets**: A saved set of Tool Options, with an embedded filter that can be configured in the Tool Preset Editor.

### Related Links

- [Tool-Presets-Revision](https://gitlab.gnome.org/americo_gobbo/GIMPBrushwork/-/wikis/Tool-Presets-Revision-Presentation)
- [Design Revision: Brushes Dialog and Brush Editor](https://gitlab.gnome.org/americo_gobbo/GIMPBrushwork/-/wikis/Design-Revision:-Brushes-Dialog-and-Brush-Editor)
- Branches: Artbox and [feature-resource-control](https://gitlab.gnome.org/pixelmixer/artbox/-/tree/feature-resource-control?ref_type=heads)

### Revised Preferences

- Preferences -> Folders
  - Show the Copy Resource Location menu item
  - Save resource changes on exit

## Design Revisions

| **Revision**  | **Current Design**  | **Issues**  | **Changes** |
|--------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **1. Deactivate automatic resource saving** | Saves are done when GIMP exits | Tweaks to resources in session can corrupt carefully set up tools with unwanted changes. | A Preference to 'Save resource changes on exit' 
| **2. Save specific resource changes immediately**   | Saves are done when GIMP exits | Changes to resources are lost if GIMP crashes or exits with a crash.  | Save immediately when clicked |
| **3. Save As**   | Saves are done with default naming | The name of the saved resource is not the same as the filename, this is confusing.  | Save immediately with a naming option, Save As...|
| **4. Save All** | If saves are done by the user on demand, as described in (2) or (3), a new issue arises| Changes to resources may be forgotten during the session. Saving one by one is error prone and time consuming | Add 'Save all the active tool assets' button and a 'Save all changes' button on the Preset Editor  |
| **5. Simpler Menu** | Menu item 'Copy Resource Location' exists in several menus | Not used by most users, creates menu clutter |  A Preference to 'Show Copy Resource Location menu item'  |
| **6. Button Bar and Menu Revised** | See menu items and Button Bar GUI in GIMP | Confusing item placement, Button Bar GUI out of step with updates from (1-5) |  Apply a consistent menu item position, and arrange Button Bars to support the changes  |
| **7. Edit Brush deals with Parametric and Image types** | See Brushes Menu items | Confusion over brush types |  Double clicking an image type opens the image for editing, Double clicking a parametric type opens the Brush Editor |
| **8. Inform the user about locked resources** | Folder locked resources can not be edited | User confusion | An informative message is displayed in the Brush Editor if the resource is locked |
| **9. Copy and Paste as New Brush** | New Feature | Create a brush from the active drawable | Added to the Brushes Menu via a Script-Fu plug-in |

