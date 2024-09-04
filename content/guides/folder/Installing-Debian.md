---
type: docs
prev: guides/first-page
next: guides/folder/A-Linux-System-Overview.md
sidebar:
  open: true
---

# Introduction
This document outlines the steps I took to install [Debian](https://www.debian.org/) Stable as the [Artbox](https://gitlab.gnome.org/pixelmixer/artbox/-/wikis/home) OS. It may be useful for others attempting a similar installation. Debian Stable was chosen as the Linux platform because GIMP Dev is built on Debian Testing and aims to support building GIMP on Debian Stable.

## Backup Your Data
Before installing Debian, make a complete backup of your Home directory on an external drive. Include any other data folders and files you want to keep. If you have Git repositories, push any wanted changes to the origins to easily restore them after the install. Any unsaved data will be lost.

## Create a Partition
Create a disk partition on your primary hard drive to install Debian onto. This process has many online guides and various tools, such as GParted. You may need to create a partition from Windows to create a dual-boot machine or reuse an existing partition for Linux. Understand the process specific to your system and needs before proceeding.

## Create a USB to Install Debian Stable
Assuming you have created a partition on your primary hard drive for Debian and an appropriate-sized swap partition:

1. Download the Debian ISO from the official [website](https://www.debian.org/).
2. On Windows, we can use [BalenaEtcher](https://etcher.balena.io/) to put the ISO on a USB drive.
3. On Linux, we can use a command-line tool to create a bootable USB from the ISO.

## Install

1. Insert the USB drive into a main USB port.
2. Restart and press F2 on the initial screen to access the boot options.
3. Select the USB drive to boot from.
4. Choose a non-graphical install.
5. Skip the root password when asked, leaving it blank, and set a user password on the next section.
6. Partition manually:
    * Set your spare partition as ext4 journaling.
    * Set your swap partition.
    * Mount point: /
    * Label: linux
    * Hostname: name (appears to the right of your terminal prompt user@hostname)
    * User account: Your Full Name
    * User: name (appears to the left of your terminal prompt)
7. Add Cinnamon to the install section for a traditional desktop interface.
8. The installation will proceed, and you should have a new Debian Stable OS to set up.

## Setup the System

### Display Scaling
You may have purchased a 4K monitor to use 4K worth of display, at the moment, Debian Stable does not do fractional scaling in a way that allows this.

An ideal approach to display scaling would be, where the display resolution is retained, and only the GUI elements are scaled up or down to match the desired size. This is often referred to as "resolution-independent" or "high-DPI" scaling.

In this approach, the display resolution remains the same (e.g., 4K), and the GUI elements, such as text, icons, and graphics, are scaled up or down to match the desired size. This way, the display resolution is not compromised, and the GUI elements are rendered at a size that's comfortable for the user.

Unfortunately, Linux desktop environments have been slower to adopt this approach, and many still use the older method of scaling the display resolution itself, which can lead to the blurriness.

* Avoid fractional display scaling, as Debian Stable does not support it well.
* Instead, use the following workaround:
    + Menu -> Search -> Font Selection -> Font Settings -> Text Scaling Factor -> 2.5
    + Menu -> Search -> Font Selection -> Desktop Font 14: affects both monitors
    + Menu -> Search -> Panel -> Customize -> Panel Height 60
    + Menu -> Search -> Panel -> Panel appearance -> Right Zone: Symbolic Icon Size 48px
    + Menu -> Search -> Mouse and Touchpad -> Pointer Size and Speed: affects both monitors
    + Right-click the 4K monitor Desktop -> Customize: Icon Size Larger
    + Firefox: in the address bar -> about:config -> search: layout.css.devPixelsPerPx -> set the value to 1

## Terminal

Configure your terminal to your liking:

1. Menu -> Search -> Terminal -> Edit -> Preferences
2. Text -> Initial Size 140: columns 40 rows
3. Text -> Custom font: 140: Monospace 10
4. Colours -> Built-in-schemes -> Solarized Dark

## Restore Data - User Specific

Restore your backed-up data to the Home directory. For example:

* Backup/Home/Artwork -> Home/Artwork
* Backup/Home/code -> Home/code
* Backup/Home/Desktop -> Home/Desktop
* Backup/Home/.ssh (GitLab keys) -> Home/.ssh (GitLab keys)
* Backup/Home/.config/GIMP -> Home/.config/GIMP

## Git

Install Git using the terminal command: `sudo apt install git`
Configure your Git email: `git config --global --edit`

### GitLab Access

Restore repository access to GitLab or GitHub:

1. Change the permissions on the SSH key file: `chmod 600 ~/.ssh/id_rsa`
2. Add the user to the new Git install: `ssh-add ~/.ssh/id_rsa`
3. Test the connection: `ssh -T git@ssh.gitlab.gnome.org` or `ssh -T git@github.com`

For each repository, fetch the origins and reset the local branch to match:

```bash
git reset --hard remote-name/branch-name
git clean -df
```

A `git status` report on the updated repo should now look normal. This may also need to be done on any submodules.

We now have a new OS with any data and repositories restored. This process is fairly specific to my usage and knowledge of Linux, feel free to offer any suggestions for improving it as a guide.


