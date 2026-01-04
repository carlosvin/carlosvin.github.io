---
title: Remove orphaned packages (Linux)
date: 2012-10-02
lang: en
description: How to remove unused packages in Linux
toc: true
aliases: ["/langs/en/posts/linux-remove-orphaned-files", "/langs/es/posts/linux-remove-orphaned-files"]
tags: ["linux", "package-management", "system-administration", "archlinux", "debian", "tips and tricks"]
---

When we install a package in most Linux distributions, the package system installs other packages needed by the package that we are installing. If we uninstall the package, its dependencies might not be uninstalled; these unused dependencies are called orphaned packages.

Let's see how to remove orphaned packages.

## Archlinux

```bash
pacman -Rsn $(pacman -Qdtq)
```

How does the command work?

- `pacman -Qdt` lists all orphaned packages
- `pacman -Rsn` uninstalls the listed packages

## Debian

```bash
apt-get remove --purge $(deborphan)
```
