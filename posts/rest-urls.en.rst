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

The API_ should also support updating resources. Like reading resources, to update a resource we have to specify which resource we want to update, so we again need an *identifier*.

Before, we wanted to get information (read) and we used **GET** *verb*. Now the only difference is the verb.

We want to **update** so we use the equivalency HTTP_ verb: **PUT**.

::

  PUT   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f

Actually something else is missing, we have to say what thing of the car we want to change, for example, let's imagine we want to change the engine power and set it to 100CV.

We have to send the new engine power to following URL_  http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f through HTTP_ using **PUT** verb.

HTTP_ protocol allows sending data within PUT message, we have to choose a sending format.

We can use JSON_ or XML_ or whatever, we only have to ensure the sent format is expected in server side.

.. note::

  When we create a REST_ API_ we have to select a sending data format.

JSON_ example::

  { enginePower: 100 }


Delete Resources
----------------

Let's imagine that now we are the car dealer and we don't want to shell the Fiat Bravo Emotion 1.9CV anymore (the cce05bee-386b-11e5-a151-feff819cdc9f).
We'll keep the URL_ that identifies the resource, but we change the verb: we don't want to read (GET), we don't want to update (PUT), we want to **delete (DELETE)**.

::

  DELETE   http://cardealer.com/api/cars/cce05bee-386b-11e5-a151-feff819cdc9f

We don't have to supply any additional info, only de verb (DELETE) and the resource identifier.

Create Recursos
---------------

And the last verb is **create (POST)**. In this case we don't have to identify the resource, because it still doesn't exist.

::

  POST   http://cardealer.com/api/cars/

But we have to send the data to create the resource.

Following with the example, let's create a new car, so we include the necessary data within POST HTTP_ message, it is somthing similar what we did at section `Update resources`_, but we are going to send **all required data**, not only the engine power.

JSON_ example::

  {
  "brand": "Fiat",
  "model": "Bravo"
  "year": 2010
  "doors": 5,
  "enginePower": 120,
  "version": "Emotion",
  "clima": true,
  "ac": false,
  "fuel": "Diesel"
  }

We can delegate on the system to assign a new **identifier**, or simply send it within the message::

  {
  "identifier": "cce05bee-386b-11e5-a151-feff819cdc9f"
  "brand": "Fiat",
  "model": "Bravo"
  "year": 2010
  "doors": 5,
  "enginePower": 120,
  "version": "Emotion",
  "clima": true,
  "ac": false,
  "fuel": "Diesel"
  }


Collections
-----------

All the actions we have already explained were actually applied over a cars collection.

But, what happen if a resource has a nested collection?

Continuing with cars example, a car can use a set of engine oils. So the API_ must allow to update, delete or create elements in the set.

.. note::

  For the example we will assume that *the oil identifier* is the attribute *type*.


Add a element to collection
***************************

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


Video Tutorials
===============

These 2 videos help me to understand REST_ URLs_, I encourage you to watch them full:

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
