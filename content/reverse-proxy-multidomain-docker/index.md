---
title: Multi-Domain Docker Containers
date: 2016-11-24
lang: en
description: How to create different Docker containers with different domain names in the same host
toc: true
aliases: ["/langs/en/posts/reverse-proxy-multidomain-docker", "/langs/es/posts/reverse-proxy-multidomain-docker", "/posts/reverse-proxy-multidomain-docker"]
tags: ["docker", "microservices", "reverse-proxy", "nginx"]
---

## Use case

We have several server applications in the same development environment, each application is bundled in a Docker container, e.g: **"Container A"** and **"Container B"**.

With Docker those applications have the same IP address. One way to differentiate and access to an specific application is exposing different ports.

![Containers exposing the same IP address and different ports.](ip.png)

* If we want to call to **"Application A"** we will do: `GET http://10.20.30.40:8080/colors/red`.
* If we want to call to **"Application B"** we will do: `GET http://10.20.30.40:8081/fruits/tomato`.

But that solution is a little bit confusing, does 8080 mean we are accessing to "application A"?

It would be **simpler and easier** to remind something like:

* Calling **"Application A"**: `GET http://a.domain.com/colors/red`.
* Calling **"Application B"**: `GET http://b.domain.com/fruits/tomato`.

![Accessing applications by domain name.](domain.png)

Get that extra semantic value is much simpler than I thought at the beginning and you will see below.

## How to Configure Multi-Domain Reverse Proxy

I said it is easy, because we almost have to do nothing, another container will do it for us, especifically we are going to use [nginx-proxy](https://github.com/jwilder/nginx-proxy), it will automatically generate the required [NGINX](https://www.nginx.com) configurations.

So, we will have 2 applications + 1 proxy, that is 3 containers.

![3 containers, 2 applications and 1 proxy](proxy.png)

> **Note**: You can download the full example at [https://github.com/carlosvin/docker-reverse-proxy-multi-domain](https://github.com/carlosvin/docker-reverse-proxy-multi-domain).

### Example Project Structure

* **docker-compose.yaml**: Main configuration file describing architecture in previous picture.
* **a**: Application A directory.
  * **Dockerfile**: Container A configuration file.
* **b**: Application B directory.
  * **Dockerfile**: Container B configuration file.

[View Project](https://github.com/carlosvin/docker-reverse-proxy-multi-domain)

### Architecture Configuration (docker-compose)

The relationships between containers is the most interesting part in this example.

### docker-reverse-proxy-multi-domain/docker-compose.yaml

```yaml
a:
  build: a                # (4)
  environment:
    VIRTUAL_HOST: a.domain.com    # (1)
  restart: always

b:
  build: b                # (5)
  environment:
    VIRTUAL_HOST:  b.domain.com   # (2)
  restart: always

nginx-proxy:              # (3)
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

### a/Dockerfile

```dockerfile
FROM httpd:2.4                       # (1)
RUN echo "<html><body><h1>A</h1>App A works!</body></html>" > /usr/local/apache2/htdocs/index.html  # (2)
```

1. We import an image with an apache server.
2. It serves a file that prints "Host A" as default page.

The configuration for application B is pretty much the same:

### b/Dockerfile

```dockerfile
FROM httpd:2.4
RUN echo "<html><body><h1>B</h1>App B works!</body></html>" > /usr/local/apache2/htdocs/index.html
```

### Adding domain names to your development environment configuration

In Linux we just have to map the local address to domain names you have chosen, in the example `a.domain.com` and `b.domain.com`.

### /etc/hosts

```bash
127.0.0.1    localhost.localdomain localhost
::1          localhost6.localdomain6 localhost6
127.0.0.1    a.domain.com         # (1)
127.0.0.1    b.domain.com
```

1. We just added last 2 lines.

### Everything ready

Now we just have to test the example:

```bash
docker-compose build
docker-compose up
```

The 3 containers are running now.

So we can open our favorite web browser and go to `a.domain.com`. It will show **App A works!**. If we go to `b.domain.com` then we will see **App B works!**.

![App A works!](a.screenshot.png)

![App B works!](b.screenshot.png)

> **Note**: In most of the Linux distros you will need privileges to run Docker commands (`sudo`).
