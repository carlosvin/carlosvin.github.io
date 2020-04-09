---
title: Elegir tecnologías para mi nuevo proyeco C++

lang: es

date: 2017/09/24 20:00:00

updated: 2019/08/31 10:00:00

tags: C++, Unit Testing, Build System, Build Software, Meson, Catch,
    doctest

description: Las tecnologías que he elegido para mi proyecto C++.My chosen
    technologies stack for C++ project. It contains an easy to run
    example defining main project skeleton.

type: text
---

Estoy empezando un pequeño proyecto en C++ y antes de nada me han
surgido un par de preguntas:

1.  ¿Cómo voy a construirlo?
2.  ¿Qué framework para pruebas unitarias utilizar?

::: {.contents}
:::

Elegir un Sistema de Construcción ([Meson](https://mesonbuild.com/))
====================================================================

Ya he utilizado antes
[Make](https://www.gnu.org/software/make/manual/make.html),
[Maven](https://maven.apache.org/), [Scons](https://scons.org/),
[Gradle](https://gradle.org/) y
[Autotools](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html),
pero tengo algunas razones para probar algo diferente, hay algunas cosas
que no me gustan:

[Autotools](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html): No es fácil de configurar y mantener: hay distintos ficheros de
    configuración y distintos pasos de configuración.

[Gradle](https://gradle.org/): La construcción de proyectos C++ está todavía en desarrollo, los
    modelos y APIs están cambiando. No es muy rápido. Puedes ver un
    ejemplo en este artículo [Construir un proyecto C++ con
    Gradle](/posts/gradle-cpp/).

[Make](https://www.gnu.org/software/make/manual/make.html): A medida que el proyecto crece los archivos de configuración se van
    complicando y volviendo poco manejables. La sintáxis no me parece
    clara (esto es una custión de gustos).

[Scons](https://scons.org/): Es más lento y un poco más difícil de comprender que
    [Meson](https://mesonbuild.com/).

[Maven](https://maven.apache.org/): Es lento y puedes terminar \"*Javatizando*\" la estructura del
    proyecto.

::: {.note}
::: {.title}
Note
:::

He nombrado solo las cosas que no gustan, pero estos sistemas de
construcción tienen otras grandes virtudes, personalmente me encantan
[Gradle](https://gradle.org/),
[Autotools](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html)
y [Maven](https://maven.apache.org/) (solo para projectos Java).
:::

[CMake](https://cmake.org/) vs [Meson](https://mesonbuild.com/)
---------------------------------------------------------------

Después de descartar los anteriores, estoy considerando
[Meson](https://mesonbuild.com/) y [CMake](https://cmake.org/). Los dos
son bastante rápidos:

Aunque [Meson](https://mesonbuild.com/) está hecho en
[Python](https://python.org/), simplemente genera projectos
[Ninja](https://ninja-build.org/). La primera vez tenemos que ejecutar
[Meson](https://mesonbuild.com/) para configurar el proyecto, el resto
de ejecuciones para compilar o ejecutar pruebas, realmente estaremos
ejecutando directamente [Ninja](https://ninja-build.org/).

[CMake](https://cmake.org/) también puede generar proyectos
[Ninja](https://ninja-build.org/) entre otros formatos, [mira la
documentación \"CMake
generators\"](https://cmake.org/cmake/help/latest/manual/cmake-generators.7.html).

[CMake](https://cmake.org/): Tiene una gran ventaja sobre [Meson](https://mesonbuild.com/), es
    mucho más maduro y es mucho más usado, lo que significa que podrás
    encontrar muy fácilmente ejemplos, documentación y ayuda en
    Internet. No importa el tipo de proyecto que estés empezando, lo más
    seguro es que [CMake](https://cmake.org/) sea una buena elección.

[Meson](https://mesonbuild.com/): Es un proyecto jóven comparado con [CMake](https://cmake.org/), pero
    está creciendo rápido y ya ha sido adoptado por algunos proyectos
    importantes como [Gnome](https://www.gnome.org/), donde han
    comenzado una iniciativa para [migrar desde Autotools a
    Meson](https://wiki.gnome.org/Initiatives/GnomeGoals/MesonPorting).

**Finalmente he elegido** [Meson](https://mesonbuild.com/) porque:

-   La sintáxis es muy clara para mí, cuando leo un archivo
    [meson.build]{.title-ref} entiendo rápidamente lo ue está pasando
    durante el proceso de construcción.
-   Es rápido, aunque está escrito en [Python](https://python.org/)
    utiliza [Ninja](https://ninja-build.org/) para construir el
    proyecto. La primera vez tienes que utilizar
    [Meson](https://mesonbuild.com/) para configurar el proyecto, pero
    para construir y probar el proyecto relmente estamos ejecutando
    [Ninja](https://ninja-build.org/).

``` {.bash}
$ meson build . # Primera vez, configuración del proyecto
$ cd build
$ ninja build   # cada vez que construyes el projecto
$ ninja test    # cada vez que ejecutas tests
```

He encontrado un para de comparaciones interesantes entre algunos de los
sistemas de construcción en C++, aunque puede que no sean del todo
imparciales porque han sido realizadas por
[Meson](https://mesonbuild.com/) y [Scons](https://scons.org/).

-   [C++ build systems comparison from
    Scons](https://bitbucket.org/scons/scons/wiki/SconsVsOtherBuildTools).
-   [C++ build systems comparison from
    Meson](https://mesonbuild.com/Simple-comparison.html).

Framework the Pruebas Unitarias
===============================

Anteriorment he utilizado algunas librerías del tipo
[xUnit](https://en.wikipedia.org/wiki/XUnit) como
[UnitTest++](https://github.com/unittest-cpp/unittest-cpp),
[CppUTest](https://cpputest.github.io/) o [Google
Test](https://github.com/google/googletest) que encaja perfectamente con
[Google
Mock](https://github.com/google/googletest/tree/master/googlemock).

Si quires una apuesta segura que cumpla tus expectativas, te recomiendo
[Google Test](https://github.com/google/googletest).

Pero hace algún tiempo encontré un framework de pruebas con algunas
características no tan comunes en librerías de pruebas C++ y que
resultaba realmente fácil de utilizar, estoy hablando de
[Catch](https://github.com/philsquared/Catch):

-   Es simplemente un fichero de cabeceras C++ sin dependencias
    adicionales, por lo que resulta realmente rápido comenzar (wget y
    utilizar el fichero descargado desde tus pruebas).
-   Puedes utilizar el estilo normal de pruebas unitarias o el estilo
    [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development).

Si quieres saber más sobre
[Catch](https://github.com/philsquared/Catch), te recomiendo que
directamente lo pruebes, el siguiente ejemplo, es cuestión de dos
minutos [simple example up and
running](https://github.com/philsquared/Catch/blob/master/docs/tutorial.md#writing-tests).
Puedes también leer algunos artículos como [Why do we need yet another
C++ test
framework?](https://github.com/philsquared/Catch/blob/master/docs/why-catch.md)
o [Testing C++ With A New
Catch](https://blog.coldflake.com/posts/Testing-C++-with-a-new-Catch/).

[doctest](https://github.com/onqtam/doctest): Una alternativa a [Catch](https://github.com/philsquared/Catch)
-------------------------------------------------------------------------------------------------------------

Hay otro framework de pruebas llamado
[doctest](https://github.com/onqtam/doctest), con los mismos principios
que [Catch](https://github.com/philsquared/Catch), pero promete ser más
rápido y ligero ([resultados de las comparaciones de
rendimiento](https://github.com/onqtam/doctest/blob/master/doc/markdown/benchmarks.md))
que [Catch](https://github.com/philsquared/Catch).

[doctest](https://github.com/onqtam/doctest) fue diseñado basándose en
los puntos fuertes de [Catch](https://github.com/philsquared/Catch),
pero hay algunas
[diferencias](https://github.com/onqtam/doctest/blob/master/doc/markdown/faq.md#how-is-doctest-different-from-catch).

No es fácil decidirse por uno, los dos son muy parecidos, puedes
comprobar las diferencias a continuación:

``` {.diff}
@@ -1,12 +1,12 @@
-#define CATCH_CONFIG_MAIN // It tells Catch to provide a main() - only do this in one cpp file
+#define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN

-#include "catch.hpp"
+#include "doctest.h"
#include "Uuid.h"
#include <string>

constexpr int MAX_ITERS = 100;

-TEST_CASE("Uuid", "[uuid]")
+TEST_CASE("Uuid")
{
for (int i = 0; i < MAX_ITERS; i++)
{
@@ -26,7 +26,7 @@ TEST_CASE("Uuid", "[uuid]")

// BDD style

-SCENARIO("UUID creation", "[Uuid]")
+SCENARIO("UUID creation")
{

GIVEN("A random UUID ")
```

Finalmente he elegido [doctest](https://github.com/onqtam/doctest)
simplemente porque es más rápido: [resultados de las comparaciones de
rendimiento](https://github.com/onqtam/doctest/blob/master/doc/markdown/benchmarks.md).

::: {.note}
::: {.title}
Note
:::

He creado el proyecto de ejemplo utilizando ambos frameworks, puedes
encontrarlos en diferentes ramas del repositorio: [rama
doctest](https://github.com/carlosvin/uuid-cpp/tree/doctest) or [rama
catch](https://github.com/carlosvin/uuid-cpp/tree/catch).
:::

Ejemplo
=======

He creado un ejemplo para ilustrar este artículo:
<https://github.com/carlosvin/uuid-cpp>.

Consiste en una implementación básica de un generador pseudo-aleatorio
de [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier),
está basado en
[mt19937](https://www.cplusplus.com/reference/random/mt19937/) que no es
criptográficamente seguro.

Artefactos del Proyecto
-----------------------

Cuando instalemos el proyecto, [Meson](https://mesonbuild.com/)
([Ninja](https://ninja-build.org/) realmente) generará una serie de
artefactos en nuestro sistema.

-   Librería compartida: `libuuid`.
-   Fichero de cabeceras para que los desarrolladores puedan usar la
    librería: `include/Uuid.h`.
-   Fichero ejecutable `uuidgen` (Generador de
    [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
-   Ejecutable de las pruebas unitarias (no será instalado).

Si ejecutamos `ninja install` en Linux obtendremos los siguientes
ficheros:

``` {.bash}
/usr/local/lib/libuuid.so
/usr/local/include/Uuid.h
/usr/local/bin/uuidgen
```

Estructura del Proyecto ([Fork project](https://github.com/carlosvin/uuid-cpp))
-------------------------------------------------------------------------------

-   

    [meson.build](https://github.com/carlosvin/uuid-cpp/blob/master/meson.build)

    :   Fichero principal de configuración para construir el proyecto.
        Lo utilizamos para especificar las propiedades y subdirectorios
        del proyecto.

        ``` {.python}
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
        ```

-   

    [include](https://github.com/carlosvin/uuid-cpp/blob/master/include/)

    :   -   

            meson.build

            :   Archivo de configuración para construir este directorio,
                no hay mucho que hacer aquí, simplemente indicamos qué
                ficheros de cabeceras han de ser instalados

                ``` {.python}
                # Select header files to be installed 
                install_headers('Uuid.h')
                ```

        -   

            [Uuid.h](https://github.com/carlosvin/uuid-cpp/blob/master/include/Uuid.h)

            :   Archivos de cabeceras, es el interfaz que expone la
                librería y que será incluido por los usuarios de la
                misma.

                ``` {.cpp}
                namespace ids {

                class Uuid {
                    private:
                    // ...
                ```

-   

    [src](https://github.com/carlosvin/uuid-cpp/blob/master/src)

    :   -   

            [meson.build (src)](https://github.com/carlosvin/uuid-cpp/blob/master/src/meson.build)

            :   Declara 2 artefactos de salida: La librería `libuuid` y
                el ejecutable `uuidgen`.

                ``` {.python}
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
                ```

        -   

            [main.cpp](https://github.com/carlosvin/uuid-cpp/blob/master/src/main.cpp)

            :   Código fuente del ejecutable de la aplicación: `uuidgen`

                ``` {.cpp}
                #include "Uuid.h"
                #include <iostream>

                int main() 
                {
                    ids::Uuid uuid;
                    std::cout << uuid.to_str() << std::endl;
                    return 0;
                }
                ```

        -   

            [Uuid.cpp](https://github.com/carlosvin/uuid-cpp/blob/master/src/Uuid.cpp)

            :   Implementación de la clase declarada en el fichero de
                cabeceras `Uuid.h`.

                ``` {.cpp}
                #include "Uuid.h"

                Uuid::Uuid()
                { // ...
                ```

-   

    [test](https://github.com/carlosvin/uuid-cpp/blob/master/test/)

    :   -   

            [meson.build (test)](https://github.com/carlosvin/uuid-cpp/blob/master/test/meson.build)

            :   Archivo de configuración para construir y ejecutar las
                pruebas unitarias.

                ``` {.python}
                testexe = executable(
                    'testexe', # test executable name 
                    'uuid_test.cpp', # tests source files to be compiled
                    include_directories : inc,  # declared include directories in root :code:`meson.build`
                    link_with : libuuid) # link test executable with previously declared shared library :code:`libuuid`

                # test execution 
                test('Uuid test', testexe)

                # we can specify other test execution passing arguments or environment variables
                test('Uuid test with args and env', testexe, args : ['arg1', 'arg2'], env : ['FOO=bar'])
                ```

        -   

            doctest.h

            :   Librería [doctest](https://github.com/onqtam/doctest) en
                un único fichero de cabeceras. Puedes tratar de
                automatizar el proceso de instalación de la librería, yo
                por el momento la he instalado manualmente, ya que es un
                proceso muy sencillo:

                ``` {.bash}
                cd test
                wget https://raw.githubusercontent.com/onqtam/doctest/master/doctest/doctest.h 
                ```

        -   

            [uuid\_test.cpp](https://github.com/carlosvin/uuid-cpp/blob/master/test/uuid_test.cpp)

            :   Implementación de las pruebas unitarias.

                ``` {.cpp}
                #define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN

                #include "doctest.h"
                #include "Uuid.h"
                #include <string>

                constexpr int MAX_ITERS = 100;

                TEST_CASE("Uuid")
                {
                    for (int i = 0; i < MAX_ITERS; i++)
                    {
                        ids::Uuid uuid;
                        std::string uuid_str{uuid.to_str()};

                        INFO(uuid_str);

                        // If assertion fails test execution is stopped
                        REQUIRE(uuid_str.size() == 36);

                        // If assertion fails test execution continues
                        CHECK(uuid.most > 0);
                        CHECK(uuid.least > 0);
                    }
                }

                // BDD style

                SCENARIO("UUID creation")
                {

                    GIVEN("A random UUID ")
                    {

                        ids::Uuid uuid;
                        std::string uuid_str{uuid.to_str()};

                        REQUIRE(uuid_str.size() == 36);

                        WHEN("get the most and least")
                        {
                            THEN("should be more than 0")
                            {
                                CHECK(uuid.most > 0);
                                CHECK(uuid.least > 0);
                            }
                        }
                    }
                }
                ```

::: {.hint}
::: {.title}
Hint
:::

Puedes encontrar las instrucciones para construir y ejecutar el proyecto
de ejemplo en:
<https://github.com/carlosvin/uuid-cpp#how-to-build-the-example>
:::
