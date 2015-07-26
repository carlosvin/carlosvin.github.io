.. title: REST
.. slug: rest-urls
.. date: 2014/04/24 17:50:00
.. tags: draft
.. link:
.. description: Un capa que facilita el uso de los mutex de pthread en C++98 y una mejor solución en C++11_
.. type: text

Las primeras veces que me puse a diseñar una API_ REST_ cometí unos cuantos errores, por supuesto.

Típico error
============

El principal fue la construción de las URL_s, incluí *verbos* sin tener en cuenta que los verbos ya me los proporcionaba el protocolo HTTP_.

Por ejemplo, creaba URL_s del tipo:
POST	http://example.com/api/coches/seat-ibiza/removeRueda/3

Cuando lo correcto sería
DELETE	http://example.com/api/coches/seat-ibiza/ruedas/3


Video Tutoriales
================

.. youtube:: NjpKwiRORI4
.. youtube:: gYKJqUZXuBw

.. _API: https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones
.. _REST: https://es.wikipedia.org/wiki/Representational_State_Transfer
.. _URL: https://es.wikipedia.org/wiki/Localizador_de_recursos_uniforme
.. _HTTP: https://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol
