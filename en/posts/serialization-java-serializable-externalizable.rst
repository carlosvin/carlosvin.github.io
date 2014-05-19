.. title: Java serialization ways: Performance Comparison
.. slug: serialization-java-serializable-externalizable
.. date: 2014/05/13 17:00:00
.. description:  Java serialization ways, performance comparison
.. type: text


Recently I've  had to serialize/deserialize some data in Java_ binary format. Lately I use JSON_ or XML_ formats. 

I remember that to serialize Java_ objects they must implement the  Serializable_ interface, but I had also read in Internet other way, implementing the Externalizable_ interface, then, which interface must I implement? It depends on what you want such as everything in the life.

.. contents:: When to use Serializable_ or Externalizable_


Serializable_
=======================

- To serialize easily. You have to write less code.
- This way has some restrictions: The object to serialize must implement the default constructor (0 args). It must be responsible to manage the parent class attributes.
- The performance is not as important, we will see more about that in `Preformance tests (Serializable vs Externalizable)`_.

Externalizable_
=======================

- You must implement the serialization/deserialization methods, so you have to write more code. 
- When you cannot use Serializable_.
- When you want to improve (tunning) the performance, as we'll see in `Preformance tests (Serializable vs Externalizable)`_
- If you have to manage the serialization of parent class attributes, then I recommend you use Externalizable_, because we'll avoid a weird overriding of private methods.
   
.. code-block:: java

  private void writeObject(ObjectOutputStream oos)
  private void readObject(ObjectInputStream ois)


Preformance tests (Serializable vs Externalizable)
========================================================

Serializable_: Java through introspection, it guess the types of class attributes to know how to serialize/deserialize them, but this "magic" is not free, it has a performance penalty.

When we use Externalizable_ interface, we decide how to serialize/deserialize, namely we have to write the code that does it. We've lost ease, but also we avoid that Java_ does some tasks, so if we override the methods properly, we'll get a performance improvement.

To know how much is the performance difference between both interfaces, I've written a `tiny example in which we serialize an object with 2 collections with 100000 elements each one`_, 3 cases:

TODO: Translation pending->

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
.. _`tiny example in which we serialize an object with 2 collections with 100000 elements each one`: http://carlosvin.github.io/serializations-performance-java/
.. _Java: http://www.java.com/
.. _JSON: http://www.json.org/
.. _XML: http://en.wikipedia.org/wiki/XML
.. _Serializable: http://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html
.. _Externalizable: http://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html
.. _`gráfico`: https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/gviz/chartiframe?oid=2110613848
.. _`Abrir imágen`: https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/embed/oimg?id=1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8&oid=2110613848&zx=t87gu6ve3lan
.. _`Construcción en travis`:  https://travis-ci.org/carlosvin/serializations-performance-java
