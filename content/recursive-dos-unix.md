---
title: Convert files formats - Windows to Unix
date: 2016-02-12
lang: en
description: Convert Windows formatted files to Unix format per directory recursively
toc: true
aliases: ["/langs/en/posts/recursive-dos-unix", "/langs/es/posts/recursive-dos-unix"]
taxonomies:
  tags: ["unix", "linux", "tools", "windows", "useful commands"]
---

If you are developing from a Windows environment to a Unix target environment, most likely you have had this issue: You install source files in Windows format in your Unix environment.

Windows and Unix systems use different line endings: Windows uses carriage return and line feed (`\r\n`), while Unix uses just line feed (`\n`). This difference can cause issues with scripts, code, and configuration files when moving files between systems.

There is a quite simple way to convert all your files from Windows to Unix format:

```bash
find . -type f -print0 | xargs -0 dos2unix
```

I got it, of course, from [this Stack Overflow answer](https://stackoverflow.com/questions/11929461/how-can-i-run-dos2unix-on-an-entire-directory).
