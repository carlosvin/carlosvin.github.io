# Mutex C++

[C++11,window=_blank](https://en.wikipedia.org/wiki/C++11) has added many improvements to help us developing multi-thread systems. I’m going to talk about [Mutex,window=_blank](https://en.wikipedia.org/wiki/Mutex).

In [previous C++11 compiler versions,window=_blank](https://clang.llvm.org/cxx_status.html), we can get a [pthread,window=_blank](https://en.wikipedia.org/wiki/POSIX_Threads) [Mutex,window=_blank](https://en.wikipedia.org/wiki/Mutex), but we must initialize it and destroy it in old C style, in the end you must do more things than just lock/unlock.

With [C++11 Mutex Class,window=_blank](https://en.cppreference.com/w/cpp/thread/mutex), we just lock/unclock the object. 

```cpp
#include <mutex>

std::mutex mtx;

void do_something (int i) {
  mtx.lock();
  // critical section
  mtx.unlock();
}
```

Or you can just use [Mutex,window=_blank](https://en.wikipedia.org/wiki/Mutex) with a [generic lock guard,window=_blank](https://en.cppreference.com/w/cpp/thread/lock_guard).

**💡 TIP**\
If you still have to stick to [previous C++11 compiler versions,window=_blank](https://clang.llvm.org/cxx_status.html), maybe it is useful to you a wrapper class I created that helps you to work with [pthread,window=_blank](https://en.wikipedia.org/wiki/POSIX_Threads) [Mutex,window=_blank](https://en.wikipedia.org/wiki/Mutex), so you just have to lock/unlock the Mutex object: [Gist code,window=_blank](https://gist.github.com/carlosvin/11257689).
