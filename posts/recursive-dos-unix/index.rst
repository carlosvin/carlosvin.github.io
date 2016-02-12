.. title: Eliminar etiquetas HTML
.. slug: recursive-dos-unix
.. date: 2016/02/12 10:34:00
.. tags: Useful Commands, Unix, Windows
.. description: Convertir archivos en formato Windows a formato Unix
.. type: micro

Si estas desarrollando desde un entorno Windows para entornos Unix, alguna vez habras tenido este problema: Los archivos que instalas en tu entorno Unix tienen formato Windows. 

Hay un forma bastante sencilla de convertir todos los archivos en formato Windows en un directorio a formato Unix.

.. code:
  
  find . -type f -print0 | xargs -0 dos2unix
  
