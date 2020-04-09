---
title: "Custom Maven Plugin: Override default build lifecycle"
lang: en
date: 2018/05/12 15:00:00
tags: Maven, Java, Build Systems, Maven Plugins
description: How to create a custom Maven plugin which overrides default build lifecycle
type: micro
---


I explained in previous article [creating custom maven plugin](%7Bfilename%7Dcreating-custom-maven-plugin.en.rst): which [overrides site
    lifecycle](https://maven.apache.org/ref/3.5.3/maven-core/lifecycles.html#site_Lifecycle).

I have created another example to demonstrate how to override [default
Maven build
lifecycle](https://maven.apache.org/ref/3.5.3/maven-core/lifecycles.html#default_Lifecycle).
Default build lifecycle is used to construct your software project, for
example, it is executed when you run `mvn install` in `jar` type
project.

You can find source code example at
<https://github.com/carlosvin/lifecycle-maven-plugin>.

::: {.hint}
::: {.title}
Hint
:::

I\'ve also created an
[archetype](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html)
so you can easily create and play with the example.
:::

Create example project just by running following command:

``` {.bash}
mvn archetype:generate -DarchetypeGroupId=com.github.carlosvin.archetype -DartifactId=lifecycle-maven-plugin-archetype -DarchetypeVersion=0.6
```
