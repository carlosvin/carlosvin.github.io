# Java serialization ways: Performance Comparison

Recently I’ve had to serialize/deserialize some data in {Java} binary format. Lately I use {JSON} or {XML} formats.

I remember that to serialize {Java} objects they must implement the {Serializable} interface, but I had also read in Internet other way, implementing the {Externalizable} interface, then, which interface must I implement? It depends on what you want such as everything in the life.

When to use [Serializable](#serializable) or [Externalizable](#externalizable).

## Serializable

* To serialize easily. You have to write less code.
* This way has some restrictions: The object to serialize must implement the default constructor (0 args). It must be responsible to manage the parent class attributes.
* The performance is not as important, we will see more about that in [Performance tests (Serializable vs. Externalizable](#Performance tests (Serializable vs. Externalizable)).

## Externalizable

* You must implement the serialization/deserialization methods, so you have to write more code.
* When you cannot use [Serializable](#serializable).
* When you want to improve the performance, as we’ll see in [Performance tests (Serializable vs. Externalizable](#Performance tests (Serializable vs. Externalizable)).
* If you have to manage the serialization of parent class attributes, then I recommend you use {Externalizable}, because we’ll avoid a weird private methods overriding.

```java
private void writeObject(ObjectOutputStream oos)
private void readObject(ObjectInputStream ois)
```

## Performance tests (Serializable vs. Externalizable)

[Serializable](#serializable): Java, through introspection, guesses the types of class attributes to know how to serialize/deserialize them, but this "magic" is not free, it has a performance penalty.

When we use [Externalizable](#externalizable) interface, we decide how to serialize/deserialize, namely we have to write the code that does it. We’ve lost ease, but also we avoid that {Java} does some tasks, so if we override the methods properly, we’ll get a performance improvement.

To know how big is the performance difference between both interfaces, I’ve written a [tiny example in which we serialize an object with 2 collections with 100000 elements each one,window=_blank](https://github.com/carlosvin/serializations-performance-java). Here you can find the [tests execution results,window=_blank](http://carlosvin.github.io/serializations-performance-java/classes/com.github.carlosvin.contacts.SerializationTest.html). There are 3 different implementations:

### Implementing Serializable

As we mentioned above, {Java} has to guess certain things. During this process it sacrifices some of performance (slowest way), in exchange we get really simple source code, the class to serialize just has to implement the {Serializable} interface.

```java
public class Contacts implements Serializable {
  // ...
}
```

* serializing: 1133 millisecond
* deserializing: 506 millisecond

### Implementing Externalizable (wrong way)

If the class implements {Externalizable}, we must tell to {Java} how it has to serialize/deserialize the class attributes. We just have to be careful, because if we did it bad, then we’ll get the worst of the both worlds: more complex implementation and bad performance, i.e: If we serialize/deserialize complex class attributes (like collections), {Java} will also have to guess many things about the attributes type.

```java
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

* serializing: 737 millisecond
* deserializing: 367 millisecond

### Implementing Externalizable (right way)

If we serialize one by one the collection elements, then we’ll save more time, because {Java} serializes simple types, this way avoids guessing things that we actually know.

```java
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

* serializing: 204 millisecond
* deserializing: 92 millisecond

We’ve gained performance at expense of write more code.

### Results Analysis

We don’t gain performance due to use an interface or the other one.

We gain performance because [Externalizable](#externalizable) interface forces us to implement ourselves the guessing code, so {Java} doesn’t have to do that. 

As we have seen at [Implementing Externalizable (wrong way](#Implementing Externalizable (wrong way)), si no tenemos cuidado, conseguiremos una mejora poco significativa a costa de complicar nuestro código fuente.

* [Test results,window=_blank](http://carlosvin.github.io/serializations-performance-java/classes/com.github.carlosvin.contacts.SerializationTest.html).
* [Code in Github](https://github.com/carlosvin/serializations-performance-java/).
