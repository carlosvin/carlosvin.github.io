---
title: Choosing a Modern C++ stack
lang: en
date: 2017/09/15 20:50:00
updated: 2019/08/31 10:00:00
tags: C++, Unit Testing, Build System, Build Software, Meson, Catch, doctest
description: My chosen technologies stack for C++ project. It contains an easy to run example defining main project skeleton.
type: text
---

I'm starting a new project in C++, but I've run into a pair of
questions before start:

1.  Which build system should I use?
2.  Which unit testing framework?

::: {.contents}
:::

Choosing Build System ([Meson](https://mesonbuild.com/))
--------------------------------------------------------

I have used before
[Make](https://www.gnu.org/software/make/manual/make.html),
[Maven](https://maven.apache.org/), [Scons](https://scons.org/),
[Gradle](https://gradle.org/) and
[Autotools](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html),
but I have some reasons to try find something else:

[Autotools](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html): It is not easy to configure and maintain. There are several
    configuration files and several configuration steps.

[Gradle](https://gradle.org/): C++ feature is still incubating. Not very fast. You can check a
    similar example project at [Build C++ project with
    Gradle](/posts/gradle-cpp/).

[Make](https://www.gnu.org/software/make/manual/make.html): I don\'t love the syntax. Files tends to get messy as project grows.

[Scons](https://scons.org/): It is just slower and not as easy to understand than
    [Meson](https://mesonbuild.com/).

[Maven](https://maven.apache.org/): It is slow and you might end up \"*Javatizing*\" your C++ project
    structure.

::: {.note}
::: {.title}
Note
:::

I\'ve listed just things I don\'t like, those projects have other great
features.
:::

After discarding previous ones, I\'m considering
[Meson](https://mesonbuild.com/) or [CMake](https://cmake.org/). Both
are fast build systems:

Although [Meson](https://mesonbuild.com/) is written in
[Python](https://python.org/), it generates a
[Ninja](https://ninja-build.org/) build project. First time you
configure the project you have to run [Meson](https://mesonbuild.com/),
but for building or testing you are actually running
[Ninja](https://ninja-build.org/).

[CMake](https://cmake.org/) is also able to generate
[Ninja](https://ninja-build.org/) files among other formats, [check
CMake generators documentation for more
information](https://cmake.org/cmake/help/latest/manual/cmake-generators.7.html).

### [CMake](https://cmake.org/) vs [Meson](https://mesonbuild.com/)

[CMake](https://cmake.org/): It has a big advantage over [Meson](https://mesonbuild.com/), it is
    mature and widely used in many projects, which means there are many
    examples and it will fulfill your C++ project building needs.

[Meson](https://mesonbuild.com/): It is a young project compared with [CMake](https://cmake.org/), but
    it is growing quite fast and it has been adopted in other big
    projects like [Gnome](https://www.gnome.org/), they have an
    initiative to [port from Autotools to
    Meson](https://wiki.gnome.org/Initiatives/GnomeGoals/MesonPorting).

**Finally I\'ve chosen** [Meson](https://mesonbuild.com/) because syntax
is really clear to me, when I read [meson.build]{.title-ref} file I can
quickly understand what is happening during build process.

``` {.bash}
$ meson build . # first time you configure the project
$ cd build
$ ninja build   # each time you build it
$ ninja test    # each time you run tests
```

I\'ve found two interesting comparisons about available C++ build
systems, they might be a little be biased because those comparisons come
from [Meson](https://mesonbuild.com/) and [Scons](https://scons.org/).

-   [C++ build systems comparison from
    Scons](https://bitbucket.org/scons/scons/wiki/SconsVsOtherBuildTools).
-   [C++ build systems comparison from
    Meson](https://mesonbuild.com/Simple-comparison.html).

Unit Testing Framework
----------------------

I have used some [xUnit](https://en.wikipedia.org/wiki/XUnit) based
libraries like
[UnitTest++](https://github.com/unittest-cpp/unittest-cpp),
[CppUTest](https://cpputest.github.io/) or [Google
Test](https://github.com/google/googletest) which match perfectly with
[Google
Mock](https://github.com/google/googletest/tree/master/googlemock). If
you want a safe bet that fulfills almost of your testing needs I highly
recommend [Google Test](https://github.com/google/googletest).

But time ago I found a testing framework with some interesting features,
[Catch](https://github.com/philsquared/Catch):

-   It is just a header file with no external dependencies, so very easy
    to start (wget + include downloaded file).
-   You can use normal unit test style or
    [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development)-style

If you want to know more about
[Catch](https://github.com/philsquared/Catch), I recommend you to give
it a try, it is a matter of 2 minutes to have a [simple example up and
running](https://github.com/philsquared/Catch/blob/master/docs/tutorial.md#writing-tests).
You can also read some interesting articles like [Why do we need yet
another C++ test
framework?](https://github.com/philsquared/Catch/blob/master/docs/why-catch.md)
or [Testing C++ With A New
Catch](https://blog.coldflake.com/posts/Testing-C++-with-a-new-Catch/).

### [doctest](https://github.com/onqtam/doctest): A [Catch](https://github.com/philsquared/Catch) alternative

There is another testing framework named
[doctest](https://github.com/onqtam/doctest), with same benefits as
[Catch](https://github.com/philsquared/Catch), but it promises to be
faster and lighter ([benchmark
results](https://github.com/onqtam/doctest/blob/master/doc/markdown/benchmarks.md))
than [Catch](https://github.com/philsquared/Catch).

[doctest](https://github.com/onqtam/doctest) is modeled after
[Catch](https://github.com/philsquared/Catch) and some parts of the code
have been taken directly, but there are
[differences](https://github.com/onqtam/doctest/blob/master/doc/markdown/faq.md#how-is-doctest-different-from-catch).

It hasn\'t been easy to decide, both are really similar, following you
can see differences:

``` {.diff}
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
```

I\'ve finally chosen [doctest](https://github.com/onqtam/doctest)
because it promises to be faster: [benchmark
results](https://github.com/onqtam/doctest/blob/master/doc/markdown/benchmarks.md).

::: {.note}
::: {.title}
Note
:::

I\'ve created project using both frameworks you can find them in
corresponding branches: [doctest
branch](https://github.com/carlosvin/uuid-cpp/tree/doctest) or [catch
branch](https://github.com/carlosvin/uuid-cpp/tree/catch).
:::

Example
-------

I\'ve created an example to illustrate this article:
<https://github.com/carlosvin/uuid-cpp>.

It is a basic implementation of UUID pseudo-random generator based on
[mt19937](https://www.cplusplus.com/reference/random/mt19937/) which is
not cryptographically secure.

### Project output artifacts

When we install the project using [Meson](https://mesonbuild.com/)
([Ninja](https://ninja-build.org/)), we will get some artifacts
generated and copied in our system.

-   Shared library: `libuuid`.
-   Header library for developers who want to use the shared library:
    `include/Uuid.h`.
-   Executable `uuidgen`
    ([UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)
    generator).
-   Test executable (not installed). It tests shared library.

For example, if you execute `ninja install` on Linux, you will get
something like:

``` {.bash}
/usr/local/lib/libuuid.so
/usr/local/include/Uuid.h
/usr/local/bin/uuidgen
```

### Project structure ([Fork project](https://github.com/carlosvin/uuid-cpp))

-   

    [meson.build](https://github.com/carlosvin/uuid-cpp/blob/master/meson.build)

    :   Root project file configuration. It defines project properties
        and subdirectories.

        ``` {.python}
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
        ```

-   

    [include](https://github.com/carlosvin/uuid-cpp/blob/master/include/)

    :   -   

            meson.build

            :   Build configuration file for include directory.

                ``` {.python}
                # Select header files to be installed
                install_headers('Uuid.h')
                ```

        -   

            [Uuid.h](https://github.com/carlosvin/uuid-cpp/blob/master/include/Uuid.h)

            :   Header file, it is the library interface definition
                which will be included from projects using that library

                ``` {.cpp}
                namespace ids {

                class Uuid {
                    private:
                    // ...
                ```

-   

    [src](https://github.com/carlosvin/uuid-cpp/blob/master/src)

    :   -   

            [meson.build (src)](https://github.com/carlosvin/uuid-cpp/blob/master/src/meson.build)

            :   It declares 2 output artifacts, library `libuuid` and
                executable `uuidgen`. Executable depends on the libary,
                it will use the libary to generate
                [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier).

                ``` {.python}
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
                ```

        -   

            [main.cpp](https://github.com/carlosvin/uuid-cpp/blob/master/src/main.cpp)

            :   Entry point for main executable `uuidgen`

                ``` {.cpp}
                #include "Uuid.h"
                #include <iostream>

                int main()
                {
                    ids::Uuid uuid;
                    std::cout << uuid.to_str() << std::endl;
                    return 0;
                }
                ```

        -   

            [Uuid.cpp](https://github.com/carlosvin/uuid-cpp/blob/master/src/Uuid.cpp)

            :   Implementation of declared class in header file.

                ``` {.cpp}
                #include "Uuid.h"

                Uuid::Uuid()
                { // ...
                ```

-   

    [test](https://github.com/carlosvin/uuid-cpp/blob/master/test/)

    :   -   

            [meson.build (test)](https://github.com/carlosvin/uuid-cpp/blob/master/test/meson.build)

            :   File to configure tests build process.

                ``` {.python}
                testexe = executable(
                    'testexe', # test executable name
                    'uuid_test.cpp', # tests source files to be compiled
                    include_directories : inc,  # declared include directories in root :code:`meson.build`
                    link_with : libuuid) # link test executable with previously declared shared library :code:`libuuid`

                # test execution
                test('Uuid test', testexe)

                # we can specify other test execution passing arguments or environment variables
                test('Uuid test with args and env', testexe, args : ['arg1', 'arg2'], env : ['FOO=bar'])
                ```

        -   

            doctest.h

            :   [doctest](https://github.com/onqtam/doctest) library in
                a single header file. You can try to automate library
                installation as part of your build process, but I
                haven\'t figure out yet a way to do it with
                [Meson](https://mesonbuild.com/). For now I\'ve
                installed it manually:

                ``` {.bash}
                cd test
                wget https://raw.githubusercontent.com/onqtam/doctest/master/doctest/doctest.h
                ```

        -   

            [uuid\_test.cpp](https://github.com/carlosvin/uuid-cpp/blob/master/test/uuid_test.cpp)

            :   Tests implementation.

                ``` {.cpp}
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
                ```

::: {.hint}
::: {.title}
Hint
:::

You can find how to build and test the example project at:
<https://github.com/carlosvin/uuid-cpp#how-to-build-the-example>
:::
