---
title: "Distintas formas de serialización en Java: Comparación de rendimiento"
lang: es
date: 2014/05/13 17:00:00
tags: Java
description: Comparación de rendimientos entre distintas formas de serialización en Java
type: text
---

Hace poco, he tenido que serializar/deserializar unos datos en
[Java](https://www.java.com/), hacía mucho que no lo hacía en formato
binario directamente (ultimamente he utilizado
[JSON](https://www.json.org/) o
[XML](https://en.wikipedia.org/wiki/XML)). Recordaba haber serializado
objetos implementando el interfaz
[Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html),
pero había visto por Internet otra forma implementando el interfaz
[Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html),
¿cuál interfaz utilizo? Pues depende lo que quieras y necesites, como
todo.

::: {.contents}
Cuándo utilizar Serializable o Externalizable
:::

[Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html)
===================================================================================

-   Cuando quieras serializar algo programando poco, es la forma fácil.
-   Pero tiene algunas restricciones: El objeto a serializar debe
    implementar el constructor por defecto. Debe hacerse responsable de
    los atributos no accesibles de la clase padre.
-   Cuando no te importe mucho el rendimiento, como veremos en la
    sección [Pruebas de Rendimiento (Serializable vs
    Externalizable)](#pruebas-de-rendimiento-serializable-vs-externalizable).

[Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html)
=======================================================================================

-   Vas a tener que implementar tú mismo los métodos de serialización.
-   Cuando no puedas utilizar
    [Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html).
-   Cuando quieras obtener un mejor rendimiento, como veremos en la
    sección [Pruebas de Rendimiento (Serializable vs
    Externalizable)](#pruebas-de-rendimiento-serializable-vs-externalizable)
-   Si tienes que encargarte de la serialización de los atributos de la
    clase padre, te recomiendo utilizar
    [Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html),
    porque evitamos una sobrescritura extraña de métodos privados.

``` {.java}
private void writeObject(ObjectOutputStream oos)
private void readObject(ObjectInputStream ois)
```

Pruebas de Rendimiento (Serializable vs Externalizable)
=======================================================

El interfaz
[Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html)
utilizando la introspección de [Java](https://www.java.com/), adivina
los tipos de los atributos de las clases que va a
serializar/deserializar, pero esta \"magia\" tiene una penalización en
el rendimiento.

Al utilizar el interfaz
[Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html)
somos nosotros los que decidimos como serializar/deserializar los
objetos, es decir, tenemos que escribir nosotros el código que hace
esto. Hemos perdido comodidad, pero evitamos que
[Java](https://www.java.com/) haga algunas tareas y, si sobrescribimos
correctamente los métodos del interfaz
[Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html),
conseguiremos una mejora de rendimiento.

Para saber cuánto es la diferencia de rendimiento, he escrito un
[pequeño ejemplo en el que se serializa un objeto con dos colecciones
con 100000 emails y 100000 teléfonos]{.title-ref}. He contemplado 3
casos:

Utilizando el interfaz [Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html)
----------------------------------------------------------------------------------------------------------

Como dijimos más arriba, utilizando el interfaz
[Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html)
[Java](https://www.java.com/) tiene que adivinar ciertas cosas, en este
proceso sacrifica algo de rendimiento (es el que más tarda), a cambio ĺo
único que tenemos que hacer es que nuestra clase implemente el interfaz
[Serializable](https://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html).

``` {.java}
public class Contacts implements Serializable {
```

-   1133 milisegundos en serializar
-   506 milisegundos en deserializar

Utilizando el interfaz [Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html) (mal)
--------------------------------------------------------------------------------------------------------------------

En este caso somos nosotros los encargados de \"decir\" a
[Java](https://www.java.com/) cómo debe serializar/deserializar, pero
debemos ser cuidadosos, de lo contrario podemos quedarnos con lo peor de
los dos mundos, por ejemplo: Si simplemente serializamos/deserializamos
los atributos de la clase, y estos son atributos complejos (como
colecciones), [Java](https://www.java.com/) también tiene que adivinar
bastantes cosas y también sacrificamos algo de rendimiento y además
hemos tenido que escribir más código.

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

-   737 milisegundos en serializar
-   367 milisegundos en deserializar

Utilizando el interfaz [Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html) (bien)
---------------------------------------------------------------------------------------------------------------------

Si serializamos/deserializamos uno por uno los elementos de las
colecciones, ahorramos aún más tiempo, porque
[Java](https://www.java.com/) está serializando tipos más simples (en
este caso java.lang.String).

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

-   204 milisegundos en serializar
-   92 milisegundos en deserializar

Hemos ganado rendimiento a costa de escribir un poco más de código.

Analizando los resultados
-------------------------

::: {.caution}
::: {.title}
Caution
:::

Por el hecho de utilizar un interfaz u otro, no ganamos rendimiento.
:::

::: {.tip}
::: {.title}
Tip
:::

Ganamos rendimiento porque el interfaz
[Externalizable](https://docs.oracle.com/javase/7/docs/api/java/io/Externalizable.html)
nos \"obliga\" a implementar parte de la serialización y quitamos esta
carga a [Java](https://www.java.com/).
:::

Aunque como hemos visto en [Utilizando el interfaz Externalizable
(bien)](#utilizando-el-interfaz-externalizable-bien), si no tenemos
cuidado, conseguiremos una mejora muy pequeña.

A continuación podéis ver un
[gráfico](https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/gviz/chartiframe?oid=2110613848)
con los resultados de los tests.

![Abrir el
[gráfico](https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/gviz/chartiframe?oid=2110613848)
interactivo \| [Abrir
imagen](https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/embed/oimg?id=1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8&oid=2110613848&zx=t87gu6ve3lan)](https://docs.google.com/spreadsheets/d/1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8/embed/oimg?id=1V9p6shPMpSr7RcaTruXpj_0ZQUpVjMFdeh7AnObaBL8&oid=2110613848&zx=t87gu6ve3lan){width="80.0%"}

A continuación os dejo los enlaces a:

-   [Resultados de los
    tests](https://carlosvin.github.io/serializations-performance-java/reports/tests/classes/com.diky.contacts.SerializationTest.html).

-   [Código en
    github](https://github.com/carlosvin/serializations-performance-java/).

-   Estado de la [Construcción en
    travis](https://travis-ci.org/carlosvin/serializations-performance-java)

    ![image](https://travis-ci.org/carlosvin/serializations-performance-java.svg?branch=master)
