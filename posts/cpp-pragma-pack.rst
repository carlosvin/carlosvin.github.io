.. title: Mapeo de un struct C++ en Memoria
.. slug: cpp-pragma-pack
.. date: 2012/11/26 12:00:00
.. update: 2014/03/28 17:00:00
.. tags: C++
.. link: 
.. description: Descripción del comportamiento de la directiva pragma pack de C++
.. type: text

Un struct de C++ es un elemento que permite agrupar elementos de tipos distintos con alguna relación entre ellos. Esto permite manipular todos los elementos en bloque mediante una única referencia.

Si alguna vez nos interesa trabajar a un nivel más bajo, nos puede resultar útil entender cómo se mapea una estructura en memoria y cómo controlar este mapeo.

Para comprender esto vamos a trabajar con una estructura de ejemplo.

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

.. image:: /images/c-mem-struct-5b.png

Pero no es tan sencillo, a continuación veremos que no nos podemos olvidar de la alineación de la memoria que hace el compilador en ese sistema y veremos cómo controlarlo para no encontrarnos con tamaños inesperados, ya que esto depende del compilador del sistema.

Por ejemplo, si en mi máquina hago un :code:`sizeof` de la estructura, obtengo un tamaño de 8 bytes. Lo que está sucediendo es que el compilador reserva más memoria al final de la estructura para que cuadre en bloques de 2n bytes. La memoria queda de la siguiente forma:

.. image:: /images/c-mem-struct-8b.png

Continuará...