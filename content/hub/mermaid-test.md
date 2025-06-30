---
title: Safe Diagram Alternatives
type: docs
weight: 99
---

## Safe Diagram Alternatives

This page demonstrates reliable alternatives to Mermaid diagrams that work consistently across all devices.

### ASCII Flow Diagram (Replaces Flowchart)

```text
                    ┌─────────┐
                    │  Start  │
                    └────┬────┘
                         │
                    ┌────▼────┐
                    │ Is it?  │
                    └────┬────┘
                         │
              ┌──────────┼──────────┐
              │ Yes      │      No  │
              ▼          ▼          ▼
        ┌─────────┐            ┌─────────┐
        │   OK    │            │   End   │
        └────┬────┘            └─────────┘
             │
        ┌────▼────┐
        │ Rethink │
        └─────────┘
```

### ASCII Art Sequence (Replaces Sequence Diagram)

```text
User             System           Database
  │                │                 │
  │ Request data   │                 │
  ├───────────────>│                 │
  │                │ Query           │
  │                ├────────────────>│
  │                │                 │
  │                │ Return data     │
  │                │<────────────────┤
  │ Display result │                 │
  │<───────────────┤                 │
  │                │                 │
```

### Simple Text State Machine (Replaces State Diagram)

**States and Transitions:**

- **Initial State** → Still
- **Still** → Moving (on motion)
- **Still** → End (on stop)
- **Moving** → Still (on pause)
- **Moving** → Crash (on error)
- **Crash** → End (on reset)

### Benefits of Safe Alternatives

- ✅ **Universal compatibility** - Works on all browsers and devices
- ✅ **No JavaScript dependencies** - Pure HTML/CSS
- ✅ **Mobile-friendly** - Responsive design that scales properly
- ✅ **Accessible** - Screen reader compatible
- ✅ **Fast loading** - No external diagram rendering libraries
- ✅ **Consistent styling** - Matches your site's theme perfectly
