---
title: Mutex C++
date: 2014-04-24
lang: en
description: Mutex wrapper on C++98 pthread mutex and a the better C++11 std::mutex solution
keywords: C++, pthread, Mutex
toc: true
aliases: ["/langs/en/posts/cpp-mutex"]
---

[C++11](https://en.wikipedia.org/wiki/C++11) has added many improvements to help us developing multi-thread systems. I'm going to talk about [Mutex](https://en.wikipedia.org/wiki/Mutex).

In [previous C++11 compiler versions](https://clang.llvm.org/cxx_status.html), we can get a [pthread](https://en.wikipedia.org/wiki/POSIX_Threads) mutex, but we must initialize it and destroy it in old C style, in the end you must do more things than just lock/unlock.

With [C++11 Mutex Class](https://en.cppreference.com/w/cpp/thread/mutex), we just lock/unlock the object.

```cpp
#include <mutex>

std::mutex mtx;

void do_something (int i) {
  mtx.lock();
  // critical section
  mtx.unlock();
}
```

Or you can just use Mutex with a [generic lock guard](https://en.cppreference.com/w/cpp/thread/lock_guard).

> **Tip:** If you still have to stick to previous C++11 compiler versions, maybe it is useful to you a wrapper class I created that helps you to work with pthread mutex, so you just have to lock/unlock the Mutex object: [Gist code](https://gist.github.com/carlosvin/11257689).
