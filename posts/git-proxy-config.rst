.. title: Configuración de proxy para Git
.. slug: git-proxy-config
.. date: 2012/11/15 12:00:00
.. update: 2014/03/28 16:00:00
.. tags: Git, Proxy, Tips and Tricks
.. link: 
.. description: Cómo configurar git para que funcione a través de un proxy
.. type: text

Es muy tedioso trabajar desde una red con proxy, al menos para mí, pierdo un montón de tiempo configurando software para que se actualice y funcione correctamente.

Vamos a ver cómo configurar git para que utilice un proxy determinado.

Esta es una descripción más o menos genérica de como hacer que git utilice un proxy determinado:

.. code-block: bash
  
  #para http
  git config --global http.proxy <[protocolo]_>://<nombre de usuario>:<password>@<direccion_ip>:<puerto>
  
  #para https
  git config --global https.proxy <[protocolo]_>://<nombre de usuario>:<password>@<direccion_ip>:<puerto>
  
  #para deshabilitar el uso del proxy
  git config --global --unset http.proxy
  

[protocolo] Suele ser http o https
  
