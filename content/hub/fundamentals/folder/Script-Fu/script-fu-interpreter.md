---
title: Script-Fu Interpreter
type: docs
url: "/hub/fundamentals/folder/script-fu/script-fu-interpreter"
weight: 5
---

> **Note**: This content was copied from the [interpreter README on GitLab] and may have changed upstream: https://gitlab.gnome.org/GNOME/gimp/-/blob/master/plug-ins/script-fu/interpreter/README

```md
# About script-fu-interpreter

It is GIMP's Scheme interpreter akin to any other language interpreter,
rather than a GIMP extension as is the plugin extension-script-fu.
This interpreter (like all the ScriptFu plugins) embeds a TinyScheme interpreter.

It is an executable program that is passed the name of a .scm file.
The combination defines one or more PDB procedures of type PLUGIN.

Differences from extension-script-fu
====================================

Since gimp-script-fu-interpreter and extension-script-fu use the same
embedded interpreter (they both wrap TinyScheme)
there is no difference in the language interpreted.
Any differences are in the larger behavior of plugins.

### PDB Procedure type

Defines PDB procedure(s) of type PLUGIN.
Unlike for the scriptfu extension,
where a .scm file defines PDB procedure(s) of type TEMPORARY
(owned by the PDB procedure of type PLUGIN named extension-script-fu)

### Protocol

Uses protocol to GIMP like other interpreters e.g. Python
(query, create, and run phases.)
The protocol to GIMP is unlike the protocol to the GIMP extension extension-script-fu.

(Note that "extension" has many meanings.  It can denote: a protocol,
or "suffix of a filename", or "a resource that extends GIMP."
extension-script-fu is "a resource that extends GIMP" and it also uses
the "extension" protocol,
while gimp-script-fu-interpreter is a "a resource that extends GIMP" but uses
the "plugin" protocol.)

### Process lifetimes

Executed many times, for many phases,
unlike extension-script-fu which stays executing and gets a remote procedure call
from GIMP to run a PDB procedure.

### Process concurrency

Each invocation of a plugin is in a separate process.
One plugin process crash does not affect others.
Unlike extension-script-fu, where a crash means the GIMP app must be restarted
to restart extension-script-fu.

### GUI concurrency

Each plugin can have its own GUI visible concurrently
with the GUI of other ScriptFu plugins.

For extension-script-fu, an open dialog
prevents other plugins in /scripts (implemented by extension-script-fu)
from opening a dialog.
Instead extension-script-fu opens such dialogs sequentially.

This difference is not very important,
since most users work sequentially.
Most dialogs for plugins do not do anything substantive
until a user closes the dialog with the OK button.

### Calls between scripts

In extension-script-fu, a call to another PDB procedure
implemented by TEMPORARY procedure owned by extension-script-fu
does not leave the process.

In gimp-script-fu-interpreter, a call to another PDB procedure
implemented in another plugin file starts another process.

For other plugins, most calls to another PDB procedure starts another process.
The exception is when one plugin file implements many PDB procedures.
One common case is when one plugin file implements its own TEMPORARY PDB procedures that
exist only for the duration of the plugin's lifetime.

Naming
======

script-fu-interpreter is the informal name.

Source is located in /plug-ins/script-fu/interpreter

Filename of the executable is gimp-script-fu-interpreter-3.0.
The name is versioned by a number corresponding to the API
and the major version of GIMP (when script-fu-interpreter was introduced).
We expect plugin authors to be insulated from changes to script-fu-interpreter,
for the duration of the GIMP 3 version.


About .scm scripts for script-fu-interpreter
============================================

The contents of a .scm file queried by script-fu-interpreter
are the same as those handled by extension-script-fu
except for the addition of a shebang:

    #!/usr/bin/env gimp-script-fu-interpreter-3.0
    (define (script-fu-test img  drawable)
    ...
    (script-fu-register "script-fu-test"
    ...

### Query of scripts

As for other interpreters, a plugin script file must have certain attributes
to be queried by GIMP.  But a queried file may define many PDB procedures.

A .scm file queried by script-fu-interpreter:

- must have permission to execute.
- must be in a directory names the same as the file's base name (less suffix.)

A directory containing an .scm file queried by script-fu-interpreter
is usually a subdirectory of one of the /plug-ins directories,
unlike for extension-script-fu, where the .scm files are in a /scripts dir.

A plugin directory should contain only one queryable .scm file:
only one file can have the same base name as the directory and
GIMP will query that file.

### Defining many PDB procedures per directory

When GIMP queries, script-fu-interpreter will load *ALL* the .scm files
in the same directory (regardless of shebang or execute permission.)
Any of the .scm files can declare and register a PDB procedure.
Any single  .scm file can declare and register many PDB procedures.

Similarly, when GIMP runs a named PDB procedure defined in an .scm file,
script-fu-interpreter will actually load *ALL* the .scm files
in the same directory, but run only the define run function so named.

A plugin directory that contains many .scm files having a shebang
will also work, since only one can be named the same as the parent directory,
and GIMP will only query it,
but find the other .scm files with a shebang.

### Requery of scripts

As with other plugins, GIMP caches plugin definitions between sessions.
GIMP queries plugin files at startup.
GIMP will not requery any plugin files which have not changed since cached.
GIMP will not query a plugin file that is added to the file system
until GIMP is restarted.
(Filters>Development>ScriptFu>Refresh Scripts  will not requery script files
handled by gimp-script-fu-interpreter, only those handled by extension-script-fu.)

### Errors during query

Most errors occurring during query appear only in the console.
If you are a plugin author, you should start GIMP in a console
so you can see such errors.

A script may be malformed because it does not define
a "run" function having the same name as the PDB procedure name declared
in the call to script-fu-register().
Formerly, such a malformed script was successfully queried but
the script would throw a "undefined variable" error at run time.
Now, such a malformed script is not queried successfully,
but throws a warning to the console:
"Run function not defined, or does not match PDB procedure name:"



Test scripts
============

Small test scripts for gimp-script-fu-interpreter
are located in /plug-ins/script-fu/scripts/test

The script ts-helloworld.scm,
formerly installed in /scripts and handled by extension-script-fu,
is now installed in /plug-ins/ts-helloworld/ts-helloworld.scm
and is now handled by gimp-script-fu-interpreter.
It appears as "Filters>Development>Script-Fu>Test>Hello World..."
```