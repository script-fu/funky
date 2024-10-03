---
title: "About"
type: docs
---

## Ongoing Development: A Journey in Iteration

This site is very much a **work in progress**, evolving as I continue to learn and refine my understanding of Script-Fu and functional programming. I'll be adding content **slowly and carefully**, following an **iterative approach**, much like writing functional code. There may not be much here at first, but I hope you’ll check back from time to time to see how things are progressing.

To kick things off, here are a couple of **functional-style plugins** I’ve developed:

- **Autosave**: Automatically saves your work at regular intervals.
- **Incremental Save**: Creates sequentially numbered backups of your file, ensuring you never lose progress.

Both the plug-ins utilize a set up plug-in, they help the main plug in do its core task. For the plug-in to function the set-up plug-in needs to be installed as well. Feel free to download, experiment, and even modify these plug-ins as you start your own Script-Fu journey!

These plug-ins currently only work in the latest [**GIMP development version**](https://gitlab.gnome.org/GNOME/gimp/-/commits/master?ref_type=heads) or [**Artbox**](https://script-fu.github.io/artbox/), my custom GIMP build. Once **GIMP 3** is officially released as a Flatpak, they should work fine there too. They may not work on Windows—I've shifted to Linux for development—but with a small tweak or two, they might work just fine.

### How to Install the Plugins

1. **Locate or create a plug-ins folder**: In GIMP, go to **Edit → Preferences → Folders → Plug-ins**.
2. **Download and extract** the [plugins.zip](/funky/downloads/plugins.zip) to that folder.
3. **Enable execution permissions**: Right-click the `<plugin-name.scm>` inside the extracted plugin folder, select **Properties**, then go to **Permissions** and check "Allow executing file as program."
4. **Restart GIMP**.
