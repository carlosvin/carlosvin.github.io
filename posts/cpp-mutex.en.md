---
title: Mutex C++

lang: en

date: 2014/04/24 17:50:00

description: Ease pthread mutex C++98 and a better C++11 mutex solution

type: text
---

[C++11](https://en.wikipedia.org/wiki/C%2B%2B11) has added many
improvements to help us developing multi-thread systems. I\'m going to
talk about [mutex](https://en.wikipedia.org/wiki/Mutex).

In [previous C++11 compiler
versions](https://clang.llvm.org/cxx_status.html), we can get a
[pthread](https://en.wikipedia.org/wiki/POSIX_Threads)
[mutex](https://en.wikipedia.org/wiki/Mutex), but we must initialize and
destroy in
[C](https://es.wikipedia.org/wiki/C_(lenguaje_de_programaci%C3%B3n))
style; in the end you must do more things than just lock/unlock.

[C++11](https://en.wikipedia.org/wiki/C%2B%2B11) provides [mutex
class](https://en.cppreference.com/w/cpp/thread/mutex), we just
lock/unclock the object. I recommend you take a look at [C++11 mutex
class](https://en.cppreference.com/w/cpp/thread/mutex).

If you still work with [previous C++11 compiler
versions](https://clang.llvm.org/cxx_status.html), a time ago, I made a
wrapper class that helps to work with
[pthread](https://en.wikipedia.org/wiki/POSIX_Threads)
[mutex](https://en.wikipedia.org/wiki/Mutex). You just lock/unlock the
Mutex object.

Then I leave my code proposal ([Gist
code](https://gist.github.com/carlosvin/11257689)).
