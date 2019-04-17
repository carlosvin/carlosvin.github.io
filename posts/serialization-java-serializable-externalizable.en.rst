.. title: Java serialization ways: Performance Comparison
.. slug: serialization-java-serializable-externalizable
.. date: 2014/05/13 17:00:00
.. description:  Java serialization ways, performance comparison
.. type: text


Recently I've  had to serialize/deserialize some data in Java_ binary format. Lately I use JSON_ or XML_ formats. 

I remember that to serialize Java_ objects they must implement the  Serializable_ interface, but I had also read in Internet other way, implementing the Externalizable_ interface, then, which interface must I implement? It depends on what you want such as everything in the life.

.. contents:: When to use Serializable_ or Externalizable_

.. TEASER_END

Serializable_
=======================

- To serialize easily. You have to write less code.
- This way has some restrictions: The object to serialize must implement the default constructor (0 args). It must be responsible to manage the parent class attributes.
- The performance is not as important, we will see more about that in `Performance tests (Serializable vs. Externalizable)`_.

Externalizable_
=======================

- You must implement the serialization/deserialization methods, so you have to write more code. 
- When you cannot use Serializable_.
- When you want to improve the performance, as we'll see in `Performance tests (Serializable vs. Externalizable)`_
- If you have to manage the serialization of parent class attributes, then I recommend you use Externalizable_, because we'll avoid a weird overriding of private methods.
   
.. code-block:: java

  private void writeObject(ObjectOutputStream oos)
  private void readObject(ObjectInputStream ois)


Performance tests (Serializable vs. Externalizable)
========================================================

Serializable_: Java, through introspection, guesses the types of class attributes to know how to serialize/deserialize them, but this "magic" is not free, it has a performance penalty.

When we use Externalizable_ interface, we decide how to serialize/deserialize, namely we have to write the code that does it. We've lost ease, but also we avoid that Java_ does some tasks, so if we override the methods properly, we'll get a performance improvement.

To know how much is the performance difference between both interfaces, I've written a `tiny example in which we serialize an object with 2 collections with 100000 elements each one`_, 3 ways:

Implementing Serializable_
-------------------------------------

As we told above, Java_ has to guessed certain things, in this process it sacrifices some of performance (slower way), in exchange for programming simplicity, the class to serialize just has to implement the Serializable_ interface.
  
.. code-block:: java
   
   public class Contacts implements Serializable {

- serializing:   1133 millisecond 
- deserializing: 506  millisecond
  

Implementing Externalizable_ (wrong way)
---------------------------------------------

If the class implements Externalizable_, we must tell to Java_ how it has to serialize/deserialize the class attributes. We must be carefully, because if we did it bad, then we'll get the worst of the both worlds: more complex implementation and bad performance, i.e: If we serialize/deserialize complex class attributes (like collections), Java_ will also have to guess many things about the attributes type.

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


- serializing:   737 millisecond 
- deserializing: 367  millisecond

      
Implementing Externalizable_ (right way)
----------------------------------------------

If we serialize one by one the collection elements, then we'll save more time, because Java_ serializes simple types, this way avoids guessing things that we actually know.


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


- serializing:   204 millisecond 
- deserializing: 92  millisecond

We've gained performance at expense of write more code.


Result Analysis
--------------------------

.. caution::
   We don't gain performance due to use an interface or the other one. 

.. tip::
   We gain performance because Externalizable_ interface forces us to implement ourselves the guessing code, so Java_ doesn't have to do that. 

Although as we have watched in `Implementing Externalizable (right way)`_, if we wouldn't be careful in implementation, we'll get less performance.

Following you can see a graph_ with `Tests results`_.

.. figure:: https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/embed/oimg?id=1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8&oid=2110613848&zx=t87gu6ve3lan
   :alt: Gráfico con los resultados
   :width: 80%

   Open interactive graph_ | `Open image`_


- `Tests results`_.
- `Code in Github`_.
- `Travis CI build status`_
  
  .. image:: https://travis-ci.org/carlosvin/serializations-performance-java.svg?branch=master


.. _`Code in Github`: https://github.com/carlosvin/serializations-performance-java/
.. _`Tests results`: https://carlosvin.github.io/serializations-performance-java/reports/tests/classes/com.diky.contacts.SerializationTest.html
.. _`tiny example in which we serialize an object with 2 collections with 100000 elements each one`: https://carlosvin.github.io/serializations-performance-java/
.. _Java: https://www.java.com/
.. _JSON: https://www.json.org/
.. _XML: https://en.wikipedia.org/wiki/XML
.. _Serializable: https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html
.. _Externalizable: https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html
.. _`graph`: https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/gviz/chartiframe?oid=2110613848
.. _`Open image`: https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/embed/oimg?id=1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8&oid=2110613848&zx=t87gu6ve3lan
.. _`Travis CI build status`:  https://travis-ci.org/carlosvin/serializations-performance-java
