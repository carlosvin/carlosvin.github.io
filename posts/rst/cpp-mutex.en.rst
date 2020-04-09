
:---
title: Mutex C++
:lang: en
:date: 2014/04/24 17:50:00
:description: Ease pthread mutex C++98 and a better C++11 mutex solution
:type: text
---

`C++11`_ has added many improvements to help us developing multi-thread systems. I'm going to talk about mutex_. 

In `previous C++11 compiler versions`_, we can get a pthread_ mutex_, but we must initialize and destroy in C_ style; in the end you must do more things than just lock/unlock.

`C++11`_ provides `mutex class`_, we just lock/unclock the object. I recommend you take a look at `C++11 mutex class`_.

If you still work with `previous C++11 compiler versions`_, a time ago, I made a wrapper class that helps to work with pthread_ mutex_. You just lock/unlock the Mutex object.

Then I leave my code proposal (`Gist code`_).

.. TEASER_END

 https://gist.github.com/carlosvin/11257689


.. _mutex: https://en.wikipedia.org/wiki/Mutex
.. _`C++11`: https://en.wikipedia.org/wiki/C%2B%2B11
.. _C: https://es.wikipedia.org/wiki/C_(lenguaje_de_programaci%C3%B3n)
.. _`mutex class`: https://en.cppreference.com/w/cpp/thread/mutex
.. _`C++11 mutex class`: https://en.cppreference.com/w/cpp/thread/mutex
.. _pthread: https://en.wikipedia.org/wiki/POSIX_Threads
.. _`previous C++11 compiler versions`: https://clang.llvm.org/cxx_status.html
.. _`Gist code`: https://gist.github.com/carlosvin/11257689
