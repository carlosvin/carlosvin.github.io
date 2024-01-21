# Depurar librería generada con libtool

Cuando vamos a depurar un ejecutable que utiliza una librería generada con [libtool,window=_blank](https://www.gnu.org/software/libtool/libtool.html)footnote:[Herramienta que pertenece a la link:[Autotools] usada para crear bibliotecas de software portables.], es posible que nos encontremos con el siguiente error:

```bash
$ gdb ./tests-mylib
"tests-mylib": not in executable format: File format not recognized
```

* **`libmylib.so`**\
es una librería dinámica generada con [libtool,window=_blank](https://www.gnu.org/software/libtool/libtool.html).
* **`tests-mylib`**\
es un ejecutable que utiliza la librería mylib.

Para los que estéis pensando que se me ha olvidado poner la opción de compilación `-g`, este error ocurre aunque utilicemos `-g`.

El error es debido a que estamos intentando ejecutar un script generado por [libtool,window=_blank](https://www.gnu.org/software/libtool/libtool.html), es una envoltura sobre el programa real, para facilitar la ejecución de éste footnote:[Más información en [documentación de libtool](https://www.gnu.org/software/libtool/manual/libtool.html#Debugging-executables)].

**Para poder depurar nuestro programa de prueba `tests-mylib`**

```bash
libtool --mode=execute gdb tests-mylib
```
