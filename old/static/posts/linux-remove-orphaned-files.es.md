# Eliminar paquetes huérfanos en Linux

Cuando instalamos un paquete en las distribuciones Linux (en las que yo conozco), se instalan otros paquetes (dependencias). Si en el futuro desinstalas ese paquete, esas dependencias pueden quedar instaladas en el sistema, aunque no serán usadas por nadie, simplemente ocuparán espacio en disco. Estas dependencias son llamadas paquetes huérfanos.

Veamos cómo desinstalar paquetes huérfanos.

## https://archlinux.org/[Archlinux,window=_blank]

```bash
pacman -Rsn $(pacman -Qdtq)
```

El funcionamiento es muy sencillo:

* la sentencia `pacman -Qdt` da un listado de todos los paquetes huérfanos
* `pacman -Rsn` elimina los paquetes listados

## https://debian.org/[Debian,window=_blank]

```bash
apt-get remove --purge $(deborphan)
```
