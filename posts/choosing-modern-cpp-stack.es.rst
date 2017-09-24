.. title: Elegir tecnologías para mi nuevo proyeco C++
.. slug: choosing-modern-cpp-stack
.. date: 2017/09/24 20:00:00
.. tags: C++, Unit Testing, Build System, Build Software, Meson, Catch
.. description: Las tecnologías que he elegido para mi proyecto C++.My chosen technologies stack for C++ project. It contains an easy to run example defining main project skeleton. 
.. type: text

Estoy empezando un pequeño proyecto en C++ y antes de nada me han surgido un par de preguntas:

1. ¿Cómo voy a construirlo?
2. ¿Qué framework para pruebas unitarias utilizar?

.. contents::

Elegir un Sistema de Construcción (Meson_)
==========================================

Ya he utilizado antes Make_, Maven_, Scons_, Gradle_ y Autotools_, pero tengo algunas razones para probar algo diferente, algunas cosas que no me gustan:

Autotools_
    No es fácil de configurar y mantener: hay distintos ficheros de configuración y distintos pasos de configuración. 
    
Gradle_
    La construcción de proyectos C++ está todavía en desarrollo, los modelos y APIs están cambiando. No es muy rápido. Puedes ver un ejemplo en este artículo  `Construir un proyecto C++ con Gradle </posts/gradle-cpp/>`_.

Make_
    A medida que el proyecto crece los archivos de configuración se van complicando y volviendo poco manejables.
    La sintáxis no me parece clara (esto es una custión de gustos).
    
Scons_
    Es más lento y un poco más difícil de comprender que Meson_. 

Maven_
    Es lento y puedes terminar "*Javatizando*" la estructura del proyecto.

.. note:: He nombrado solo las cosas que no gustan, pero estos sistemas de construcción tienen otras grandes virtudes, personalmente me encantan Gradle_, Autotools_ y Scons_.

Después de descartar los anteriores, estoy considerando Meson_ y CMake_.

CMake_ tiene una gran ventaja sobre Meson_, es mucho más maduro y es mucho más usado, lo que significa que podrás encontrar muy fácilmente ejemplos, documentación y ayuda en Internet. No importa el tipo de proyecto que estés empezando, lo más seguro es que CMake_ sea una buena elección.

Meson_ es un proyecto jóven comparado con CMake_, pero está creciendo rápido y ya ha sido adoptado por algunos proyectos importantes como Gnome_, donde han comenzado una iniciativa para `migrar desde Autotools a Meson <https://wiki.gnome.org/Initiatives/GnomeGoals/MesonPorting>`_. 

El final he elegido Meson_ porque:

- La sintáxis es muy clara para mí, cuando leo un archivo `meson.build` entiendo rápidamente lo ue está pasando durante el proceso de construcción.
- Es rápido, aunque está escrito en Python_ utiliza Ninja_ para construir el proyecto. La primera vez tienes que utilizar Meson_ para configurar el proyecto, pero para construir y probar el proyecto relmente estamos ejecutando Ninja_.

.. code:: bash

    $ meson build . # Primera vez, configuración del proyecto
    $ cd build
    $ ninja build   # cada vez que construyes el projecto
    $ ninja test    # cada vez que ejecutas tests

He encontrado un para de comparaciones interesantes entre algunos de los sistemas de construcción en C++, aunque puede que no sean del todo imparciales porque han sido realizadas por Meson_ y Scons_.

- `C++ build systems comparison from Scons <https://bitbucket.org/scons/scons/wiki/SconsVsOtherBuildTools>`_.
- `C++ build systems comparison from Meson <http://mesonbuild.com/Simple-comparison.html>`_.

Framework the Pruebas Unitarias
===============================

He utiliza algunas librerías del tipo xUnit_ como `UnitTest++ <https://github.com/unittest-cpp/unittest-cpp>`_, `CppUTest <http://cpputest.github.io/>`_ o `Google Test`_ que encaja perfectamente con `Google Mock <https://github.com/google/googletest/tree/master/googlemock>`_. 

Si quires una apuesta segura que cumpla tus expectativas, te recomiendo `Google Test`_.  

Pero hace algún tiempo encontré un framework de pruebas con algunas características bastante novedosas, este es Catch_: 

- Es simplemente un fichero de cabeceras C++ con ninguna dependencia adicional, por lo que resulta realmente rápido comenzar (wget y utilizar el fichero descargado desde tus pruebas).
- Puedes utilizar el estilo normal de pruebas unitarias o el estilo BDD_.

Si quieres saber más sobre Catch_, te recomiendo que directamente lo pruebes, el siguiente ejemple es cuestión de dos minutos `simple example up and running <https://github.com/philsquared/Catch/blob/master/docs/tutorial.md#writing-tests>`_. Puedes también leer algunos artículos como `Why do we need yet another C++ test framework? <https://github.com/philsquared/Catch/blob/master/docs/why-catch.md>`_ o `Testing C++ With A New Catch <http://blog.coldflake.com/posts/Testing-C++-with-a-new-Catch/>`_.

doctest_: Una alternativa a Catch_
----------------------------------

Hay otro framework de pruebas llamado doctest_, con los mismos principios que Catch_, pero promete ser más rápido y ligero (`resultados de las comparaciones de rendimiento`_) que Catch_. 

doctest_ fue diseñado basándose en los puntos fuertes de Catch_, pero hay algunas `diferencias <https://github.com/onqtam/doctest/blob/master/doc/markdown/faq.md#how-is-doctest-different-from-catch>`_.

No es fácil decidirse por uno, los dos son muy parecidos, puedes `comprobar las diferencias entre un test escrito con uno y otro framework <https://github.com/carlosvin/uuid-cpp/pull/1/files#diff-d22d1e18ecbe7ba34523db56b011bcfe>`_. 

Finalmente he elegido doctest_ simplemente porque es más rápido: `resultados de las comparaciones de rendimiento`_.

.. note:: He creado el proyecto de ejemplo utilizando ambos frameworks, puedes encontrarlos en diferentes ramas del repositorio: `rama doctest  <https://github.com/carlosvin/uuid-cpp/tree/doctest>`_ or `rama catch <https://github.com/carlosvin/uuid-cpp/tree/catch>`_. 

.. hint:: Puedes ver las mínimas diferencias entre un proyecto usando Catch_ o doctest_ en: https://github.com/carlosvin/uuid-cpp/pull/1

Ejemplo
=======

I've created an example to illustrate this article: https://github.com/carlosvin/uuid-cpp.

It is a basic implementation of UUID pseudo-random generator based on mt19937_ which is not cryptographically secure.

Project output artifacts
------------------------

- Shared library: :code:`libuuid`.
- Header library for developers who want to use the shared library: :code:`include/Uuid.h`.
- Executable :code:`uuidgen` (UUID_ generator).
- Test executable (not installed). It tests shared library. 

For example, if you execute :code:`ninja install` on Linux, you will get something like:

.. code:: bash
    
    /usr/local/lib/libuuid.so
    /usr/local/include/Uuid.h
    /usr/local/bin/uuidgen

Project structure (`Fork project <https://github.com/carlosvin/uuid-cpp>`_)
---------------------------------------------------------------------------

* `meson.build <https://github.com/carlosvin/uuid-cpp/blob/master/meson.build>`_
    Root project file configuration. It defines project properties and subdirectories.
    
    .. code:: python
    
        project(
            'cpp-meson-example', # project name
            'cpp', # C++ project, e.g: for C project 
            version : '1.0.0',
            license : 'MIT',
            default_options : ['cpp_std=c++11']) # compile for C++

        # it will be referred from subdir projects
        inc = include_directories('include') 

        # meson will try to find a meson.build file inside following directories
        subdir('include')
        subdir('src')
        subdir('test')

* `include <https://github.com/carlosvin/uuid-cpp/blob/master/include/>`_
    - meson.build
        Subdirectory build configuration file.

        .. code:: python

            # Select header files to be installed 
            install_headers('Uuid.h')

    - `Uuid.h <https://github.com/carlosvin/uuid-cpp/blob/master/include/Uuid.h>`_
        Header file, it is the library interface definition which will be included from projects using that library

        .. code:: cpp

            namespace ids {

            class Uuid {
                private:
                // ...


* `src <https://github.com/carlosvin/uuid-cpp/blob/master/src>`_
    - `meson.build (src) <https://github.com/carlosvin/uuid-cpp/blob/master/src/meson.build>`_
        It declares 2 output artifacts :code:`libuuid` and :code:`uuidgen`.
        
        .. code:: python

            libuuid = shared_library(
                'uuid', # library name
                'Uuid.cpp', # source files to be compile
                include_directories : inc, # previously declared include directories in root :code:`meson.build`
                install : true) # :code:`libuuid` will be part of project installation

            uuidgen = executable(
                'uuidgen', # executable name
                'main.cpp', # source files to compile
                include_directories : inc, # previously declared include directories in root :code:`meson.build`
                link_with : libuuid, # linking executable with shared previously declared shared library :code:`libuuid`
                install : true) # :code:`uuidgen` executable be part of project installation

    - `main.cpp <https://github.com/carlosvin/uuid-cpp/blob/master/src/main.cpp>`_
        Entry point for main executable :code:`uuidgen`

        .. code:: cpp

            #include "Uuid.h"
            #include <iostream>

            int main() 
            {
                ids::Uuid uuid;
                std::cout << uuid.to_str() << std::endl;
                return 0;
            }

    - `Uuid.cpp <https://github.com/carlosvin/uuid-cpp/blob/master/src/Uuid.cpp>`_
        Implementation of declared class in header file.

        .. code:: cpp

            #include "Uuid.h"

            Uuid::Uuid()
            { // ...

* `test <https://github.com/carlosvin/uuid-cpp/blob/master/test/>`_
    - `meson.build (test) <https://github.com/carlosvin/uuid-cpp/blob/master/test/meson.build>`_
        File to configure tests build process. 

        .. code:: python

            testexe = executable(
                'testexe', # test executable name 
                'uuid_test.cpp', # tests source files to be compiled
                include_directories : inc,  # declared include directories in root :code:`meson.build`
                link_with : libuuid) # link test executable with previously declared shared library :code:`libuuid`

            # test execution 
            test('Uuid test', testexe)

            # we can specify other test execution passing arguments or environment variables
            test('Uuid test with args and env', testexe, args : ['arg1', 'arg2'], env : ['FOO=bar'])

    - doctest.h
        doctest_ library in a single header file. You can try to automate library installation as part of your build process, but I haven't figure out yet a way to do it with Meson_. For now I've installed it manually: 
        
        .. code:: bash

            cd test
            wget https://raw.githubusercontent.com/onqtam/doctest/master/doctest/doctest.h 

    - `uuid_test.cpp <https://github.com/carlosvin/uuid-cpp/blob/master/test/uuid_test.cpp>`_
        Tests implementation.

        .. code:: cpp

             // This tells doctest to provide a main() - only do this in one cpp file
            #define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN

            #include "doctest.h"
            #include "Uuid.h"
            #include <string>

            constexpr int MAX_ITERS = 100;

            TEST_CASE( "Uuid" ) {
                for (int i=0; i<MAX_ITERS; i++) {
                    ids::Uuid uuid;
                    std::string uuid_str {uuid.to_str()};

                    MESSAGE(uuid_str);
                    CHECK(uuid.most > 0);
                    CHECK(uuid.least > 0);
                    CHECK(uuid_str.size() == 36);
                }
            }

            // BDD style

            SCENARIO( "UUID creation" ) {

                GIVEN( "A random UUID " ) {
                    ids::Uuid uuid;
                    std::string uuid_str {uuid.to_str()};

                    CHECK(uuid_str.size() == 36);

                    WHEN( "get the most and least" ) {
                        THEN( "should be more than 0" ) {
                            CHECK( uuid.most > 0);
                            CHECK( uuid.least > 0);
                        }
                    }
                }  
            }

.. _`Google Test`: https://github.com/google/googletest
.. _CMake: https://cmake.org/
.. _Make: https://www.gnu.org/software/make/manual/make.html
.. _Gradle: https://gradle.org/
.. _Maven: https://maven.apache.org/
.. _Autotools: http://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html
.. _Meson: http://mesonbuild.com/
.. _Gnome: https://www.gnome.org/
.. _Scons: http://scons.org/
.. _Ninja: https://ninja-build.org/
.. _Python: https://python.org/
.. _Catch: https://github.com/philsquared/Catch
.. _xUnit: https://en.wikipedia.org/wiki/XUnit
.. _BDD: https://en.wikipedia.org/wiki/Behavior-driven_development
.. _UUID: https://en.wikipedia.org/wiki/Universally_unique_identifier
.. _mt19937: http://www.cplusplus.com/reference/random/mt19937/
.. _doctest: https://github.com/onqtam/doctest
.. _`resultados de las comparaciones de rendimiento`: https://github.com/onqtam/doctest/blob/master/doc/markdown/benchmarks.md