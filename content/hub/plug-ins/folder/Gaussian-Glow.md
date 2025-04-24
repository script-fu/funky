---
title: Gaussian Glow
type: docs
url: "/hub/plug-ins/folder/Gaussian-Glow"
---

## Introduction

   Generate a multi‑layered glow by cloning the source and applying successive blurs & spread (noise) with varying strength.

   [glow-layer.zip](/funky/downloads/glow-layer.zip)

   [YouTube-video-demo](https://youtu.be/g4PkjFQsZ_k)

### Parameters

   - **iterations**         - The number of layers to create for constructing the glow.
     - Lower values → faster, coarser; higher → slower, smoother

   - **initial-opacity**    - Opacity (%) for the very first glow layer, which uses the
                         largest blur radius (most‑blurred).
     - Lower values → subtler outer glow; higher → stronger.
   - **final-opacity**      - Opacity (%) for the last layer
     - Lower values → subtler inner glow; higher → stronger.
   - **opacity-exponent**   - How the opacity values _rise_, the curve of the gradient
     - Lower values → slow out fast in; higher → fast out slow in
   - **final-gauss**        - Gaussian blur radius (pixels) for the last layer.
     - Larger → broader halo; smaller → tighter glow.
   - **gauss-exponent**     - How the blur values _fall_, the curve of the gradient
   - **final-spread**       - Noise spread (pixels) on the last layer.
     - Adds grain/texture; higher → more “fuzzy” glow.
   - **spread-exponent**    - How the spread values _fall_, the curve of the gradient
   - **post-gauss**         - Gaussian blur radius (pixels) for the composited layer.
     - Used to soften pixelation caused by noise spread.
   - **keep-construction**  - Boolean: TRUE keeps the temporary glow image
                         (and all intermediate layers).
   - **show-info**          - Boolean: Outputs the dynamic values to the error console
                         (and displays the construction image as it is created).

### Plug-in Menu Location

_Filters -> Light and Shadow -> Gaussian Glow_

### Keyboard Shortcut

This forces Artbox to save the shortcut for the next session. First, search for the plug-in name, and assign a shortcut.

_Edit > Keyboard Shortcuts_

Once the shortcut is working as you like, save your work then;  

_File > Quit_

When Artbox restarts, your plug-in should be activated by the assigned key.
