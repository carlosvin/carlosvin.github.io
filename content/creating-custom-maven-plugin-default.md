---
title: Custom Maven Plugin - Override default build lifecycle
date: 2018-05-12
lang: en
description: How to create a custom Maven plugin which overrides default build lifecycle
toc: true
aliases: ["/langs/en/posts/creating-custom-maven-plugin-default", "/langs/es/posts/creating-custom-maven-plugin-default"]
tags: ["java", "maven", "build-systems", "plugins", "build systems", "maven plugins"]
---

I explained in previous article [Example how to create custom Maven Plugin](/langs/en/posts/creating-custom-maven-plugin) which [overrides site lifecycle](https://maven.apache.org/ref/3.5.3/maven-core/lifecycles.html#site_Lifecycle).

I have created another example to demonstrate how to override [default Maven build lifecycle](https://maven.apache.org/ref/3.5.3/maven-core/lifecycles.html#default_Lifecycle). Default build lifecycle is used to construct your software project, for example, it is executed when you run `mvn install` in a `jar` type project.

You can find source code example at [https://github.com/carlosvin/lifecycle-maven-plugin](https://github.com/carlosvin/lifecycle-maven-plugin).

> **Tip:** I've also created an [archetype](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html) so you can easily play with the example.

## Create an example project

### Generate the project using archetype

```bash
mvn archetype:generate \
  -DarchetypeGroupId=com.github.carlosvin.archetype \
  -DartifactId=lifecycle-maven-plugin-archetype \
  -DarchetypeVersion=0.6
```
