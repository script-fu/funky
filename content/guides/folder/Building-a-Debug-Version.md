---
type: docs
---

# Introduction

This guide is intended for those who are familiar with C programming and have a basic understanding of Linux development. If you're new to debugging or Linux development, you may want to start with some additional resources before proceeding with this guide.

A debug version is a build of a program that includes additional information, known as debug symbols, to aid in troubleshooting and debugging. Debug symbols help developers pinpoint errors and understand the program's execution flow. This guide explains how to install and use debug symbols with the GNU Debugger (GDB) on Debian Stable.

## Contents
- [Setting Up Debug Symbols](#setting-up-debug-symbols)
- [Configure GDB](#creating-a-gdbinit-file)
- [Build BABL, GEGL, and GIMP Debug Versions](#build-babl-gegl-and-gimp-debug-versions)
- [Launch an App under GDB](#launch-an-app-under-gdb)
- [GDB Server](#gdb-server)
- [Using TTYs in Linux](#using-ttys-in-linux)

### Important

Be cautious with shell scripts from the internet. Review the script contents thoroughly or use an AI tool to understand its actions.

## Setting Up Debug Symbols

To manage and use debug symbols on Debian Stable, Debian offers the 'debuginfod' service, which allows you to download debug symbols on demand.

### Installing debuginfod

First, you need to install the debuginfod package, which provides access to debugging information.

```bash
sudo apt update
sudo apt install debuginfod
```

### Adding Extra Symbols

In addition to using debuginfod, you’ll need to add the Debian debug repository to your sources list. This repository contains debug symbols for various Debian packages.

```bash
echo "deb http://deb.debian.org/debian-debug/ bookworm-debug main" | sudo tee -a /etc/apt/sources.list.d/debug.list
```

Update your package lists:

```bash
sudo apt update
```

Then, install the debug symbols for GIMP, GLib, GTK, and other dependencies:

```bash
sudo apt install gimp-dbgsym
sudo apt install libglib2.0-0-dbgsym
sudo apt install libgtk-3-0-dbgsym libc6-dbg
```

## Installing GDB

GDB (GNU Debugger) is a powerful tool that allows you to debug and troubleshoot applications. It provides a wide range of features, including the ability to run an application in debug mode, set breakpoints, and inspect variables.

Install GDB with:

```bash
sudo apt update
sudo apt install gdb
```

Note that GDB is a separate tool from debuginfod, which provides access to debugging information. GDB uses this information to provide a more detailed view of the application's execution flow.

### Configure GDB

The .gdbinit file allows you to configure GDB with default options and commands, streamlining the debugging process.

Here’s a simple script that creates a .gdbinit file with basic logging settings:

```bash
#!/bin/bash

# Define the path to the .gdbinit file and log folder/file
GDBINIT_PATH="$HOME/.gdbinit"
LOG_DIR="$HOME/gdb_logs"
LOG_FILE="$LOG_DIR/gdb_log.txt"

# Create the logging directory if it doesn't exist
if [ ! -d "$LOG_DIR" ]; then
    echo "Creating logging directory at $LOG_DIR"
    mkdir -p "$LOG_DIR"
fi

# Create the log file if it doesn't exist
if [ ! -f "$LOG_FILE" ]; then
    echo "Creating log file at $LOG_FILE"
    touch "$LOG_FILE"
fi

# Create or overwrite the .gdbinit file with the necessary GDB settings
echo "Creating or updating .gdbinit in $HOME"

cat > "$GDBINIT_PATH" << EOL
set debuginfod enabled on
set logging file $LOG_FILE
set logging enabled on
set logging overwrite on
EOL

echo ".gdbinit file has been created with the following content:"
cat "$GDBINIT_PATH"

echo "Default GDB settings have been applied. Logs will be saved to $LOG_FILE."

```
This script sets GDB to automatically log output and enables debuginfod.

## Build Debug Versions

To debug issues with GIMP, it's often necessary to build debug versions of the underlying libraries, including BABL, GEGL, and GIMP itself. This allows you to get more detailed information about the execution flow of the program and identify the source of errors.

There is a switch to set when we build these libraries and GIMP that allow the
debugging to take place. We build debug versions, using the same method as described 
[here](https://gitlab.gnome.org/pixelmixer/artbox/-/wikis/Building-Artbox#a-build-script-for-artbox-babl-and-gegl), except that `build_type="release"` is set to `build_type="debug"`. Build all
three with the debug option set before continuing. 

Also, keep in mind that you'll need to rebuild the libraries with the build_type set to "release" when you're finished debugging, in order to get the best performance out of GIMP.


## Launch an App under GDB

The following bash script helps automate the process of launching GIMP in debug mode using GDB. It checks for necessary files and environment variables before running the debugger. When prompted, if you choose 'y', the script will break at the main function to check if debug symbols are available. At the GDB prompt, use 'info sharedlibrary' to view the availability of symbols. Missing symbols will be indicated with an asterisk (*).

Ensure you have a 'build_env.sh' [file](https://gitlab.gnome.org/pixelmixer/artbox/-/wikis/Building-Artbox#environment-variables) in the same directory. This file should define environment variables, such as GIMP_PREFIX, required for the GIMP build.

```bash
#!/usr/bin/env bash

# store the folder path for this script
script_dir="$(dirname "$(realpath "$0")")"

export DEBUGINFOD_URLS="https://debuginfod.debian.net/"

# Check if "build_env.sh" exists in the same directory as this script, source it
definitions_file="$script_dir/build_env.sh"
if [[ ! -f "$definitions_file" ]]; then
  echo "Error: file 'build_env.sh' not found in $script_dir"
  read -n 1 -r -s -p "Press any key to exit..."
  exit 1
fi
source "$definitions_file"

# Check if GIMP_PREFIX is set and valid
if [[ -z "$GIMP_PREFIX" ]]; then
  echo "Error: GIMP_PREFIX is not set."
  read -n 1 -r -s -p "Press any key to exit..."
  exit 1
fi

# Verify GIMP binary path
gimp_binary="${GIMP_PREFIX}/bin/gimp-2.99"
if [[ ! -x "$gimp_binary" ]]; then
  echo "Error: GIMP not found or not executable at $gimp_binary"
  read -n 1 -r -s -p "Press any key to exit..."
  exit 1
fi

# Ask user if they want to test debug symbol availability
echo -e "Launching GIMP in debug mode."
echo "Check debug symbols with a breakpoint?"
read -p "Type 'y' to test or 'n' to skip [default: n]: " user_choice

# Default to skipping debug symbol testing if user input is empty
if [[ -z "$user_choice" ]]; then
  user_choice="n"
fi

# Perform action based on user input
if [[ "$user_choice" = "y" ]]; then
  echo -e "\nTesting debug symbols with a breakpoint at 'main'."
  echo "Enter 'info sharedlibrary' at the (gdb) prompt to view availablity."
  echo -e "Enter 'continue' at the (gdb) prompt to launch GIMP in debug mode.\n"
  gdb -q -ex="break main" -ex="run" --args "$gimp_binary"
else
  echo "Launching GIMP directly in debug mode."
  gdb -q -ex="run" --args "$gimp_binary"
fi
```

In the following output example, 'Yes' indicates that debug symbols are available for the shared library, while '(*)' means that debug symbols are missing for that library.

```
Launching GIMP in debug mode.
Check debug symbols with a breakpoint?
Type 'y' to test or 'n' to skip [default: n]: y

Testing debug symbols with a breakpoint at 'main'.
Enter 'info sharedlibrary' at the (gdb) prompt to view availablity.
Enter 'continue' at the (gdb) prompt to launch GIMP in debug mode.

Reading symbols from /home/mark/code/gnome/bin/gimp-2.99...
Breakpoint 1 at 0x154fc1: file ../app/main.c, line 544.
Starting program: /home/mark/code/gnome/bin/gimp-2.99 

This GDB supports auto-downloading debuginfo from the following URLs:
  <https://debuginfod.debian.net/>
Enable debuginfod for this session? (y or [n]) y
Debuginfod has been enabled.
To make this setting permanent, add 'set debuginfod enabled on' to .gdbinit.
[Thread debugging using libthread_db enabled]                                                                                  
Using host libthread_db library "/lib/x86_64-linux-gnu/libthread_db.so.1".
                                                                                                                               
Breakpoint 1, main (argc=1, argv=0x7fffffffe5f8) at ../app/main.c:544
544	  GError         *error = NULL;
(gdb) info sharedlibrary 
From                To                  Syms Read   Shared Object Library
0x00007ffff7fcc060  0x00007ffff7ff0f51  Yes         /lib64/ld-linux-x86-64.so.2
0x00007ffff7f98560  0x00007ffff7fb0bbe  Yes         /home/mark/code/gnome/lib/x86_64-linux-gnu/libgimpbase-3.0.so.0
0x00007ffff7f72ca0  0x00007ffff7f8005c  Yes         /home/mark/code/gnome/lib/x86_64-linux-gnu/libgimpcolor-3.0.so.0
0x00007ffff7f554e0  0x00007ffff7f643d0  Yes         /home/mark/code/gnome/lib/x86_64-linux-gnu/libgimpconfig-3.0.so.0
0x00007ffff7f44220  0x00007ffff7f47cb7  Yes         /home/mark/code/gnome/lib/x86_64-linux-gnu/libgimpmath-3.0.so.0
0x00007ffff7f3c490  0x00007ffff7f3e64f  Yes         /home/mark/code/gnome/lib/x86_64-linux-gnu/libgimpmodule-3.0.so.0

...
0x00007ffff2001040  0x00007ffff20010f9  Yes (*)     /lib/x86_64-linux-gnu/libicudata.so.72
...
...

0x00007ffff1fcc6b0  0x00007ffff1fe19be  Yes         /lib/x86_64-linux-gnu/libgpg-error.so.0
(*): Shared library is missing debugging information.
(gdb) 

```

## GDB Server

The GDB server is a tool that allows you to debug GIMP remotely, even when the system is frozen. This can be useful when you need to debug a crash or other issue that causes the system to become unresponsive.

First, install the GDB server:

```bash
sudo apt install gdbserver
```

We can use a bash script again, to source our environment variables before running the server. Save it in your bash folder where "build_env.sh" is also kept, call it 'gdbserver.sh'

```bash
#!/usr/bin/env bash
# export build variables
script_dir="$(dirname "$(realpath "$0")")"

source "$script_dir/build_env.sh"

gdbserver :9999 `which gimp-2.99` --g-fatal-warnings

```

open a terminal in your bash folder and run 'gdbserver.sh':

```bash
bash gdbserver.sh
```

The server will output something like:

```bash
Process /home/mark/code/gnome/bin/gimp-2.99 created; pid = 14224
Listening on port 9999
```

### Using TTYs in Linux

TTYs (Teletype terminals) allow you to interact with the Linux system through a text-based interface, which is helpful for troubleshooting.

To switch to a TTY, use Ctrl + Alt + F1 through F6. To return to the graphical interface, use Ctrl + Alt + F7 (or F2 on some systems).

To return to the graphical interface, use `Ctrl + Alt + F7` (or `F2` on some systems).

Once in a TTY, log in and run GDB to connect to the GDB server: 

```bash
gdb /home/mark/code/gnome/bin/gimp-2.99
```

Then, connect to the GDB server and resume execution:

```bash
(gdb) target remote localhost:9999
(gdb) continue
```

Once GIMP is running in debug mode, you can return to the graphical interface by pressing Ctrl + Alt + F7 (or F2, depending on your system). You should now see GIMP open and ready for interaction.

To simulate the crash, reproduce the steps that lead to the error. Once the crash occurs, switch back to the TTY where GDB is running by pressing Ctrl along with the Function key you used earlier to enter the TTY (e.g., Ctrl + Alt + F1).

At the GDB prompt (gdb), enter the following command to gather detailed information from all threads:

```bash
thread apply all backtrace full
```

Scroll through the backtrace output until the (gdb) prompt reappears, then type quit to exit GDB.

Now, return to the graphical interface using Ctrl + Alt + F7 (or F2). You will regain control of your desktop, and both GDB and GIMP will have terminated.

If you configured GDB with logging via a .gdbinit file as outlined earlier, the crash report will be saved in your home directory under gdb_logs. You can review this file to analyze the crash in detail.
