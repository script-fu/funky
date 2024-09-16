---
title: Plugins
type: docs
---

## Introduction

Some of these plugins are exclusive to Artbox, as they use additional commands not available in GIMP. They are generally written using Script-Fu, a Scheme based scripting language that is part of GIMP. They install as part of Artbox when it is built locally.  

The AppImage does not include them at the moment, for the AppImage version:

* Find or add a plug-ins folder; Artbox -> Edit -> Preferences -> Folders -> Plug-ins
* Extract this download, [plugins.zip](/artbox/downloads/plugins.zip), to that folder
* Right click the <plugin-name.scm> inside an extracted plugin folder
* Properties -> permissions -> allow executing file as program
* Restart Artbox

## Related Sites

[Script Fu Plugins](https://script-fu.github.io/2023/08/13/Getting-Started.html)  
[GIMP documentation](https://docs.gimp.org/en/gimp-concepts-script-fu.html)  
[Scheme](https://www.scheme.org/)