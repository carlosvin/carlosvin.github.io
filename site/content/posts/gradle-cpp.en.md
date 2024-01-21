# Build C++ project with Gradle

## Introduction

I am more and more worried about building, dependency management and distribution of my projects. I’d like to find a tool that unifies those processes with independence of the language. I know several tools which almost fit to what I’m looking for, like [SCons,window=_blank](https://www.scons.org), [Autotools,window=_blank](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html#Autotools-Introduction), [Ant,window=_blank](https://ant.apache.org), [Maven,window=_blank](https://maven.apache.org) and lately [Gradle,window=_blank](https://www.gradle.org).

I’ve made several projects with [Gradle,window=_blank](https://www.gradle.org), but always they were [Java,window=_blank](https://www.java.com) and [Android,window=_blank](https://developer.android.com/studio/build) projects. ~~In [Java,window=_blank](https://www.java.com) projects I’ve found a [Maven,window=_blank](https://maven.apache.org) replacement, because it is faster, easier and less verbose~~. **Update 2020**: With the experience, now if I have to pick a build system for a [Java,window=_blank](https://www.java.com) project I’d pick [Maven,window=_blank](https://maven.apache.org), especially for a professional project, but it is not the topic of this post.

About [Android,window=_blank](https://developer.android.com/studio/build) projects I suffered the early adoption of [Android Studio + Gradle,window=_blank](https://developer.android.com/sdk/installing/studio-build.html), although currently I think the are more mature and they work fine.

First of all, I have to say: building C/C++/Objective-C projects with [Gradle,window=_blank](https://www.gradle.org) is in [incubation,window=_blank](https://docs.gradle.org/current/userguide/feature_lifecycle.html#sec:incubating_state) phase, although now we can perform advanced tasks like:

* Generation several artifacts within same project (libraries and executables).
* Dependency management between artifacts (no versions).
* Different "flavors" of the same software, e.g: we can generate a "Community" release and other one with more enabled features called "Enterprise".
* It allows multi-platform binary generation.

As I said, this plugin is still having limitations although they are working on it: [Gradle C++ roadmap](https://blog.gradle.org/state-and-future-of-the-gradle-software-model#a-way-forward). ~~If they achieve it I’ll leave [Autotools,window=_blank](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html#Autotools-Introduction) (I’m going to regret saying that)~~. **Update 2020**: Actually few years later I am not using [Autotools,window=_blank](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html#Autotools-Introduction), neither [Gradle,window=_blank](https://www.gradle.org), but I am using [Meson](https://mesonbuild.com/) and considering [Bazel](https://docs.bazel.build/versions/master/tutorial/cpp.html).

## Case study

I’ve extracted all the case study from [Gradle user guide for native software](https://docs.gradle.org/current/userguide/native_software.html). I’ve adapted the project to be multi-platform with 2 versions "Community" and "Enterprise".

The application consists of an executable and a dynamic library. The executable will use the library.

[Gradle,window=_blank](https://www.gradle.org) also is able to generate a distributable version and a debug version.

You can fork the code on https://github.com/carlosvin/cpp_gradle.

### Project Structure

We can create whichever directory structure, but it is easier using the proposed by [Gradle,window=_blank](https://www.gradle.org), if not we’ll have to specify where the code is located.

This is the project structure:

* **gradle-cpp**\
Root directory.
  * **build.gradle**\
  File where is configured [Gradle,window=_blank](https://www.gradle.org) project, it is the equivalent to: build.xml for [Ant,window=_blank](https://ant.apache.org), link:[Makefile] for C/C++ or pom.xml for [Maven,window=_blank](https://maven.apache.org).
  * **src**\
  Folder where the source code is located.
* **hello**\
This folder contains the module hello. This module will generate hello library.
  * **cpp**\
  This folder contains C++ source files.
    * **Hello.cpp**\
     File with the implementation of Hello class.
  * **headers**\
  Folder with header files.
    * **Hello.h**\
    Class Hello declaration.
    * **Msg.h**\
    File with constants declarations.  
* **main**\
This folder contains the module which produces the executable that uses hello library.
  * **cpp**\
  This folder contains C++ source files.
    * **main.cpp**\
    Source code of main function.  
* **build**\
Folder created automatically by [Gradle,window=_blank](https://www.gradle.org) where it leaves all execution results like unit tests reports, compiled files, package distributions, etc.

### C++ Application

It consists of an executable that uses the functionality implemented at `hello` library.

**main.cpp**

```cpp
#include "Hello.h"
int main(int argc, char ** argv)
{
    Hello hello ("Pepito");
    hello.sayHello(10);
    return 0;
}
```

`hello` library allows greet `n` footnote:['n' Positive integer] times to someone who is passed as argument to constructor class.

**Hello.h**

```cpp
class Hello
{
    private:
        const char * who;
    public:
        Hello(const char * who);
        void sayHello(unsigned n = 1);
};
```

### Building with https://www.gradle.org[Gradle,window=_blank]

#### Base case

The only we need to build the application with [Gradle,window=_blank](https://www.gradle.org) is: having [Gradle,window=_blank](https://www.gradle.org)footnote:[Actually [Gradle,window=_blank](https://www.gradle.org) is not required if we use the "wrapper", but we aren’t going to explain it here, [here you can get more info about Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html).] and the file `build.gradle`.

**build.gradle**

```groovy
apply plugin: 'cpp'

model {
  components {
    hello(NativeLibrarySpec) {}
    main(NativeExecutableSpec) {
      binaries.all {
        lib library: "hello"
      }
    }
  }
}
```

With this simple file, we’ll be able to compile and install the application in Debug mode for the platform where we are executing [Gradle,window=_blank](https://www.gradle.org) (in my case X64).

If we execute `gradle task` from the root of the project, we’ll get all the tasks we can do with [Gradle,window=_blank](https://www.gradle.org).

In our case, we just want our compiled application ready to run, so we have to execute: `gradle installMainExecutable`.

Once execution has finished, we can run the program calling to `build/install/mainExecutable/main`footnote:[.bat in Windows. Without extension in Linux].

**Output**

```bash
$ build/install/mainExecutable/main
1.  Hello Mr. Pepito (Community)
2.  Hello Mr. Pepito (Community)
3.  Hello Mr. Pepito (Community)
4.  Hello Mr. Pepito (Community)
5.  Hello Mr. Pepito (Community)
6.  Hello Mr. Pepito (Community)
7.  Hello Mr. Pepito (Community)
8.  Hello Mr. Pepito (Community)
9.  Hello Mr. Pepito (Community)
10. Hello Mr. Pepito (Community)
```

#### Different "Flavors"

With a few lines more we can generate different versions of same application. In our example we are going to build "Community" and "Enterprise" flavors.

**build.gradle**

```groovy
apply plugin: 'cpp'

model {
  flavors {
      community
      enterprise
  }

  components {
    hello(NativeLibrarySpec) {
      binaries.all {
        if (flavor == flavors.enterprise) {
          cppCompiler.define "ENTERPRISE"
        }
      }
    }
    main(NativeExecutableSpec) {
      binaries.all {
        lib library: "hello"
        }
    }
  }
}
```

We also have to prepare our application to use compilation parameters.

**Msg.h**

```cpp
#ifdef ENTERPRISE
static const char * EDITION = "Enterprise";

#else
static const char * EDITION = "Community";

#endif
```

In this way it selects a string depending on used flavor.

If we execute `gradle clean task` in the root folder, we’ll get more available tasks. Before, we had `installMainExecutable` which has been replaced by `installCommunityMainExecutable` and `installEnterpriseMainExecutable`.

If we execute both tasks, we’ll get the application installed in both flavors:

```bash
$gradle installEnterpriseMainExecutable installCommunityMainExecutable

:compileEnterpriseHelloSharedLibraryHelloCpp
:linkEnterpriseHelloSharedLibrary
:enterpriseHelloSharedLibrary
:compileEnterpriseMainExecutableMainCpp
:linkEnterpriseMainExecutable
:enterpriseMainExecutable
:installEnterpriseMainExecutable
:compileCommunityHelloSharedLibraryHelloCpp
:linkCommunityHelloSharedLibrary
:communityHelloSharedLibrary
:compileCommunityMainExecutableMainCpp
:linkCommunityMainExecutable
:communityMainExecutable
:installCommunityMainExecutable

BUILD SUCCESSFUL
Total time: 9.414 secs
```

Now we can run the application in both flavors:

**Community**

```bash
$ build/install/mainExecutable/community/main
1.      Hello Mr. Pepito        (Community)
2.      Hello Mr. Pepito        (Community)
3.      Hello Mr. Pepito        (Community)
4.      Hello Mr. Pepito        (Community)
5.      Hello Mr. Pepito        (Community)
6.      Hello Mr. Pepito        (Community)
7.      Hello Mr. Pepito        (Community)
8.      Hello Mr. Pepito        (Community)
9.      Hello Mr. Pepito        (Community)
10.     Hello Mr. Pepito        (Community)
```

**Enterprise**

```bash
$ build/install/mainExecutable/enterprise/main
1.      Hello Mr. Pepito        (Enterprise)
2.      Hello Mr. Pepito        (Enterprise)
3.      Hello Mr. Pepito        (Enterprise)
4.      Hello Mr. Pepito        (Enterprise)
5.      Hello Mr. Pepito        (Enterprise)
6.      Hello Mr. Pepito        (Enterprise)
7.      Hello Mr. Pepito        (Enterprise)
8.      Hello Mr. Pepito        (Enterprise)
9.      Hello Mr. Pepito        (Enterprise)
10.     Hello Mr. Pepito        (Enterprise)
```

#### Release or Debug

By default [Gradle,window=_blank](https://www.gradle.org) compiles in Debug mode, but we can add the Release mode which enables several optimizations and remove debug flagsfootnote:[We can also specify/modify which optimizations to apply.].

**build.gradle**

```groovy
apply plugin: 'cpp'
model {
    buildTypes {
        debug
        release
    }
// ... the rest of file below doesn't change
}
```

If we execute `gradle clean task` we will get more tasks, they have been split, for example `installCommunityMainExecutable` has been split in `installDebugCommunityMainExecutable` and `installReleaseCommunityMainExecutable`.

#### Multi-platform

Also we can use cross-compiling features provided by compilers and generate native components for other platforms. To do so we just have to add the supported platforms.

This only works if we have installed the [Toolchain,window=_blank](https://en.wikipedia.org/wiki/Toolchain) for the target platform.

**build.gradle**

```groovy
apply plugin: 'cpp'

model {
  buildTypes {
    debug
    release
  }

  platforms {
    x86 {
      architecture "x86"
    }
    x64 {
      architecture "x86_64"
    }
    itanium {
      architecture "ia-64"
    }
  }

  flavors {
    community
    enterprise
  }

  components {
    hello(NativeLibrarySpec) {
      binaries.all {
        if (flavor == flavors.enterprise) {
          cppCompiler.define "ENTERPRISE"
        }
      }
    }
    main(NativeExecutableSpec) {
      binaries.all {
        lib library: "hello"
      }
    }
  }
}
```

When execute `gradle clean task` we get the different build options we have. 

**📌 NOTE**\
In this example, we can build different versions of the application in different flavors for different platforms in Debug or Release mode.

### Try it yourself

You can find the project at https://github.com/carlosvin/cpp_gradle.

Requirements:

* [Java,window=_blank](https://www.java.com) 6 or higher.
* An installed compiler (e.g link:[GCC])

You just have to follow next steps:

1. `git clone git@github.com:carlosvin/cpp_gradle.git`
2. `cd cpp_gradle`
3. `./gradlew task` or `./gradlew.bat task` if you are in Windows. In this way you’ll see available tasks for this project. The first execution will take more time, because it downloads [Gradle,window=_blank](https://www.gradle.org) runtime.
4. If you are in a 64 bits platform, you can use this command to install the application: `./gradlew installX64ReleaseEnterpriseMainExecutable`.
5. Run the application you just built: `build/install/mainExecutable/x64ReleaseEnterprise/main`.

## Conclusions

With a tiny configuration file, we have many different build combinations.

[Gradle,window=_blank](https://www.gradle.org) for C++ has a promising future, I hope it follows the steps of [Java,window=_blank](https://www.java.com) and [Android,window=_blank](https://developer.android.com/studio/build) support.

It is well supported by continuous integration systems.

It has many plugins and features.

[Gradle,window=_blank](https://www.gradle.org) for C++ is a feature under development, we have to be careful:

* Don’t use it in production environments.
* Many things can change or disappear.

The full example is on https://github.com/carlosvin/cpp_gradle. I recommend you to [Try it yourself](#try-it-yourself). 

**📌 NOTE**\
If you find any issue in this example, please write a comment, open a defect or fix it yourself at https://github.com/carlosvin/cpp_gradle

More info at [Getting Started Gradle Native](https://docs.gradle.org/current/userguide/native_software.html).
