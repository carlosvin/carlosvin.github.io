
:---
title: Configuración de proxy para Git
:lang: es
:date: 2012/11/15 12:00:00
:update: 2014/06/16 20:36:00
:tags: Git, Proxy, Tips and Tricks
:description: Cómo configurar git para que funcione a través de un proxy
:type: text
---

Es muy tedioso trabajar desde una red con proxy, al menos para mí, pierdo un montón de tiempo configurando software para que se actualice y funcione correctamente.

Esta es una descripción más o menos genérica de como hacer que git utilice un proxy determinado:

.. code-block:: bash
  
  #para http
  git config --global http.proxy <protocolo>://<nombre de usuario>:<password>@<direccion_ip>:<puerto>
  
  #para https
  git config --global https.proxy <protocolo>://<nombre de usuario>:<password>@<direccion_ip>:<puerto>
  
  #para deshabilitar el uso del proxy
  git config --global --unset http.proxy

protocolo
	Suele ser http o htpps

nombre de usuario
	nombre de usuario para autenticarse en el servidor de proxy

password
	password para identificarse en el servidor proxy

direccion_ip
	dirección de servidor de proxy

puerto
	en el que está escuchando el servidor proxy


Más información en `la configuración oficial de Git`_. 

.. _`la configuración oficial de Git`: https://git-scm.com/book/es/Personalizando-Git-Configuraci%C3%B3n-de-Git
