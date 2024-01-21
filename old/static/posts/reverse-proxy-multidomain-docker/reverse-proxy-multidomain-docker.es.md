# Contenedores Docker multi-dominio

## Caso de Uso

Tenemos varias aplicaciones servidoras a la vez en un mismo entorno de desarrollo, cada una encapsulada en un contenedor, llamémosles de ahora en adelante **"Contenedor A"** y **"Contenedor B"**.

Utilizando docker estas aplicaciones tienen la misma dirección IP en nuestra máquina, una forma de distinguirlas es cambiando el puerto que exponen.

![ip](/posts/reverse-proxy-multidomain-docker/ip.png)
Aplicaciones exponiendo la misma dirección IP utilizando diferentes puertos para diferenciar las aplicaciones.

* Si queremos llamar a la **"aplicación A"** haremos algo así: `GET http://10.20.30.40:8080/colors/red`.
* Si queremos llamar a la **"aplicación B"** haremos algo así: `GET http://10.20.30.40:8081/fruits/tomato`.

Pero esto es un poco confuso, ¿8080 sigfica que accedemos a las "aplicación A" y 8081 significa "aplicación B"?

Sería mucho más sencillo de recordar algo así:

* Si queremos llamar a la "aplicación A" haremos algo así: `GET http://a.domain.com/colors/red`.
* Si queremos llamar a la "aplicación B" haremos algo así: `GET http://b.domain.com/fruits/tomato`.

![domain](/posts/reverse-proxy-multidomain-docker/domain.png)
Diferenciando aplicaciones por nombre de dominio

Obtener este valor semántico extra es más sencillo de lo que parece.

## Cómo configurar un Proxy Inverso Multi-Dominio

Dije que era fácil porque no vamos a tener que hacer casi nada, ya que otro contenedor hará casi todo el trabajo por nosotros. Vamos a utilizar [nginx-proxy,window=_blank](https://github.com/jwilder/nginx-proxy), que generará automáticamente las configuraciones necesarias para {NGINX}.

Así que al final no tendremos 2 contenedores, sino también tendremos un tercero que hará las veces de proxy.

![domain](/posts/reverse-proxy-multidomain-docker/proxy.png)
Los 2 contenedores y el proxy.

**📌 NOTE**\
Puedes descargar el ejemplo completo desde: https://github.com/carlosvin/docker-reverse-proxy-multi-domain.

### Estructura del proyecto de ejemplo

* **docker-compose.yaml**\
Archivo con la configuración descrita en la imágen previa.
* **a**\
Directorio para la aplicación A.
  * **Dockerfile**\
  Archivo con la configuración del contenedor A.
* **b**\
Directorio para la aplicación B.
  * **Dockerfile**\
  Archivo con la configuración del contenedor B.

[Ver proyecto,window=_blank](https://github.com/carlosvin/docker-reverse-proxy-multi-domain).

### Configuración de la arquitectura (docker-compose)

La parte más importante es la configuración de las relaciones entre los contenedores.

**docker-reverse-proxy-multi-domain/docker-compose.yaml**

```yaml
a:
  build: a ④
  environment:
    VIRTUAL_HOST: a.domain.com ①
  restart: always

b:
  build: b ⑤
  environment:
    VIRTUAL_HOST:  b.domain.com ②
  restart: always

nginx-proxy: ③
  image: jwilder/nginx-proxy
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - /var/run/docker.sock:/tmp/docker.sock:ro

  restart: always
  privileged: true
```
1. Configuramos el nombre de dominio que queremos utilizar para la aplicación a.
2. Lo mismo para la aplicación b.
3. A partir de aquí configuramos el proxy (esta es la parte de copiar y pegar).
4. Indicamos a docker-compose que tiene que construir las imágenes dentro del directorio indicado.
5. Por ejemplo, aquí, estamos indicando que docker-compose tiene que construir la imágen docker utilizando ./b/Dockerfile.

### Configuración de la imágen de la aplicación

A continuación vamos a comentar la configuración de la imágen del contenedor para la aplicación A.

**a/Dockerfile**

```docker
FROM httpd:2.4 ①
RUN echo "<html><body><h1>A</h1>App A works!</body></html>" > /usr/local/apache2/htdocs/index.html ②
```
1. Importamos una imágen con un servidor apache.
2. Servimos un archivo que muestra "Host A" como página por defecto.

La configuración para la aplicación B, es prácticamente la misma:

**b/Dockerfile**

```docker
FROM httpd:2.4
RUN echo "<html><body><h1>B</h1>App B works!</body></html>" > /usr/local/apache2/htdocs/index.html
```

### Añadiendo los nombres de dominio a tu configuración

En Linux simplemente tenemos mapear la dirección local a los nombres de dominio que hayas elegido, en nuestro ejemplo es `a.domain.com` y `b.domain.com`.

**/etc/hosts**

```bash
127.0.0.1     localhost.localdomain localhost
::1             localhost6.localdomain6 localhost6
127.0.0.1   a.domain.com ①
127.0.0.1   b.domain.com
```
1. Simplemente he añadido las líneas 4 y 5.

### ¡Todo listo!

Ya solo nos queda probar el ejemplo.

```bash
docker-compose build
docker-compose up
```

Ya están las tres contenedores arrancados.

Ahora podemos abrir nuestro navegador y escribir a.domain.com y nos mostrará el texto _App A works!_. Si escribimos b.domain.com entonces veremos _App B works!_.

**a.domain.com**

![App A works!](/posts/reverse-proxy-multidomain-docker/a.screenshot.png)

**b.domain.com**

![App B works!](/posts/reverse-proxy-multidomain-docker/b.screenshot.png)

**📌 NOTE**\
En la mayoría de distribuciones Linux necesitarás privilegios para ejecutar los comandos docker (`sudo`).
