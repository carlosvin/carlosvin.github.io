# Construir un proyecto C++ con Gradle

## Introducción

La construcción, gestión de dependencias y distribución de mis proyectos es algo que cada vez me preocupa más, me gustaría encontrar una herramienta que unificara este proceso y fuese independiente del lenguaje, lo más parecido con lo que he trabajado ha sido [SCons,window=_blank](https://www.scons.org), [Autotools,window=_blank](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html#Autotools-Introduction), [Ant,window=_blank](https://ant.apache.org), [Maven,window=_blank](https://maven.apache.org) y últimamente [Gradle,window=_blank](https://www.gradle.org).

Llevo un tiempo haciendo algunas cosas con [Gradle,window=_blank](https://www.gradle.org), pero siempre centrado en proyectos [Java,window=_blank](https://www.java.com) ~~utilizándolo como reemplazo a [Maven,window=_blank](https://maven.apache.org), porque que es más sencillo de usar y más rápido~~. Actualizacion 2020: [Gradle,window=_blank](https://www.gradle.org) sigue siendo más rápido que [Maven,window=_blank](https://maven.apache.org), pero al final sigo utilizando [Maven,window=_blank](https://maven.apache.org) para proyectos profesionales por la estabilidad de su API y sus ciclos de vida más restrictivos. 
También lo he utilizado en projectos [Android,window=_blank](https://developer.android.com/studio/build) y he sufrido [Android Studio + Gradle,window=_blank](https://developer.android.com/sdk/installing/studio-build.html) en sus fases tempranas, actualmente está todo mucho más documentado y funciona muy bien.

Antes de nada hay que decir que la construcción de proyectos C/C++ y Objective-C con [Gradle,window=_blank](https://www.gradle.org) se encuentra en fase de [incubación,window=_blank](https://docs.gradle.org/current/userguide/feature_lifecycle.html#sec:incubating_state), aunque ya permite realizar algunas tareas avanzadas como:

* Generación de múltiples artefactos dentro del mismo proyecto, esto es varias librerías o ejecutables.
* Gestionar las dependencias entre estos artefactos (sin versiones).
* Generar distintos "sabores" de aplicaciones, por ejemplo: podremos generar una aplicación "Community" y otra con más características habilitadas llamada "Enterprise".
* Permite generar binarios para distintas plataformas, esto depende de las cadenas de herramientas ([Toolchain,window=_blank](https://en.wikipedia.org/wiki/Toolchain)) que tengamos instaladas en la máquina de compilación.

Como decía todavía tiene limitaciones, aunque están trabajando en ello [si consiguen lo que tienen planeado](https://blog.gradle.org/state-and-future-of-the-gradle-software-model#a-way-forward), ~~y si lo consiguen,  dejaré [Autotools,window=_blank](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html#Autotools-Introduction) (me arrepentiré de haber dicho esto)~~. Actualización 2000: Realmente, unos años más tarde, no estoy utilizando [Autotools,window=_blank](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html#Autotools-Introduction) ni tampoco [Gradle,window=_blank](https://www.gradle.org), estoy usando [Meson](https://mesonbuild.com/) y considerando [Bazel](https://docs.bazel.build/versions/master/tutorial/cpp.html).

## Un caso práctico

Básicamente he sacado todo el ejemplo de [la guia de construcción de software native de Gradle](https://docs.gradle.org/current/userguide/native_software.html) y lo he adaptado a un caso en el que hay varias plataformas y quiero generar dos versiones distintas de mi software "Community" y "Enterprise".

La aplicación es un ejecutable y una librería dinámica. El ejecutable hace uso de esta librería. Ya está, solo quiero mostrar lo que nos permite hacer [Gradle,window=_blank](https://www.gradle.org).

También nos permitirá generar una versión para distribuir (producción) y otra para depurar (desarrollo).

Todo el código se encuentra en https://github.com/carlosvin/cpp_gradle.

### Estructura del proyecto

Podemos crear la estructura que queramos, pero resulta más fácil seguir la que recomienda [Gradle,window=_blank](https://www.gradle.org), para no tener que especificar donde está el código fuente. Ésta es la estructura del proyecto:

* **gradle-cpp**\
Directorio raíz.
  * **build.gradle**\
  Fichero donde se configura el proyecto [Gradle,window=_blank](https://www.gradle.org), el equivalente al build.xml de [Ant,window=_blank](https://ant.apache.org), al [Makefile,window=_blank](https://www.gnu.org/software/make/manual/html_node/Makefiles.html:) de C/C++ o al pom.xml de [Maven,window=_blank](https://maven.apache.org).
  * **src**\
  Carpeta donde va todo el código fuente
    * **hello**\
    Carpeta que contiene el módulo que va a ser la librería hello.
  * **cpp**\
  Carpeta donde van los fuentes C++.
    * **Hello.cpp**\
     Implementación de la clase Hello.
  * **headers**\
  Carpeta donde van los ficheros de cabeceras.
  Hello.h:::: Declaración de la Clase Hello.
    * **Msg.h**\
    Declaración de constantes.  
* **main**\
Carpeta que contiene el módulo que será el ejecutable que utilice la librería hello.
  * **cpp**\
  Carpeta donde van los fuentes C++.
    * **main.cpp**\
    Código fuente con la función main.  
  * **build**\
  Carpeta que crea Gradle automáticamente donde deja todos los resultados sus ejecuciones, en ella encontraremos informes de resultados de pruebas, binarios compilados, paquetes para distribuir, etc.

### La Aplicación C++

Va a consistir en un ejecutable que hará uso de la funcionalidad de la librería ’hello’.

**main.cpp**

```cpp
#include "Hello.h"
int main(int argc, char ** argv)
{
    Hello hello ("Pepito");
    hello.sayHello(10);
    return 0;
}
```

Esta librería permite saludar `n`footnote:[n es un número entero positivo] veces a una persona especificada en su constructor.

**Hello.h**

```cpp
class Hello
{
    private:
        const char * who;
    public:
        Hello(const char * who);
        void sayHello(unsigned n = 1);
};
```

### Construyendo con Gradle

#### Caso básico

Lo único que necesitamos para construir nuestra aplicación con [Gradle,window=_blank](https://www.gradle.org) es: tener [Gradle,window=_blank](https://www.gradle.org)footnote:[Realmente no es necesario tener instalado Gradle, si utilizamos el wrapper, pero esto no lo vamos a tratar hoy, [si queréis más información](https://docs.gradle.org/current/userguide/gradle_wrapper.html).] y el fichero `build.gradle`.

**build.gradle**

```groovy
apply plugin: 'cpp'

model {
  components {
    hello(NativeLibrarySpec) {}
    main(NativeExecutableSpec) {
      binaries.all {
        lib library: "hello"
      }
    }
  }
}
```

Con este fichero tan simple, conseguiremos compilar e instalar nuestra aplicación, en modo Debug para la plataforma donde estamos ejecutando [Gradle,window=_blank](https://www.gradle.org), en mi caso es Linux X64.

Si ejecutamos desde la raíz de nuestro proyecto `gradle task`, podremos ver todas las tareas que podemos hacer.

En nuestro caso, solo queremos nuestra aplicación compilada y lista para funcionar, así que ejecutaremos: `gradle installMainExecutable`.

Una vez que ha terminado, podemos ejecutar el programa llamando al script `build/install/mainExecutable/main`footnote:[.bat en Windows y sin extensión en Linux].

**Output**

```bash
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
```

#### Distintos “Sabores”

Con unas pocas líneas más, podemos generar distintas versiones de la misma aplicación, en nuestro ejemplo vamos a generar una versión “Community” y otra “Enterprise”.

**build.gradle**

```groovy
apply plugin: 'cpp'

model {
  flavors {
      community
      enterprise
  }

  components {
    hello(NativeLibrarySpec) {
      binaries.all {
        if (flavor == flavors.enterprise) {
          cppCompiler.define "ENTERPRISE"
        }
      }
    }
    main(NativeExecutableSpec) {
      binaries.all {
        lib library: "hello"
        }
    }
  }
}
```

Además tenemos que preparar nuestra aplicación para utilizar estos parámetros de compilación.

**Msg.h**

```cpp
#ifdef ENTERPRISE
static const char * EDITION = "Enterprise";

#else
static const char * EDITION = "Community";

#endif
```

De esta forma se utiliza una cadena u otra en función del “sabor” con que compilemos.

Si ahora ejecutamos `gradle clean task` en la raíz de nuestro proyecto, veremos que tenemos más tareas disponibles, antes teníamos `installMainExecutable` y ahora ha sido reemplazada por `installCommunityMainExecutable` y `installEnterpriseMainExecutable`.

Si ejecutamos estas dos tareas, tendremos nuestra aplicación instalada en los dos sabores.

```bash
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
```

Ahora podemos ejecutar nuestra aplicación en los dos sabores:

**Community**

```bash
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
```

**Enterprise**

```bash
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
```

#### Release o Debug

Por defecto [Gradle,window=_blank](https://www.gradle.org) compila nuestra aplicación en modo Debug, pero podemos añadir el modo Release para que active algunas optimizacionesfootnote:[También podemos definir el tipo de optimizaciones que vamos a utilizar.].

**build.gradle**

```groovy
apply plugin: 'cpp'
model {
    buildTypes {
        debug
        release
    }

// ... the rest of file below doesn't change
}
```

Si ahora ejecutamos `gradle clean task` veremos que tenemos más tareas, se habrán desdoblado las que teníamos, por ejemplo `installCommunityMainExecutable` se habrá desdoblado en `installDebugCommunityMainExecutable` y `installReleaseCommunityMainExecutable`.

#### Multi-plataforma

También tenemos las posibilidad de utilizar las características de compilación cruzada que nos ofrecen los compiladores y generar componentes nativos para otras plataformas. El proceso es el mismo, simplemente tenemos que dar te alta las plataformas que vamos a soportar.

Esto solo funcionará si en nuestro sistema tenemos instalada la cadena de herramientas ([Toolchain,window=_blank](https://en.wikipedia.org/wiki/Toolchain)) necesaria, es decir, si en un sistema de 64 bits queremos compilar para 32 bits, tendremos que tener instaladas las librerías necesarias para 32 bits.

**build.gradle**

```groovy
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

  components {
    hello(NativeLibrarySpec) {
      binaries.all {
        if (flavor == flavors.enterprise) {
          cppCompiler.define "ENTERPRISE"
        }
      }
    }
    main(NativeExecutableSpec) {
      binaries.all {
        lib library: "hello"
      }
    }
  }
}
```

Ejecutando `gradle clean task` podremos ver las distintas opciones de construción que tenemos, en nuestro caso veremos que podemos construir distintas versiones de nuestra aplicación en distintos sabores, para distintas plataformas en Debug o Release.

### Pruébalo tú mism@

El proyecto se encuentra en https://github.com/carlosvin/cpp_gradle.

Para poder probar necesitas:

* Tener instalado [Java,window=_blank](https://www.java.com) a partir de la versión 6.
* Tener algún compilador instalado (por ejemplo [GCC,window=_blank](https://gcc.gnu.org/))

Solo tienes que seguir los siguientes pasos:

1. `git clone git@github.com:carlosvin/cpp_gradle.git`
2. `cd cpp_gradle`
3. `./gradlew task` o `./gradlew.bat task` si estás en Windows. De esta forma verás todas las tareas que te ofrece [Gradle,window=_blank](https://www.gradle.org) para este proyecto. La primera vez tardará un poco porque se descarga una versión de [Gradle,window=_blank](https://www.gradle.org).
4. Si estás en una máquina de 64 bits, por ejemplo utiliza este comando para compilar e instalar la aplicación `./gradlew installX64ReleaseEnterpriseMainExecutable`.
5. Ejecuta la aplicación que acabas de construir `build/install/mainExecutable/x64ReleaseEnterprise/main`

## Conclusiones

Con una configuración mínima, tenemos muchas posibilidades de construcción de aplicaciones nativas multi-plataforma.

Tiene un futuro prometedor, veremos como termina.

Podemos utilizar otras características de [Gradle,window=_blank](https://www.gradle.org) y aplicarlas a nuestros proyectos C++, como análisis estáticos de código, generación de informes (pruebas, cobertura, calidad, etc.), fácil incorporación a sistemas de integración continua.

[Gradle,window=_blank](https://www.gradle.org) para C++ es una característica que actualmente está en desarrollo, por lo que no hay que olvidar que:

* No debemos utilizar en entornos reales de desarrollo, puede acarrear muchos dolores de cabeza.
* La forma de definir el fichero build.gradle para esta característica puede cambiar.

Todo el ejemplo se encuentra en https://github.com/carlosvin/cpp_gradle. Os recomiendo que lo descarguéis y probéis lo sencillo que resulta.

**📌 NOTE**\
Si encontráis algún problema en el ejemplo, escribir un comentario, abrir un defecto o corregirlo vosotros mismos en https://github.com/carlosvin/cpp_gradle

Más información en [Getting Started Gradle Native](https://docs.gradle.org/current/userguide/native_software.html).
