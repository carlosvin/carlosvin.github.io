.. title: Distintas formas de serialización en Java: Comparación de rendimiento
.. slug: serialization-java-serializable-externalizable
.. date: 2014/05/13 17:00:00
.. tags: Java
.. link: 
.. description: Comparación de rendimientos entre distintas formas de serialización en Java 
.. type: text


Hace poco, he tenido que serializar/deserializar unos datos en Java_, hacía mucho que no lo hacía en formato binario directamente (ultimamente he utilizado JSON_ o XML_). Recordaba haber serializado objetos implementando el interfaz Serializable_, pero había visto por Internet otra forma implementando el interfaz Externalizable_, ¿cuál interfaz utilizo? Pues depende lo que quieras y necesites, como todo.

.. contents:: Cuándo utilizar Serializable o Externalizable

.. TEASER_END

Serializable_
=======================

- Cuando quieras serializar algo programando poco, es la forma fácil. 
- Pero tiene algunas restricciones: El objeto a serializar debe implementar el constructor por defecto. Debe hacerse responsable de los atributos no accesibles de la clase padre.
- Cuando no te importe mucho el rendimiento, como veremos en la sección `Pruebas de Rendimiento (Serializable vs Externalizable)`_.

Externalizable_
=======================

- Vas a tener que implementar tú mismo los métodos de serialización. 
- Cuando no puedas utilizar Serializable_.
- Cuando quieras obtener un mejor rendimiento, como veremos en la sección `Pruebas de Rendimiento (Serializable vs Externalizable)`_
- Si tienes que encargarte de la serialización de los atributos de la clase padre, te recomiendo utilizar Externalizable_, porque evitamos una sobrescritura extraña de métodos privados.
   
.. code-block:: java

  private void writeObject(ObjectOutputStream oos)
  private void readObject(ObjectInputStream ois)


Pruebas de Rendimiento (Serializable vs Externalizable)
========================================================

El interfaz Serializable_ utilizando la introspección de Java_, adivina los tipos de los atributos de las clases que va a serializar/deserializar, pero esta "magia" tiene una penalización en el rendimiento. 

Al utilizar el interfaz Externalizable_ somos nosotros los que decidimos como serializar/deserializar los objetos, es decir, tenemos que escribir nosotros el código que hace esto. Hemos perdido comodidad, pero evitamos que Java_ haga algunas tareas y, si sobrescribimos correctamente los métodos del interfaz Externalizable_, conseguiremos una mejora de rendimiento. 

Para saber cuánto es la diferencia de rendimiento, he escrito un `pequeño ejemplo en el que se serializa un objeto con dos colecciones con 100000 emails y 100000 teléfonos`. He contemplado 3 casos:

Utilizando el interfaz Serializable_
-------------------------------------

Como dijimos más arriba, utilizando el interfaz Serializable_ Java_ tiene que adivinar ciertas cosas, en este proceso sacrifica algo de rendimiento (es el que más tarda), a cambio ĺo único que tenemos que hacer es que nuestra clase implemente el interfaz Serializable_.
  
.. code-block:: java
   
   public class Contacts implements Serializable {

- 1133 milisegundos en serializar
- 506  milisegundos en deserializar
  

Utilizando el interfaz Externalizable_ (mal)
---------------------------------------------

En este caso somos nosotros los encargados de "decir" a Java_ cómo debe serializar/deserializar, pero debemos ser cuidadosos, de lo contrario podemos quedarnos con lo peor de los dos mundos, por ejemplo: Si simplemente serializamos/deserializamos los atributos de la clase, y estos son atributos complejos (como colecciones), Java_ también tiene que adivinar bastantes cosas y también sacrificamos algo de rendimiento y además hemos tenido que escribir más código. 

.. code-block:: java

  @Override
  public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
    setEmails((Set<String>) in.readObject());
    setPhones((Set<String>) in.readObject());
  }

  @Override
  public void writeExternal(ObjectOutput out) throws IOException {
    out.writeObject(emails);
    out.writeObject(phones);
  }

  
- 737 milisegundos en serializar
- 367 milisegundos en deserializar
      
Utilizando el interfaz Externalizable_ (bien)
----------------------------------------------

Si serializamos/deserializamos uno por uno los elementos de las colecciones, ahorramos aún más tiempo, porque Java_ está serializando tipos más simples (en este caso java.lang.String).

.. code-block:: java

  @Override
  public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
    emails.clear();
    phones.clear();
    int nEmails = in.readInt();
    for (int i = 0; i < nEmails; i++) {
      emails.add(in.readUTF());
    }
    int nPhones = in.readInt();
    for (int i = 0; i < nPhones; i++) {
      phones.add(in.readUTF());
    }
  }

  @Override
  public void writeExternal(ObjectOutput out) throws IOException {
    out.writeInt(emails.size());
    for (String e : emails) {
      out.writeUTF(e);
    }
    out.writeInt(phones.size());
    for (String p : phones) {
      out.writeUTF(p);
    }
  }

- 204 milisegundos en serializar
- 92  milisegundos en deserializar
      
Hemos ganado rendimiento a costa de escribir un poco más de código. 


Analizando los resultados
--------------------------

.. caution::
   Por el hecho de utilizar un interfaz u otro, no ganamos rendimiento. 

.. tip::
   Ganamos rendimiento porque el interfaz Externalizable_ nos "obliga" a implementar parte de la serialización y quitamos esta carga a Java_. 

Aunque como hemos visto en `Utilizando el interfaz Externalizable (bien)`_, si no tenemos cuidado, conseguiremos una mejora muy pequeña. 

A continuación podéis ver un `gráfico`_ con los resultados de los tests.

.. figure:: https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/embed/oimg?id=1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8&oid=2110613848&zx=t87gu6ve3lan
   :alt: Gráfico con los resultados
   :width: 80%

   Abrir el `gráfico`_ interactivo | `Abrir imágen`_


A continuación os dejo los enlaces a:

- `Resultados de los tests`_.
- `Código en github`_.
- Estado de la `Construcción en travis`_
  
  .. image:: https://travis-ci.org/carlosvin/serializations-performance-java.svg?branch=master


.. _`Código en github`: https://github.com/carlosvin/serializations-performance-java/
.. _`Resultados de los tests`: http://carlosvin.github.io/serializations-performance-java/reports/tests/classes/com.diky.contacts.SerializationTest.html
.. _`pequeño ejemplo en el que se serializa un objeto con dos colecciones con 100000 emails y 100000 teléfonos`: http://carlosvin.github.io/serializations-performance-java/
.. _Java: http://www.java.com/
.. _JSON: http://www.json.org/
.. _XML: http://en.wikipedia.org/wiki/XML
.. _Serializable: http://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html
.. _Externalizable: http://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html
.. _`gráfico`: https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/gviz/chartiframe?oid=2110613848
.. _`Abrir imágen`: https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/embed/oimg?id=1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8&oid=2110613848&zx=t87gu6ve3lan
.. _`Construcción en travis`:  https://travis-ci.org/carlosvin/serializations-performance-java
