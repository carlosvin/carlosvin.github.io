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


.. image:: https://travis-ci.org/carlosvin/serializations-performance-java.svg?branch=master
    :target: https://travis-ci.org/carlosvin/serializations-performance-java


.. _Java: http://www.java.com/
.. _JSON: http://www.json.org/
.. _XML: http://en.wikipedia.org/wiki/XML
.. _Serializable: http://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html
.. _Externalizable: http://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html
