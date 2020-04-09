---
title: "Bases de Datos Embebidas Java: Comparación de Rendimiento"
lang: es
date: 2014/06/07 18:09:00
tags: Java, database, embedded
description: Comparación de rendimiento en Java entre tres bases de datos embebidas Derby/JavaDB, Sqlite y ObjectDB
type: text
---

Bases de datos embebidas
========================

Se trata de bases de datos que carecen de servidor, están inscrustadas
en la propia aplicación y suelen estar almacenadas en ficheros locales.
Esto último unido a que suelen tener un modo de funcionamiento en el que
mantienen los datos en memoria hace que puedan tener un rendimiento muy
alto.

Eso sí, este gran grado acoplamiento a la aplicación, hace que tengan
peor rendimiento cuando se comparten entre varias aplicaciones debido a
colisiones de acceso.

Otra ventaja es que no tenemos que encargarnos de mantener y gestionar
un servidor de bases de datos.

Voy a hacer una comparativa de rendimiento entre 3 bases de datos
embebidas [ACID](https://es.wikipedia.org/wiki/ACID) (transaccionales),
las [NoSQL](https://es.wikipedia.org/wiki/NoSQL) no entran en esta
comparativa que están en otra liga de rendimiento.

::: {.contents}
Contenidos
:::

[SQLite](#sqlite)
-----------------

Se trata de una librería escrita en [ANSI
C](https://es.wikipedia.org/wiki/ANSI_C), de menos de 500KB,
multi-plataforma, sin dependencias externas, almacena todo el contenido
de la base de datos en un solo fichero.

Es la que da mejor rendimiento en los [Resultados de los
tests](#resultados-de-los-tests).

Se puede utilizar desde C y C++, pero también [desde otros lenguajes de
programación](https://es.wikipedia.org/wiki/Sqlite#Lenguajes_de_programaci.C3.B3n)
(PHP, Python, Java, .NET \...).

En el caso de
[Java](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n))
podemos gestionar esta base de datos a través de
[JDBC](https://es.wikipedia.org/wiki/Java_Database_Connectivity).
Podemos obtener la librería de
<https://bitbucket.org/xerial/sqlite-jdbc>.

Veamos un ejemplo de la inserción de una serie de objetos de la clase
[Price](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/domain/Price.java).

``` {.java}
public class JdbcDb implements DB {

    enum Column {
        INSTRUMENT,
        MARKET,
        PRICE,
        DATE;
    }

    public static final String TABLE_NAME = "PRICES";
    public static final String SQL_INSERT = "INSERT INTO " + TABLE_NAME
            + " (INSTRUMENT, MARKET, PRICE, DATE) VALUES (?,?,?,?)";

    // ...

    private void insert(Price p, PreparedStatement preparedStatement) throws SQLException {
        preparedStatement.setString(1, p.getInstrument());
        preparedStatement.setString(2, p.getMarket());
        preparedStatement.setDouble(3, p.getPrice());
        preparedStatement.setTimestamp(4, new Timestamp(p.getDate().getTime()));
        preparedStatement.addBatch();
    }

    @Override
    public void insert(Price... prices) throws SQLException {
        PreparedStatement preparedStatement = conn.prepareStatement(SQL_INSERT);
        for (Price p : prices) {
            insert(p, preparedStatement);
        }
        preparedStatement.executeBatch();
        preparedStatement.close();
        conn.commit();
    }

    // ...
}
```

[Derby](https://db.apache.org/derby/) o [JavaDB](https://www.oracle.com/technetwork/es/java/javadb/overview/index.html)
-----------------------------------------------------------------------------------------------------------------------

[JavaDB](https://www.oracle.com/technetwork/es/java/javadb/overview/index.html)
es una distribución de Oracle de la base de datos de código libre
[Derby](https://db.apache.org/derby/). Soporta el estándar [ANSI/ISO
SQL](https://es.wikipedia.org/wiki/SQL) a través de
[JDBC](https://es.wikipedia.org/wiki/Java_Database_Connectivity) y [Java
EE](https://es.wikipedia.org/wiki/Java_EE). Estas librerías están
incluidas en el
[JDK](https://es.wikipedia.org/wiki/Java_Development_Kit).

Almacena la base de datos en multiples archivos, lo que puede resultar
útil para escalar el almacenamiento.

Solo podemos utilizarlo en
[Java](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)),
no desde otros lenguajes.

Como veremos más adelante ha sido la más lenta en los [Resultados de los
tests](#resultados-de-los-tests).

La implementación de ejemplo de una inserción de una serie de objetos de
la clase
[Price](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/domain/Price.java),
es exactamente la misma que la que hemos hecho más arriba en
[SQLite](#sqlite), esto es una de las bondades de
[JDBC](https://es.wikipedia.org/wiki/Java_Database_Connectivity), que
nos permite obtener una conexión para una base de datos específica, pero
a partir de ahí casi siempre nos podemos olvidar de la base de datos con
la que trabajamos, siempre y cuando soporte nuestras consultas
[SQL](https://es.wikipedia.org/wiki/SQL).

[ObjectDB](#objectdb)
---------------------

Es una [base de datos orientada a
objetos](https://es.wikipedia.org/wiki/Base_de_datos_orientada_a_objetos)
que nos permite acceso
[JPA](https://es.wikipedia.org/wiki/Java_Persistence_API), un estándar
de Java que persigue no perder las ventajas de la orientación a objetos;
esto se suele perder cuando nos acercamos a la capa de persistencia.

Resulta realmente sencillo realizar acciones típicas de una base de
datos, abstrayéndonos del SQL, por ejemplo veamos cómo quedaría una
inserción de un array de objetos de la clase Price con
[ObjectDB](#objectdb).

``` {.java}
public void insert(Price... prices) throws SQLException {
    em.getTransaction().begin();
    for (Price p : prices) {
        em.persist(p);
    }
    em.getTransaction().commit();
}
```

Si a esta facilidad de uso, le unimos que los [Resultados de los
tests](#resultados-de-los-tests) de rendimiento han sido muy buenos
(cerca de [SQLite](#sqlite)), puedo decir que he descubierto una base de
datos embebida a tener muy en cuenta en futuros proyectos
[Java](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)),
eso sí, al igual que con
[JavaDB](https://www.oracle.com/technetwork/es/java/javadb/overview/index.html),
solo nos sirve si vamos a programar en
[Java](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)).

Los Tests
=========

Simplemente consisten en realizar repetidamente una serie operaciones
[CRUD](https://es.wikipedia.org/wiki/CRUD). Para cada base de datos, el
test realiza una serie de inserciones, selects, actualizaciones y
borrado de objetos de la clase Precio.

He utilizado 100000 instancias de la clase
[Price](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/domain/Price.java),
las mismas para cada tipo de base de datos.

Para esto he creado una interfaz
[DB](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/DB.java)
que compartirán cada una de las implementaciones para cada base de
datos.

Interfaz DB
-----------

> ``` {.java}
> public interface DB {
>
>     public void insert(Price... prices) throws SQLException;
>
>     public void createTable();
>
>     public void deleteAll();
>
>     public void update(Price... prices) throws SQLException;
>
>     public Set<Price> selectAll();
>
> }
> ```

Las Bases de Datos JDBC
-----------------------

Solo cambian los datos necesarios para obtener el driver y la conexión a
la base de datos, por eso toda la lógica está en la clase
[JdbcDb](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/JdbcDb.java)
de la que heredan
[SqliteDb](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/SqliteDB.java)
y
[DerbyDB](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/DerbyDB.java).

El código fuente
----------------

Podéis descargar el código fuente de
<https://github.com/carlosvin/java_embedded_databases>.

Se trata de un proyecto [Gradle](https://www.gradle.org) por lo que para
ejecutar los tests solo tenéis que escribir (y tener instalado
[Gradle](https://www.gradle.org) claro):

> ``` {.bash}
> grade test
> ```

[Gradle](https://www.gradle.org) se descargará automáticamente las
librerías necesarias, compilará y ejecutará los tests.

También podéis ver directamente la ejecución en
<https://travis-ci.org/carlosvin/java_embedded_databases>.

[![image](https://travis-ci.org/carlosvin/java_embedded_databases.svg)](https://travis-ci.org/carlosvin/java_embedded_databases)

Resultados de los tests
-----------------------

A continuación podéis ver un con los resultados de los tests.

![[Abrir el gráfico
interactivo](https://docs.google.com/spreadsheets/d/1v9sSGGXzi_YTSx-7zfOYrjwFiqaNGt-rz8e6PY7ZVDE/gviz/chartiframe?oid=1952366256)
\| [Abrir
imagen](https://docs.google.com/spreadsheets/d/1v9sSGGXzi_YTSx-7zfOYrjwFiqaNGt-rz8e6PY7ZVDE/embed/oimg?id=1v9sSGGXzi_YTSx-7zfOYrjwFiqaNGt-rz8e6PY7ZVDE&oid=1952366256&zx=vovadjcmpie1)](https://docs.google.com/spreadsheets/d/1v9sSGGXzi_YTSx-7zfOYrjwFiqaNGt-rz8e6PY7ZVDE/embed/oimg?id=1v9sSGGXzi_YTSx-7zfOYrjwFiqaNGt-rz8e6PY7ZVDE&oid=1952366256&zx=vovadjcmpie1){width="80.0%"}
