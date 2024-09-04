---
type: docs
---

### Objective

Improve the usability of the Toolbox.

### Key Concepts and Definitions

- **Flowbox**: A flexible container that one to three widgets are arranged in. The FG/BG colour area, the active resources and active image.
- **Tool Palette**: The grid of tool buttons, Move Tool, Paintbrush Tool ect.
- **FG/BG**: The active foreground & background colour widget.

### Related Links
- Branches: Artbox and [feature-toolbox](https://gitlab.gnome.org/pixelmixer/artbox/-/tree/feature-toolbox?ref_type=heads)

### Revised Preferences

- Preferences -> Toolbox -> Appearance
  - Show colour, active resources and active image
  - Show only colour, set preferred position and scale.
    - Toolbox placement relative to the tool buttons
      - Top
      - Bottom
      - Left
      - Right
  - Scale the colour widget

### Design Revisions

| **Revision**  | **Current Design**  | **Issues**  | **Changes** |
|--------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **1. Remove Flowbox** | The Flowbox is positioned beneath the Tool Palette | The Flowbox takes up a large amount of GUI space. If only one or two elements are preferred, the GUI space is empty. The size of the FG/BG is restricted by the arrangement.| Allow the user to create a simpler toolbox with no wasted space by removing the Flowbox and keeping the FG/BG widget |
| **2. Position and scale the FG/BG widget.**   |  New Feature | The FG/BG widget may be poorly positioned taking up GUI space. It may be too small on HDPI displays | Allow the user to position and scale the FG/BG widget relative to the Tool Palette |
