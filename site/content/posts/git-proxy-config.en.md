# Git proxy configuration

Sometimes working through a proxy is pretty tedious.

We are going to describe how to configure https://git-scm.com to work through a proxy.

**http proxy**

```bash
git config --global http.proxy http://<username>:<password>@<ip_host>:<port>
```

**https proxy**

```bash
git config --global https.proxy https://<username>:<password>@<ip_host>:<port>
```

**to disable using proxy**

```bash
git config --global --unset http.proxy
```
* `username`: The proxy user name.
* `ip_host`: Proxy host address.
* `port`: Proxy listening port.
* `password`: Your proxy password.

More info in [official Git configuration](https://git-scm.com/docs/git-config).
