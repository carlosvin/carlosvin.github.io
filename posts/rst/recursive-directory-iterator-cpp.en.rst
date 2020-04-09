:---
title: Filesystem in C++17
:lang: en
:date: 2017/05/28 09:00
:tags: C++, C++11, C++17, IO, Filesystem
:description: We are going to analyze with examples new filesystem features coming with C++17
:type: text
---

Introduction
------------

Since C++17 new filesystem abstractions will be added to C++ environment. So far they are available as 
`Experimental C++ Features <https://en.cppreference.com/w/cpp/experimental>`_. If you want to dig more about this new library, here it is the `final draft of File System Technical Specification <https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4100.pdf>`_.

.. contents::

.. TEASER_END

Gettting started with Experimental Filesystem Features C++17 (g++)
------------------------------------------------------------------

We just have to "tell" compiler that we write C++17 code (**-c++1z**) and it has to add *standard library with filesystem library* (**-lstdc++fs**).

.. code-block:: bash
    
    g++ -std=c++1z main.cpp -lstdc++fs && ./a.out

Let's see a simple example with ``std::filesystem::path`` class.

.. code-block:: cpp

    #include <experimental/filesystem>
    #include <iostream>

    namespace fs = std::experimental::filesystem;
    using namespace std;

    int main()
    {
        fs::path aPath {"./path/to/file.txt"};

        cout << "Parent path: " << aPath.parent_path() << endl;
        cout << "Filename: " << aPath.filename() << endl;
        cout << "Extension: " << aPath.extension() << endl;

        return 0;
    }

`Compile and run: Basic C++17 example <https://coliru.stacked-crooked.com/a/9f8bebb8b7f0fbe7>`_

Run output is: 

.. code-block:: bash

    $ g++ -std=c++1z main.cpp -lstdc++fs && ./a.out
    $ ./a.out

    Parent path: "./path/to"
    Filename: "file.txt"
    Extension: ".txt"

C++17 Filesystem Features
--------------------------
In this section, we are going to explain some `std::filesystem <https://en.cppreference.com/w/cpp/filesystem>`_ features with examples, which will help us to highlight differences between C++11 and C++17 so we can get a better idea about what this new library will supply and how it might make developer's work easier.

std::filesystem::path
=====================
Upper we have seen a tiny `use case for std::filesystem::path  <https://coliru.stacked-crooked.com/a/9f8bebb8b7f0fbe7>`_. That is a quite powerful and convenient feature that supplies an multi-platform abstraction for paths to files using the correct directory path separator depending on the platform we are building our application for (``\`` for Windows based systems and ``/`` Unix based systems). 

Directory separator
===================
When we want our application to use the correct directory separator in C++11, we could use conditional macro declaration:

.. code-block:: cpp

    #include <iostream>

    using namespace std;

    #ifdef _WIN32
    const string SEP = "\\";
    #else
    const string SEP = "/";
    #endif

    int main()
    {
        cout << "Separator in my system " << SEP << endl;
        return 0;
    }

`Compile and run: C++11 separator example <https://coliru.stacked-crooked.com/a/5023ee989105fc54>`_

With C++17 it is just simpler:

.. code-block:: cpp

    #include <experimental/filesystem>
    #include <iostream>

    namespace fs = std::experimental::filesystem;
    using namespace std;

    int main()
    {
        cout << "Separator in my system " << fs::path::preferred_separator << endl;
        return 0;
    }

`Compile and run: C++17 separator example <https://coliru.stacked-crooked.com/a/1f2f63b3f5597d05>`_

Directory Separator Operator
============================
`std::filesystem::path <https://en.cppreference.com/w/cpp/filesystem/path>`_ implements **/** operator which allows to easily concatenate paths to files and directories.

When we want to concatenate paths in C++11, we have to add extra logic to avoid adding duplicate separators and to select the correct separator for target platform:

.. code-block:: cpp

    #include <iostream>

    using namespace std;

    #ifdef _WIN32
    const string SEP = "\\";
    #else
    const string SEP = "/";
    #endif

    int main()
    {
        string root {"/"};
        string dir {"var/www/"};
        string index {"index.html"};
        
        string pathToIndex{};
        pathToIndex.append(root).append(SEP).append(dir).append(SEP).append(index);
        
        cout << pathToIndex << endl;
        return 0;
    }

`Compile and run: Concatenate paths in C++11 <https://coliru.stacked-crooked.com/a/290b278ec1de9573>`_. 

Checking program output we notice it is not fully correct, we should have checked whether path parts already contains a separator so we don't append another separator again.
That logic is already implemented in `std::filesystem::path <https://en.cppreference.com/w/cpp/filesystem/path>`_, so C++17 can be like: 

.. code-block:: cpp

    #include <experimental/filesystem>
    #include <iostream>

    namespace fs = std::experimental::filesystem;
    using namespace std;

    int main()
    {
        fs::path root {"/"};
        fs::path dir {"var/www/"};
        fs::path index {"index.html"};
        
        fs::path pathToIndex = root / dir / index;
        
        cout << pathToIndex << endl;
        return 0;
    }

`Compile and run: Concatenate paths in C++17 <https://coliru.stacked-crooked.com/a/a24d50875b4daad1>`_. 
Code is cleaner and just correct, there are no duplicated separators. 

Create/Remove Directories
=========================
`std::filesystem <https://en.cppreference.com/w/cpp/filesystem>`_ comes with some utilities to create and remove files and directories, but firstly let's check out a way to do so in C++11.

.. code-block:: cpp

    #include <iostream>
    #include <cstdio>
    #include <sys/stat.h>

    using namespace std;

    int main()
    {
        auto opts = S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH;
        mkdir("sandbox", opts);
        mkdir("sandbox/a", opts);
        mkdir("sandbox/a/b", opts);
        mkdir("sandbox/c", opts);
        mkdir("sandbox/c/d", opts);
        
        system("ls -la sandbox/*");
        
        remove("sandbox/c/d");
        remove("sandbox/a/b");
        remove("sandbox/c");
        remove("sandbox/a");
        remove("sandbox");

        system("ls -la");
        
        return 0;
    }

`Compile and run: Create and remove directories C++11 <https://coliru.stacked-crooked.com/a/26f4763ec5b42adb>`_. 
We have to create/remove one by one. We could rewrite this code snippet with less lines (using a loop), but we still have to pay attention to creation/deletion order, we cannot remove parent directory before we have removed all children. 

Since C++17 we can create and remove nested directories with just one call.

.. code-block:: cpp

    #include <experimental/filesystem>
    #include <iostream>

    namespace fs = std::experimental::filesystem;
    using namespace std;

    int main()
    {
        fs::create_directories("sandbox/a/b");
        fs::create_directories("sandbox/c/d");
        system("ls -la sandbox/*");
        
        cout << "Were directories removed? " << fs::remove_all("sandbox") << endl;
        system("ls -la");

        return 0;
    }

`Compile and run: Create and remove directories C++17 <https://coliru.stacked-crooked.com/a/62c2d22fa0e7144c>`_.

Full example: Recursive Directory Iterator
------------------------------------------
This example consists of iterate recursively through dicrectories fintering files by extension.

To keep C++11 example simple, I haven't added filtering logic, but it is in C++17 example:

.. include:: ../listing/recursive-directory/filesystem.11.cpp
    :code: c++


`Compile and run C++11 example <https://coliru.stacked-crooked.com/a/af4228e039a281b3>`_.

Following example also filters files by extension.

.. include:: ../listing/recursive-directory/filesystem.17.cpp
    :code: c++

`Compile and run C++17 example <https://coliru.stacked-crooked.com/a/af4228e039a281b3>`_.
