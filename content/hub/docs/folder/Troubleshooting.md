---
type: docs
---

# Install and Build

## Deleting the _build directory Causes a Meson Fail

Occasionally, to get GIMP building correctly, you may need to delete the **_build** directory Meson creates, note the '_'. Do not delete the 'build' directory! This clears all the old build data and allows a fresh try. However, if you use `--wipe` or `--reconfigure` in your build process, and the _build directory is not present or empty, Meson may fail. This could be because Meson requires the _build directory to be present and contain a valid build configuration in order to reconfigure or wipe the build.

### Avoiding the Issue

To avoid this issue, make sure to create the _build directory and run Meson at least once without --wipe or --reconfigure before attempting to change the compiler. This will ensure that the _build directory contains a valid build configuration, and Meson will be able to reconfigure or wipe the build successfully. Alternatively, we can do a check in the build script for this event.

### load error: libavcodec.so.61:

If you see error messages like this during start up, it's because we need a newer version of a particular
library than the one packaged with the Linux distribution we are using.

```bash
GEGL-Message: 20:50:10.029: Module '/home/mark/code/gnome/lib/x86_64-linux-gnu/gegl-0.4/ff-save.so' load error: libavcodec.so.61: cannot open shared object file: No such file or directory
```

For me, this issue was solved by building the latest version of FFmepg, which includes the needed library, libavcodec.so.61.

Install a needed library prior to the build process:
```bash
sudo apt-get install libx264-dev
```

Create a local folder for FFMpeg, open a terminal in that folder, then:

```bash
git clone https://git.ffmpeg.org/ffmpeg.git
cd ffmpeg
./configure --enable-shared --enable-gpl --enable-libx264 --enable-libx265  --disable-x86asm --disable-libopus
```

Now we make and install:
```
sudo make install
```

Verify you have the latest version:
```
ls /usr/local/lib | grep libavcodec
libavcodec.a
libavcodec.so
libavcodec.so.61
libavcodec.so.61.11.100
```

When building and launching Artbox, those GEGL error messages should be gone.

EDIT: discovered that this could have been caused by a rougue use of `submodule update` in
the gegl folder.

## GEGL or BABL issues

A build error may occur if we haven't built BABL or GEGL for a while and there is a new feature used by GIMP, and therefore Artbox, that is not available locally.  We need to get the latest version of BABL and GEGL then rebuild those libraries.

This sequence of git instructions will reset your local babl and gegl folders to be a clone of the remote folders. WARNING: Any changes you made locally in the master folder, will be lost.

```Bash
cd $GIMP_PREFIX/build/gegl
git checkout master
git fetch origin
git reset --hard origin/master
git clean -df

cd $GIMP_PREFIX/build/babl
git checkout master
git fetch origin
git reset --hard origin/master
git clean -df
```

Remember to be careful when resetting your local repositories, as any local changes you may have made will be lost.

Rebuild BABL and GEGL using the previously described build script:

```shell
build_babl="true"
build_gegl="true"
````

## gimp-data

When performing a rebase on a branch that includes submodules, Git may fail with a conflict related to submodule merging. The error may look like this:

```sh
Failed to merge submodule gimp-data
CONFLICT (submodule): Merge conflict in gimp-data
Recursive merging with submodules currently only supports trivial cases.
```

This issue occurs because Git does not handle complex submodule merging automatically during a rebase, especially when the submodule contains conflicting changes. If you encounter this error during a rebase, you can bypass the submodule conflict by restoring the submodule's staged state and continuing with the rebase:

### Workaround

This will remove the submodule (e.g., gimp-data) from the rebase process, allowing you to continue:

```sh
git restore ---staged gimp-data
```

Once you've restored the submodule's staged state, continue with the rebase process:

```sh
git --continue
```

### Explanation

The git restore --staged gimp-data command effectively resets the submodule to its previous state, removing it from the list of files that are considered to have conflicts. This allows Git to move forward with the rebase without attempting to handle the submodule as part of the conflict resolution process.

Please let me know any issues and solutions you discover, thanks.