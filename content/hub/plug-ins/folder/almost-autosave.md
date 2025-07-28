---
title: Almost Autosave
type: docs
url: "/hub/plug-ins/folder/almost-autosave"
---

## Introduction

This Autosave feature saves numbered versions of edited files into a dedicated folder, without overwriting your originals.
In Artbox, if Autosave is not active, a dull red Status Bar label appears as a reminder (this can be turned off in Preferences > Help System > Show Almost-Autosave reminder).

**Note:** You must start Autosave manually each session in GIMP; so it’s “almost” an autosave.

**New in Artbox:**
Artbox now includes an experimental Commands Dockable system, allowing you to trigger scripted commands automatically.

See a demonstration video on [YouTube](https://youtu.be/-b8DCdvV8Bg)

You can use this to start Autosave automatically when an image is opened or edited:

Save the following as `signal-dirty.gcmd` in your `commands folder`*.

```scheme
# GIMP command item

(name "signal-dirty")
(command "(script-fu-almost-autosave #:run-mode RUN-NONINTERACTIVE)")
(description "Automatic Autosave")
(icon-name "gimp-marker")
(language script-fu)
(event-signal "dirty")
(enabled yes)
(execute-once yes)
(coalesce-signals no)
(coalesce-threshold-ms 100)

# end of GIMP command item
```

Restart Artbox. If the plug-in is installed, Almost-Autosave will start automatically as soon as you open or modify an image.

* Commands location example: /home/mark/.config/Artbox/3.0/default/commands

This plug-in utilizes a set up plug-in, it helps the main plug-in do its core task. For the plug-in to function the set-up plug-in needs to be installed as well.

[almost-autosave.zip](../../../../downloads/almost-autosave.zip)  
[Installation](../#installation)

### Back-up Folder and File Structure

* Autosave Folder
  * File Name
    * autosave_1.xcf
    * autosave_2.xcf
    * autosave_3.xcf

### Plug-in Menu Location

_File -> Almost Autosave_

![artbox-logo](/images/autosave.webp)
