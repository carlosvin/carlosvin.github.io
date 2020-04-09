
:---
title: Eliminar etiquetas HTML
:date: 2012/10/02 11:30:00
:tags: Python, Django, HTML
:description: Cómo eliminar etiquetas HTML utilizando Python o más fácil aún, utilizando Django.
:type: text
---
:lang: es

Python_
=======

Función encargada de eliminar las etiquetas HTML:

.. code-block:: python
	
	#main.py

	import re

	def strip_tags(value):
    	return re.sub(r'<[^>]*?>', '', value)

Suponiendo que tenemos el siguiente HTML 

.. code-block:: html

	<!DOCTYPE HTML>
	<html>
		<head>
			<title>Title</title>
		</head>
		<body>
			<p>Paragraph</p>
		</body>
	</html>

Vamos a hacer una prueba pasandolo como parámetro de la función strip_tags:

.. code-block:: python
	
	#main.py

	html_text = """
	 	<!DOCTYPE HTML>
		<html>
			<head>
				<title>Title</title>
			</head>
			<body>
				<p>Paragraph</p>
			</body>
		</html>"""

	print strip_tags(html_text)

Si ejecutamos el script tenemos como resultado: 

.. code-block:: bash

     Title

     Paragraph

Y si con Python_ ha sido fácil, vamos a ver con Django_

Django_
=======

.. code-block:: python

	#main.py

	from django.utils.html import strip_tags

	html_text = """
	 	<!DOCTYPE HTML>
		<html>
			<head>
				<title>Title</title>
			</head>
			<body>
				<p>Paragraph</p>
			</body>
		</html>"""

	print strip_tags( html_text )

Mucho más sencillo, porque la función ya está escrita.

.. _Python: https://www.python.org/
.. _Django: https://www.djangoproject.com/:lang: es