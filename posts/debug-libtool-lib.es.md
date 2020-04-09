---
title: Depurar librería generada con libtool

lang: es

date: 2013/02/01 15:30:00

update: 2014/03/28 15:30:00

tags: C++, Autotools, GNU, Tips and Tricks

description: Cómo depurar un librería generada con libtool

type: text
---

Trabajando con
[libtool](https://www.gnu.org/software/libtool/libtool.html)[^1], cuando
vamos a depurar un ejecutable que utiliza una librería generada con
[libtool](https://www.gnu.org/software/libtool/libtool.html), es posible
que nos encontremos con el siguiente error:

``` {.bash}
$ gdb ./tests-mylib 
"tests-mylib": not in executable format: File format not recognized
```

`libmylib.so` es una librería dinámica generada con
[libtool](https://www.gnu.org/software/libtool/libtool.html)
`tests-mylib` es un ejecutable que utiliza la librería mylib

Para los que estéis pensando que se me ha olvidado poner la opción de
compilación `-g`, lo siento, pero este error ocurre aunque utilicemos
`-g`.

El error es debido a que estamos intentando ejecutar un script generado
por [libtool](https://www.gnu.org/software/libtool/libtool.html), es una
envoltura sobre el programa real, para facilitar la ejecución de éste
[\[libtooldoc\]](#libtooldoc){.citation}.

Para poder depurar nuestro programa de prueba `tests-mylib`

``` {.bash}
libtool --mode=execute gdb tests-mylib
```

::: {#citations}

[libtooldoc]{#libtooldoc .citation-label}: Esta información la he sacado de
    <https://www.gnu.org/software/libtool/manual/libtool.html#Debugging-executables>
:::

[^1]: Herramienta que pertenece a la
    [Autotools](https://es.wikipedia.org/wiki/GNU_build_system) usada
    para crear bibliotecas de software portables.
