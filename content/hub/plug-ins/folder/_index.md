---
title: Plug-ins
type: docs
---

## Introduction

These plug-ins currently only work in the latest [**GIMP development version**](https://gitlab.gnome.org/GNOME/gimp/-/commits/master?ref_type=heads) or [**Artbox**](https://script-fu.github.io/artbox/), my custom GIMP build. Once **GIMP 3** is officially released as a Flatpak, they should work fine there too. They may not work on Windows, I've shifted to Linux for development, but with a small tweak or two, they might work just fine.

## Installation

- Find or add a plug-ins folder; GIMP -> Edit -> Preferences -> Folders -> Plug-ins
- Extract a <plug-in-name.zip> to that folder, keeping the plug-in inside its own named folder.
- **plug-ins-folder/plug-in-name/plug-in-name.scm**
- Right click the <plug-in-name.scm> inside an extracted plug-in folder.
- Properties -> permissions -> allow executing file as program.
- Repeat for any other supporting plug-ins.
- Restart GIMP.

## Keyboard Shortcut

This forces GIMP to save the shortcut for the next session. First, search for the plug-in name, and assign a shortcut.

_Edit -> Keyboard Shortcuts_

Once the shortcut is working as you like, save your work then;  

_File -> Quit_

When GIMP restarts, your plug-in should be activated by the assigned key.
