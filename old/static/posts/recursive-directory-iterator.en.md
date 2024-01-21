# Filesystem in C++17

## Introduction

Since {cpp}17 new filesystem abstractions will be added to {cpp} environment. So far they are available as [Experimental {cpp} Features](https://en.cppreference.com/w/cpp/experimental). If you want to dig more about this new library, here it is the [final draft of File System Technical Specification,window=_blank](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4100.pdf).

## Gettting started with Experimental Filesystem Features {cpp}17 (g++)

We just have to "tell" compiler that:

* we write {cpp}17 (`-c++1z`) and
* it has to add _standard library with filesystem library_ (`-lstdc++fs`).

```bash
g++ -std=c++1z main.cpp -lstdc++fs && ./a.out
```

Let’s see a simple example with `std::filesystem::path` class.

```cpp
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
```

**[Compile and run: Basic {cpp}17 example,window=_blank](https://coliru.stacked-crooked.com/a/9f8bebb8b7f0fbe7)**

```bash
$ g++ -std=c++1z main.cpp -lstdc++fs && ./a.out
$ ./a.out

Parent path: "./path/to"
Filename: "file.txt"
Extension: ".txt"
```

## {cpp}17 Filesystem Features

In this section, we are going to explain some [std::filesystem,window=_blank](https://en.cppreference.com/w/cpp/filesystem) features with examples, which will help us to highlight differences between {cpp}11 and {cpp}17 so we can get a better idea about what this new library will supply and how it might make developer’s work easier.

### std::filesystem::path

Upper we have seen a tiny [use case for std::filesystem::path,window=_blank](https://coliru.stacked-crooked.com/a/9f8bebb8b7f0fbe7). That is a quite powerful and convenient feature that supplies an multi-platform abstraction for paths to files using the correct directory path separator depending on the platform we are building our application for (`\` for Windows based systems and `/` for Unix based systems).

### Directory separator

When we want our application to use the correct directory separator in {cpp}11, we could use conditional macro declaration:

**Platform independent directory separator in {cpp}11**

```cpp
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
```

[Compile and run: {cpp}11 separator example,window=_blank](https://coliru.stacked-crooked.com/a/5023ee989105fc54).

**Platform independent directory separator in {cpp}17. Cleaner and simpler.**

```cpp
#include <experimental/filesystem>
#include <iostream>

namespace fs = std::experimental::filesystem;
using namespace std;

int main()
{
    cout << "Separator in my system " << fs::path::preferred_separator << endl;
    return 0;
}
```
[Compile and run: {cpp}17 separator example,window=_blank](https://coliru.stacked-crooked.com/a/1f2f63b3f5597d05).

### Directory Separator Operator

[std::filesystem::path](https://en.cppreference.com/w/cpp/filesystem/path) implements `/` operator, which allows to easily concatenate paths to files and directories.

When we want to concatenate paths in {cpp}11, we have to add extra logic to avoid adding duplicate separators and to select the correct separator for target platform:

**Concatenate paths in {cpp}11**

```cpp
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
```

**[Compile and run: Concatenate paths in {cpp}11,window=_blank](https://coliru.stacked-crooked.com/a/290b278ec1de9573)**

```bash
//var/www//index.html
```

Checking program output we notice it is not fully correct, we should have checked whether path parts already contains a separator so we don’t append another separator again. That logic is already implemented in [std::filesystem::path](https://en.cppreference.com/w/cpp/filesystem/path), so {cpp}17 can be like:

**Concatenate paths in {cpp}17**

```cpp
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
```

**[Compile and run: Concatenate paths in {cpp}17](https://coliru.stacked-crooked.com/a/a24d50875b4daad1).**

```bash
"/var/www/index.html"
```
Code is cleaner and just correct, there are no duplicated separators.

### Create/Remove Directories

[std::filesystem,window=_blank](https://en.cppreference.com/w/cpp/filesystem) comes with some utilities to create and remove files and directories, but firstly let’s try to do so in {cpp}11.

**Create and remove nested directories in {cpp}11**

```cpp
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
```

**[Compile and run: Create and remove directories {cpp}11](https://coliru.stacked-crooked.com/a/26f4763ec5b42adb).**

```bash
g++-4.9 -std=c++11 main.cpp -lm && ./a.out
sandbox/a:
total 12
drwxr-xr-x 3 2001 2000 4096 May 28 12:27 .
drwxr-xr-x 4 2001 2000 4096 May 28 12:27 ..
drwxr-xr-x 2 2001 2000 4096 May 28 12:27 b

sandbox/c:
total 12
drwxr-xr-x 3 2001 2000 4096 May 28 12:27 .
drwxr-xr-x 4 2001 2000 4096 May 28 12:27 ..
drwxr-xr-x 2 2001 2000 4096 May 28 12:27 d
total 8012
drwxrwxrwx 2 2001 2000    4096 May 28 12:27 .
drwxrwxrwx 3 2002 2000 8175616 May 28 12:27 ..
-rwxr-xr-x 1 2001 2000    8168 May 28 12:27 a.out
-rw-rw-rw- 1 2001 2000     517 May 28 12:27 main.cpp
```
We have to create/remove one by one. We could rewrite this code snippet with less lines (using a loop), but we still have to pay attention to creation/deletion order, we cannot remove parent directory before we have removed all children.

Since {cpp}17, we can create and remove nested directories with just one call.

**Create and remove nested directories {cpp}17**

```cpp
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
```

**[Compile and run: Create and remove nested directories {cpp}17](https://coliru.stacked-crooked.com/a/62c2d22fa0e7144c).**

```bash
g++ -std=c++1z -fconcepts -fgnu-tm  -O2 -Wall -Wextra -pedantic -pthread -pedantic-errors main.cpp -lm  -latomic -lstdc++fs && ./a.out
sandbox/a:
total 12
drwxr-xr-x 3 2001 2000 4096 May 28 16:45 .
drwxr-xr-x 4 2001 2000 4096 May 28 16:45 ..
drwxr-xr-x 2 2001 2000 4096 May 28 16:45 b

sandbox/c:
total 12
drwxr-xr-x 3 2001 2000 4096 May 28 16:45 .
drwxr-xr-x 4 2001 2000 4096 May 28 16:45 ..
drwxr-xr-x 2 2001 2000 4096 May 28 16:45 d
Were directories removed? 1
total 10132
drwxrwxrwx 2 2001 2000    4096 May 28 16:45 .
drwxrwxrwx 3 2002 2000 8175616 May 28 16:45 ..
-rwxr-xr-x 1 2001 2000 2170976 May 28 16:45 a.out
-rw-rw-rw- 1 2001 2000     393 May 28 16:45 main.cpp
```

## Full example: Recursive Directory Iterator

This example consists of iterate recursively through dicrectories fintering files by extension.

### {cpp}11

To keep {cpp}11 example simple, I haven’t added filtering  logic, but filtering logic is present in {cpp}17 example:

**filesystem.11.cpp**

```cpp
#include <dirent.h>
#include <cstring>
#include <iostream>
#include <fstream> // std::ofstream
#include <vector>
#include <memory>
#include <system_error>
#include <sys/stat.h>

using namespace std;

const string UP_DIR = "..";
const string CURRENT_DIR = ".";
const string SEP = "/";


string path(initializer_list<string> parts) 
{
    string pathTmp {};
    string separator = "";
    for (auto & part: parts) 
    {
        pathTmp.append(separator).append(part);
        separator = SEP;
    }
    return pathTmp;
}

vector<string> getDirectoryFiles(const string& dir, const vector<string> & extensions) 
{
    vector<string> files;
    shared_ptr<DIR> directory_ptr(opendir(dir.c_str()), [](DIR* dir){ dir && closedir(dir); });
    if (!directory_ptr) 
    {
        throw system_error(error_code(errno, system_category()), "Error opening : " + dir);
    }
 
    struct dirent *dirent_ptr;
    while ((dirent_ptr = readdir(directory_ptr.get())) != nullptr) 
    {
        const string fileName {dirent_ptr->d_name};
        if (dirent_ptr->d_type == DT_DIR) 
        {
            if (CURRENT_DIR != fileName && UP_DIR != fileName) 
            {
                auto subFiles = getDirectoryFiles(path({dir, fileName}), extensions);
                files.insert(end(files), begin(subFiles), end(subFiles));
            }
        } 
        else if (dirent_ptr->d_type == DT_REG) 
        {
            // here we should check also if filename has an extension in extensions vector
            files.push_back(path({dir, fileName}));
        }
    }
    return files;
}

int main ()
{
    auto opt = S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH;
    mkdir("sandbox", opt);
    mkdir("sandbox/a", opt);
    mkdir("sandbox/a/b", opt);

	vector<string> e_files = {
	    "./sandbox/a/b/file1.rst", 
	    "./sandbox/a/b/file1.txt",
	    "./sandbox/a/file2.RST", 
	    "./sandbox/file3.md",
	    "./sandbox/will_be.ignored"
	};
	
	// create files
	for (auto &f: e_files)
	{
		ofstream of(f, ofstream::out);
		of << "test";
	}

    cout << "filtered files: " << endl;
	for (auto &f: getDirectoryFiles(".", {".rst", ".RST", ".md"})){
	    cout << "\t" << f << endl;
	}

    return 0;
}
```

**[Compile and run {cpp}11 example,window=_blank](https://coliru.stacked-crooked.com/a/af4228e039a281b3).**

```bash
g++ -std=c++11 -O2 -Wall -Wextra -pedantic -pthread -pedantic-errors main.cpp -lm  -latomic -lstdc++fs && ./a.out
filtered files: 
	./main.cpp
	./sandbox/file3.md
	./sandbox/will_be.ignored
	./sandbox/a/b/file1.rst
	./sandbox/a/b/file1.txt
	./sandbox/a/file2.RST
	./a.out
```

### {cpp}17

Following example also filters files by extension.

**filesystem.17.cpp**

```bash
#include <dirent.h>
#include <cstring>
#include <iostream>
#include <fstream> // std::ofstream
#include <vector>
#include <memory>
#include <system_error>
#include <sys/stat.h>

using namespace std;

const string UP_DIR = "..";
const string CURRENT_DIR = ".";
const string SEP = "/";


string path(initializer_list<string> parts) 
{
    string pathTmp {};
    string separator = "";
    for (auto & part: parts) 
    {
        pathTmp.append(separator).append(part);
        separator = SEP;
    }
    return pathTmp;
}

vector<string> getDirectoryFiles(const string& dir, const vector<string> & extensions) 
{
    vector<string> files;
    shared_ptr<DIR> directory_ptr(opendir(dir.c_str()), [](DIR* dir){ dir && closedir(dir); });
    if (!directory_ptr) 
    {
        throw system_error(error_code(errno, system_category()), "Error opening : " + dir);
    }
 
    struct dirent *dirent_ptr;
    while ((dirent_ptr = readdir(directory_ptr.get())) != nullptr) 
    {
        const string fileName {dirent_ptr->d_name};
        if (dirent_ptr->d_type == DT_DIR) 
        {
            if (CURRENT_DIR != fileName && UP_DIR != fileName) 
            {
                auto subFiles = getDirectoryFiles(path({dir, fileName}), extensions);
                files.insert(end(files), begin(subFiles), end(subFiles));
            }
        } 
        else if (dirent_ptr->d_type == DT_REG) 
        {
            // here we should check also if filename has an extension in extensions vector
            files.push_back(path({dir, fileName}));
        }
    }
    return files;
}

int main ()
{
    auto opt = S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH;
    mkdir("sandbox", opt);
    mkdir("sandbox/a", opt);
    mkdir("sandbox/a/b", opt);

	vector<string> e_files = {
	    "./sandbox/a/b/file1.rst", 
	    "./sandbox/a/b/file1.txt",
	    "./sandbox/a/file2.RST", 
	    "./sandbox/file3.md",
	    "./sandbox/will_be.ignored"
	};
	
	// create files
	for (auto &f: e_files)
	{
		ofstream of(f, ofstream::out);
		of << "test";
	}

    cout << "filtered files: " << endl;
	for (auto &f: getDirectoryFiles(".", {".rst", ".RST", ".md"})){
	    cout << "\t" << f << endl;
	}

    return 0;
}
```

**[Compile and run {cpp}17 example,window=_blank](https://coliru.stacked-crooked.com/a/af4228e039a281b3).**

```bash
g++ -std=c++11 -O2 -Wall -Wextra -pedantic -pthread -pedantic-errors main.cpp -lm  -latomic -lstdc++fs && ./a.out
filtered files: 
	./main.cpp
	./sandbox/file3.md
	./sandbox/will_be.ignored
	./sandbox/a/b/file1.rst
	./sandbox/a/b/file1.txt
	./sandbox/a/file2.RST
	./a.out
```
