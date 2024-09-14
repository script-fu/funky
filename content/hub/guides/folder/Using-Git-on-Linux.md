---
type: docs
---

# Introduction

Welcome to this beginner's guide to using Git on Linux! This guide is designed to help you get started with Git and GitLab, and to provide a basic understanding of how to use these tools.

## Git Overview

The code used for making applications is kept in a collection of folders and files on your system. Git is an application that allows us to backup, share, and copy that collection. Git is known as a version control system that allows you to track changes to your code and collaborate with others. It's a powerful tool that's widely used in the open-source community. GitLab is a web-based platform that allows you to host and manage your Git repositories online, making it easy to collaborate with others and track changes to your code.

## What is a Repository?

A _repo_, short for repository, is a Git-managed local folder with an online copy. A Git Lab repo is a collection of files and folders that make up a project. It can have _branches_ that are independent copies of the same project. A branch is a separate version of your project that allows you to make changes without affecting the main version. This is useful for testing new features or fixing bugs without disrupting the main project. There is your local repo, stored on your hard drive, and the remote repo, stored online using Git and GitLab.

## Using Git

You'll need to install Git on your system. On Debian-based systems, you can use the apt command to install software packages. In this case, we're using it to install Git, which is a package that provides the Git version control system. The sudo command gives the installer permission to install on your system.

```bash
 sudo apt install git 
```

## Access GitLab

Before you can use [GitLab](https://gitlab.com/users/sign_up), you'll need to create an account by visiting the GitLab website and completing the registration process.

GitLab requires _SSH_ for secure and authenticated communication between a client (you, for instance) and the GitLab server when performing Git operations like _cloning_, _pushing_, and _fetching_ repositories. Cloning is making a local copy of the repo, fetching is bringing any changes made in the repo to your local copy, and pushing is sending changes and content to the server repository. SSH (Secure Shell) is a network protocol that allows secure remote access and uses _key pairs_ to authenticate and establish secure connections. To generate an SSH key pair, you can use the ssh-keygen command in your terminal.

```bash
 ssh-keygen
```

Specify a filename, or use the default by pressing Enter, and optionally a password. In your home directory, in a hidden folder called .ssh, there are now two id_rsa files, if you went with default names. The .pub file is the public key and you can see its contents with a text editor.

Log in to your GitLab account and navigate to your user settings. Click on 'SSH Keys' in the left-hand navigation menu. Copy and paste your public key into the Key field and give the key a relevant title, like PC@Home. Click the 'Add Key' button to save the key. Your SSH public key is now added to your GitLab account and you can use it to authenticate with GitLab repositories. Test if your keys and connection are working with the ssh -T command to see a welcome message from GitLab.

```bash
 $ ssh -T git@ssh.gitlab.gnome.org
 Welcome to GitLab, @username!
```

## Basic Git Commands

Now that you've got Git installed and have set up your SSH key with GitLab, let's go through some essential Git commands for managing repositories. These commands will help you work with existing projects, keeping them up-to-date and making changes safely.

### 1. **Cloning a Repository**

Cloning is the process of creating a local copy of a remote repository. This is useful when you want to work on a project that already exists on GitLab. To clone a repository, use the `git clone` command followed by the repository URL:

```sh
git clone https://gitlab.com/username/repository.git
```

Replace `https://gitlab.com/username/repository.git` with the URL of the repository you want to clone. This command will create a local copy of the repository in a new directory.

### 2. **Checking Repository Status**

To see if your local repository has any changes or to view its current state, use:

```sh
git status
```

This command will show you which files have been modified, added, or deleted in your local copy of the repository.

### 3. **Remote Repositories**

Remote repositories are versions of your project that are hosted online, such as on GitLab. They serve as the central location where your code is stored and can be accessed by others. The default remote repository that Git creates when you clone a project is called `origin`. You can add, remove, or list remote repositories using the following commands:

- **Listing Remotes:**

  To see which remote repositories are linked to your local project, use:

  ```sh
  git remote -v
  ```

  This command lists all the remotes and their URLs. Typically, you'll see `origin` listed here.

- **Adding a Remote:**

  If you need to add a new remote repository, you can do so with:

  ```sh
  git remote add <name> <url>
  ```

  Replace `<name>` with a name for the remote, and `<url>` with the URL of the repository.

- **Removing a Remote:**

  To remove a remote repository, use:

  ```sh
  git remote remove <name>
  ```

  Replace `<name>` with the name of the remote you want to remove.

### 4. **Fetching Changes from the Remote Repository**

If you want to see what changes have been made to the remote repository without applying them to your local copy, use:

```sh
git fetch origin
```

This command fetches the latest changes from the remote repository but does not merge them into your local branch. It's a way to check for updates before deciding to incorporate them.

### 5. **Resetting Your Local Repository**

If you want to reset your local repository to match the remote repository exactly, you can use a 'hard' reset. **Warning:** This will overwrite any local changes you've made.

```sh
git reset --hard origin/branch-name
```

Replace `branch-name` with the name of the branch you want to reset. This command will discard any local changes and make your local repository identical to the remote repository.

### 6. **Viewing Commit History**

To see a list of changes made to the repository over time, use:

```sh
git log
```

This command displays a history of commits, including the author, date, and message for each change. It's useful for understanding what changes have been made and when.

### Summary

These basic Git commands will help you work with repositories, keeping your local copies up-to-date and ensuring you can safely manage remote repositories. Cloning repositories, checking the status of your local copy, and managing remote repositories are key skills for managing projects using Git.
