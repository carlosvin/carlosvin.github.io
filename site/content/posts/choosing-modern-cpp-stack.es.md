# Elegir tecnologías para mi nuevo proyeco C++

Estoy empezando un pequeño proyecto en C++ y antes de nada me han surgido un par de preguntas:

1. ¿Cómo voy a construirlo?
2. ¿Qué framework para pruebas unitarias utilizar?

**💡 TIP**\
Si simplemente quieres comenzar un proyecto en C++, fácil de construir, con una librería y pruebas unitarias listas, simplemente visita el repositorio del proyecto de ejemplo https://github.com/carlosvin/uuid-cpp y sigue las [instrucciones en el README.md,window=blank_](https://github.com/carlosvin/uuid-cpp/blob/master/README.md).

## Elegir un Sistema de Construcción (https://mesonbuild.com/[Meson,window=_blank])

Ya he utilizado antes [Make,window=_blank](https://www.gnu.org/software/make/manual/make.html), [Maven,window=_blank](https://maven.apache.org/), [Scons,window=_blank](https://scons.org/), [Gradle,window=_blank](https://gradle.org/) y [Autotools,window=_blank](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html), pero tengo algunas razones para probar algo diferente, hay algunas cosas que no me gustan:

* **[Autotools,window=_blank](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html)**\
  No es fácil de configurar y mantener: hay distintos ficheros de configuración y distintos pasos de configuración.
* **[Gradle,window=_blank](https://gradle.org/)**\
  La construcción de proyectos C++ está todavía en desarrollo, los modelos y APIs están cambiando. No es muy rápido. Puedes ver un ejemplo en este artículo [Construir un proyecto Cpp con Gradle](/posts/gradle-cpp/es).
* **[Make,window=_blank](https://www.gnu.org/software/make/manual/make.html)**\
  A medida que el proyecto crece los archivos de configuración se van complicando y volviendo poco manejables. La sintáxis no me parece clara (esto es una custión de gustos).
* **[Scons,window=_blank](https://scons.org/)**\
  Es más lento y un poco más difícil de comprender que [Meson,window=_blank](https://mesonbuild.com/).
* **[Maven,window=_blank](https://maven.apache.org/)**\
  Es lento y puedes terminar "_Javatizando_" la estructura del proyecto.

**📌 NOTE**\
He nombrado solo las cosas que no gustan, pero estos sistemas de construcción tienen otras grandes virtudes, personalmente me encantan [Gradle,window=_blank](https://gradle.org/), [Autotools,window=_blank](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html) y [Maven,window=_blank](https://maven.apache.org/) (solo para projectos Java).

### https://cmake.org/[CMake,window=_blank] vs https://mesonbuild.com/[Meson,window=_blank]

Después de descartar los anteriores, estoy considerando [Meson,window=_blank](https://mesonbuild.com/) y [CMake,window=_blank](https://cmake.org/). Los dos son bastante rápidos:

Aunque [Meson,window=_blank](https://mesonbuild.com/) está hecho en [Python,window=_blank](https://python.org/), simplemente genera projectos [Ninja,window=_blank](https://ninja-build.org/). La primera vez tenemos que ejecutar [Meson,window=_blank](https://mesonbuild.com/) para configurar el proyecto, el resto de ejecuciones para compilar o ejecutar pruebas, realmente estaremos ejecutando directamente [Ninja,window=_blank](https://ninja-build.org/).

[CMake,window=_blank](https://cmake.org/) también puede generar proyectos [Ninja,window=_blank](https://ninja-build.org/) entre otros formatos, [mira la documentación "CMake generators"](https://cmake.org/cmake/help/latest/manual/cmake-generators.7.html).

* **[CMake,window=_blank](https://cmake.org/)**\
  Tiene una gran ventaja sobre [Meson,window=_blank](https://mesonbuild.com/), es mucho más maduro y es mucho más usado, lo que significa que podrás encontrar muy fácilmente ejemplos, documentación y ayuda en Internet. No importa el tipo de proyecto que estés empezando, lo más seguro es que [CMake,window=_blank](https://cmake.org/) sea una buena elección.
* **[Meson,window=_blank](https://mesonbuild.com/)**\
  Es un proyecto jóven comparado con [CMake,window=_blank](https://cmake.org/), pero está creciendo rápido y ya ha sido adoptado por algunos proyectos importantes como [Gnome,window=_blank](https://www.gnome.org/), donde han comenzado una iniciativa para [migrar desde Autotools a Meson](https://wiki.gnome.org/Initiatives/GnomeGoals/MesonPorting).

**Finalmente he elegido** [Meson,window=_blank](https://mesonbuild.com/) porque:

* La sintáxis es muy clara para mí, cuando leo un archivo meson.build entiendo rápidamente lo ue está pasando durante el proceso de construcción.
* Es rápido, aunque está escrito en [Python,window=_blank](https://python.org/) utiliza [Ninja,window=_blank](https://ninja-build.org/) para construir el proyecto. La primera vez tienes que utilizar [Meson,window=_blank](https://mesonbuild.com/) para configurar el proyecto, pero para construir y probar el proyecto relmente estamos ejecutando [Ninja,window=_blank](https://ninja-build.org/).

**Pasos para compilar y ejectuar tests**

```bash
$ meson build . ①
$ cd build
$ ninja build   ②
$ ninja test    ③
```
1. Primera vez, configuración del proyecto
2. Cada vez que construyes el projecto
3. Cada vez que ejecutas tests

### Otras comparaciones entre sistemas de construcción
He encontrado un par de comparaciones interesantes entre algunos de los sistemas de construcción en C++, aunque puede que no sean del todo imparciales porque han sido realizadas por [Meson,window=_blank](https://mesonbuild.com/) y [Scons,window=_blank](https://scons.org/).

* [C++ build systems comparison from Scons](https://bitbucket.org/scons/scons/wiki/SconsVsOtherBuildTools).
* [C++ build systems comparison from Meson](https://mesonbuild.com/Simple-comparison.html).

## Framework the Pruebas Unitarias

Anteriorment he utilizado algunas librerías del tipo [xUnit,window=_blank](https://en.wikipedia.org/wiki/XUnit) como [UnitTest++](https://github.com/unittest-cpp/unittest-cpp), [CppUTest](https://cpputest.github.io/) o [Google Test](https://github.com/google/googletest) que encaja perfectamente con [Google Mock](https://github.com/google/googletest/tree/master/googlemock).

Si quires una apuesta segura que cumpla tus expectativas, te recomiendo [Google Test](https://github.com/google/googletest).

Pero hace algún tiempo encontré un framework de pruebas con algunas características no tan comunes en librerías de pruebas C++ y que resultaba realmente fácil de utilizar, estoy hablando de [Catch,window=_blank](https://github.com/philsquared/Catch):

* Es simplemente un fichero de cabeceras C++ sin dependencias adicionales, por lo que resulta realmente rápido comenzar (wget y utilizar el fichero descargado desde tus pruebas).
* Puedes utilizar el estilo normal de pruebas unitarias o el estilo [BDD,window=_blank](https://en.wikipedia.org/wiki/Behavior-driven_development).

Si quieres saber más sobre [Catch,window=_blank](https://github.com/philsquared/Catch), te recomiendo que directamente lo pruebes, el siguiente ejemplo, es cuestión de dos minutos [simple example up and running](https://github.com/philsquared/Catch/blob/master/docs/tutorial.md#writing-tests). Puedes también leer algunos artículos como [Why do we need yet another C++ test framework?](https://github.com/philsquared/Catch/blob/master/docs/why-catch.md) o [Testing C++ With A New Catch](https://blog.coldflake.com/posts/Testing-C++-with-a-new-Catch/).

### https://github.com/onqtam/doctest[doctest,window=_blank]: Una alternativa a https://github.com/philsquared/Catch[Catch,window=_blank]

Hay otro framework de pruebas llamado [doctest,window=_blank](https://github.com/onqtam/doctest), con los mismos principios que [Catch,window=_blank](https://github.com/philsquared/Catch), pero promete ser más rápido y ligero ([resultados de las comparaciones de rendimiento](https://github.com/onqtam/doctest/blob/master/doc/markdown/benchmarks.md)) que [Catch,window=_blank](https://github.com/philsquared/Catch).

[doctest,window=_blank](https://github.com/onqtam/doctest) fue diseñado basándose en los puntos fuertes de [Catch,window=_blank](https://github.com/philsquared/Catch), pero hay algunas [diferencias](https://github.com/onqtam/doctest/blob/master/doc/markdown/faq.md#how-is-doctest-different-from-catch).

No es fácil decidirse por uno, los dos son muy parecidos, puedes comprobar las diferencias a continuación:

**Differencias entre la rama usando [doctest,window=_blank](https://github.com/onqtam/doctest) y la rama usando [Catch,window=_blank](https://github.com/philsquared/Catch)**

```diff
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

Finalmente he elegido [doctest,window=_blank](https://github.com/onqtam/doctest) simplemente porque es más rápido: [resultados de las comparaciones de rendimiento](https://github.com/onqtam/doctest/blob/master/doc/markdown/benchmarks.md).

**📌 NOTE**\
He creado el proyecto de ejemplo utilizando ambos frameworks, puedes encontrarlos en diferentes ramas del repositorio: [rama doctest](https://github.com/carlosvin/uuid-cpp/tree/doctest) or [rama catch](https://github.com/carlosvin/uuid-cpp/tree/catch).

## Ejemplo

He creado un ejemplo para ilustrar este artículo: https://github.com/carlosvin/uuid-cpp.

Consiste en una implementación básica de un generador pseudo-aleatorio de [UUID,window=_blank](https://en.wikipedia.org/wiki/Universally_unique_identifier), está basado en  [mt19937,window=_blank](https://www.cplusplus.com/reference/random/mt19937) que no es criptográficamente seguro.

### Artefactos del Proyecto

Cuando instalemos el proyecto, [Meson,window=_blank](https://mesonbuild.com/) ([Ninja,window=_blank](https://ninja-build.org/) realmente) generará una serie de artefactos en nuestro sistema.

* Librería compartida: `libuuid`.
* Fichero de cabeceras para que los desarrolladores puedan usar la librería: `include/Uuid.h`.
* Fichero ejecutable `uuidgen` (Generador de [UUID,window=_blank](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
* Ejecutable de las pruebas unitarias (no será instalado).

Si ejecutamos `ninja install` en Linux obtendremos los siguientes ficheros:

```bash
/usr/local/lib/libuuid.so
/usr/local/include/Uuid.h
/usr/local/bin/uuidgen
```

### Estructura del Proyecto (https://github.com/carlosvin/uuid-cpp[Fork project])

* **[meson.build](https://github.com/carlosvin/uuid-cpp/blob/master/meson.build)**\
Fichero principal de configuración para construir el proyecto. 
Lo utilizamos para especificar las propiedades y subdirectorios del proyecto.

**meson.build**

```python
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

* **[include](https://github.com/carlosvin/uuid-cpp/blob/master/include/)**\
  meson.build;;
    Archivo de configuración para construir este directorio, no hay mucho que hacer aquí, simplemente indicamos qué ficheros de cabeceras han de ser instalados

**include/meson.build**

```python
# Select header files to be installed 
install_headers('Uuid.h')
```

    https://github.com/carlosvin/uuid-cpp/blob/master/include/Uuid.h[Uuid.h];;
      Archivos de cabeceras, es el interfaz que expone la librería y que será incluido por los usuarios de la misma.

**include/Uuid.h**

```cpp
namespace ids {

class Uuid {
    private:
    // ...
```

* **[src](https://github.com/carlosvin/uuid-cpp/blob/master/src)**\
  [meson.build (src)](https://github.com/carlosvin/uuid-cpp/blob/master/src/meson.build);; Declara 2 artefactos de salida: La librería `libuuid` y el ejecutable `uuidgen`.

**src/meson.build**

```python
libuuid = shared_library(
    'uuid', ①
    'Uuid.cpp', <2> 
    include_directories : inc, ③
    install : true) ④

uuidgen = executable(
    'uuidgen', ⑤
    'main.cpp', ⑥
    include_directories : inc, ⑦
    link_with : libuuid, ⑧
    install : true) ⑨
```
1. library name
2. source files to be compile
3. previously declared include directories in root `meson.build`
4. `libuuid` will be part of project installation
5. executable name
6. source files to compile
7. previously declared include directories in root `meson.build`
8. linking executable with shared previously declared shared library `libuuid`
9. `uuidgen` executable be part of project installation

       https://github.com/carlosvin/uuid-cpp/blob/master/src/main.cpp[main.cpp];; Código fuente del ejecutable de la aplicación: `uuidgen`

**src/main.cpp**

```cpp
#include "Uuid.h"
#include <iostream>

int main() 
{
    ids::Uuid uuid;
    std::cout << uuid.to_str() << std::endl;
    return 0;
}
```

    https://github.com/carlosvin/uuid-cpp/blob/master/src/Uuid.cpp[Uuid.cpp];; Implementación de la clase declarada en el fichero de cabeceras `Uuid.h`.

**src/Uuid.cpp**

```cpp
#include "Uuid.h"

Uuid::Uuid()
{ // ...
```

* **[test](https://github.com/carlosvin/uuid-cpp/blob/master/test/)**\
  [meson.build (test)](https://github.com/carlosvin/uuid-cpp/blob/master/test/meson.build);;
    Archivo de configuración para construir y ejecutar las pruebas unitarias.

**test/meson.build**

```python
testexe = executable(
    'testexe', ①
    'uuid_test.cpp', ②
    include_directories : inc, ③
    link_with : libuuid) ④

test('Uuid test', testexe) ⑤

test('Uuid test with args and env', testexe, args : ['arg1', 'arg2'], env : ['FOO=bar']) ⑥
```
1. test executable name
2. tests source files to be compiled
3. declared include directories in root `meson.build`
4. link test executable with previously declared shared library `libuuid`
5. test execution
6. we can specify other test execution passing arguments or environment variables

       doctest.h;;
         Librería {doctest} en un único fichero de cabeceras. Puedes tratar de automatizar el proceso de instalación de la librería, yo por el momento la he instalado manualmente, ya que es un proceso muy sencillo:

**Añadir [doctest,window=_blank](https://github.com/onqtam/doctest) al proyecto**

```bash
cd test
wget https://raw.githubusercontent.com/onqtam/doctest/master/doctest/doctest.h 
```

    https://github.com/carlosvin/uuid-cpp/blob/master/test/uuid_test.cpp[uuid_test.cpp];;
      Implementación de las pruebas unitarias.

**test/uuid_test.cpp**

```cpp
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

**💡 TIP**\
Puedes encontrar las instrucciones para construir y ejecutar el proyecto de ejemplo en: https://github.com/carlosvin/uuid-cpp#how-to-build-the-example
