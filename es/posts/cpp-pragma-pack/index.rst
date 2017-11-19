.. title: Alineación de una Estructura C++ en Memoria
.. slug: cpp-pragma-pack
.. date: 2012/11/26 12:00:00
.. update: 2017/09/20 17:00:00
.. tags: C++
.. type: text
.. description: Comprendiendo cómo funciona la directiva C++ pragma pack y cómo afecta a la alineación de la memoria

Un struct de C++ es un elemento que permite agrupar elementos de tipos distintos con alguna relación entre ellos. Esto permite manipular todos los elementos en bloque mediante una única referencia. Podemos considerarlo como una clase con visibilidad publica por defecto para sus atributos y funciones.

Si alguna vez nos interesa trabajar a un nivel más bajo, nos puede resultar útil entender cómo se mapea una estructura en memoria y cómo controlar este mapeo.

.. contents:: Tabla de Contenidos

.. TEASER_END

Estructura de ejemplo
=====================

Esta estructura estará compuesta por dos campos, un entero (4 bytes) y un booleano (un byte). En C++ queda de la siguiente forma:

.. code-block:: c++
	
	struct SampleStruct
	{
	    bool flag;
	    unsigned int timeout;
	};

Si hacemos un :code:`sizeof` de la una instancia de la estructura deberíamos obtener un tamaño de 5 bytes. Y la memoria quedaría de la siguiente forma:

.. figure:: /galleries/c-mem-struct/5b.png
	:width: 30%
	:figwidth: 50%

	Estructura de 5 bytes que realmente ocupa 5 bytes en memoria. 


Pero no es tan sencillo, a continuación veremos que no nos podemos olvidar de la alineación de la memoria que hace el compilador en ese sistema y veremos cómo controlarlo para no encontrarnos con tamaños inesperados, ya que esto depende del compilador del sistema.

Por ejemplo, si en mi máquina hago un :code:`sizeof` de la estructura, obtengo un tamaño de 8 bytes. Lo que está sucediendo es que el compilador reserva más memoria al final de la estructura para que cuadre en bloques de 2n bytes. La memoria queda de la siguiente forma:

.. figure:: /galleries/c-mem-struct/8b.png
	:width: 30%
	:figwidth: 50%
	
	Estructura de 5 bytes que realmente ocupa 8 bytes en memoria. Para ser más precisos, debería haber dibujado la memoria no usada a continuación del atributo flag.

Vamos a ver un fragmento de código que imprime el tamaño de la estructura y el de cada uno de sus atributos y verificar, en este caso 4 + 1 no es 5.

.. code-block:: c++

	#include  <iostream>

	using namespace std;

	struct SampleStruct
	{
	    bool flag;
	    unsigned int timeout;
	};

	static void print (size_t sz, size_t sz_flag, size_t sz_timeout)
	{
	    cout << "\tflag: " << sz_flag << " Bytes" << endl;
	    cout << "\t+" << endl;
	    cout << "\ttimeout: " << sz_timeout << " Bytes" << endl;
	    cout << "\t=" << endl;
	    cout << "\t" << sz_timeout + sz_flag << " Bytes" << endl;
	    cout <<"sizeof struct:  " << sz << " Bytes" << endl;
	}

	int main(int argc, char *argv[])
	{
	    cout << "SampleStruct" << endl;
	    print (sizeof(SampleStruct), sizeof(SampleStruct::flag), sizeof(SampleStruct::timeout));
	    cout << " -- " << endl;

	    return 0;
	}

`Ejecutando el código sin la directiva pragma`_, tenemos que nuestra estructura ocupa 8 bytes en lugar de 5 bytes.

.. code-block:: bash
	
	SampleStruct
	flag: 1 Bytes
	+
	timeout: 4 Bytes
	=
	5 Bytes
	sizeof struct:  8 Bytes
	--

.. tip:: Si queremos conocer el tamaño exacto de las estructuras que vamos a utilizar, tenemos que especificar al compilador la forma de alinear la estructura en memoria, para ello utilizaremos la directiva :code:`#pragma pack(n)`.

La directiva #pragma pack en struct C++
=======================================

Se trata de una directiva del preprocesador que indica al compilador cómo debe realizar la alineación de la memoria. Vamos a ver como se comporta con un ejemplo:

.. code-block:: c++
	
	#include <iostream>
    
	using namespace std;

	static void print (size_t sz, size_t sz_flag, size_t sz_timeout)
	{
	    cout << " flag: " << sz_flag << " Bytes"<< endl;
	    cout << " +" << endl;
	    cout << " timeout: " << sz_timeout << "Bytes" << endl;
	    cout << " =" << endl;
	    cout << " " << sz_timeout + sz_flag << "Bytes" << endl;
	    cout << " sizeof struct:  " << sz << " Bytes" << endl;
	}

	#pragma pack (1)
	struct SampleStructPack1
	{
	    bool flag;
	    unsigned int timeout;
	};
	#pragma pack(0)

	#pragma pack (2)
	struct SampleStructPack2
	{
	    bool flag;
	    unsigned int timeout;
	};
	#pragma pack(0)

	#pragma pack (4)
	struct SampleStructPack4
	{
	    bool flag;
	    unsigned int timeout;
	};
	#pragma pack(0)


	struct SampleStruct
	{
	    bool flag;
	    unsigned int timeout;
	};


	int main(int argc, char *argv[])
	{

	    cout << "SampleStructPack1" << endl;
	    print (sizeof(SampleStructPack1), sizeof(SampleStructPack1::flag), sizeof(SampleStructPack1::timeout));
	    cout << " -- " << endl;

	    cout << "SampleStructPack2" << endl;
	    print (sizeof(SampleStructPack2), sizeof(SampleStructPack2::flag), sizeof(SampleStructPack2::timeout));
	    
	    cout << "SampleStructPack4" << endl;
	    print (sizeof(SampleStructPack4), sizeof(SampleStructPack4::flag), sizeof(SampleStructPack4::timeout));

	    cout << "SampleStruct" << endl;
	    print (sizeof(SampleStruct), sizeof(SampleStruct::flag), sizeof(SampleStruct::timeout));
	    cout << " -- " << endl;
	    
	    return 0;
	}

`Ejecutando el código con las directivas pragma`_, tenemos distintos resultados dependiendo del valor de pragma.

.. code-block:: bash
	
	SampleStructPack1
	 flag: 1 Bytes
	 +
	 timeout: 4Bytes
	 =
	 5Bytes
	 sizeof struct:  5 Bytes
	 --

	SampleStructPack2
	 flag: 1 Bytes
	 +
	 timeout: 4Bytes
	 =
	 5Bytes
	 sizeof struct:  6 Bytes

	SampleStructPack4
	 flag: 1 Bytes
	 +
	 timeout: 4Bytes
	 =
	 5Bytes
	 sizeof struct:  8 Bytes

	SampleStruct
	 flag: 1 Bytes
	 +
	 timeout: 4Bytes
	 =
	 5Bytes
	 sizeof struct:  8 Bytes
	 --

Veamos caso por caso:

SampleStructPack1 :code:`#pragma pack (1)`
	Reserva bloques de memoria de un byte, nuestra estructura se ha ajustado perfectamente; en este caso sí que :code:`4 + 1 = 5`.

SampleStructPack2 :code:`#pragma pack (2)`
	Ahora el mínimo tamaño del bloque de memoria es de 2 bytes. Para el entero, hay un ajuste exacto porque necesita 2 bloques que 2 bytes para alojar sus 4 bytes. 
	Para el caso del booleano, necesita un bloque de 1 byte, pero como mínimo tiene que asignar un bloque de 2 bytes, por eso en total reserva 6 bytes, :code:`4 + 2 = 6`.

SampleStructPack4 :code:`#pragma pack (4)`
	Es el mismo caso que el anterior, aunque  en el caso del booleano, hay un mayor "desperdicio" de memoria. Necesita 1 byte, pero reserva 4 bytes que es tamaño mínimo de bloque de memoria que puede asignar el compilador. 

SampleStruct (alineación por defecto del compilador)
	Como vemos se comporta exactamente igual que :code:`#pragma pack (4)`, podemos deducir que la alineación por defecto del compilador que estamos utilizando es de 4 bytes.

.. important:: ¿Por qué no utilizamos siempre la alineación de memoria más ajustada (:code:`#pragma pack (1)`) para aprovechar mejor la memoria? 
	
	.. warning:: Porque perderemos rendimiento.

Rendimiento
===========

Vamos a hacer una prueba simple de rendimiento, en la que se va a reservar el mismo número de elementos en arrays para cada tipo de estructura. 

Este es el resultado:

.. code-block:: bash

	SampleStructPack1: 500000000000000000 bytes allocated in 94311 nanoseconds
	SampleStructPack2: 600000000000000000 bytes allocated in 1777 nanoseconds
	SampleStructPack4: 800000000000000000 bytes allocated in 1519 nanoseconds

Como vemos cuanto más ajustada es la alineación de memoria, más tiempo se tarda en reservar y liberar. Puedes `ejecutar la prueba de rendimiento en este enlace`_. 

A continuación pego el código de la prueba de rendimiento.

.. code-block:: c++
	
	#include <iostream>
	#include <chrono>

	#pragma pack (1)
	struct SampleStructPack1
	{
	    bool flag;
	    unsigned int timeout;
	};
	#pragma pack(0)

	#pragma pack (2)
	struct SampleStructPack2
	{
	    bool flag;
	    unsigned int timeout;
	};
	#pragma pack(0)

	#pragma pack (4)
	struct SampleStructPack4
	{
	    bool flag;
	    unsigned int timeout;
	};
	#pragma pack(0)


	struct SampleStruct
	{
	    bool flag;
	    unsigned int timeout;
	};

	static const long MAX_ELEMENTS = 100000000000000000;
	using namespace std;
	using namespace std::chrono;

	void allocate1()
	{
	    SampleStructPack1 elements [MAX_ELEMENTS];
	    cout << "SampleStructPack1: " << sizeof(elements) << " bytes allocated";
	}

	void allocate2()
	{
	    SampleStructPack2 elements [MAX_ELEMENTS];
	    cout << "SampleStructPack2: " << sizeof(elements) << " bytes allocated";
	}

	void allocate4()
	{
	    SampleStructPack4 elements [MAX_ELEMENTS];
	    cout << "SampleStructPack4: " << sizeof(elements) << " bytes allocated";
	}

	void chrono1()
	{
	    auto begin = high_resolution_clock::now() ;
	    allocate1();
	    cout << " in " << duration_cast<nanoseconds>(high_resolution_clock::now() - begin).count() << " nanoseconds" << endl;
	}

	void chrono2()
	{
	    auto begin = high_resolution_clock::now() ;
	    allocate2();
	    cout << " in " << duration_cast<nanoseconds>(high_resolution_clock::now() - begin).count() << " nanoseconds" << endl;
	}

	void chrono4()
	{
	    auto begin = high_resolution_clock::now() ;
	    allocate4();
	    cout << " in " << duration_cast<nanoseconds>(high_resolution_clock::now() - begin).count() << " nanoseconds" << endl;
	}


	int main(int argc, char *argv[])
	{
	    chrono1();
	    chrono2();
	    chrono4();
	    
	    return 0;
	}

.. _`Ejecutando el código sin la directiva pragma`: http://coliru.stacked-crooked.com/a/c7deb3df49bebd40
.. _`Ejecutando el código con las directivas pragma`: http://coliru.stacked-crooked.com/a/7c18ee6585e57366
.. _`ejecutar la prueba de rendimiento en este enlace`: http://coliru.stacked-crooked.com/a/954ad542659c7591

