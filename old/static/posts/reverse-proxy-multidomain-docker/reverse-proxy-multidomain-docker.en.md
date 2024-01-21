# Multi-Domain Docker Containers

## Use case

We have several server applications in the same development environment, each application is bundled in a Docker container, e.g: **"Container A"** and **"Container B"**.

With Docker those applications have the same IP address. One way to differentiate and access to an specific application is exposing different ports.

![ip](/posts/reverse-proxy-multidomain-docker/ip.png)
Containers exposing the same IP address and different ports.

* If we want to call to **"Application A"** we will do: `GET http://10.20.30.40:8080/colors/red`.
* If we want to call to **"Application B"** we will do: `GET http://10.20.30.40:8081/fruits/tomato`.

But that solution is a little bit confusing, does 8080 mean we are accessing to "application A"?

It would be **simpler and easier** to remind something like:

* Calling **"Application A"**: `GET http://a.domain.com/colors/red`.
* Calling **"Application B"**: `GET http://b.domain.com/fruits/tomato`.

![domain](/posts/reverse-proxy-multidomain-docker/domain.png)
Accessing applications by domain name.

Get that extra semantic value is much simpler than I thought at the beginning and you will see below.

## How to Configure Multi-Domain Reverse Proxy

I said it is easy, because we almost have to do nothing, another container will do it for us, especifically we are going to use [nginx-proxy,window=_blank](https://github.com/jwilder/nginx-proxy), it will automatically generate the required {NGINX} configurations.

So, we will have 2 applications + 1 proxy, that is 3 containers.

![domain](/posts/reverse-proxy-multidomain-docker/proxy.png)
3 containers, 2 applications and 1 proxy

**📌 NOTE**\
You can download the full example at https://github.com/carlosvin/docker-reverse-proxy-multi-domain.

### Example Project Structure

* **docker-compose.yaml**\
Main configuration file describing architecture in previous picture.
* **a**\
Application A directory.
  * **Dockerfile**\
  Container A configuration file.
* **b**\
Application B directory.
  * **Dockerfile**\
  Container B configuration file.

[View Project,window=_blank](https://github.com/carlosvin/docker-reverse-proxy-multi-domain).

### Architecture Configuration (docker-compose)

The relationships between containers is the most interesting part in this example.

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
1. Configure the domain name for app a.
2. Configure the domain name for app b.
3. From this line there is proxy configuration (copy/paste part).
4. We tell docker-compose has to build Docker images within specified directory.
5. For example, we are saying that docker-compose has to build a Docker image using ../b/Dockerfile file.

### Application Image Configuration

**a/Dockerfile**

```docker
FROM httpd:2.4 ①
RUN echo "<html><body><h1>A</h1>App A works!</body></html>" > /usr/local/apache2/htdocs/index.html ②
```
1. We import an image with an apache server.
2. It serves a file that prints "Host A" as default page.

The configuration for application B is pretty much the same:

**b/Dockerfile**

```docker
FROM httpd:2.4
RUN echo "<html><body><h1>B</h1>App B works!</body></html>" > /usr/local/apache2/htdocs/index.html
```

### Adding domain names to your development environment configuration

In Linux we just have to map the local address to domain names you have chosen, in the example `a.domain.com` and `b.domain.com`.

**/etc/hosts**

```bash
127.0.0.1    localhost.localdomain localhost
::1          localhost6.localdomain6 localhost6
127.0.0.1    a.domain.com ①
127.0.0.1    b.domain.com
```
1. We just added last 2 lines.

### Everything ready!

Now we just have to test the example:

```bash
docker-compose build
docker-compose up
```

The 3 containers are running now.

So we can open our favorite web browser and go to `a.domain.com`. It will show **App A works!**. If we go to `b.domain.com` then we will see **App B works!**.

**a.domain.com**

![App A works!](/posts/reverse-proxy-multidomain-docker/a.screenshot.png)

**b.domain.com**

![App B works!](/posts/reverse-proxy-multidomain-docker/b.screenshot.png)

**📌 NOTE**\
In most of the Linux distros you will need privileges to run Docker commands (`sudo`).
