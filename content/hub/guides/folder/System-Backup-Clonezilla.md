---
type: docs
---

# Introduction

It's common to back up your important files to return to earlier versions or replace corrupted data. However, another essential type of backup is a **disk clone**, a complete backup of your system's state. 

Once you have your system set up and working well, creating a full backup is crucial for restoring your environment in case disaster strikes. This backup complements regularly saving your working data.

[Clonezilla](https://clonezilla.org/) is a free and open-source disk imaging and cloning software. It allows users to create and restore full backups of their computer's hard drive, making it a popular tool for IT professionals and home users alike.

It's always better to have a backup and not need it than to need a backup and not have it.


## Key Features of Clonezilla

- **Disk Imaging**: Clonezilla creates an exact copy of a hard drive, including the operating system, applications, and data.
- **Backup and Restore**: It enables you to create a backup image of a hard drive and restore it in case of failure or migration to a new drive.
- **Free and Open Source**: Clonezilla is completely free to use, and the source code is available for modification and customization.


## Using Clonezilla to Backup

### Preparation Steps

You will need a USB drive for Clonezilla and an external hard drive that is larger than the internal drive you intend to clone.

These steps simplify the process based on the [official guide](https://clonezilla.org//fine-print-live-doc.php?path=./clonezilla-live/doc/01_Save_disk_image/00-boot-clonezilla-live-cd.doc#00-boot-clonezilla-live-cd.doc). It's a good idea to review the full guide, which includes screenshots for added clarity.

1. **Create a Clonezilla Live USB or CD/DVD**: Follow the detailed instructions on the Clonezilla [website](https://clonezilla.org/liveusb.php) to create a bootable USB or CD/DVD.

2. **Connect Your External Backup Drive**: Plug in your external drive and ensure it is recognized by your system. This will be the destination for your backup.

3. **Verify Your Partition Layout**: Use the `lsblk` command in a terminal to verify the partition layout of your primary hard drive. Note the primary device name.

4. **Boot from Clonezilla Live USB Drive**: Restart your computer and boot from the Clonezilla media you created. You may need to access your BIOS/UEFI settings (usually by pressing F2, F12, ESC, or DEL during boot) and adjust the boot order to prioritize the USB drive.



### Backup with Clonezilla

1. **Select Backup Mode**: Once Clonezilla boots up, choose "device-device" mode. This mode allows you to directly clone your internal drive to an external device.

2. **Select the Source Device**: Choose the primary internal drive.

3. **Select the Target Device**: Choose your external backup drive as the target device. Be careful when selecting the device to avoid overwriting important data. Ensure that the target drive is equal to or larger in size than the source drive.

4. **Start the Backup Process**: Clonezilla will start the backup process. Depending on the size of your partition and the speed of your drives, this could take anywhere from several minutes to a few hours.

5. **Label Your Backup**: After the backup is complete, label the USB drive and the external hard drive with the date, and the system you backed up. Store them in a safe place.
  
---

### Restoring from Backup

If you need to restore your Debian system from the backup, follow these steps:

1. **Boot from Clonezilla Media**: Insert the Clonezilla USB and boot from it, following the same steps as during the backup process.

2. **Select Restore Mode**: Choose the "device-device" mode again, but this time, you will restore from the backup image. This will copy all the data from your external drive back to your internal drive.

3. **Select the Source Device**: Choose your external drive where the backup is stored.

4. **Select the Target Device**: Select the internal drive where you want to restore the backup.

5. **Start the Restore Process**: Clonezilla will begin the restore process. As with the backup, the time required will depend on the size of the drive and the speed of your hardware.

---

## Final Notes

Disk backups with Clonezilla ensure that your entire system—operating system, settings, and applications—is preserved. With minimal effort, you can safeguard your system from catastrophic failure and minimize downtime in the event of a crash.

Remember, **backups are essential**. Regularly update your backups and periodically test them to ensure you can restore your system when needed.

After booting, you can plug in your external backup drive and inspect its partition structure using the Disks utility in Linux. The backup drive should mirror the internal drive’s structure, with the same partitions and some unused space if the external drive is larger.


