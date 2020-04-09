
:---
title: Remove orphaned packages (Linux)
:date: 2012/10/02 13:30:02
:update: 2014/03/30 14:00:00
:description: How to remove unused packages in Linux
:type: text
---
:lang: en

When we install a package in most of Linux distributions, the package system installs other packages needed by the package that we actually want to install. 
If we uninstall the package, its dependencies won't be uninstalled, these unused dependencies are called orphaned packages. 

.. contents:: Remove orphaned packages

.. TEASER_END

Archlinux_
==========
 
.. code-block:: bash
   
   pacman -Rsn $(pacman -Qdtq)

How does the command work?

* :code:`pacman -Qdt` list all orphaned packages 
* :code:`pacman -Rsn` uninstall the listed packages

Debian_
=======

.. code-block:: bash
   
   apt-get remove --purge $(deborphan)

.. _Debian: https://debian.org/
.. _Archlinux: https://archlinux.org/
