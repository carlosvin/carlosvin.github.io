---
title: "Git proxy configuration"
date: 2012-11-15T12:00:00Z
description: "How to configure git to work through a proxy"
keywords: ["Git", "Proxy", "Tips and Tricks"]
aliases: ["/langs/en/posts/git-proxy-config", "/langs/es/posts/git-proxy-config"]
---

Sometimes working through a proxy is pretty tedious.

We are going to describe how to configure [Git](https://git-scm.com) to work through a proxy.

## HTTP proxy

```bash
git config --global http.proxy http://<username>:<password>@<ip_host>:<port>
```

## HTTPS proxy

```bash
git config --global https.proxy https://<username>:<password>@<ip_host>:<port>
```

## To disable using proxy

```bash
git config --global --unset http.proxy
```

* `username`: The proxy user name.
* `ip_host`: Proxy host address.
* `port`: Proxy listening port.
* `password`: Your proxy password.

More info in [official Git configuration](https://git-scm.com/docs/git-config).
