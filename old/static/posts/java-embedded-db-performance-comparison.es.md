# Bases de Datos Embebidas Java: Comparación de Rendimiento

## Bases de datos embebidas

Se trata de bases de datos que carecen de servidor, están inscrustadas en la propia aplicación y suelen estar almacenadas en ficheros locales. Esto último unido a que suelen tener un modo de funcionamiento en el que mantienen los datos en memoria hace que puedan tener un rendimiento muy alto.

Eso sí, este gran grado acoplamiento a la aplicación, hace que tengan peor rendimiento cuando se comparten entre varias aplicaciones debido a colisiones de acceso.

Otra ventaja es que no tenemos que encargarnos de mantener y gestionar un servidor de bases de datos.

Voy a hacer una comparativa de rendimiento entre 3 bases de datos embebidas [ACID,window=_blank](https://es.wikipedia.org/wiki/ACID) (transaccionales), las [NoSQL,window=_blank](https://es.wikipedia.org/wiki/NoSQL) no entran en esta comparativa que están en otra liga de rendimiento.

Contenidos

### https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/SqliteDB.java[SqliteDB,window=_blank]

Se trata de una librería escrita en [ANSI C,window=_blank](https://es.wikipedia.org/wiki/ANSI_C), de menos de 500KB, multi-plataforma, sin dependencias externas, almacena todo el contenido de la base de datos en un solo fichero.

Es la que da mejor rendimiento en los [Resultados de los tests](#resultados-de-los-tests).

Se puede utilizar desde C y C++, pero también [desde otros lenguajes de programación,window=_blank](https://es.wikipedia.org/wiki/Sqlite#Lenguajes_de_programaci.C3.B3n) (PHP, Python, Java, .NET ...).

En el caso de [Java,window=_blank](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)) podemos gestionar esta base de datos a través de [JDBC,window=_blank](https://es.wikipedia.org/wiki/Java_Database_Connectivity). Podemos obtener la librería de https://bitbucket.org/xerial/sqlite-jdbc.

Veamos un ejemplo de la inserción de una serie de objetos de la clase [Price.java,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/domain/Price.java).

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

### https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/DerbyDB.java[DerbyDB,window=_blank] o https://www.oracle.com/technetwork/es/java/javadb/overview/index.html[JavaDB,window=_blank]

[JavaDB,window=_blank](https://www.oracle.com/technetwork/es/java/javadb/overview/index.html) es una distribución de Oracle de la base de datos de código libre [DerbyDB,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/DerbyDB.java). Soporta el estándar [ANSI/ISO SQL,window=_blank](https://es.wikipedia.org/wiki/SQL) a través de [JDBC,window=_blank](https://es.wikipedia.org/wiki/Java_Database_Connectivity) y [Java EE,window=_blank](https://es.wikipedia.org/wiki/Java_EE). Estas librerías están incluidas en el [JDK,window=_blank](https://es.wikipedia.org/wiki/Java_Development_Kit).

Almacena la base de datos en multiples archivos, lo que puede resultar útil para escalar el almacenamiento.

Solo podemos utilizarlo en [Java,window=_blank](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)), no desde otros lenguajes.

Como veremos más adelante ha sido la más lenta en los [Resultados de los tests](#resultados-de-los-tests).

La implementación de ejemplo de una inserción de una serie de objetos de la clase [Price.java,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/domain/Price.java), es exactamente la misma que la que hemos hecho más arriba en [SqliteDB,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/SqliteDB.java), esto es una de las bondades de [JDBC,window=_blank](https://es.wikipedia.org/wiki/Java_Database_Connectivity), que nos permite obtener una conexión para una base de datos específica, pero a partir de ahí casi siempre nos podemos olvidar de la base de datos con la que trabajamos, siempre y cuando soporte nuestras consultas [SQL,window=_blank](https://es.wikipedia.org/wiki/SQL).

### https://www.objectdb.com/[ObjectDb,window=_blank]

Es una [base de datos orientada a objetos](https://es.wikipedia.org/wiki/Base_de_datos_orientada_a_objetos) que nos permite acceso [JPA,window=_blank](https://es.wikipedia.org/wiki/Java_Persistence_API), un estándar de Java que persigue no perder las ventajas de la orientación a objetos; esto se suele perder cuando nos acercamos a la capa de persistencia.

Resulta realmente sencillo realizar acciones típicas de una base de datos, abstrayéndonos del SQL, por ejemplo veamos cómo quedaría una inserción de un array de objetos de la clase Price con [ObjectDb,window=_blank](https://www.objectdb.com/).

```java
public void insert(Price... prices) throws SQLException {
    em.getTransaction().begin();
    for (Price p : prices) {
        em.persist(p);
    }
    em.getTransaction().commit();
}
```

Si a esta facilidad de uso, le unimos que los [Resultados de los tests](#resultados-de-los-tests) de rendimiento han sido muy buenos (cerca de [SqliteDB,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/SqliteDB.java)), puedo decir que he descubierto una base de datos embebida a tener muy en cuenta en futuros proyectos [Java,window=_blank](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)), eso sí, al igual que con [JavaDB,window=_blank](https://www.oracle.com/technetwork/es/java/javadb/overview/index.html), solo nos sirve si vamos a programar en [Java,window=_blank](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)).

## Los Tests

Simplemente consisten en realizar repetidamente una serie operaciones [CRUD,window=_blank](https://es.wikipedia.org/wiki/CRUD). Para cada base de datos, el test realiza una serie de inserciones, selects, actualizaciones y borrado de objetos de la clase Precio.

He utilizado 100000 instancias de la clase [Price.java,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/domain/Price.java), las mismas para cada tipo de base de datos.

Para esto he creado una interfaz [DB.java,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/DB.java) que compartirán cada una de las implementaciones para cada base de datos.

**DB.java**

```java
public interface DB {

    public void insert(Price... prices) throws SQLException;

    public void createTable();

    public void deleteAll();

    public void update(Price... prices) throws SQLException;

    public Set<Price> selectAll();

}
```

### Las Bases de Datos JDBC

Solo cambian los datos necesarios para obtener el driver y la conexión a la base de datos, por eso toda la lógica está en la clase [JdbcDb,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/JdbcDb.java) de la que heredan [SqliteDB,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/SqliteDB.java) y [DerbyDB,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/DerbyDB.java).

### El código fuente

Podéis descargar el código fuente de https://github.com/carlosvin/java_embedded_databases.

Se trata de un proyecto [Gradle,window=_blank](https://www.gradle.org), por lo que para ejecutar los tests solo tenéis que ejecutar: `grade test`.

[Gradle,window=_blank](https://www.gradle.org) descargará automáticamente las librerías necesarias, compilará y ejecutará los tests.

También podéis ver directamente la ejecución en https://travis-ci.org/carlosvin/java_embedded_databases.

[![image](https://travis-ci.org/carlosvin/java_embedded_databases)(https://travis-ci.org/carlosvin/java_embedded_databases.svg)]

### Resultados de los tests

```bash
db.DbTest > testSqliteDB STANDARD_OUT
    Testing with 100000 elements
    100000 Prices SqliteDB, total time 3455 ms ①
    	Insert:	 1508 ms
    	Select:	 605 ms
    	Update:	 1319 ms
    	Delete:	 23 ms
    ----------------------------------------------
db.DbTest > testObjectDB STANDARD_OUT
    Testing with 100000 elements
    100000 Prices ObjectDB, total time 6467 ms ②
    	Insert:	 2579 ms
    	Select:	 1126 ms
    	Update:	 1698 ms
    	Delete:	 1064 ms
    ----------------------------------------------
db.DbTest > testDerbyDB STANDARD_OUT
    Testing with 100000 elements
    100000 Prices DerbyDB, total time 24808 ms ③
    	Insert:	 11467 ms
    	Select:	 695 ms
    	Update:	 6983 ms
    	Delete:	 5663 ms
```
1. [SqliteDB,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/SqliteDB.java) es el más rápido.
2. [ObjectDb,window=_blank](https://www.objectdb.com/) es dos veces más lento que [SqliteDB,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/SqliteDB.java).
3. [JavaDB,window=_blank](https://www.oracle.com/technetwork/es/java/javadb/overview/index.html) o [DerbyDB,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/DerbyDB.java) es el más lento, unas 8 veces más lento que [SqliteDB,window=_blank](https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/SqliteDB.java)
