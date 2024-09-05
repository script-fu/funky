---
type: docs
url: "/boxdocs/folder/Installation"
---

# Introduction

Artbox is a modified version of GIMP, if you can build GIMP, you can build Artbox. Artbox does not exist as an individual application, it relies on many parts to function and many apps are used to construct it. You need to create a _build environment_ for it first, like an aquarium for a fish. The following is a guide, for a Debian system. It will be a unique process for your system, and may require further research. Good luck!

## Content

* [Git](#git)
* [Dependencies](#dependencies)
* [Install Location](#install-location)
* [Clone the Source Code Repositories](#clone-the-source-code-repositories)
* [Environment Variables](#environment-variables)
* [A Build Script for Artbox, BABL and GEGL](#a-build-script-for-artbox-babl-and-gegl)
* [Desktop Launcher (System Specific)](#desktop-launcher-system-specific)
* [Conclusion](#conclusion)

## Git

Before we dive into building Artbox, you'll need to install and learn the basics of Git, a version control system that helps you manage and share source code. Git is an essential tool for any developer, and understanding how to use it will make the rest of the build process much easier. If you're new to Git, take a few minutes to read through [A Beginner's Guide to Using Git on Linux](https://gitlab.gnome.org/pixelmixer/artbox/-/wikis/A-Beginner's-Guide-to-Using-Git-on-Linux) to get up to speed.


## Dependencies

Here is the [official guide](https://developer.gimp.org/core/setup/build/linux/). The suggestion to look at [this](https://gitlab.gnome.org/GNOME/gimp/-/blob/master/.gitlab-ci.yml) file, that builds GIMP in the GitLab CI environment, is worth following. That file lists all the dependencies the GIMP Dev build process needs. By using that information we can make a bash script to install those packages on our system. Save the following code block to a file called "install-GIMP-dep.sh" and execute it by following the instructions below.

To execute the script:

- Open a terminal in the script folder.
- Run the command `bash install-GIMP-dep.sh` to execute the script.

## Important

Be wary about executing shell scripts from the internet, have a look at the contents and try and understand roughly what it is doing. Alternatively copy it into an AI chatbot and ask _that_ what the script is doing.

```bash
#!/bin/bash

# Define the list of packages to install
PACKAGES=(
  ccache
  clang
  cmake
  lld
  libomp-dev
  appstream
  at-spi2-core
  desktop-file-utils
  ffmpeg
  gettext
  ghostscript
  gi-docgen
  git
  gjs
  glib-networking
  gobject-introspection
  graphviz
  graphviz-dev
  hicolor-icon-theme
  iso-codes
  libaa1-dev
  libappstream-glib-dev
  libbz2-dev
  libcfitsio-dev
  libdbus-glib-1-dev
  libexif-dev
  libgexiv2-dev
  libgirepository1.0-dev
  libgs-dev
  libgtk-3-bin
  libgtk-3-dev
  libgudev-1.0-dev
  libheif-dev
  libjson-glib-dev
  libjxl-dev
  liblcms2-dev
  liblzma-dev
  libmng-dev
  libmypaint-dev
  libopenexr-dev
  libopenjp2-7-dev
  libpoppler-glib-dev
  libraw-dev
  libraw20
  librsvg2-dev
  libspiro-dev
  libsuitesparse-dev
  libtiff-dev
  libtiff5-dev
  libtool
  libumfpack5
  libunwind-dev
  libwebp-dev
  libwmf-dev
  libxmu-dev
  libxpm-dev
  luajit
  meson
  mypaint-brushes
  poppler-data
  python3
  python3-gi
  valac
  xauth
  xsltproc
  xvfb
  xz-utils
  yelp-tools
)

# Define a function to install a package and report failure
install_package() {
  local package="$1"
  if sudo apt-get install -y "$package"; then
    echo "Installed $package"
  else
    FAILED_PACKAGES+=("$package")
  fi
}

# Initialize the list of failed packages
FAILED_PACKAGES=()

# Loop through the packages and install them
for package in "${PACKAGES[@]}"; do
  install_package "$package"
done

# Print a summary of the installation
echo ""
echo "Installation Summary:"
echo "---------------------"
echo "Installed packages: ${#PACKAGES[@]}"
echo "Failed packages: ${#FAILED_PACKAGES[@]}"
if [ ${#FAILED_PACKAGES[@]} -gt 0 ]; then
  echo "Failed packages:"
  for package in "${FAILED_PACKAGES[@]}"; do
    echo "  $package"
  done
fi

read -n 1 -r -s -p "Press any key to exit"
```


## Install Location

After the Git challenge and package installation, we can proceed with the task. We'll keep the files we need in repository folders on the hard-drive, it's good to call the root folder "code", then put in a sub-folder, like "gnome", then another sub-folder "build" and one called "bash"

* Home
  * code
    * bash
    * gnome
      * build


These shell commands will create that little structure when run in a terminal, or you can do it using the File Manager.

```shell
mkdir $HOME/code
mkdir $HOME/code/bash
mkdir $HOME/code/gnome
mkdir $HOME/code/gnome/build
```

We are now ready to download from the internet, the source code files we need for our build environment. These files will be _cloned_ from existing repositories using Git and GitLab addresses.

## Clone the Source Code Repositories

In a terminal we can download the sources to our build directory:

```shell
cd $HOME/code/gnome/build
git clone https://gitlab.gnome.org/GNOME/babl
git clone https://gitlab.gnome.org/GNOME/gegl
git clone https://gitlab.gnome.org/GNOME/gimp
git clone https://gitlab.gnome.org/pixelmixer/artbox.git
```

The simple folder structure is now populated with thousands of files, and there's more to be made automatically by the build process.

- Home
  - code
    - bash
    - gnome
      - build
        - babl
        - gegl
        - gimp
        - artbox


## Environment Variables

The software that is about to be built, needs to know a few things about its environment. We do this by exporting some environmental variables. Copy the following into a file, call it **build_env.sh** and save it in the "bash" folder. 

```bash
#!/usr/bin/env bash
export GIMP_PREFIX="${HOME}/code/gnome"
export PATH="$GIMP_PREFIX/bin:$PATH"

# Capture the multi-os-directory
multi_os_directory=$(gcc -print-multi-os-directory 2>/dev/null)
if echo "$multi_os_directory" | grep ./ > /dev/null; then
  LIB_DIR=$(echo "$multi_os_directory" | sed 's/\.\.\///g')
else
  LIB_DIR="lib"
fi

# Capture the multiarch
multiarch=$(gcc -print-multiarch 2>/dev/null)
if echo "$multiarch" | grep . > /dev/null; then
  LIB_SUBDIR="${multiarch}/"
else
  LIB_SUBDIR=""
fi

# Export environment variables
export PKG_CONFIG_PATH="${GIMP_PREFIX}/${LIB_DIR}/${LIB_SUBDIR}pkgconfig${PKG_CONFIG_PATH:+:$PKG_CONFIG_PATH}"
export LD_LIBRARY_PATH="${GIMP_PREFIX}/${LIB_DIR}/${LIB_SUBDIR}${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
export XDG_DATA_DIRS="${GIMP_PREFIX}/share:/usr/share${XDG_DATA_DIRS:+:$XDG_DATA_DIRS}"
export GI_TYPELIB_PATH="${GIMP_PREFIX}/${LIB_DIR}/${LIB_SUBDIR}girepository-1.0${GI_TYPELIB_PATH:+:$GI_TYPELIB_PATH}"
```

## Build Artbox, BABL and GEGL

To build or run the software, we can use another shell script, that uses this file to build, compile or run the software. Copy the following and save it as artbox.sh in the bash folder. Then in your File Manager, right click the artbox.sh file, properties, permissions, "Allow executing file as program".

Notice that BABL and GEGL are also being built, these two additional packages don't have to be built everytime.


```shell
#!/usr/bin/env bash

# sets the type of build "release" or "debug
build_type="release"

# set to "false" to skip the build
build_babl="true"
build_gegl="true"
build_artbox="true"

# code changes can be compiled and tested, rather than building everything
compile_artbox="false"

# find the directory this script was run in
script_dir="$(dirname "$(realpath "$0")")"

# load the environment variables
source "$script_dir/build_env.sh"

# start in the build directory
cd ${GIMP_PREFIX}/build/

# Build and install BABL
if [ $build_babl == "true" ]; then
  mkdir -p babl/_build && cd babl/_build
  meson setup .. -Dprefix="${GIMP_PREFIX}"
  ninja
  ninja install
  echo -e "\n*** Built BABL ***\n"
fi

# start in the build directory
cd ${GIMP_PREFIX}/build/

# Build and install GEGL
if [ $build_gegl == "true" ]; then
  mkdir -p gegl/_build && cd gegl/_build
  meson setup .. -Dprefix="${GIMP_PREFIX}"
  ninja
  ninja install
  echo -e "\n*** Built GEGL ***\n"
fi

# start in the build directory
cd ${GIMP_PREFIX}/build/

# Build and install Artbox
if [ $build_artbox == "true" ]; then
  mkdir -p artbox/_build
  cd artbox/_build

  # Construct a build command
  MESON_SETUP="meson setup .. -Dprefix=${GIMP_PREFIX} --buildtype=$build_type"

  # if the build directory has configuration files, then wipe for a clean build
  if [ -e meson-logs ]; then
    MESON_SETUP+=" --wipe"
  fi

  $MESON_SETUP
  ninja
  ninja install

  echo -e "\n*** Built Artbox ***\n"
fi

# compile
if [ $compile_artbox == "true" ]; then
  cd ${GIMP_PREFIX}/build/artbox/_build
  ninja
  ninja install
  echo -e "\n*** Compiled Artbox ***\n"
fi

read -n 1 -r -s -p "Press any key to exit..."
```

To run the build script you can open a terminal in the bash folder and enter: `bash artbox.sh`

## Desktop Launcher (System Specific)

Alternatively you can launch Artbox using a desktop launcher, save the following as a file to your desktop, and then right click it, properties, permissions, "Allow executing file as program". 

```shell
[Desktop Entry]
Exec=gnome-terminal -- /home/your-home/code/bash/artbox.sh
Terminal=True
Icon=cinnamon-panel-launcher
Type=Application
Name[en_GB]=Artbox
```

You'll have to change "your-home" to get it to work, this is a Linux thing, on my system the line would be: 

```sh
gnome-terminal -- /home/mark/code/bash/artbox.sh
``` 

It also assumes you are using a specific desktop environment (Cinnamon). My tip would be to look at how to create a desktop launcher for your particular system, or copy and edit an existing one you may have.

## Conclusion

At this point you will have the source code for Artbox, a build script and a desktop launcher. Double clicking the launcher should see a terminal and Artbox will open. There are many ways to make a build script, this is a starting point. If you got to this point, congratulations!

You can also build GIMP in the same manner, replace occurrences of "artbox" in the build script to "gimp".

