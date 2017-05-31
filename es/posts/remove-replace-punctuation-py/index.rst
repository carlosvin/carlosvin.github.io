.. title: Eliminar/Reemplazar signos de puntuación en Python
.. slug: remove-replace-punctuation-py
.. date: 2012/10/23 15:00:00
.. update: 2014/03/28 15:00:00
.. tags: Python, Tips and Tricks
.. link: 
.. description: Un pequeño ejemplo de cómo eliminar signos de puntuación de una cadena de caractéres en Python
.. type: text

A continuación muestro una forma de eliminar los signos de puntuación de una cadena de caractéres en Python. Los signos de puntuación son reemplazados por caractéres en blanco.

.. code-block:: python
  
  import re, string
  
  def remove_punctuation ( text ):
      return re.sub('[%s]' % re.escape(string.punctuation), ' ', text)


Ejecutando:

.. code-block:: bash
  
  >>> remove_punctuation ("El perro, de San Roque, no tiene rabo; ni nunca lo ha tenido.")
  'El perro  de San Roque  no tiene rabo  ni nunca lo ha tenido '


Si queremos hacer la función más general, para reemplazar los signos de puntuación por cualquier otra cadena, simplemente hay que hacer la siguiente modificación en la función.

.. code-block:: python
  
  import re, string
  
  def replace_punctuation ( text, replace ):
    return re.sub('[%s]' % re.escape(string.punctuation), replace, text)


Ejecutando el código de arriba:

.. code-block:: bash
  
  >>> replace_punctuation ("El perro, de San Roque, no tiene rabo; ni nunca lo ha tenido.", '[stop]')
  'El perro[stop] de San Roque[stop] no tiene rabo[stop] ni nunca lo ha tenido[stop]'
  
