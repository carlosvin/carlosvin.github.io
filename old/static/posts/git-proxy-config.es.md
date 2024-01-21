# Configuración de proxy para Git

A veces resulta tedioso trabajar desde una red con proxy, al menos para mí, pierdo un montón de tiempo configurando software para que se actualice y funcione correctamente.

Esta es una descripción más o menos genérica de como hacer que https://git-scm.com utilice un proxy determinado:

**para http**

```bash
git config --global http.proxy http://<nombre de usuario>:<password>@<direccion_ip>:<puerto>
```

**para https**

```bash
git config --global https.proxy http://<nombre de usuario>:<password>@<direccion_ip>:<puerto>
```

**para deshabilitar el uso del proxy**

```bash
git config --global --unset http.proxy
```

* `nombre de usuario`: nombre de usuario para autenticarse en el servidor de proxy.
* `password`: password para identificarse en el servidor proxy.
* `direccion_ip`: dirección de servidor de proxy.
* `puerto`: en el que está escuchando el servidor proxy.

Más información en [la documentación oficial de Git](https://git-scm.com/book/es/Personalizando-Git-Configuraci%C3%B3n-de-Git).
