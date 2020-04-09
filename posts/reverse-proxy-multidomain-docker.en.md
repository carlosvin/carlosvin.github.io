---
title: Multi-Domain Docker Containers
date: 2016/11/24 21:00
tags: Docker, Microservices
description: How to create different Docker containers with different domain names in the same host
type: text
previewimage: /docker-multidomain/proxy.png
lang: en
---

::: {.contents}
:::

Use case
========

We have several server applications in the same development environment,
each application is bundled in a Docker container, e.g: \"Container A\"
and \"Container B\".

With Docker those applications have the same IP address. One way to
differentiate and access to an specific application is exposing
different ports.

![Containers exposing the same IP address and different
ports](/docker-multidomain/ip.png)

-   If we want to call to \"Application A\" we will do: GET
    <http://10.20.30.40:8080/colors/red>
-   If we want to call to \"Application B\" we will do: GET
    <http://10.20.30.40:8081/fruits/tomato>

But that solution is a little bit confusing, does 8080 mean we are
accessing to \"application A\"?

It would be simpler and easier to remind something like:

-   Calling \"Application A\": GET <http://a.domain.com/colors/red>
-   Calling \"Application B\": GET <http://b.domain.com/fruits/tomato>

![Accessing applications by domain name](/docker-multidomain/domain.png)

Get that extra semantic value is much simpler than I thought at the
beginning and you will see below.

How to Configure Multi-Domain Reverse Proxy
===========================================

I said it is easy, because we almost have to do nothing, another
container will do it for us, especifically we are going to use
[nginx-proxy](https://github.com/jwilder/nginx-proxy), it will
automatically generate the required [NGINX](https://www.nginx.com)
configurations.

So, we will have 2 applications + 1 proxy, that is 3 containers.

::: {.note}
::: {.title}
Note
:::

You can download the full example at
<https://github.com/carlosvin/docker-reverse-proxy-multi-domain>
:::

![3 containers, 2 applications + 1 proxy](/docker-multidomain/proxy.png)

Example Project Structure
-------------------------

-   docker-compose.yaml (Main configuration file describing architecture
    in previous picture)
-   a (Application A directory)
    -   Dockerfile (Container A configuration file)
-   b (Application B directory)
    -   Dockerfile (Container B configuration file)

[Ver proyecto](/listings/docker-reverse-proxy-multi-domain).

Architecture Configuration (docker-compose)
-------------------------------------------

The relationships between containers is the most interesting part in
this example.

``` {.yaml .numberLines}
```

-   Lines 4 and 10: we configure the domain name for each application.
-   From line 13 there is proxy configuration (copy/paste part).
-   In lines 2 and 8 we tell docker-compose has to build Docker images
    within specified directory. For example, in line 2, we are saying
    that docker-compose has to build a Docker image using ./a/Dockerfile
    file.

Application Image Configuration
-------------------------------

Line 1: We import an image with an apache server.

Line 2: It serves a file that prints \"Host A\" as default page.

The configuration for application B is pretty much the same:

Adding domain names to your development environment configuration
-----------------------------------------------------------------

In Linux we just have to map the local address to domain names you have
chosen, in the example a.domain.com and b.domain.com.

``` {.bash .numberLines}
#/etc/hosts
127.0.0.1     localhost.localdomain localhost
::1             localhost6.localdomain6 localhost6
127.0.0.1   a.domain.com
127.0.0.1   b.domain.com
```

I just added 4 and 5 lines.

Everything ready!
-----------------

Now we just have to test the example:

``` {.bash .numberLines}
docker-compose build
docker-compose up
```

The 3 containers are running now.

So we can open our favourite web browser and go to a.domain.com. It will
show *App A works!*. If we go to b.domain.com then we will see *App B
works!*.

![a.domain.com](/docker-multidomain/a.screenshot.png)

![b.domain.com](/docker-multidomain/b.screenshot.png)

::: {.note}
::: {.title}
Note
:::

In most of Linux distros you will need privileges to run Docker commands
(sudo).
:::

lang: en
