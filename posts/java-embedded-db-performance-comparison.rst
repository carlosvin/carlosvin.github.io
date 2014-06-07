.. title: Bases de Datos Embebidas Java: Performance comparison
.. slug: java-embedded-db-performance-comparison
.. date: 2014/06/07 18:09:00
.. tags: Java, database, embedded
.. description: Comparación de rendimiento en Java entre tres bases de datos embebidas: Derby/JavaDB, Sqlite y ObjectDB 
.. type: text


Bases de datos embebidas
=========================
Se trata de bases de datos que carecen de servidor, están inscrustadas en la propia aplicación y suelen estar almacenadas en ficheros locales. Esto último unido a que suelen tener un modo de funcionamiento en el que mantienen los datos en memoria hace que puedan tener un rendimiento muy alto.

Eso sí, este gran grado acoplamiento a la aplicación, hace que tengan peor rendimiento cuando se comparten entre varias aplicaciones debido a colisiones de acceso. 

Otra gran ventaja es que no tenemos que encargarnos de mantener y gestionar un servidor de bases de datos. 

Yo voy a hacer una comparativa de rendimiento entre 3 bases de datos embebidas ACID_ (transaccionales), las NoSQL_ no entran en esta comparativa que están en otra liga de rendimiento. También tienen modo de funcionamiento con datos en memoria. 


SQLite_
--------
Se trata de una librería escrita en `ANSI C`_, de menos de 500KB, multi-plataforma, sin dependencias externas, almacena todo el contenido de la base de datos en un solo fichero.

Es la que da mejor rendimiento en los `Resultados de los tests`_.

Se puede utilizar desde C y C++, pero también ´desde otros lenguajes de programación (PHP, Python, Java, .NET y otros)`_.

En el caso de Java_ podemos gestionar esta base de datos a través de JDBC_. Podemos obtener la librería de https://bitbucket.org/xerial/sqlite-jdbc. 

Veamos un ejemplo de la inserción de una serie de objetos de la clase Precio.

.. code-block:: java
		
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


Derby_ o JavaDB_
------------------
Java DB es una distribución de Oracle de la base de datos open source Derby_. Soporta el estándar `ANSI/ISO SQL`_  a través de JDBC_ y `Java EE`_. Estas librerías están incluidas en el JDK_. 

Almacena la base de datos en multiples archivos, lo que puede resultar útil para escalar el almacenamiento.

Solo podemos utilizarlo en Java_, no desde otros lenguajes.

Como veremos más adelante ha sido la más lenta en los `Resultados de los tests`_.

La implementación de ejemplo de una inserción de una serie de objetos de la clase precio, es exactamente la misma que la que hemos hecho más arriba en SQLite_, esto es gracias a una de las bondades de JDBC_, que nos permite obtener una conexión para una base de datos específica, pero a partir de ahí casi siempre nos podemos olvidar de la base de datos con la que trabajamos, siempre y cuando soporte nuestras consultas SQL_. 


ObjectDB_
----------
Es una `base de datos orientada a objetos`_ que nos permite acceso JPA_, un estándar de Java que persigue no perder las ventajas de la orientación a objetos que se suele perder cuando nos acercamos a la capa de persistencia. 

Resulta realmente sencillo realizar acciones típicas de una base de datos, abstrayéndonos del SQL, por ejemplo veamos cómo quedaría una inserción de un array de objetos de la clase Price con ObjectDB_.

.. code-block:: java

	public void insert(Price... prices) throws SQLException {
		em.getTransaction().begin();
		for (Price p : prices) {
			em.persist(p);
		}
		em.getTransaction().commit();
	}

Si a esta facilidad de uso, le unimos en los `Resultados de los tests`_ de rendimiento ha obtenido unos resultados muy buenos, cerca de SQLite_, he descubierto una base de datos embebida a tener muy en cuenta en futuros proyectos Java_, eso sí, solo nos sirve si vamos a programar en Java_. 

Los Tests
=========
Simplemente consisten en realizar repetidamente una serie operaciones CRUD_. Para cada base de datos el test realiza una seria de inserciones, selects, actualizaciones y borrado de objetos de la clase Precio. 

Para esto he creado una interfaz DB que compartirán cada una de las implementaciones para cada base de datos.

Interfaz DB
------------
	
	.. code-block:: java

		public interface DB {

			public void insert(Price... prices) throws SQLException;

			public void createTable();

			public void deleteAll();

			public void update(Price... prices) throws SQLException;

			public Set<Price> selectAll();

		}

Las Bases de Datos JDBC
------------------------

Solo cambian los datos necesarios para obtener el driver y la conexión a la base de datos,  por eso toda la lógica está en la clase JdbcDb_ de la que heredan SqliteDb_ y DerbyDB_. 


El código fuente
-----------------

Podéis descargar el código fuente de https://github.com/carlosvin/java_embedded_databases.

Se trata de un proyecto Gradle_ por lo que para ejecutar los tests solo tenéis que escribir (y tener instalado Gradle_ claro):
	
	.. code-block:: gradle

		grade test

Gradle_ se descargará automáticamente las librerías necesarias, compilará y ejecutará los tests.



Resultados de los tests
------------------------

.. _Gradle: http://www.gradle.org
.. _DerbyDB: https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/DerbyDB.java
.. _SqliteDB: https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/SqliteDB.java
.. _JdbcDb: https://github.com/carlosvin/java_embedded_databases/blob/master/src/main/java/db/JdbcDb.java
.. _JDBC: http://es.wikipedia.org/wiki/Java_Database_Connectivity
.. _JDK: http://es.wikipedia.org/wiki/Java_Development_Kit
.. _ACID: http://es.wikipedia.org/wiki/ACID
.. _NoSQL: http://es.wikipedia.org/wiki/NoSQL
.. _Derby: http://db.apache.org/derby/
.. _`Java EE`: http://es.wikipedia.org/wiki/Java_EE
.. _JavaDB: http://www.oracle.com/technetwork/es/java/javadb/overview/index.html
.. _`ANSI/ISO SQL`: http://es.wikipedia.org/wiki/SQL
.. _`SQL-92`: http://en.wikipedia.org/wiki/SQL-92
.. _`ANSI C`: http://es.wikipedia.org/wiki/ANSI_C
.. _`desde otros lenguajes de programación (PHP, Python, Java, .NET y otros)`: http://es.wikipedia.org/wiki/Sqlite#Lenguajes_de_programaci.C3.B3n
.. _`base de datos orientada a objetos`: http://es.wikipedia.org/wiki/Base_de_datos_orientada_a_objetos
.. _JPA: http://es.wikipedia.org/wiki/Java_Persistence_API
.. _Java: http://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)
.. _SQL: http://es.wikipedia.org/wiki/SQL