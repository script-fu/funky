---
title: Git
type: docs
url: "hub/tools/folder/git"
---

## Introduction

Welcome to this beginner's guide on organizing your code locally and using Git with GitHub! This guide will help you understand how to structure your code directories and set up GitHub to manage your projects effectively.

## Why Organize Your Code?

As you begin working on multiple projects, it's important to keep your code well-organized. A clean folder structure not only makes it easier to navigate your projects, but it also helps when working with version control systems like Git and platforms like [GitHub](https://github.com/). By creating a clear folder hierarchy, you'll have a smoother workflow and make life easier.

## Setting Up a Code Folder Structure

One of the simplest ways to organize your projects is by creating a dedicated **code folder** on your local machine. Inside this folder, you can create sub-folders for each project or repository. Here's a recommended folder structure:

```plaintext
/home/your-username/code/
  ├── project1/
  ├── project2/
  └── project3/
```

Each sub-folder (e.g., `project1`) represents a **repository**, which is where you'll store the files and code for that project.

## What is a Repository?

A **repository** (or **repo**) is essentially a folder with content that Git tracks. When you create a repo locally, you initialize Git within that folder, allowing you to save any changes to an online clone.

### Local and Remote Repositories

- **Local Repo**: This is the repository stored on your computer, in one of your project folders.
- **Remote Repo**: A version of the repository stored online (on GitHub).

## Using Git and GitHub

Once your folder structure is in place, you can initialize Git and connect your local projects to GitHub. Follow these steps to get started:

### Basic Steps for Using Git and GitHub

1. **Install Git**
2. **Create a GitHub Account**
3. **Create a Blank Repository on GitHub**
4. **Initialize Git in Your Local Project**
5. **Connect Your Local Repo to GitHub**
6. **Stage Your Files**
7. **Commit Your Changes**
8. **Push Your Changes to GitHub**
9. **View Your Repository Online**

### 1. Install Git

If you haven't installed Git yet, you can do so on Linux using:

```sh
sudo apt install git
```

### 2. Create a GitHub Account

If you don’t already have an account, visit [GitHub](https://github.com/) to sign up. Once registered, you can create repositories on GitHub to store your code online.

### 3. Create a Blank Repository on GitHub

1. **Log in to GitHub**: Go to [GitHub](https://github.com/) and log in to your account.
2. **Create a New Repository**:
   - Click the **+** icon in the upper-right corner and select **New repository**.
   - Enter a repository name (e.g., `your-repository`).
   - Add a description if desired.
   - Choose **Public** or **Private** visibility.
   - **Do not** initialize the repository with a README, `.gitignore`, or license (to avoid conflicts).
   - Click **Create repository**.

### 4. Initialize Git in Your Local Project

To start tracking a project folder with Git, open your terminal, navigate to the project folder, and run:

```sh
cd code/your/project/folder
git init
```

This command initializes an empty Git repository in your project folder.

### 5. Connect Your Local Repo to GitHub

Next, you'll want to connect your local repository to GitHub. After creating a blank repository on GitHub, add it as a remote to your local project:

```sh
cd code/your/project/folder
git remote add origin https://github.com/your-username/your-repository.git
```

Replace `your-username` and `your-repository` with your actual GitHub username and the repository name. This command links your local project with the remote repository on GitHub.

### 6. Stage Your Files

Before you can save your changes in Git, you need to tell Git which files you've changed and want to save. This is called "staging" your files. Use the following command to stage all modified or new files:

```sh
git add .
```

This tells Git to track the changes you've made to all files in your project. You can also stage specific files by replacing the `.` with the file's name.

### 7. Commit Your Changes

After staging, the next step is to save (or "commit") the changes to your local Git repository. When committing, you should always include a message that describes what changes you've made. For example:

```sh
git commit -m "Add new feature"
```

The `-m` flag allows you to write a message that summarizes the changes you made. This message helps you and others understand what was modified in this commit.

### 8. Push Your Changes to GitHub

Once you've committed the changes locally, you can now "push" them to GitHub so that your remote repository is updated. Run the following command to upload your changes:

```sh
git push -u origin main
```

The `main` branch is the default branch in GitHub where the code is stored, and this command uploads your local changes to the remote repository, making them accessible online.

### 9. View Your Code on GitHub

Once you've pushed your code to GitHub, you can view your repository in the GitHub web interface. You should see the files from your local repo, along with a commit history showing the changes you've made.

## Conclusion

By organizing your code into dedicated folders and using GitHub to manage and back up your repositories, you'll keep your projects well-structured and easily accessible. Once you have a working version of your code, push it to GitHub. You can then easily track any changes using either the GitHub web interface or Visual Studio Code, which highlights modified lines. This approach allows you to continue refining and expanding your code without losing track of progress or changes.

Git and platforms like GitHub and GitLab are powerful tools, and while they can be intricate, there are numerous resources available online to help you understand them better. One of the most valuable resources I've found are AI helpers like ChatGPT. You can describe what you need to accomplish, and these tools will patiently guide you through the process step by step.

## Glossary

Here are some common terms you'll encounter when working with Git and GitHub:

- **Commit**: A snapshot of your changes in the repository. Each commit includes a message describing what was changed and creates a historical record that you can refer to or revert to later.
- **Repository (Repo)**: A collection of files and their history tracked by Git. Repositories can exist locally on your computer or remotely on platforms like GitHub. Each project is typically stored in its own repository.
- **Remote**: A remote repository is a version of your project hosted on a platform like GitHub. The local version of your project on your computer is linked to this remote so that you can upload (push) and download (pull) changes.
- **Staging**: The process of preparing files for a commit. When you stage a file, you're telling Git that you want to include it in the next commit. Staging allows you to choose which changes to include in a commit.
- **Push**: The act of sending your committed changes from your local repository to a remote repository (e.g., GitHub), so others can access the updated version of your code.
- **Pull**: The act of fetching changes from a remote repository to update your local copy. You pull changes when you want to sync your local repository with the latest version from the remote.
- **Origin**: The default name for a remote repository when you first connect your local repository to a remote. Typically refers to the main URL of your project on GitHub.
