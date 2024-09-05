---
type: docs
---

### Objective

Improve the quality of the painting.

### Key Concepts and Definitions

- **Brush Stamp**: The mask that is used as a brush 'stamp'.
- **Force**: A paintbrush option that affects the pre-processing of the brush stamp.

### Related Links

- Branches: Artbox and [feature-paintbrush-high-quality-force](https://gitlab.gnome.org/pixelmixer/artbox/-/tree/feature-paintbrush-high-quality-force?ref_type=heads)

### Design Revisions

| **Revision**  | **Current Design**  | **Issues**  | **Changes** |
|--------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **1. Enable High Quality Force** | It is not active | The Force parameter is not working as well as it could  | Enable |

### Notes

This feature is the wonderful work of [Elle Stone](https://gitlab.gnome.org/ellestone). Artbox simply enables the option by default. Performance was an issue several years ago, which led to it being deactivated.
