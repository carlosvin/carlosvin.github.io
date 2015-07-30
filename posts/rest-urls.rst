.. title: Creando REST URLs
.. slug: rest-urls
.. date: 2015/07/26 18:00:00
.. tags: draft, REST, API, Web Services
.. link:
.. description: Crear REST API: URLs
.. type: text

Las primeras veces que me puse a diseñar una API_ REST_ cometí unos cuantos errores, por supuesto.

A continuación os voy a contar alguno de los errores que cometí, lo que he entendido hasta hoy sobre la construcción de URL_s REST_ y pondré un ejemplo.

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
