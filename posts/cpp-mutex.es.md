---
title: Mutex C++

lang: es

date: 2014/04/24 17:50:00

tags: C++, pthread

description: Un capa que facilita el uso de los mutex de pthread en C++98 y una
    mejor solución en C++11\_

type: text
---

En [C++11](https://es.wikipedia.org/wiki/C%2B%2B11) se han introducido
muchas mejoras que nos ayudan a desarrollar sistemas multi-hilo. Voy a
centrarme en los
[mutex](https://es.wikipedia.org/wiki/Exclusi%C3%B3n_mutua_(inform%C3%A1tica)).

En las versiones anteriores a
[C++11](https://es.wikipedia.org/wiki/C%2B%2B11) una forma de obtener un
[mutex](https://es.wikipedia.org/wiki/Exclusi%C3%B3n_mutua_(inform%C3%A1tica))
es el que nos proporciona la librería
[pthread](https://en.wikipedia.org/wiki/POSIX_Threads), pero para
utilizarlo debíabos inicializarlo y destruirlo en estilo
[C](https://es.wikipedia.org/wiki/C_(lenguaje_de_programaci%C3%B3n)), en
definitiva, tienes que hacer algo más que lock/unlock cada vez que
trabajas con un mutex.

[C++11](https://es.wikipedia.org/wiki/C%2B%2B11) nos proporciona una
[clase mutex](https://es.cppreference.com/w/cpp/thread/mutex), que nos
abstrae de cosas que no son lock/unclock. Os recomiendo que echéis un
vistazo y veáis lo limpio que queda el código: [Clase mutex de
C++11](https://es.cppreference.com/w/cpp/thread/mutex).

Si sigues trabajando con [versiones de compiladores previos a
C++11](https://clang.llvm.org/cxx_status.html), hace tiempo me hice un
wrapper que te ayuda a abstraerte del mutex de pthread, lo dejo aquí
abajo por si a alguien le resulta útil.

Abajo está un [Gist del
Código](https://gist.github.com/carlosvin/11257689), he vuelto a
escribir el código de cabeza y puede ser que haya algún error, lo
revisaré, pero lo importante es la idea de hacer una clase que envuelva
la inicialización del mutex de pthread.
