.. title: Normalizar texto en Python
.. slug: normalize-text-py
.. date: 2012/10/02 18:00:00
.. update: 2014/04/07 19:00:00
.. tags: Python, Tips and Tricks
.. link: 
.. description: Evitar problemas con textos que contienen caractéres no ASCII
.. type: text

En muchos idiomas, como es el caso del español, hay caracteres que no tienen representación ASCII_, como por ejemplo la á (que sí que tiene representación en Unicode_).

Para evitar problemas o por simplificar, se ha dado una equivalencia entre los caracteres Unicode_ y los ASCII_. 
A continuación os pondré un trozo de código en Python_ que hace esta conversión.

.. code-block:: python
  
  # -*- coding: utf-8 -*-
  from unicodedata import normalize
  
  def normalize_text ( text ):
    return normalize('NFKD', text).encode('ASCII', 'ignore')


Ejecutando el ejemplo:

.. code-block:: python
  
  >>> normalize_text ( 'aáaá eéeé iíií oóoó ñnñn AÀAÀ' )
  b'aaaa eeee iiii oooo nnnn AAAA'


.. _ASCII: https://es.wikipedia.org/wiki/ASCII
.. _Unicode: https://es.wikipedia.org/wiki/Unicode
.. _Python: https://www.python.org
