---
title: Remove orphaned packages (Linux)
date: 2012/10/02 13:30:02
update: 2014/03/30 14:00:00
description: How to remove unused packages in Linux
lang: en
type: text
---

When we install a package in most of Linux distributions, the package
system installs other packages needed by the package that we actually
want to install. If we uninstall the package, its dependencies won\'t be
uninstalled, these unused dependencies are called orphaned packages.

::: {.contents}
Remove orphaned packages
:::

[Archlinux](https://archlinux.org/)
===================================

``` {.bash}
pacman -Rsn $(pacman -Qdtq)
```

How does the command work?

-   `pacman -Qdt` list all orphaned packages
-   `pacman -Rsn` uninstall the listed packages

[Debian](https://debian.org/)
=============================

``` {.bash}
apt-get remove --purge $(deborphan)
```
