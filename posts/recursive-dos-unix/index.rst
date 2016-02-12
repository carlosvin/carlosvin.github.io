.. title: Convertir archivos en formato Windows a formato Unix
.. slug: recursive-dos-unix
.. date: 2016/02/12 10:34:00
.. tags: Useful Commands, Unix, Windows
.. description: Convertir archivos en formato Windows a formato Unix
.. type: micro

Si alguna vez has programado desde un entorno Windows para entornos Unix, seguramente habrás tenido este problema: Los archivos que instalas en tu entorno Unix tienen formato Windows.

Hay un forma bastante sencilla de convertir todos los archivos que tienes en un directorio de formato Windows a Unix.

.. code-block:: bash

	find . -type f -print0 | xargs -0 dos2unix

Lo he sacado, como no, de http://stackoverflow.com/questions/11929461/how-can-i-run-dos2unix-on-an-entire-directory
