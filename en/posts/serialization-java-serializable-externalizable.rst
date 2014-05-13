.. title: Comparación de rendimientos entre distintas formas de serialización en Java
.. slug: serialization-java-serializable-externalizable
.. date: 2014/05/14 17:00:00
.. tags: Java
.. link: 
.. description: Comparación de rendimientos entre distintas formas de serialización en Java 
.. type: text


Hace poco, he tenido que serializar/deserializar unos datos en Java_, hacía mucho que no lo hacía en formato binario directamente (ultimamente he utilizado JSON_ o XML_). Recordaba haber serializado objetos implementando el interfaz Serializable_, pero había visto por Internet otra forma implementando el interfaz Externalizable_, ¿cuál interfaz utilizo? Pues depende lo que quieras y necesites, como todo:

Serializable_
=======================

  * Cuando quieras serializar algo programamndo poco, es la forma fácil. 
  * Pero tiene algunas restricciones: El objeto a serializar debe implementar el constructor por defecto. Debe hacerse responsable de los atributos no accesibles de la clase padre.
  * Cuando no te importe mucho el rendimiento, como veremos en la sección `Pruebas de Rendimiento (Serializable vs Externalizable)`_.

Externalizable_
=======================

   * Vas a tener que implementar tú mismo los métodos de serialización. 
   * Cuando no puedas utilizar Serializable_.
   * Cuando quieras obtener un mejor rendimiento, como veremos en la sección `Pruebas de Rendimiento (Serializable vs Externalizable)`_
   * Si tienes que encargarte de la serialización de los atributos de la clase padre, te recomiendo utilizar Externalizable_, porque evitamos una sobrescritura extraña de métodos privados.
   
.. code-block:: java

   private void writeObject(ObjectOutputStream oos)
   private void readObject(ObjectInputStream ois)
   
Pruebas de Rendimiento (Serializable vs Externalizable)
========================================================

El interfaz Serializable_ utilizando la introspección de Java_, adivina los tipos de los atributos de las clases que va a serializar/deserializar, pero esta "magia" tiene una penalización en el rendimiento. 

Al utilizar el interfaz Externalizable_ somos nosotros los que decidimos como serializar/deserializar los objetos, es decir, tenemos que escribir nosotros el código que hace esto. Hemos perdido comodidad, pero evitamos que Java_ haga algunas tareas y, si sobrescribimos correctamente los métodos del interfaz Externalizable_, conseguiremos una mejora de rendimiento. 

Para saber cuánto es la diferencia de rendimiento, he escrito un `pequeño ejemplo en el que se serializa un objeto con dos colecciones con 100000 emails y 100000 teléfonos`. He contemplado 3 casos:

   * Utilizando el interfaz Serializable_.
   * Utilizando el interfaz Externalizable_ (mal).
   * Utilizando el interfaz Externalizable_ (bien).

`Resultados de los test`_.
`Código en github`_.
.. image:: https://travis-ci.org/carlosvin/serializations-performance-java.svg?branch=master
    :target: https://travis-ci.org/carlosvin/serializations-performance-java

.. _`Código en github`: https://github.com/carlosvin/serializations-performance-java/
.. _`Resultados de los tests`: http://carlosvin.github.io/serializations-performance-java/reports/tests/classes/com.diky.contacts.SerializationTest.html
.. _`pequeño ejemplo en el que se serializa un objeto con dos colecciones con 100000 emails y 100000 teléfonos`: http://carlosvin.github.io/serializations-performance-java/
.. _Java: http://www.java.com/
.. _JSON: http://www.json.org/
.. _XML: http://en.wikipedia.org/wiki/XML
.. _Serializable: http://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html
.. _Externalizable: http://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html
