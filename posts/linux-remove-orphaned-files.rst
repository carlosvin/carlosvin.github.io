.. title: Eliminar paquetes huérfanos en Linux
.. slug: linux-remove-orphaned-files
.. date: 2012/10/02 13:30:02
.. update: 2014/03/28 10:00:00
.. tags: linux, archlinux
.. link: 
.. description: Cómo eliminar los paquetes que se han instalado automáticamente y que ya no se utilizan
.. type: text

Archlinux
=========
Cuando instalamos un paquete en Archlinux :code:`pacman -S nombre_paquete` se nos descargan automáticamente las dependencias de este paquete. Esto resulta muy cómo, pero cuando eliminamos el paquete que instalamos con :code:`pacman -R nombre_paquete`, se nos quedan instaladas las dependencias de éste. Para evitar ésto, podemos desinstalar los paquetes con :code:`pacman -Rscn nombre_paquete`, pero si preferimos desinstalar normalmente solo con la opción -R, después podemos eliminar todos los paquetes huérfanos de la siguiente forma:

.. code-block:: bash
  pacman -Rsn $(pacman -Qdtq)

El funcionamiento es muy sencillo:
* la sentencia :code:`pacman -Qdt` lista todos los paquetes huérfanos 
* :code:`pacman -Rsn` elimina los paquetes listados
