.. title: Depurar librería generada con libtool
.. slug: debug-libtool-lib
.. date: 2013/02/01 15:30:00
.. update: 2014/03/28 15:30:00
.. tags: C++, Autotools, GNU, Tips and Tricks
.. link: 
.. description: Cómo depurar un librería generada con libtool
.. type: text

Trabajando con libtool_ [#]_, cuando vamos a depurar un ejecutable que utiliza una librería generada con libtool_, es posible que nos encontremos con el siguiente error:
.. code-block:: bash

  $ gdb ./tests-mylib 
  "tests-mylib": not in executable format: File format not recognized

:code:`libmylib.so` es una librería dinámica generada con libtool_
:code:`tests-mylib` es un ejecutable que utiliza la librería mylib

Para los que estéis pensando que se me ha olvidado poner la opción de compilación :code:`-g`, lo siento, pero este error ocurre aunque utilicemos :code:`-g`.

El error es debido a que estamos intentando ejecutar un script generado por libtool_, es una envoltura sobre el programa real, para facilitar la ejecución de éste [libtooldoc]_.

Para poder depurar nuestro programa de prueba :code:`tests-mylib`

.. code-block:: bash
  
  libtool --mode=execute gdb tests-mylib


.. [#] Herramienta que pertenece a la Autotools_ usada para crear bibliotecas de software portables.

.. [libtooldoc]: Esta información la he sacado de http://www.gnu.org/software/libtool/manual/libtool.html#Debugging-executables

.. _libtool: http://www.gnu.org/software/libtool/libtool.html
.. _Autotools: http://es.wikipedia.org/wiki/GNU_build_system
