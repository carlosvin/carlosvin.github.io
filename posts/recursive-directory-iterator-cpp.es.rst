.. title: Sistema de Ficheros en C++17
.. slug: recursive-directory-iterator
.. date: 2017/05/28 09:00
.. tags: C++, C++11, C++17, IO, Filesystem
.. description: Vamos a analizar con un ejemplo la forma de recorrer directorios de manera recursiva a partir de C++17
.. type: text

Introducción
------------

A partir de C++17 se añadirán nuevas abstracciones sobre el sistema de ficheros. De momento están disponibles como parte de las 
`Características Experimentales de C++ 
<https://en.cppreference.com/w/cpp/experimental>`_. Si queréis profundizar aquí está el `borrador final de la Especificación Técnica del Sistema de Ficheros <https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4100.pdf>`_. 

.. contents::

.. TEASER_END

Comenzar a utilizar característica experimental filesystem C++17 (g++)
----------------------------------------------------------------------

Simplemente debemos "decir" al compilador que estamos escribiendo código C++17 (**-c++1z**) y que añada la librería estándar con la librería filesystem (**-lstdc++fs**).

.. code-block:: bash
    
    g++ -std=c++1z main.cpp -lstdc++fs && ./a.out

Veamos un ejemplo muy simple utilizando la clase ``std::filesystem::path``. 

.. code-block:: cpp

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

`Compilar y ejecutar: ejemplo básico C++17 <https://coliru.stacked-crooked.com/a/9f8bebb8b7f0fbe7>`_

Como vemos el resultado de la ejecución es: 

.. code-block:: bash

    $ g++ -std=c++1z main.cpp -lstdc++fs && ./a.out
    $ ./a.out

    Parent path: "./path/to"
    Filename: "file.txt"
    Extension: ".txt"

Características de filesystem C++17
-----------------------------------
A continuación vamos a analizar algunas características que nos proporciona `std::filesystem <https://en.cppreference.com/w/cpp/filesystem>`_ con ejemplos en C++11 y C++17, de esta forma podremos hacernos una idea de las utilidades que esta nueva librería nos trae y cómo efectivamente ayuda al desarrollador a escribir código más claro y seguro. 

std::filesystem::path
=====================
Más arriba ya hemos visto un pequeño `ejemplo de uso de clase std::filesystem::path  <https://coliru.stacked-crooked.com/a/9f8bebb8b7f0fbe7>`_. Ésta abstracción nos proporciona una ruta a ficheros y directorios multi-plataforma, utilizando el separador de directorios correspondiente a la plataforma en la que trabajamos ``\`` en sistemas basados en Windows y ``/`` en sistemas basados en Unix. 

Separador de directorios
========================
Si quisiéramos que nuestro software utilizase el separador de directorios correcto para una plataforma, en C++11 podríamos utilizar una macro de compilación condicional:

.. code-block:: cpp

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

`Compilar y ejecutar: ejemplo separador C++11 <https://coliru.stacked-crooked.com/a/5023ee989105fc54>`_

En C++17 sería algo más sencillo:

.. code-block:: cpp

    #include <experimental/filesystem>
    #include <iostream>

    namespace fs = std::experimental::filesystem;
    using namespace std;

    int main()
    {
        cout << "Separator in my system " << fs::path::preferred_separator << endl;
        return 0;
    }

`Compilar y ejecutar: ejemplo separador C++17 <https://coliru.stacked-crooked.com/a/1f2f63b3f5597d05>`_

Operador separador de directorios
=================================
`std::filesystem::path <https://en.cppreference.com/w/cpp/filesystem/path>`_ implementa el operador **/**, el cual nos permite concatenar fácilmente rutas a ficheros o directorios.

Si quisiéramos construir rutas a directorios en C++11, tendríamos que implementar cierta lógica extra para detectar que no añadimos separadores extra y para utilizar el separador correcto:

.. code-block:: cpp

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

`Compilar y ejecutar: ejemplo concatenar rutas C++11 <https://coliru.stacked-crooked.com/a/290b278ec1de9573>`_. Como vemos el resultado no es del todo correcto, deberíamos comprobar si las partes de la ruta ya contienen separador, para no añadirlo.

Toda esta lógica está ya implementada en `std::filesystem::path <https://en.cppreference.com/w/cpp/filesystem/path>`_, así que el código en C++17 sería algo así: 

.. code-block:: cpp

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

`Compilar y ejecutar: ejemplo concatenar rutas C++17 <https://coliru.stacked-crooked.com/a/a24d50875b4daad1>`_. Aquí el código es más limpio y el resultado es simplemente correcto, no hay separadores duplicados. 

Crear y borrar directorios
==========================
`std::filesystem <https://en.cppreference.com/w/cpp/filesystem>`_ introduce algunas facilidades para crear y borrar directorios y ficheros, primero vamos a ver una de las formas de hacerlo en C++11.

.. code-block:: cpp
    
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

`Compilar y ejecutar: crear y borrar directorios C++11 <https://coliru.stacked-crooked.com/a/26f4763ec5b42adb>`_. Para crear y borrar directorios anidados, debemos hacerlo uno por uno. Podemos escribir este fragmento de código con menos líneas, pero aún así tendremos que tener cuidado del orden en el que creamos/borramos los directorios. 

En C++17 podemos borrar y crear directorios anidados con una sola llamada.

.. code-block:: cpp

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

`Compilar y ejecutar: crear y borrar directorios C++17 <https://coliru.stacked-crooked.com/a/62c2d22fa0e7144c>`_.

Ejemplo completo: Iterar Recursivamente por Directorios
-------------------------------------------------------
Vamos a ver un ejemplo algo más completo, consiste en iterar recursivamente a través de directorios, filtrando los ficheros por extension.

Este es el ejemplo en C++11, sin filtrar por extension, para evitar complicarlo:

.. listing:: recursive-directory/filesystem.11.cpp cpp

`Compilar y ejecutar el ejemplo C++11 <https://coliru.stacked-crooked.com/a/af4228e039a281b3>`_.

El siguiente ejemplo filtra los ficheros por extension.

.. listing:: recursive-directory/filesystem.17.cpp cpp

`Compilar y ejecutar el ejemplo C++17 <https://coliru.stacked-crooked.com/a/af4228e039a281b3>`_.
