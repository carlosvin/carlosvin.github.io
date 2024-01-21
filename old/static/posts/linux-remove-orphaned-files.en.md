# Remove orphaned packages (Linux)

When we install a package in most of Linux distributions, the package system installs other packages needed by the package that we are installing. If we uninstall the package, its dependencies might not be uninstalled, these unused dependencies are called orphaned packages.

Let’s see how to remove orphaned packages.

## https://archlinux.org/[Archlinux,window=_blank]

```bash
pacman -Rsn $(pacman -Qdtq)
```

How does the command work?

* `pacman -Qdt` list all orphaned packages
* `pacman -Rsn` uninstall the listed packages

## https://debian.org/[Debian,window=_blank]

```bash
apt-get remove --purge $(deborphan)
```
