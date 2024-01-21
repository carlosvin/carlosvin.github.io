# Mutex C++

En [C++11,window=_blank](https://en.wikipedia.org/wiki/C++11) se han introducido muchas mejoras que nos ayudan a desarrollar sistemas multi-hilo. Voy a centrarme en los [Mutex,window=_blank](https://en.wikipedia.org/wiki/Mutex).

En las versiones anteriores a [C++11,window=_blank](https://en.wikipedia.org/wiki/C++11) una forma de obtener un [Mutex,window=_blank](https://en.wikipedia.org/wiki/Mutex) es el que nos proporciona la librería link:[pthread], pero para utilizarlo debíabos inicializarlo y destruirlo al estilo C, en definitiva, tienes que hacer algo más que lock/unlock cada vez que trabajas con un mutex.

[C++11,window=_blank](https://en.wikipedia.org/wiki/C++11) nos proporciona una [Clase Mutex,window=_blank](https://en.cppreference.com/w/cpp/thread/mutex), que nos abstrae de cosas que no sean lock/unclock. 

```cpp
#include <mutex>

std::mutex mtx;

void do_something (int i) {
  mtx.lock();
  // critical section
  mtx.unlock();
}
```

En [C++11,window=_blank](https://en.wikipedia.org/wiki/C++11) también puedes utilizar el [Mutex,window=_blank](https://en.wikipedia.org/wiki/Mutex) con una [guarda genérica,window=_blank](https://en.cppreference.com/w/cpp/thread/lock_guard).

Si sigues trabajando con [versiones del compilador anteriores a C++11,window=_blank](https://clang.llvm.org/cxx_status.html), hace tiempo me hice un wrapper que te ayuda a abstraerte del mutex de pthread, lo dejo aquí abajo por si a alguien le resulta útil: [gist].
