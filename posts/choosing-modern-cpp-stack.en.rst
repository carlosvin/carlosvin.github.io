.. title: Choosing a Modern C++ stack
.. slug: choosing-modern-cpp-stack
.. date: 2017/09/15 20:50:00
.. tags: C++, Unit Testing, Build System, Build Software, Meson, Catch, doctest
.. description: My chosen technologies stack for C++ project. It contains an easy to run example defining main project skeleton.
.. type: text

I'm starting a new project in C++, but I've run into a pair of questions before start:

1. Which build system should I use?
2. Which unit testing framework?

.. contents::

.. TEASER_END

Choosing Build System (Meson_)
==============================

I have used before Make_, Maven_, Scons_, Gradle_ and Autotools_, but I have some reasons to try find something else:

Autotools_
    It is not easy to configure and maintain. There are several configuration files and several configuration steps.

Gradle_
    C++ feature is still incubating. Not very fast. You can check a similar example project at `Build C++ project with Gradle </posts/gradle-cpp/>`_.

Make_
    I don't love the syntax.
    Files tends to get messy as project grows.

Scons_
    It is just slower and not as easy to understand than Meson_.

Maven_
    It is slow and you might end up "*Javatizing*" your C++ project structure.

.. note:: I've listed just things I don't like, those projects have other great features.

After discarding previous ones, I'm considering Meson_ or CMake_.

CMake_ vs Meson_
-----------------

CMake_
    It has a big advantage over Meson_, it is mature and widely used in many projects, which means there are many examples and it will fulfill your C++ project building needs.

Meson_
    It is a young project compared with CMake_, but it is growing quite fast and it has been adopted in other big projects like Gnome_, they have an initiative to `port from Autotools to Meson <https://wiki.gnome.org/Initiatives/GnomeGoals/MesonPorting>`_.

**Finally I've chosen** Meson_ because:

- Syntax is really clear to me, when I read `meson.build` file I can quickly understand what is happening during build process.
- It is fast. Altought it is written in Python_, it generates a Ninja_ build project. First time you configure the project you has to run Meson_, but for building or testing you are actually running Ninja_.

.. code:: bash

    $ meson build . # first time you configure the project
    $ cd build
    $ ninja build   # each time you build it
    $ ninja test    # each time you run tests

I've found two interesting comparisons about available C++ build systems, they might be a little be biased because those comparisons come from Meson_ and Scons_.

- `C++ build systems comparison from Scons <https://bitbucket.org/scons/scons/wiki/SconsVsOtherBuildTools>`_.
- `C++ build systems comparison from Meson <http://mesonbuild.com/Simple-comparison.html>`_.

Unit Testing Framework
======================
I have used some xUnit_ based libraries like `UnitTest++ <https://github.com/unittest-cpp/unittest-cpp>`_, `CppUTest <http://cpputest.github.io/>`_ or `Google Test`_ which match perfectly with `Google Mock <https://github.com/google/googletest/tree/master/googlemock>`_.
If you want a safe bet that fulfills almost of your testing needs I highly recommend `Google Test`_.

But time ago I found a testing framework with some interesting features, Catch_:

- It is just a header file with no external dependencies, so very easy to start (wget + include downloaded file).
- You can use normal unit test style or BDD_-style

If you want to know more about Catch_, I recommend you to give it a try, it is a matter of 2 minutes to have a `simple example up and running <https://github.com/philsquared/Catch/blob/master/docs/tutorial.md#writing-tests>`_. You can also read some interesting articles like `Why do we need yet another C++ test framework? <https://github.com/philsquared/Catch/blob/master/docs/why-catch.md>`_ or `Testing C++ With A New Catch <http://blog.coldflake.com/posts/Testing-C++-with-a-new-Catch/>`_.

doctest_: A Catch_ alternative
------------------------------

There is another testing framework named doctest_, with same benefits as Catch_, but it promises to be faster and lighter (`benchmark results`_) than Catch_.

doctest_ is modeled after Catch_ and some parts of the code have been taken directly, but there are `differences <https://github.com/onqtam/doctest/blob/master/doc/markdown/faq.md#how-is-doctest-different-from-catch>`_.

It hasn't been easy to decide, both are really similar, following you can see differences:

.. code:: diff

    @@ -1,12 +1,12 @@
    -#define CATCH_CONFIG_MAIN // It tells Catch to provide a main() - only do this in one cpp file
    +#define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN

    -#include "catch.hpp"
    +#include "doctest.h"
    #include "Uuid.h"
    #include <string>

    constexpr int MAX_ITERS = 100;

    -TEST_CASE("Uuid", "[uuid]")
    +TEST_CASE("Uuid")
    {
    for (int i = 0; i < MAX_ITERS; i++)
    {
    @@ -26,7 +26,7 @@ TEST_CASE("Uuid", "[uuid]")

    // BDD style

    -SCENARIO("UUID creation", "[Uuid]")
    +SCENARIO("UUID creation")
    {

    GIVEN("A random UUID ")

I've finally chosen doctest_ because it promises to be faster: `benchmark results`_.

.. note:: I've created project using both frameworks you can find them in corresponding branches: `doctest branch <https://github.com/carlosvin/uuid-cpp/tree/doctest>`_ or `catch branch <https://github.com/carlosvin/uuid-cpp/tree/catch>`_.


Example
=======

I've created an example to illustrate this article: https://github.com/carlosvin/uuid-cpp.

It is a basic implementation of UUID pseudo-random generator based on mt19937_ which is not cryptographically secure.

Project output artifacts
------------------------

When we install the project using Meson_ (Ninja_), we will get some artifacts generated and copied in our system.

- Shared library: :code:`libuuid`.
- Header library for developers who want to use the shared library: :code:`include/Uuid.h`.
- Executable :code:`uuidgen` (UUID_ generator).
- Test executable (not installed). It tests shared library.

For example, if you execute :code:`ninja install` on Linux, you will get something like:

.. code:: bash
    
    /usr/local/lib/libuuid.so
    /usr/local/include/Uuid.h
    /usr/local/bin/uuidgen

Project structure (`Fork project <https://github.com/carlosvin/uuid-cpp>`_)
---------------------------------------------------------------------------

* `meson.build <https://github.com/carlosvin/uuid-cpp/blob/master/meson.build>`_
    Root project file configuration. It defines project properties and subdirectories.

    .. code:: python

        project(
            'cpp-meson-example', # project name
            'cpp', # C++ project, e.g: for C project
            version : '1.0.0',
            license : 'MIT',
            default_options : ['cpp_std=c++11']) # compile for C++

        # it will be referred from subdir projects
        inc = include_directories('include')

        # meson will try to find a meson.build file inside following directories
        subdir('include')
        subdir('src')
        subdir('test')

* `include <https://github.com/carlosvin/uuid-cpp/blob/master/include/>`_
    - meson.build
        Build configuration file for include directory.

        .. code:: python

            # Select header files to be installed
            install_headers('Uuid.h')

    - `Uuid.h <https://github.com/carlosvin/uuid-cpp/blob/master/include/Uuid.h>`_
        Header file, it is the library interface definition which will be included from projects using that library

        .. code:: cpp

            namespace ids {

            class Uuid {
                private:
                // ...


* `src <https://github.com/carlosvin/uuid-cpp/blob/master/src>`_
    - `meson.build (src) <https://github.com/carlosvin/uuid-cpp/blob/master/src/meson.build>`_
        It declares 2 output artifacts, library :code:`libuuid` and executable :code:`uuidgen`. Executable depends on the libary, it will use the libary to generate UUID_.

        .. code:: python

            libuuid = shared_library(
                'uuid', # library name
                'Uuid.cpp', # source files to be compile
                include_directories : inc, # previously declared include directories in root :code:`meson.build`
                install : true) # :code:`libuuid` will be part of project installation

            uuidgen = executable(
                'uuidgen', # executable name
                'main.cpp', # source files to compile
                include_directories : inc, # previously declared include directories in root :code:`meson.build`
                link_with : libuuid, # linking executable with shared previously declared shared library :code:`libuuid`
                install : true) # :code:`uuidgen` executable be part of project installation

    - `main.cpp <https://github.com/carlosvin/uuid-cpp/blob/master/src/main.cpp>`_
        Entry point for main executable :code:`uuidgen`

        .. code:: cpp

            #include "Uuid.h"
            #include <iostream>

            int main()
            {
                ids::Uuid uuid;
                std::cout << uuid.to_str() << std::endl;
                return 0;
            }

    - `Uuid.cpp <https://github.com/carlosvin/uuid-cpp/blob/master/src/Uuid.cpp>`_
        Implementation of declared class in header file.

        .. code:: cpp

            #include "Uuid.h"

            Uuid::Uuid()
            { // ...

* `test <https://github.com/carlosvin/uuid-cpp/blob/master/test/>`_
    - `meson.build (test) <https://github.com/carlosvin/uuid-cpp/blob/master/test/meson.build>`_
        File to configure tests build process.

        .. code:: python

            testexe = executable(
                'testexe', # test executable name
                'uuid_test.cpp', # tests source files to be compiled
                include_directories : inc,  # declared include directories in root :code:`meson.build`
                link_with : libuuid) # link test executable with previously declared shared library :code:`libuuid`

            # test execution
            test('Uuid test', testexe)

            # we can specify other test execution passing arguments or environment variables
            test('Uuid test with args and env', testexe, args : ['arg1', 'arg2'], env : ['FOO=bar'])

    - doctest.h
        doctest_ library in a single header file. You can try to automate library installation as part of your build process, but I haven't figure out yet a way to do it with Meson_. For now I've installed it manually:

        .. code:: bash

            cd test
            wget https://raw.githubusercontent.com/onqtam/doctest/master/doctest/doctest.h

    - `uuid_test.cpp <https://github.com/carlosvin/uuid-cpp/blob/master/test/uuid_test.cpp>`_
        Tests implementation.

        .. code:: cpp

            #define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN

            #include "doctest.h"
            #include "Uuid.h"
            #include <string>

            constexpr int MAX_ITERS = 100;

            TEST_CASE("Uuid")
            {
                for (int i = 0; i < MAX_ITERS; i++)
                {
                    ids::Uuid uuid;
                    std::string uuid_str{uuid.to_str()};

                    INFO(uuid_str);

                    // If assertion fails test execution is stopped
                    REQUIRE(uuid_str.size() == 36);

                    // If assertion fails test execution continues
                    CHECK(uuid.most > 0);
                    CHECK(uuid.least > 0);
                }
            }

            // BDD style

            SCENARIO("UUID creation")
            {

                GIVEN("A random UUID ")
                {

                    ids::Uuid uuid;
                    std::string uuid_str{uuid.to_str()};

                    REQUIRE(uuid_str.size() == 36);

                    WHEN("get the most and least")
                    {
                        THEN("should be more than 0")
                        {
                            CHECK(uuid.most > 0);
                            CHECK(uuid.least > 0);
                        }
                    }
                }
            }


.. hint:: You can find how to build and test the example project at: https://github.com/carlosvin/uuid-cpp#how-to-build-the-example

.. _`Google Test`: https://github.com/google/googletest
.. _CMake: https://cmake.org/
.. _Make: https://www.gnu.org/software/make/manual/make.html
.. _Gradle: https://gradle.org/
.. _Maven: https://maven.apache.org/
.. _Scons: http://scons.org/
.. _Autotools: http://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html
.. _Meson: http://mesonbuild.com/
.. _Gnome: https://www.gnome.org/
.. _Scons: http://scons.org/
.. _Ninja: https://ninja-build.org/
.. _Python: https://python.org/
.. _Catch: https://github.com/philsquared/Catch
.. _xUnit: https://en.wikipedia.org/wiki/XUnit
.. _BDD: https://en.wikipedia.org/wiki/Behavior-driven_development
.. _UUID: https://en.wikipedia.org/wiki/Universally_unique_identifier
.. _mt19937: http://www.cplusplus.com/reference/random/mt19937/
.. _doctest: https://github.com/onqtam/doctest
.. _`benchmark results`: https://github.com/onqtam/doctest/blob/master/doc/markdown/benchmarks.md
