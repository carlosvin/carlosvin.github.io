---
title: Embedded Java Databases - Performance Comparison
date: 2014-06-07
lang: en
keywords: Java, database, embedded
description: Performance comparison in Java between three embedded databases like Derby/JavaDB, Sqlite, and ObjectDB
toc: true
aliases: ["/langs/en/posts/java-embedded-db-performance-comparison", "/langs/es/posts/java-embedded-db-performance-comparison"]
---

## Embedded Databases

These are databases that do not require a server, are embedded within the application itself, and are usually stored in local files. This, combined with the fact that they often have a mode where data is kept in memory, can result in very high performance.

However, this high degree of coupling to the application means they perform worse when shared between multiple applications due to access collisions.

Another advantage is that you don't have to maintain and manage a database server.

I'm going to do a performance comparison between 3 transactional embedded databases (ACID). NoSQL databases are not included in this comparison as they are in a different performance league.

Contents

### SqliteDB

This is a library written in [ANSI C](https://es.wikipedia.org/wiki/ANSI_C), less than 500KB, multi-platform, with no external dependencies, and stores all database content in a single file.

It gives the best performance in the test results below.

It can be used from C and C++, but also [from other programming languages](https://es.wikipedia.org/wiki/Sqlite#Lenguajes_de_programaci.C3.B3n) (PHP, Python, Java, .NET ...).

In the case of Java, we can manage this database through JDBC. The library can be obtained from [here](https://bitbucket.org/xerial/sqlite-jdbc).

Here is an example of inserting a series of objects of the class [Price.java](../java_embedded_databases/blob/master/src/main/java/domain/Price.java):

```java
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

### DerbyDB or JavaDB

JavaDB is an Oracle distribution of the open-source DerbyDB database. It supports the [ANSI/ISO SQL](https://es.wikipedia.org/wiki/SQL) standard via JDBC and [Java EE](https://es.wikipedia.org/wiki/Java_EE). These libraries are included in the JDK.

It stores the database in multiple files, which can be useful for scaling storage.

It can only be used in Java, not from other languages.

As we will see later, it was the slowest in the test results.

The example implementation for inserting a series of objects of the class [Price.java](../java_embedded_databases/blob/master/src/main/java/domain/Price.java) is exactly the same as above for SqliteDB. This is one of the benefits of JDBC, which allows us to obtain a connection for a specific database, but from there we can almost always forget about the specific database as long as it supports our SQL queries.

### ObjectDB

This is an [object-oriented database](https://es.wikipedia.org/wiki/Base_de_datos_orientada_a_objetos) that allows access via [JPA](https://es.wikipedia.org/wiki/Java_Persistence_API), a Java standard that aims to retain the advantages of object orientation, which are often lost when dealing with persistence layers.

It is really easy to perform typical database actions, abstracting away from SQL. For example, here is how you would insert an array of Price objects with ObjectDB:

```java
public void insert(Price... prices) throws SQLException {
    em.getTransaction().begin();
    for (Price p : prices) {
        em.persist(p);
    }
    em.getTransaction().commit();
}
```

If you add this ease of use to the fact that its performance in the test results was very good (close to SqliteDB), I can say that I have discovered an embedded database to consider for future Java projects. However, as with JavaDB, it is only useful if you are programming in Java.

## The Tests

The tests simply consist of repeatedly performing a series of [CRUD](https://es.wikipedia.org/wiki/CRUD) operations. For each database, the test performs a series of inserts, selects, updates, and deletions of objects of the Price class.

I used 100,000 instances of the [Price.java](../java_embedded_databases/blob/master/src/main/java/domain/Price.java) class, the same for each type of database.

For this, I created a [DB.java](../java_embedded_databases/blob/master/src/main/java/db/DB.java) interface that each implementation for each database shares.

```java
public interface DB {
    public void insert(Price... prices) throws SQLException;
    public void createTable();
    public void deleteAll();
    public void update(Price... prices) throws SQLException;
    public Set<Price> selectAll();
}
```

### JDBC Databases

Only the data needed to obtain the driver and the database connection changes, so all the logic is in the [JdbcDb.java](../java_embedded_databases/blob/master/src/main/java/db/JdbcDb.java) class, from which SqliteDB and DerbyDB inherit.

### Source Code

You can download the source code from [here](https://github.com/carlosvin/java_embedded_databases).

It is a Gradle project, so to run the tests you just have to execute: `gradle test`.

Gradle will automatically download the necessary libraries, compile, and run the tests.

You can also see the execution directly at [Travis CI](https://travis-ci.org/carlosvin/java_embedded_databases).

![Build Status](https://travis-ci.org/carlosvin/java_embedded_databases.svg)

### Test Results

```bash
db.DbTest > testSqliteDB STANDARD_OUT
    Testing with 100000 elements
    100000 Prices SqliteDB, total time 3455 ms <1>
     Insert:  1508 ms
     Select:  605 ms
     Update:  1319 ms
     Delete:  23 ms
    ----------------------------------------------
db.DbTest > testObjectDB STANDARD_OUT
    Testing with 100000 elements
    100000 Prices ObjectDB, total time 6467 ms <2>
     Insert:  2579 ms
     Select:  1126 ms
     Update:  1698 ms
     Delete:  1064 ms
    ----------------------------------------------
db.DbTest > testDerbyDB STANDARD_OUT
    Testing with 100000 elements
    100000 Prices DerbyDB, total time 24808 ms <3>
     Insert:  11467 ms
     Select:  695 ms
     Update:  6983 ms
     Delete:  5663 ms
```

<1> SqliteDB is the fastest.
<2> ObjectDB is twice as slow as SqliteDB.
<3> JavaDB or DerbyDB is the slowest, about 8 times slower than SqliteDB.
