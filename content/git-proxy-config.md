---
title: "Git Proxy Configuration"
date: 2012-11-15T12:00:00Z
description: "Quick guide to configure Git to work through HTTP/HTTPS proxies"
keywords: ["Git", "Proxy", "Configuration", "Tips"]
aliases: ["/langs/en/posts/git-proxy-config", "/langs/es/posts/git-proxy-config"]
---

Working with Git through a corporate proxy can be challenging. Here's a quick guide to configure Git proxy settings.

## Configure HTTP Proxy

```bash
git config --global http.proxy http://<username>:<password>@<ip_host>:<port>
```

## Configure HTTPS Proxy

```bash
git config --global https.proxy https://<username>:<password>@<ip_host>:<port>
```

## Disable Proxy

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## Parameters

- `username`: Proxy username
- `password`: Proxy password  
- `ip_host`: Proxy server address
- `port`: Proxy server port

## Verify Configuration

```bash
git config --global --get http.proxy
git config --global --get https.proxy
```

## More secure: Environment Variables

Using environment variables is a more secure method, as entering credentials directly in commands can expose them in your shell history. Instead, set your proxy credentials using environment variables:

```bash
export HTTP_PROXY=http://<username>:<password>@<ip_host>:<port>
export HTTPS_PROXY=https://<username>:<password>@<ip_host>:<port>
```

Note: Setting environment variables in the shell will also save them in the history, so this approach is more secure if you just set the environment variables in a file like `~/.bash_profile` (if you are using [bash shell](https://en.wikipedia.org/wiki/Bash_(Unix_shell))).

For more details, see the [official Git configuration documentation](https://git-scm.com/docs/git-config).
