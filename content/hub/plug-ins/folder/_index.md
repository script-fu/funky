---
title: Plug-ins
type: docs
url: "hub/plug-ins/folder"
---

## Introduction

These plug-ins currently only work in [**GIMP 3**](https://www.gimp.org/news/2025/03/16/gimp-3-0-released/) or [**Artbox**](https://script-fu.github.io/artbox/), my custom GIMP build.

{{< cards >}}

{{< card link="almost-autosave" title="Almost Autosave" icon="archive" >}}
{{< card link="incremental-save" title="Incremental Save" icon="folder-add" >}}
{{< card link="Gaussian-Glow" title="Gaussian Glow" icon="light-bulb" >}}
{{< card link="New-Layer-From-Selection" title="New Layer from Selection" icon="document-add" >}}
{{< card link="Layer-Group" title="Layer Group" icon="collection" >}}
{{< card link="Rename-Layers" title="Rename Layers" icon="tag" >}}
{{< card link="Get-Layer-Colour" title="Get Layer Colour" icon="cursor-click" >}}
{{< card link="Layer-Group-To-New-Image" title="Layer Group to New Image" icon="document-duplicate" >}}
{{< card link="Layer-Mode" title="Layer Mode" icon="adjustments" >}}
{{< card link="Select-All-Layers" title="Select All Layers" icon="view-list" >}}
{{< card link="Alpha-To-Show-Mask" title="Alpha to Show Mask" icon="selector" >}}
{{< card link="Crop-Layer-To-Mask" title="Crop Layer To Mask" icon="selector" >}}

{{< /cards >}}

### Installation

- Find or add a plug-ins folder; GIMP -> Edit -> Preferences -> Folders -> Plug-ins
- Extract a <plug-in-name.zip> to that folder, keeping the plug-in inside its own named folder.
- **plug-ins-folder/plug-in-name/plug-in-name.scm**
- Right click the <plug-in-name.scm> inside an extracted plug-in folder.
- Properties -> permissions -> allow executing file as program.
- Repeat for any other supporting plug-ins.
- Restart GIMP.

### Keyboard Shortcut

This forces GIMP to save the shortcut for the next session. First, search for the plug-in name, and assign a shortcut.

_Edit -> Keyboard Shortcuts_

Once the shortcut is working as you like, save your work then;  

_File -> Quit_

When GIMP restarts, your plug-in should be activated by the assigned key.
