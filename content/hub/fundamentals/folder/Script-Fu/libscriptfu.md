---
title: libscriptfu
type: docs
url: "/hub/fundamentals/folder/script-fu/libscriptfu"
weight: 5
---

> **Note**: This content was copied from the [libscriptfu README on GitLab] and may have changed upstream: https://gitlab.gnome.org/GNOME/gimp/-/blob/master/plug-ins/script-fu/libscriptfu/README

### About

```txt
About libscriptfu

libscriptfu is part of GIMP.
It is not generally useful except by GIMP.

The libscriptfu library is used by plugin executables,
and the PDB procedures they create,
all part of the "ScriptFu" machinery.

The libscriptfu library is not intended for third-party developers,
only for core GIMP developers.
Headers for libscriptfu might not be installed.

This directory contains three libraries: libscriptfu, tinyscheme, and ftx.
The tinyscheme library contains a TinyScheme interpreter.
The ftx library extends the TinyScheme interpreter,
adding file functions to the Scheme language.
The libscriptfu library contains both the tinyscheme and ftx libraries.
The libscriptfu library wraps the TinyScheme interpreter,
specializing it for GIMP.
The script-fu executable uses the libscriptfu library,
to interpret Scheme scripts that GIMP users refer to as "plug-ins."

These libraries depend on other libraries, e.g. math, libgimp, glib, etc.

Coupling between the executables and the libraries should be in one direction:
source for the inner libs should not include headers from the outer executables.
This lets you more easily update the inner libraries
(which originated elsewhere and might be maintained elsewhere),
and change the outer executables
(which are subject to change by GIMP developers.)

Example (which may change):
The script-fu executable is a plugin file that implements PDB procedures:
extension-script-fu, script-fu-console, script-fu-text-console, script-fu-eval,
and script-fu-server.
Each of those PDB procedures runs as a separate process.
Each of those processes uses libscriptfu.
The main PDB procedure is extension-script-fu, which is a long-lived process.
It is a PDB procedure of PDBProcedureType EXTENSION.
It interprets the Scheme scripts that user's call "plug-ins."

Rarely two of the PDB procedure processes run concurrently.
When they do, and libscriptfu is built as a shared library,
the read-only, code portion of the library is only loaded in memory once.
```





