.. title: Gestión de dependencias C++: Biicode
.. slug: first-biicode-poco
.. date: 2015/02/25 20:00:00
.. tags: C++, biicode, Poco, depencency management
.. link: 
.. description: Gestión de dependencias en C++ con Biicode. Proyecto de ejemplo que depende de la librería Poco, concretamente de la parte de logging.  
.. type: text

Hace tiempo que estoy interesado la construcción, gestión de dependencias, empaquetado y despliegue de proyectos software. Para Java_, Scala_, Python_, etc. Es bastante sencillo ya que hay herramientas como Maven_, Gradle_, pip_, Sbt_, etc. Pero para C++_, lo más parecido que he encontrado es Maven_ con el plugin Nar_ o Gradle_ con su `plugin cpp`_ (que está en desarrollo).

Hace tiempo que conozco Biicode_, pero no había sacado nunca tiempo para probarlo, hasta hoy. 

El funcionamiento general es muy sencillo.

Necesitamos `instalar biicode en nuestra máquina`_.

Yo he creado un pequeño ejemplo utilizando el sistema de log de la librería Poco_.

He ejecuta este comando para crear mi proyecto, al que he llamado bii_log. Eso sí, lo tengo que crear debajo de mi nombre de usuario en Biicode_, por si posteriormente lo quiero publicar. 

.. code-block:: bash

	bii new carlovin/bii_log --hello=cpp

Se ha creado una estructura de directorios y ficheros con nuestro proyecto. Aunque los únicos ficheros que vamos a tocar son:

.. code-block:: bash
	
	blocks/carlosvin/bii_log/main.cpp
	blocks/carlosvin/bii_log/biicode.conf

En el fichero biicode.conf vamos a configurar nuestras dependencias, en nuestro caso la librería Poco_.

.. code-block:: yaml
	
	# Biicode configuration file

	[requirements]
	    fenix/poco(develop): 0

	[parent]
		carlosvin/bii_log: 0

	[includes]
	    Poco/*.h: fenix/poco/Foundation/include

En la sección [includes], estamos redefiniendo la ruta a nuestros ficheros de cabeceras, porque si no lo hiciéramos tendríamos que hacer algo así:
 
.. code-block:: cpp
	
	#include "fenix/poco/Foundation/include/Logger.h"

Gracias a esta línea, en nuestro código tendremos includes más claros como:

.. code-block:: cpp
	
	#include "Poco/Logger.h"

Así de fácil, ya podemos utilizar la librería Poco_ en nuestro proyecto, por ejemplo:

.. code-block:: cpp
	
	#include "Poco/FileChannel.h"
	#include "Poco/FormattingChannel.h"
	#include "Poco/PatternFormatter.h"
	#include "Poco/Logger.h"
	#include "Poco/AutoPtr.h"

	using Poco::FileChannel;
	using Poco::FormattingChannel;
	using Poco::PatternFormatter;
	using Poco::Logger;
	using Poco::AutoPtr;

	int main(int argc, char** argv) {
		AutoPtr<FileChannel> pChannel(new FileChannel);
		pChannel->setProperty("path", "log/sample.log");
		pChannel->setProperty("rotation", "100 K");
		pChannel->setProperty("archive", "timestamp");

		//AutoPtr<ConsoleChannel> pCons(new ConsoleChannel);
		AutoPtr<PatternFormatter> pPF(new PatternFormatter);
		pPF->setProperty("pattern", "%Y-%m-%d %H:%M:%S %s: %t");
		AutoPtr<FormattingChannel> pFC(new FormattingChannel(pPF, pChannel));
		Logger::root().setChannel(pFC);

		Logger & logger = Logger::get("TestChannel");
		for(int i=0; i<10000; i++){
			poco_information(logger, "This is a info");
			poco_warning(logger, "This is a warning");
		}
		return 0;
	}

Para compilar el proyecto simplemente hay que ejecutar:

.. code-block:: bash
	
	bii cpp:build

Y para publicarlo y que cualquiera pueda utilizarlo, como nosotros hemos utilizado Poco_:

.. code-block:: bash
	
	bii publish

Además de lo sencillo que ha resultado todo, me ha gustado mucho que después de ejecutar "bii cpp:build", mi Eclipse_ con CDT_ indexaba perfectamente el código, así como el autocompletado y la navegación entre clases y métodos. 

.. _Poco: http://pocoproject.org/
.. _Eclipse: https://eclipse.org
.. _CDT: https://eclipse.org/cdt/
.. _pip: https://pypi.python.org/pypi/pip
.. _Maven: http://maven.apache.org/
.. _Gradle: http://www.gradle.org/
.. _Python: http://www.python.org/
.. _Scala: http://www.scala-lang.org/
.. _Sbt: http://www.scala-sbt.org/
.. _`plugin cpp`: https://gradle.org/docs/current/userguide/nativeBinaries.html
.. _`instalar biicode en nuestra máquina`: http://docs.biicode.com/c++/installation.html

