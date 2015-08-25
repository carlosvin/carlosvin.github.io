.. title: REST URLs
.. slug: rest-urls
.. date: 2015/08/16 14:00:00
.. tags: REST, API, Web Services, draft
.. link:
.. description: Design REST API: URLs
.. type: text

First time I designed a REST_ API_ I made several mistakes, of course. Following I'm going to explain common mistakes and what I've learned about REST_ URL_ with examples.

.. contents:: Index

REST_ Basics
============

- Using URLs_ for get resources.
- Using *verbs* for modify resources.
- The *verbs* are provided by the HTTP_ protocol.
- The *verbs* have a direct equivalency with CRUD_ [#]_.
- To access to an existent resource we need an identifier.

REST_ Verbs
-----------

POST
 **Create** new resources.
GET
 **Read** already existing resources.
PUT
 **Update** already existing resources.
DELETE
 **Delete** already existing resources.

It is clearer in the following table

===========  ============  ===================
REST_ Verb   CRUD_ Action  Resource must exist
-----------  ------------  -------------------
POST         Create        No
GET          Read          Yes
PUT          Update        Yes
DELETE       Delete        Yes
===========  ============  ===================

Accessing to Resources
----------------------

A resource is *what we want to get*. For example, a car.

To be able to get a car, that information is not enough, you can't go to your car dealer and ask for whatever car, you have to specify which one you want:

*Good morning. I'd like to have a Fiat Bravo 1.9 Emotion 120CV*.

In this manner the sheller knows which one is.

"Fiat Bravo 1.9 Emotion 120CV" is the **identifier**.

Transferring the example to REST_ APIs_:

::

  GET   http://cardealer.com/api/cars/fiat-bravo-19-emotion-120cv

Now our API_ can supply the car info.

This is a very simple example, but actually when we access to a specific resource, we have to use something to identify it, a common and recommendable practice is use UUID_.

::

  GET  http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f

But our API_, like a shop, it hasn't to be so strict. We can ask for cars with several features:

*Good morning, I want a Fiat Bravo*.

Then, the dealer kindly will show you all Fiat Bravo he has available. Let's see how API_ says that.

::

  GET  http://cardealer.com/api/cars/?brand=fiat&model=bravo

API_ will return all cars with Fiat brand and Bravo model.

Brand and model are so called **query paremeters**.

As you might already notice, to get resource information, we have always used **GET** *verb*

Update resources
----------------

Nuestra API_ también nos puede permitir modificar un recurso, al igual que para pedir información, para modificar un recurso necesitamos especificar qué recurso queremos modificar, así que necesitamos otra vez un *identificador*.

Antes queríamos información (leer) y utilizábamos nuestro verbo GET, ahora lo único que cambia es el verbo, queremos **modificar** así que utilizamos el verbo equivalente que nos proporciona el protocolo HTTP_: **PUT**.

::

  PUT   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f

Pero nos falta algo, tenemos que decir qué queremos cambiar del coche, por ejemplo, imaginemos que queremos cambiar la cilintrada y poner 100CV.

Tenemos que enviar la nueva cilindrada a esta URL_  http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f por HTTP_ utilizando el verbo **PUT**.

El protocolo HTTP_ nos permite enviar información en un mensaje PUT, así que solo nos falta pensar en el formato en que lo vamos a enviar.

Podemos enviarlo en JSON_ o XML_ o como queramos, solo tenemos que estar seguros de que el formato que enviamos es lo que espera recibir el servidor.

.. note::

  Cuando definimos una API_ REST_ tenemos que definir también el formato en que vamos a enviar los datos.

Ejemplo en JSON_::

  { cilindrada: 100 }


Borrar Recursos
---------------

Continuando con el ejemplo de los cars, imaginemos que ahora somos el concesionario, y que ya no queremos vender más ese Fiat Bravo (concretamente el cce05bee-386b-11e5-a151-feff819cdc9f). Seguiremos manteniendo la URL_ que identifica el recurso, pero cambiamos el verbo, no queremos leer (GET), ni modificar (PUT), queremos **borrar (DELETE)**.

::

  DELETE   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f

En el caso del borrado, no hay que proporcionar ninguna información adicional, con el verbo (DELETE) y el recurso es suficiente.

Crear Recursos
--------------

Y nos queda último verbo, crear (POST). En este caso no hay que identificar el recurso, porque no existe todavía.

::

  POST   http://cardealer.com/api/cars/

Lo que sí que tenemos que enviar son los datos del recurso que vamos a crear.

En nuestro ejemplo, queremos crear un coche, así que ponemos toda la información necesaria para crear un coche dentro de la llamada POST de HTTP_, algo muy parecido como hemos hecho en el apartado `Modificar Recursos`_, pero en este caso mandamos **toda la información necesaria**, no solo la cilindrada.

Ejemplo en JSON_::

  {
  "marca": "Fiat",
  "modelo": "Bravo"
  "anio": 2010
  "puertas": 5,
  "cilindrada": 120,
  "version": "Emotion",
  "climatizador": true,
  "ac": false,
  "fuel": "Diesel"
  }

Podemos delegar en el sistema, para que cuando pidamos la creación de un recurso nuevo, nos asigne un nuevo **identificador**, o simplemente enviarlo con el resto de información::

  {
  "identificador": "cce05bee-386b-11e5-a151-feff819cdc9f"
  "marca": "Fiat",
  "modelo": "Bravo"
  "anio": 2010
  "puertas": 5,
  "cilindrada": 120,
  "version": "Emotion",
  "climatizador": true,
  "ac": false,
  "fuel": "Diesel"
  }


Colecciones
-----------

Algo que no quiero pasar por alto, porque al menos para mí no fue obvio, es el manejo de colecciones. Realmente ya está explicado, porque todas las acciones que hemos visto previamente sobre los cars, estaba aplicando realmente a una colección de cars.

Pero, ¿qué pasa si un recurso tiene a su vez una colección? Siguiendo con los cars, un coche puede tener una lista de aceites con los que puede funcionar, así que nuestra API_ debería permitir obtener, modificar, borrar o crear elementos en la lista.

.. note::

  Para el ejemplo asumiremos que el identificador del aceite es el atributo tipo.


Añadir un elemento a la colección
*********************************

Si queremos añadir un elemento a la colección de cars lo que vamos a hacer es crear un nuevo coche, así que estamos en el caso de `Crear Recursos`_.

Para añadir un nuevo aceite al coche cce05bee-386b-11e5-a151-feff819cdc9f, que ya existe::

  POST   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/

  {
  "tipo": "5W30",
  "otros_datos": "este es el mejor del mundo para este coche"
  }


Si queremos añadir otro aceite::

  POST   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/

  {
  "tipo": "10W30",
  "otros_datos": "otras cosas sobre aceites de coche",
  }

Modificar un elemento de la colección
*************************************

Si queremos modificar los datos del aceite *5W30* del coche *cce05bee-386b-11e5-a151-feff819cdc9f*::

  PUT   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/5W30/

  {
  "tipo": "5W30",
  "otros_datos": "este ya no es el mejor del mundo para este coche"
  }


Borrar un elemento de la colección
**********************************

Para borrar un aceite *10W30* del coche *cce05bee-386b-11e5-a151-feff819cdc9f*::

  DELETE   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/10W30

Leer un elemento de la colección
********************************

Para obtener la información del aceite *10W30* del coche *cce05bee-386b-11e5-a151-feff819cdc9f*::

  GET   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/10W30


Listar elementos de la colección
********************************

Como hemos visto en `Leer un elemento de la colección`_, podemos obtener información de cualquier elemento de la colección, pero también podemos obtener varios elementos de la colección, ordenarlos, paginarlos y aplicar cualquier tipo de acciones típicas de una colección.

Podemos obtener todos los aceites soportados por el coche *cce05bee-386b-11e5-a151-feff819cdc9f*, es tan simple como::

  GET   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/

Pero también podemos proporcionar otras funcionalidades en nuestra API_, como obtener los resultados ordenados::

  GET   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/?ordenar_por=tipo&orden=ascendente

Podemos pedir al API_ que nos devuelva los 10 primeros aceites del coche *cce05bee-386b-11e5-a151-feff819cdc9f*::

  GET   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/?numero_de_elementos=10

Cuando no queremos mostrar toda la lista completa, podemos proporcionar un sistema de paginación::

  GET   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/?pagina=3&numero_de_elementos=3

En la petición de arriba, estamos diciendo que nos devuelva la página 3 de los aceites del coche *cce05bee-386b-11e5-a151-feff819cdc9f* y que nos muestre 3 aceites por página. Si quisiéramos ir a la página siguiente::

  GET   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/?pagina=4&numero_de_elementos=3

Todas estas funcionalidades, son posibles gracias a los **parámetros de consulta**.

Típico error
============

La primera vez que intenté diseñar un API_ REST_ lo que hice fué otra cosa, era una API_, pero no REST_.

Mi principal error fue en la construción de las URLs_, incluí *verbos* sin tener en cuenta que los verbos ya me los proporcionaba el protocolo HTTP_.

Por ejemplo, creaba URLs_ del tipo:

::

	POST	http://example.com/api/cars/seat-ibiza/borrar-rueda/3

Cuando lo correcto sería

::

	DELETE	http://example.com/api/cars/seat-ibiza/ruedas/3


Video Tutoriales
================

Estos tutoriales me fueron de gran ayuda y os recomiendo que los veáis enteros:

.. youtube:: NjpKwiRORI4
.. youtube:: gYKJqUZXuBw


.. _API: https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones
.. _APIs: https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones
.. _REST: https://es.wikipedia.org/wiki/Representational_State_Transfer
.. _URL: https://es.wikipedia.org/wiki/Localizador_de_recursos_uniforme
.. _URLs: https://es.wikipedia.org/wiki/Localizador_de_recursos_uniforme
.. _HTTP: https://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol
.. _CRUD: https://es.wikipedia.org/wiki/CRUD
.. _`REST Tutorial`: http://www.restapitutorial.com/
.. _UUID: https://es.wikipedia.org/wiki/Universally_unique_identifier
.. _JSON: https://es.wikipedia.org/wiki/JSON
.. _XML: https://es.wikipedia.org/wiki/XML

.. [#] Create, Read, Update, Delete
