---
type: docs
prev: guides/first-page
next: guides/folder/A-Linux-System-Overview.md
sidebar:
  open: true
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