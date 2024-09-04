---
type: docs
prev: guides/first-page
next: guides/folder/A-Linux-System-Overview.md
sidebar:
  open: true
---

Linux is a powerful and versatile operating system with a vast community of developers. At its core, a Linux system consists of several key components that work together to provide a seamless user experience. This overview will outline the essential parts of a Linux system, including the kernel, distribution, package manager, display manager, desktop environment, and display server (X11 or Wayland).

## Examples of Linux Distribution Configurations

| **Distribution**   | **Package Manager** | **Display Manager** | **Desktop Environment** | **Display Server** |
|--------------------|----------------------|----------------------|-------------------------|--------------------|
| Debian             | APT                  | GDM                  | GNOME                   | X11                |
| Debian             | APT                  | LightDM              | Cinnamon                | X11                |
| Debian Testing     | APT                  | GDM                  | GNOME                   | Wayland            |
| Fedora             | DNF                  | GDM                  | GNOME                   | Wayland            |
| Arch Linux         | Pacman               | SDDM                 | KDE Plasma              | X11                |

## Explanation

### Kernel
The core of the operating system that interfaces directly with the hardware, usually Linux.

### Distribution
The Linux distribution, which packages the kernel along with user space tools, libraries, and software. Examples include Debian, Arch Linux, and Fedora.

### Package Manager
A tool used to install, update, and remove software applications from repositories. Examples include APT for Debian-based distributions, DNF for Fedora, and Pacman for Arch Linux.

### Display Manager
Manages the graphical login screen and session initiation. Examples include GDM (GNOME Display Manager), LightDM, and SDDM (Simple Desktop Display Manager).

### Desktop Environment
Provides the graphical user interface (GUI) and manages the overall appearance and user experience. Examples include GNOME, Cinnamon, and KDE Plasma.

### Display Server
Manages the display output and input events. Examples include X11 (X Window System) and Wayland. X11 is a traditional display server, while Wayland is a newer, more secure alternative.