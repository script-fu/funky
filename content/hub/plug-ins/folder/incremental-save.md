---
title: Incremental Save
type: docs
url: "/hub/plug-ins/folder/incremental-save"
---

## Introduction

This is an incremental save feature. It saves a numbered version of the active file into a named sub-folder. It does not save over the opened file. Each image can have a unique number of saves, before the saves wrap around. Useful to save stages of progress, before committing to a proper save. Also good for recovering an earlier version.

This plug-in utilizes a set up plug-in, it helps the main plug-in do its core task. For the plug-in to function the set-up plug-in needs to be installed as well.

[incremental-save.zip](../../../../downloads/incremental-save.zip)  
[Installation](../#installation)  

### Save Folder and File Structure

* Image Folder
  * FileName_saves
    * FileName_1.xcf
    * FileName_2.xcf
    * FileName_3.xcf
    ...

### Plug-in Menu Location

_File -> Incremental Save_