---
title: Choosing a Modern C++ stack
date: 2017-09-15
updated: 2020-06-13
keywords: C++, Unit Testing, Build System, Meson, Catch, doctest
description: Why I'd choose Meson+Doctest tech stack to create a new C++ project with a reusable and easy-to-run example.
lang: en
toc: true
aliases: ["/langs/en/posts/choosing-modern-cpp-stack"]
---

I'm starting a new project in C++, but I've run into a couple of questions before starting:

1. Which build system should I use?  
2. Which unit testing framework?  

> **Tip**: If you just want a project template so you can have a C++ project skeleton ready in seconds, just go to [uuid-cpp](https://github.com/carlosvin/uuid-cpp) and follow the [instructions in README.md](https://github.com/carlosvin/uuid-cpp/blob/master/README.md).

## Choosing Build System ([Meson](https://mesonbuild.com/))

I have used before [Make](https://www.gnu.org/software/make/manual/make.html), [Maven](https://maven.apache.org/), [Scons](https://scons.org/), [Gradle](https://gradle.org/) and [Autotools](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html), but I have some reasons to try something else:

- **Autotools:** It is not easy to configure and maintain. There are several configuration files and several configuration steps.
- **Gradle:** CPP feature is still incubating. Not very fast. You can check a similar example project at [Build C++ project with Gradle](/langs/en/posts/gradle-cpp).
- **Make:** I don't love the syntax. Files tend to get messy as the project grows.
- **Scons:** It is just slower and not as easy to understand as Meson.
- **Maven:** It is slow and you might end up "Javatizing" your C++ project structure.

> **Note**: I've listed just things I don't like; those projects have other great features.

### [CMake](https://cmake.org/) vs [Meson](https://mesonbuild.com/)

After discarding previous ones, I'm considering Meson or CMake. Both are fast build systems:

Although Meson is written in [Python](https://python.org/), it generates a [Ninja](https://ninja-build.org/) build project. The first time you configure the project you have to run Meson, but for building or testing you are actually running Ninja.

CMake can also generate Ninja files among other formats; [check CMake generators documentation for more information](https://cmake.org/cmake/help/latest/manual/cmake-generators.7.html).

- **CMake:** It has a big advantage over Meson; it is mature and widely used in many projects, which means there are many examples and it will fulfill your C++ project building needs.
- **Meson:** It is a young project compared with CMake, but it is growing quite fast and it has been adopted in other big projects like [Gnome](https://www.gnome.org/), which has an initiative to [port from Autotools to Meson](https://wiki.gnome.org/Initiatives/GnomeGoals/MesonPorting).

**Finally, I've chosen** Meson because syntax is really clear to me; when I read a `meson.build` file I can quickly understand what is happening during the build process.

### Steps to compile and test a project

```bash
meson build .  # First time you configure the project
cd build
ninja build    # Each time you build it
ninja test     # Each time you run tests
```

1. First time you configure the project  
2. Each time you build it  
3. Each time you run tests

### Other build systems comparisons

I've found two interesting comparisons about available C++ build systems; they might be a little biased because those comparisons come from Meson and Scons.

- [C++ build systems comparison from Scons](https://bitbucket.org/scons/scons/wiki/SconsVsOtherBuildTools)
- [C++ build systems comparison from Meson](https://mesonbuild.com/Simple-comparison.html)

## Unit Testing Framework

I have used some [xUnit](https://en.wikipedia.org/wiki/XUnit)-based libraries like [UnitTest++](https://github.com/unittest-cpp/unittest-cpp), [CppUTest](https://cpputest.github.io/) or [Google Test](https://github.com/google/googletest), which pair perfectly with [Google Mock](https://github.com/google/googletest/tree/master/googlemock). If you want a safe bet that fulfills almost all of your testing needs I highly recommend Google Test.

But some time ago I found a testing framework with some interesting features: [Catch](https://github.com/philsquared/Catch):

- It is just a header file with no external dependencies, so very easy to start (wget + include downloaded file).
- You can use normal unit test style or [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development)-style.

If you want to know more about Catch, I recommend you to give it a try; it takes just 2 minutes to have a [simple example up and running](https://github.com/philsquared/Catch/blob/master/docs/tutorial.md#writing-tests). You can also read some interesting articles like [Why do we need yet another C++ test framework?](https://github.com/philsquared/Catch/blob/master/docs/why-catch.md) or [Testing C++ With A New Catch](https://blog.coldflake.com/posts/Testing-C++-with-a-new-Catch/).

### [Doctest](https://github.com/onqtam/doctest): A Catch alternative

There is another testing framework named Doctest, with the same benefits as Catch, but it promises to be faster and lighter ([performance results](/content/blog/serialization-java-serializable-externalizable.en.md)) than Catch.

Doctest is modeled after Catch and some parts of the code have been taken directly, but there are [differences](https://github.com/onqtam/doctest/blob/master/doc/markdown/faq.md#how-is-doctest-different-from-catch).

It hasn't been easy to decide; both are really similar. Below you can see some differences:

```diff
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
@@ -26,7 +26,7 @@ TEST_CASE("Uuid", "[uuid]")
// BDD style

-SCENARIO("UUID creation", "[Uuid]")
+SCENARIO("UUID creation")
```

I've finally chosen Doctest because it promises to be faster: [performance results](/content/blog/serialization-java-serializable-externalizable.en.md).

> **Note**: I've created the project using both frameworks; you can find them in the corresponding branches: [doctest branch](https://github.com/carlosvin/uuid-cpp/tree/doctest) or [catch branch](https://github.com/carlosvin/uuid-cpp/tree/catch).

## Example

I've created an example to illustrate this article: [uuid-cpp](https://github.com/carlosvin/uuid-cpp). It is a basic implementation of UUID pseudo-random generator based on [mt19937](https://www.cplusplus.com/reference/random/mt19937), which is not cryptographically secure.

### Project output artifacts

When we install the project using Meson (Ninja), we will get some artifacts generated and copied in our system:

- Shared library: `libuuid`.
- Header library for developers who want to use the shared library: `include/Uuid.h`.
- Executable `uuidgen` ([UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) generator).
- Test executable (not installed). It tests the shared library.

For example, if you execute:

```bash
/usr/local/lib/libuuid.so
/usr/local/include/Uuid.h
/usr/local/bin/uuidgen
```

### Project structure ([Fork project](https://github.com/carlosvin/uuid-cpp))

...existing code...
