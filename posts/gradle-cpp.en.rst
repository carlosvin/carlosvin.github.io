.. title: Build C++ project with Gradle
.. slug: gradle-cpp
.. date: 2014/09/27 12:00:00
.. tags: Gradle, C++, Build Construction Systems
.. description: How to build a C++ project using Gradle
.. type: text

Introduction
============

I am more and more worried about building, dependency management and distribution of my projects. I'd like to find a tool unifies those processes with  independence of the language. I know several tools those almost fit to what I'm looking for, like I know several tools those almost fit to what I'm looking for, like SCons_, Autotools_, Ant_, Maven_ and lately Gradle_.

I've made several projects with Gradle, but always I was focused in Java_ and Android_ projects. 
In Java_ projects I've found a Maven_ replacement, because it is faster, easier and less verbose.
About Android_ projects I suffered the early adoption of `Android Studio + Gradle`_, although currently I think the are more mature and they work fine. 

First of all, I have to say: building C/C++/Objective-C projects with Gradle_ is in incubation_ phase, although now we can perform advanced tasks like:

-  Generation several artifacts within same project (libraries and executables).
-  Dependency management between artifacts (no versions).
-  Different "flavors" of the same software, e.g: we can generate a “Community” release and other one with more enabled features called “Enterprise”.
-  It allows multi-platform binary generation.

As I said, this plugin is still having limitations although they are working on it: `Gradle C++ roadmap <http://www.gradleware.com/resources/cpp/>`__. If they achieve it I'll leave Autotools_ (I'm going to regret saying that).

.. contents:: Index

.. TEASER_END

Case study
==========

I've extracted all the case study from `here <http://www.gradle.org/docs/current/userguide/nativeBinaries.html>`__. I've adapted the project to be multi-platform with 2 versions “Community” and “Enterprise”.

The application consists on an executable and a dynamic library. The executable will use the library. 

Gradle_ also is able to generate a distributable version and a debug version.

You can fork the code on https://github.com/carlosvin/cpp_gradle.

Project Structure
-----------------------

We can create whichever directory structure, but it is easier using the proposed by Gradle, if not we'll have to specify where the code is located. 

This is the project structure:

:gradle-cpp:
    Root directory.

    :build.gradle:
        File where is configured Gradle_ project, it is the equivalent to: build.xml for Ant_, Makefile_ for C/C++ or pom.xml for Maven_.

    :src:
        Folder where the source code is located.

        :hello:
            This folder contains the module hello. This module will generate hello library.

            :cpp:
                This folder contains C++ source files.

                :Hello.cpp:
                     File with the implementation of Hello class.

            :headers:
                Folder with header files.

                :Hello.h:
                     Class Hello declaration.

                :Msg.h:
                     File with constants declarations.
                     

        :main:
            This folder contains the module which produces the executable that uses hello library.

            :cpp:
                This folder contains C++ source files.

                :main.cpp:
                    Source code of main function.
                     

    :build:
        Folder created automatically by Gradle_ where it leaves all execution results like unit tests reports, compiled files, package distributions, etc. 

C++ Application
---------------

It consits on an executable that uses the functionality implemented at :code:`hello` library.


.. code-block:: cpp

    // main.cpp
    #include "Hello.h"
    int main(int argc, char ** argv) 
    {   
        Hello hello ("Pepito");
        hello.sayHello(10);
        return 0; 
    }

:code:`hello` library allows greet n_ times to someone who is passed  as argument to constructor class.

.. code-block:: cpp

    // Hello.h
    class Hello  
    {
        private:
            const char * who;
        public:
            Hello(const char * who);
            void sayHello(unsigned n = 1);
    };


Building with Gradle_
---------------------

Base case
~~~~~~~~~

The only we need to build the application with Gradle_ is: having Gradle_ [1]_ and the file :code:`build.gradle`.

.. code-block:: groovy

    // build.gradle
    apply plugin: 'cpp'

    libraries {     
        hello {} 
    }
    executables {     
        main {
            binaries.all {
                lib libraries.hello.shared         
            }
        }
    }

With this simple file, we'll be able to compile and install the application in Debug mode for the platform where we are executing Gradle_ (in my case X64).

If we execute :code:`gradle task` from the root of the project, we'll get all the tasks we can do with Gradle_.

In our case, we just want our compiled application ready to run, so we have to execute: :code:`gradle installMainExecutable`.

Once execution has finished, we can run the program calling to :code:`build/install/mainExecutable/main` [2]_.

.. code-block:: bash

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


Different "Flavors"
~~~~~~~~~~~~~~~~~~~

With a few lines more we can generate different versions of same application. 
In our example we are going to build "Community" and "Enterprise" flavors.

.. code-block:: groovy

    //build.gradle
    apply plugin: 'cpp'
    model {
        flavors {
            community
            enterprise
        }
    }
    libraries {
        hello {
            binaries.all {             
                if (flavor == flavors.enterprise) {
			cppCompiler.define "ENTERPRISE"
                }
            }
        }
    }
    executables {
        main {
            binaries.all {
                lib libraries.hello.shared
            }
        }
    }

Besides, we have to make our application ready to use compilation parameters.


.. code-block:: cpp

    // Msg.h
    
    #ifdef ENTERPRISE
    static const char * EDITION = "Enterprise";

    #else 
    static const char * EDITION = "Community";

    #endif


In this way it selects a string depending on used flavor. 


If we execute :code:`gradle clean task` form the root of the rpoject, we'll get more available tasks, before we had :code:`installMainExecutable` and now it has been replaced by :code:`installCommunityMainExecutable` and :code:`installEnterpriseMainExecutable`.

If we execute both tasks, we'll get the installed application in both flavors:

.. code-block:: bash

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

Now we can execute the application in both flavors:

Community
+++++++++

.. code-block:: bash

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


Enterprise
++++++++++

.. code-block:: bash

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

Release or Debug
~~~~~~~~~~~~~~~

By default Gradle_ compiles in Debug mode, but we can add the Release mode which enables several optimizations and remove debug flags [3]_.

.. code-block:: groovy

    // build.gradle

    apply plugin: 'cpp'
    model {
        buildTypes {
            debug         
            release
        }
    
    // ... the rest of file below doesn't change 

If we execute :code:`gradle clean task` we'll get more tasks, they have been split, for example :code:`installCommunityMainExecutable` has been split in :code:`installDebugCommunityMainExecutable` and :code:`installReleaseCommunityMainExecutable`.

Multi-platform
~~~~~~~~~~~~~~

Also we can use cross-compiling features provided by compilers and generate native components for other platforms. 
To do that we just have to add the supported platforms.

This only works if we have installed the Toolchain_ for the target platform.

.. code-block:: groovy

    // build.gradle

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
    }
    libraries {
        hello {
            binaries.all {
                if (flavor == flavors.enterprise) {
                    cppCompiler.define "ENTERPRISE"
                }
            }
        }
    }
    executables {
        main {
            binaries.all {
                lib libraries.hello.shared
            }
        }
    }

Executing :code:`gradle clean task` we'll see the different building options we have. 
In this example, we can build different versions of the application in different flavors for different platforms in Debug or Release mode.

Try it yourself
---------------

The project is on https://github.com/carlosvin/cpp_gradle. 

Requirements:

- Java_ 6 or higher.
- An installed compiler (e.g GCC_)

You just have to follow next steps:

1. :code:`git clone git@github.com:carlosvin/cpp_gradle.git`
2. :code:`cd cpp_gradle`
3. :code:`./gradlew task` or :code:`./gradlew.bat task` if you are in Windows. In this way you'll see available tasks for this project. The first execution will take more time, because it downloads Gradle_ runtime.
4. If you are in a 64 bits platform, you can use this command to install the application: :code:`./gradlew installX64ReleaseEnterpriseMainExecutable`.
5. Run the application you just built: :code:`build/install/mainExecutable/x64ReleaseEnterprise/main`

Conclusions
===========

With a tiny configuration file, we have many different build combinations.

Gradle_ for C++ has a promising future,  I hope it follows the steps of Java_ and Android_ support.

It is well supported by continous integration systems. 

It has many plugins and features.  

Gradle_ for C++ is a feature under develpoment, we have to be careful:

-  Don't use in production environments.
-  Many things can change or disappear.

The full example is on https://github.com/carlosvin/cpp_gradle.
I recommend you to `Try it yourself`_.

.. _SCons: http://www.scons.org
.. _Autotools: http://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html#Autotools-Introduction
.. _Ant: http://ant.apache.org
.. _Maven: http://maven.apache.org
.. _Gradle: http://www.gradle.org
.. _`Android Studio + Gradle`: http://developer.android.com/sdk/installing/studio-build.html
.. _incubation: http://www.gradle.org/docs/current/userguide/feature_lifecycle.html#incubating
.. _Toolchain: http://en.wikipedia.org/wiki/Toolchain
.. _Java: http://www.java.com
.. _Makefile: https://www.gnu.org/software/make/manual/html_node/Makefiles.html
.. _Android: http://developer.android.com/sdk/installing/studio-build.html
.. _`Instala Gradle`: http://www.gradle.org/docs/current/userguide/installation.html
.. _GCC: https://gcc.gnu.org/

.. [n] 'n' Positive integer

.. [1]
   Actually Gradle_ is not required if we use the "wrapper", but we aren't going to treat it here, `here you can get more info about Gradle wapper <http://www.gradle.org/docs/current/userguide/nativeBinaries.html>`__.

.. [2]
   .bat in Windows. Without extension in Linux

.. [3]
   We can also specify/modify the kind of optimizations.

