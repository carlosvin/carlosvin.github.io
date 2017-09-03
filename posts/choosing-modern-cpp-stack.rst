.. title: Choosing C++ stack
.. slug: choosing-modern-cpp-stack
.. date: 2017/09/03 10:50:00
.. tags: C++, Unit Testing, Build System
.. description: Un capa que facilita el uso de los mutex de pthread en C++98 y una mejor solución en C++11_
.. type: text

I'm starting a new project in C++, but I've run into a pair of questions before start:

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

Now I'm considering Meson_ or CMake_. 

CMake_ has a big advantage over Meson_, it is widely used in many projects, which means many examples, it will most likely fulfill your C++ project building needs. 

Meson_ is a young project compared with CMake_, but it is growing quite fast and it has been adopted in other big projects like Gnome_, they have an initiative to `port from Autotools to Meson <https://wiki.gnome.org/Initiatives/GnomeGoals/MesonPorting>`_. 

But I've chosen Meson_ because:

- Syntax is really clear to me, when I read `meson.build` file I can quickly understand what is happening during build process. 
- It is fast. Altought it is written in Python_, it generates a Ninja_ build project, so first time you configure the project you run Meson_, but when you are actually building or testing you are running Ninja_.

.. code:: bash

    $ meson build . # first time you configure the project
    $ ninja build   # each time you build it

I've found two interesting comparisons about available C++ build systems, they might be a little be biased because comaprisons come from Meson_ and Scons_.

- `C++ build systems comparison from Scons <https://bitbucket.org/scons/scons/wiki/SconsVsOtherBuildTools>`_.
- `C++ build systems comparison from Meson <http://mesonbuild.com/Simple-comparison.html>`_.

Unit Testing Framework
======================
I have used some xUnit based libraries like `UnitTest++ <https://github.com/unittest-cpp/unittest-cpp>`_, `CppUTest <http://cpputest.github.io/>`_ or `Google Test`_ which match perfectly with `Google Mock <https://github.com/google/googletest/tree/master/googlemock>`_. If you want a safe bet that fulfills almost of your testing needs I highly recommend `Google Test`_.  

But time ago I found a testing framework with some interesting features altogether, Catch_: 

- It is just a header file with no external dependencies, so very easy to start.
- You can use normal unit test style or BDD-style

If you want to know more about Catch_, I'd suggest just to give it a try, it is a matter of 2 minutes to have `simple example running <https://github.com/philsquared/Catch/blob/master/docs/tutorial.md#writing-tests>`_. You can also read some interesting articles like `Why do we need yet another C++ test framework? <https://github.com/philsquared/Catch/blob/master/docs/why-catch.md>`_ or `Testing C++ With A New Catch <http://blog.coldflake.com/posts/Testing-C++-with-a-new-Catch/>`_.

Example
=======

.. _`Google Test`: https://github.com/google/googletest
.. _CMake: https://cmake.org/
.. _Meson: http://mesonbuild.com/
.. _Gnome: https://www.gnome.org/
.. _Scons: http://scons.org/
.. _Ninja: https://ninja-build.org/
.. _Python: https://python.org/
.. _Catch: https://github.com/philsquared/Catch