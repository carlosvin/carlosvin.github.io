.. title: Build C++ project with Gradle
.. slug: gradle-cpp
.. date: 2014/09/27 12:00:00
.. tags: Gradle, C++, Build Construction Systems, draft
.. description: How to build a C++ project using Gradle
.. type: text

Introduction
============

I am more and more worried about building, dependency management and distribution of my projects. I'd like to find a tool unifies those processes with independency of the languaje. I know several tools those almost fit to what I'm looking for, like I know several tools those almost fit to what I'm looking for, like SCons_, Autotools_, Ant_, Maven_ and lately Gradle_.

I've made several projects with Gradle, but always I was focused in Java_ and Android_ projects. 
In Java_ projects I've found a Maven_ replacement, because it is faster, easier and less verbose.
About Android_ projects I suffered the early adoption of `Android Studio + Gradle`_, although currently I think the are more mature and they work fine. 

First of all, I have to say: building C/C++/Objective-C projects with Gradle_ is in incubation_ phase, although now we can perform advanced tasks like:

-  Generation several artifacts within same project (libraries and executables).
-  Dependency management between artifacts (no versions).
-  Different "flavors" of the same software, e.g: we can generate a “Community” release and other one with more enabled features called “Enterprise”.
-  It allows multi-platform binary generation.

As I said, this plugin is still having limitations although they are working on it: `Gradle C++ roadmap <http://www.gradleware.com/resources/cpp/>`__ dejaré Autotools_ (me arrepentiré de haber dicho esto).

.. contents:: Index

.. TEASER_END

Case study
==========

Básicamente he sacado todo el ejemplo de `aquí <http://www.gradle.org/docs/current/userguide/nativeBinaries.html>`__ y lo he adaptado a un caso en el que hay varias plataformas y quiero generar dos versiones distintas de mi software “Community” y “Enterprise”.

La aplicación es un ejecutable y una librería dinámica. El ejecutable hace uso de esta librería. Ya está, solo quiero mostrar lo que nos permite hacer Gradle_.

También nos permitirá generar una versión para distribuir y otra para depurar.

Todo el código se encuentra en https://github.com/carlosvin/cpp_gradle.

Estructura del proyecto
-----------------------

Podemos crear la estructura que queramos, pero resulta más fácil seguir la que espera Gradle_, para no tener que especificar donde está el códigofuente. Esta es la estructura del proyecto:

:gradle-cpp:
    Directorio raíz.

    :build.gradle:
        Fichero donde se configura el proyecto Gradle_, el equivalente al build.xml de Ant_, al Makefile_ de C/C++ o al pom.xml de Maven_.

    :src:
        Carpeta donde va todo el código fuente

        :hello:
            Carpeta que contiene el módulo que va a ser la librería hello.

            :cpp:
                Carpeta donde van los fuentes C++.

                :Hello.cpp:
                     Implementación de la clase Hello.

            :headers:
                Carpeta donde van los ficheros de cabeceras.

                :Hello.h:
                     Declaración de la Clase Hello

                :Msg.h:
                     Declaración de constantes.
                     

        :main:
            Carpeta que contiene el módulo que será el ejecutable que utilice la librería hello.

            :cpp:
                Carpeta donde van los fuentes C++.

                :main.cpp:
                    Código fuente con la función main. 
                     

    :build:
        Carpeta que crea Gradle automáticamente donde deja todos los resultados sus ejecuciones, en ella encontraremos informes de resultados de pruebas, binarios compilados, paquetes para distribuir, etc.

La Aplicación C++
-----------------

Va a consistir en un ejecutable que hará uso de la funcionalidad de la librería ’hello’.


.. code-block:: cpp

    // main.cpp
    #include "Hello.h"
    int main(int argc, char ** argv) 
    {   
        Hello hello ("Pepito");
        hello.sayHello(10);
        return 0; 
    }

Esta librería permite saludar n_ veces a una persona especificada en su constructor.

.. code-block:: cpp

    // Hello.h
    class Hello  
    {
        private:
            const char * who;
        public:
            Hello(const char * who);
            void sayHello(unsigned n = 1);
    };


Construyendo con Gradle
-----------------------

Caso básico
~~~~~~~~~~~

Lo único que necesitamos para construir nuestra aplicación con Gradle_ es: tener Gradle_ [1]_ y el fichero :code:`build.gradle`.

.. code-block:: groovy

    // build.gradle
    apply plugin: 'cpp'

    libraries {     
        hello {} 
    }
    executables {     
        main {
            binaries.all {
                lib libraries.hello.shared         
            }
        }
    }

Con este fichero tan simple, conseguiremos compilar e instalar nuestra aplicación, en modo Debug para la plataforma donde estamos ejecutando Gradle_, en mi caso es Linux X64.

Si ejecutamos desde la raíz de nuestro proyecto :code:`gradle task`, podremos ver todas las tareas que podemos hacer.

En nuestro caso, solo queremos nuestra aplicación compilada y lista para funcionar, así que ejecutaremos: :code:`gradle installMainExecutable`.

Una vez que ha terminado, podemos ejecutar el programa llamando al script :code:`build/install/mainExecutable/main` [2]_.

.. code-block:: bash

    $ build/install/mainExecutable/main
    1.  Hello Mr. Pepito (Community) 
    2.  Hello Mr. Pepito (Community) 
    3.  Hello Mr. Pepito (Community) 
    4.  Hello Mr. Pepito (Community) 
    5.  Hello Mr. Pepito (Community) 
    6.  Hello Mr. Pepito (Community) 
    7.  Hello Mr. Pepito (Community) 
    8.  Hello Mr. Pepito (Community) 
    9.  Hello Mr. Pepito (Community) 
    10. Hello Mr. Pepito (Community) 


Distintos “Sabores”
~~~~~~~~~~~~~~~~~~~

Con unas pocas líneas más, podemos generar distintas versiones de la misma aplicación, en nuestro ejemplo vamos a generar una versión “Community” y otra “Enterprise”.

.. code-block:: groovy

    //build.gradle
    apply plugin: 'cpp'
    model {
        flavors {
            community
            enterprise
        }
    }
    libraries {
        hello {
            binaries.all {             
                if (flavor == flavors.enterprise) {
			cppCompiler.define "ENTERPRISE"
                }
            }
        }
    }
    executables {
        main {
            binaries.all {
                lib libraries.hello.shared
            }
        }
    }

Además tenemos que preparar nuestra aplicación para utilizar estos parámetros de compilación.


.. code-block:: cpp

    // Msg.h
    
    #ifdef ENTERPRISE
    static const char * EDITION = "Enterprise";

    #else 
    static const char * EDITION = "Community";

    #endif


De esta forma se utiliza una cadena u otra en función del “sabor” con que compilemos.

Si ahora ejecutamos :code:`gradle clean task` en la raíz de nuestro proyecto, veremos que tenemos más tareas disponibles, antes teníamos :code:`installMainExecutable` y ahora ha sido reemplazada por :code:`installCommunityMainExecutable` y :code:`installEnterpriseMainExecutable`.

Si ejecutamos estas dos tareas, tendremos nuestra aplicación instalada en los dos sabores.

.. code-block:: bash

    $gradle installEnterpriseMainExecutable installCommunityMainExecutable

    :compileEnterpriseHelloSharedLibraryHelloCpp 
    :linkEnterpriseHelloSharedLibrary 
    :enterpriseHelloSharedLibrary 
    :compileEnterpriseMainExecutableMainCpp 
    :linkEnterpriseMainExecutable 
    :enterpriseMainExecutable 
    :installEnterpriseMainExecutable 
    :compileCommunityHelloSharedLibraryHelloCpp 
    :linkCommunityHelloSharedLibrary 
    :communityHelloSharedLibrary 
    :compileCommunityMainExecutableMainCpp 
    :linkCommunityMainExecutable 
    :communityMainExecutable 
    :installCommunityMainExecutable

    BUILD SUCCESSFUL
    Total time: 9.414 secs 

Ahora podemos ejecutar nuestra aplicación en los dos sabores:

Community
+++++++++

.. code-block:: bash

    $ build/install/mainExecutable/community/main
    1.      Hello Mr. Pepito        (Community)
    2.      Hello Mr. Pepito        (Community) 
    3.      Hello Mr. Pepito        (Community) 
    4.      Hello Mr. Pepito        (Community) 
    5.      Hello Mr. Pepito        (Community) 
    6.      Hello Mr. Pepito        (Community) 
    7.      Hello Mr. Pepito        (Community) 
    8.      Hello Mr. Pepito        (Community) 
    9.      Hello Mr. Pepito        (Community) 
    10.     Hello Mr. Pepito        (Community)


Enterprise
++++++++++

.. code-block:: bash

    $ build/install/mainExecutable/enterprise/main
    1.      Hello Mr. Pepito        (Enterprise) 
    2.      Hello Mr. Pepito        (Enterprise) 
    3.      Hello Mr. Pepito        (Enterprise) 
    4.      Hello Mr. Pepito        (Enterprise) 
    5.      Hello Mr. Pepito        (Enterprise) 
    6.      Hello Mr. Pepito        (Enterprise) 
    7.      Hello Mr. Pepito        (Enterprise) 
    8.      Hello Mr. Pepito        (Enterprise) 
    9.      Hello Mr. Pepito        (Enterprise) 
    10.     Hello Mr. Pepito        (Enterprise)

Release o Debug
~~~~~~~~~~~~~~~

Por defecto Gradle compila nuestra aplicación en modo Debug, pero podemos añadir el modo Release para que active algunas optimizaciones [3]_.

.. code-block:: groovy

    // build.gradle

    apply plugin: 'cpp'
    model {
        buildTypes {
            debug         
            release
        }
    
    // ... the rest of file below doesn't change 

Si ahora ejecutamos :code:`gradle clean task` veremos que tenemos más tareas, se habrán desdoblado las que teníamos, por ejemplo :code:`installCommunityMainExecutable` se habrá desdoblado en :code:`installDebugCommunityMainExecutable` y :code:`installReleaseCommunityMainExecutable`.

Multi-plataforma
~~~~~~~~~~~~~~~~

También tenemos las posibilidad de utilizar las características de compilación cruzada que nos ofrecen los compiladores y generar componentes nativos para otras plataformas. El proceso es el mismo, simplemente tenemos que dar te alta las plataformas que vamos a soportar.

Esto solo funcionará si en nuestro sistema tenemos instalada la cadena de herramientas ( Toolchains_ ) necesaria, es decir, si en un sistema de 64 bits queremos compilar para 32 bits, tendremos que tener instaladas las librerías necesarias para 32 bits.


.. code-block:: groovy

    // build.gradle

    apply plugin: 'cpp'
    model {
        buildTypes {
            debug
            release
        }
             platforms {
            x86 {
                architecture "x86"
            }
            x64 {
                architecture "x86_64"
            }
            itanium {
                architecture "ia-64"
            }
        } 
        flavors {
            community
            enterprise
        }
    }
    libraries {
        hello {
            binaries.all {
                if (flavor == flavors.enterprise) {
                    cppCompiler.define "ENTERPRISE"
                }
            }
        }
    }
    executables {
        main {
            binaries.all {
                lib libraries.hello.shared
            }
        }
    }

Ejecutando :code:`gradle clean task` podremos ver las distintas opciones de construción que tenemos, en nuestro caso veremos que podemos construir distintas versiones de nuestra aplicación en distintos sabores, para distintas plataformas en Debug o Release.

Pruébalo tú mism@
-----------------

El proyecto se encuentra en https://github.com/carlosvin/cpp_gradle. 

Para poder probar necesitas:

- Tener instalado Java_ a partir de la versión 6.
- Tener algún compilador instalado (por ejemplo GCC_)

Solo tienes que seguir los siguientes pasos:

1. :code:`git clone git@github.com:carlosvin/cpp_gradle.git`
2. :code:`cd cpp_gradle`
3. :code:`./gradlew task` o :code:`./gradlew.bat task` si estás en Windows. De esta forma verás todas las tareas que te ofrece Gradle_ para este proyecto. La primera vez tardará un poco porque se descarga una versión de Gradle_.
4. Si estás en una máquina de 64 bits, por ejemplo utiliza este comando para compilar e instalar la aplicación :code:`./gradlew installX64ReleaseEnterpriseMainExecutable`.
5. Ejecuta la aplicación que acabas de construir :code:`build/install/mainExecutable/x64ReleaseEnterprise/main`

Conclusiones
============

Con una configuración mínima, tenemos muchas posibilidades de construcción de aplicaciones nativas multi-plataforma.

Tiene un futuro prometedor, veremos como termina. Aunque si sigue los pasos del soporte para Java_ o Android_, seguro que llega a buen puerto. 

Podemos utilizar otras características de Gradle_ y aplicarlas a nuestros proyectos C++, como análisis estáticos de código, generación de informes (pruebas, cobertura, calidad, etc.), fácil incorporación a sistemas de integración continua.

Gradle_ para C++ es una característica que actualmente está en desarrollo, por lo que no hay que olvidar que:

-  No debemos utilizar en entornos reales de desarrollo, puede acarrear muchos dolores de cabeza.
-  La forma de definir el fichero build.gradle para esta característica puede cambiar.

Todo el ejemplo se encuentra en https://github.com/carlosvin/cpp_gradle.
Os recomiendo que lo descarguéis y probéis lo sencillo que resulta.

.. _SCons: http://www.scons.org
.. _Autotools: http://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html#Autotools-Introduction
.. _Ant: http://ant.apache.org
.. _Maven: http://maven.apache.org
.. _Gradle: http://www.gradle.org
.. _`Android Studio + Gradle`: http://developer.android.com/sdk/installing/studio-build.html
.. _incubation: http://www.gradle.org/docs/current/userguide/feature_lifecycle.html#incubating
.. _Toolchains: http://es.wikipedia.org/wiki/Cadena_de_herramientas
.. _Java: http://www.java.com
.. _Makefile: http://es.wikipedia.org/wiki/Make
.. _Android: http://developer.android.com/sdk/installing/studio-build.html
.. _`Instala Gradle`: http://www.gradle.org/docs/current/userguide/installation.html
.. _GCC: https://gcc.gnu.org/

.. [n] 'n' es un número entero positivo

.. [1]
   Realmente no es necesario tener instalado Gradle, si utilizamos el wrapper, pero esto no lo vamos a tratar hoy, `si queréis más información <http://www.gradle.org/docs/current/userguide/nativeBinaries.html>`__.

.. [2]
   .bat en Windows y sin extensión en Linux

.. [3]
   También podemos definir el tipo de optimizaciones que vamos a utilizar.

