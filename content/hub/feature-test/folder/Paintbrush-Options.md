---
type: docs
---

### Objective

Improve the usability of the Paintbrush GUI.

### Key Concepts and Definitions

- **Reset Brush Option**: Resets the slider to a default value.
- **Brush Link Button**: Links the paintbrush options to the brush editor options.
- **Expander**: A collapsible GUI section for organizing lesser-used options.

### Related Links

- Branches: Artbox and [feature-paintbrush-options](https://gitlab.gnome.org/pixelmixer/artbox/-/tree/feature-paintbrush-options?ref_type=heads)

### Design Revisions

| **Revision**  | **Current Design**  | **Issues**  | **Changes** |
|--------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **1. Remove Reset Brush Button** | Option sliders have a reset button to default values. | Rarely used; adds complexity to the GUI. | Remove the reset to default button. |
| **2. Remove Brush Link Button**   | Brush link button allows linking to brush editor options. | Difficult to explain and justify; causes confusion | Remove the link button. |
| **3. Add Expander for Additional Options** | Options added to the end of paintbrush settings; more options will be added in the future   | Lesser-used options clutter the interface and reduce dock space efficiency | Add an "Additional Options" expander for lesser-used items |
| **4. Separate Dynamics** | 'Enable Dynamics' contains the 'Fade and Colour' options| The 'Fade and Colour' options take up a lot of space, and do not need to be visible all the time.| Add a "Dynamic Fade and Colour" expander, visible when Enable Dynamics is checked |
| **5. Compact Resource Chooser** | Picking a resource such as a brush or a dynamic is done via a chooser, see the Paintbrush GUI | The chooser is takes up two rows of the dockable due to a label above the combo box. The icons on either side are distorted to fill the gap, which looks bad. GUI space is wasted | Remove the label and the chooser becomes compact. The purpose of the chooser is self evident and does not need a label|
| **6.Smooth Stroke Position** | 'Smooth Stroke' is in low down in the dock | It's a frequently used option for painting | Move higher up the dock |
