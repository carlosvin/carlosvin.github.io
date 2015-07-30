.. title: Creando REST URLs
.. slug: rest-urls
.. date: 2015/07/26 18:00:00
.. tags: draft, REST, API, Web Services
.. link:
.. description: Crear REST API: URLs
.. type: text

Las primeras veces que me puse a diseñar una API_ REST_ cometí unos cuantos errores, por supuesto.

A continuación os voy a contar alguno de los errores que cometí, lo que he entendido hasta hoy sobre la construcción de URL_s REST_ y pondré un ejemplo.

.. contents:: Índice

Fundamentos REST_
=================

- Utilizamos URL_s para acceder a recursos.
- Utilizamos *verbos* para modificar recursos.
- Nuestros *verbos* están proporcionados por el protocolo HTTP_.
- Los *verbos* tienen un equivalente directo con las operaciones CRUD_ [#]_.
- Para acceder a un recuros existente necesitamos su identificador.

Verbos REST_
------------

POST
 (C) Utilizado para **crear** nuevos recursos.
GET
 (R) Utilizado para **leer** un recursos existentes en el sistema.
PUT
 (U) Utilizado para **actualizar** recursos existentes.
DELETE
 (D) Utilizado para **borrar** recursos existentes.

En una tabla quedará más claro

===========  ============  ========================
Verbo REST_  Acción CRUD_  Debe exisitir el recurso
-----------  ------------  ------------------------
POST         Crear         No
GET          Leer          Sí
PUT          Actualizar    Sí
DELETE       Borrar        Sí
===========  ============  ========================


Típico error
============

El principal fue la construción de las URL_s, incluí *verbos* sin tener en cuenta que los verbos ya me los proporcionaba el protocolo HTTP_.

Por ejemplo, creaba URL_s del tipo:

.. code::

	POST	http://example.com/api/coches/seat-ibiza/removeRueda/3

Cuando lo correcto sería

.. code::

	DELETE	http://example.com/api/coches/seat-ibiza/ruedas/3


Video Tutoriales
================

.. youtube:: NjpKwiRORI4
.. youtube:: gYKJqUZXuBw


Ejemplo Explicativo
===================

Imaginemos que queremos proporcionar una API_ REST_ para un blog.

Lo primero es identificar cuáles son los recursos a los que vamos a acceder.

En nuestro caso como todos sabemos un blog tiene **posts** o entradas.

También tenemos **tags** o etiquetas que podemos *asociar* a nuestros **posts**.


.. _API: https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones
.. _REST: https://es.wikipedia.org/wiki/Representational_State_Transfer
.. _URL: https://es.wikipedia.org/wiki/Localizador_de_recursos_uniforme
.. _HTTP: https://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol
.. _CRUD: https://es.wikipedia.org/wiki/CRUD
.. _`REST Tutorial`: http://www.restapitutorial.com/

.. [#] Create, Read,Update, Delete


