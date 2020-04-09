---
title: "Java serialization ways: Performance Comparison"
lang: en
date: 2014/05/13 17:00:00
description: Java serialization ways, performance comparison
type: text
---

Recently I\'ve had to serialize/deserialize some data in
[Java](https://www.java.com/) binary format. Lately I use
[JSON](https://www.json.org/) or
[XML](https://en.wikipedia.org/wiki/XML) formats.

I remember that to serialize [Java](https://www.java.com/) objects they
must implement the
[Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html)
interface, but I had also read in Internet other way, implementing the
[Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html)
interface, then, which interface must I implement? It depends on what
you want such as everything in the life.

::: {.contents}
When to use
[Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html)
or
[Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html)
:::

[Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html)
===================================================================================

-   To serialize easily. You have to write less code.
-   This way has some restrictions: The object to serialize must
    implement the default constructor (0 args). It must be responsible
    to manage the parent class attributes.
-   The performance is not as important, we will see more about that in
    [Performance tests (Serializable vs.
    Externalizable)](#performance-tests-serializable-vs.-externalizable).

[Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html)
=======================================================================================

-   You must implement the serialization/deserialization methods, so you
    have to write more code.
-   When you cannot use
    [Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html).
-   When you want to improve the performance, as we\'ll see in
    [Performance tests (Serializable vs.
    Externalizable)](#performance-tests-serializable-vs.-externalizable)
-   If you have to manage the serialization of parent class attributes,
    then I recommend you use
    [Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html),
    because we\'ll avoid a weird overriding of private methods.

``` {.java}
private void writeObject(ObjectOutputStream oos)
private void readObject(ObjectInputStream ois)
```

Performance tests (Serializable vs. Externalizable)
===================================================

[Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html):
Java, through introspection, guesses the types of class attributes to
know how to serialize/deserialize them, but this \"magic\" is not free,
it has a performance penalty.

When we use
[Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html)
interface, we decide how to serialize/deserialize, namely we have to
write the code that does it. We\'ve lost ease, but also we avoid that
[Java](https://www.java.com/) does some tasks, so if we override the
methods properly, we\'ll get a performance improvement.

To know how much is the performance difference between both interfaces,
I\'ve written a [tiny example in which we serialize an object with 2
collections with 100000 elements each
one](https://carlosvin.github.io/serializations-performance-java/), 3
ways:

Implementing [Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html)
------------------------------------------------------------------------------------------------

As we told above, [Java](https://www.java.com/) has to guessed certain
things, in this process it sacrifices some of performance (slower way),
in exchange for programming simplicity, the class to serialize just has
to implement the
[Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html)
interface.

``` {.java}
public class Contacts implements Serializable {
```

-   serializing: 1133 millisecond
-   deserializing: 506 millisecond

Implementing [Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html) (wrong way)
----------------------------------------------------------------------------------------------------------------

If the class implements
[Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html),
we must tell to [Java](https://www.java.com/) how it has to
serialize/deserialize the class attributes. We must be carefully,
because if we did it bad, then we\'ll get the worst of the both worlds:
more complex implementation and bad performance, i.e: If we
serialize/deserialize complex class attributes (like collections),
[Java](https://www.java.com/) will also have to guess many things about
the attributes type.

``` {.java}
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
```

-   serializing: 737 millisecond
-   deserializing: 367 millisecond

Implementing [Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html) (right way)
----------------------------------------------------------------------------------------------------------------

If we serialize one by one the collection elements, then we\'ll save
more time, because [Java](https://www.java.com/) serializes simple
types, this way avoids guessing things that we actually know.

``` {.java}
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
```

-   serializing: 204 millisecond
-   deserializing: 92 millisecond

We\'ve gained performance at expense of write more code.

Result Analysis
---------------

::: {.caution}
::: {.title}
Caution
:::

We don\'t gain performance due to use an interface or the other one.
:::

::: {.tip}
::: {.title}
Tip
:::

We gain performance because
[Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html)
interface forces us to implement ourselves the guessing code, so
[Java](https://www.java.com/) doesn\'t have to do that.
:::

Although as we have watched in [Implementing Externalizable (right
way)](#implementing-externalizable-right-way), if we wouldn\'t be
careful in implementation, we\'ll get less performance.

Following you can see a
[graph](https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/gviz/chartiframe?oid=2110613848)
with [Tests
results](https://carlosvin.github.io/serializations-performance-java/reports/tests/classes/com.diky.contacts.SerializationTest.html).

![Open interactive
[graph](https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/gviz/chartiframe?oid=2110613848)
\| [Open
image](https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/embed/oimg?id=1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8&oid=2110613848&zx=t87gu6ve3lan)](https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/embed/oimg?id=1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8&oid=2110613848&zx=t87gu6ve3lan){width="80.0%"}

-   [Tests
    results](https://carlosvin.github.io/serializations-performance-java/reports/tests/classes/com.diky.contacts.SerializationTest.html).

-   [Code in
    Github](https://github.com/carlosvin/serializations-performance-java/).

-   [Travis CI build
    status](https://travis-ci.org/carlosvin/serializations-performance-java)

    ![image](https://travis-ci.org/carlosvin/serializations-performance-java.svg?branch=master)
