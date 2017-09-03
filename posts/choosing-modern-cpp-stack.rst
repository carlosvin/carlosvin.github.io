.. title: Choosing C++ stack
.. slug: choosing-modern-cpp-stack
.. date: 2017/07/15 10:50:00
.. tags: C++, Unit Testing, Build System, draft
.. description: Un capa que facilita el uso de los mutex de pthread en C++98 y una mejor solución en C++11_
.. type: text


I'm starting a new project in C++, but I've run into three questions before start:

1. Which build system should I use?
2. Which unit testing framework?

Choosing Build System
=====================

I have used before pure Make, Maven, Scons, Gradle and Autotools. 

But I have some reasons to try to use something else.

Autotools
    It is not easy to configure. There are several configuration files and several configuration steps. 
    
Gradle 
    C++ feature is still incubating.

Make
    I don't love the syntax. 
    I've seen messy files when project gets big.

Scons
    It is just slow.

Maven
    It is slow and you might end up *Javatizing* your C++ project structure.

.. note:: I've listed just things I don't like, those projects have other great features.

Now I'm considering Meson Build or CMake. 

CMake has a big advantage over Meson, it is widely used in many projects, which means many examples, it will most likely fulfill your C++ project building needs. 

Meson a young project compared with CMake, but it is growing quite fast and it has been adopted in other big projects like Gnome with a quite good feedback from Gnome team, they have an initiative to `port from Autotools to Meson <https://wiki.gnome.org/Initiatives/GnomeGoals/MesonPorting>`_. 
But I've chosen Meson because its syntax it is really clear for me, when I read meson.build file I can quickly understand what is happening during build process. 

`C++ build systems comparison from Scons  <https://bitbucket.org/scons/scons/wiki/SconsVsOtherBuildTools>`_.


`C++ build systems comparison from Meson <http://mesonbuild.com/Simple-comparison.html>`_.

Unit Testing Framework
======================

