---
title: First post with Nikola

lang: en

date: 2014/03/27 13:30:02

description: My first post with Nikola

type: text
---

I guess that most people come from dynamic content management systems
based on:

-   send data from browser to server
-   process the received data, then it stores the info into a database
    (or files)
-   the server generate dynamically an answer that is sent to the
    browser as HTML
    -   the answer is usually built reading info from a database or
        files.

This process is managed by a software installed on server, this is our
content management system.

Now I\'ve changed the paradigm to \"static web site generator\",
specifically I\'m going to use [Nikola](https://getnikola.com/),
although this time, I\'m not going to install on a remote server.

In a next post I\'ll tell you how I\'ve automated the publication
process using [Github](https://www.github.com)[^1] and
[Travis](https://travis-ci.org/)[^2].

::: {.contents}
Path to [Nikola](https://getnikola.com/)
:::

[PhpNuke](https://www.phpnuke.org/)
===================================

My first content management system, yes it still exists. It based on
PHP+MySQL, multi-lang, user management, user groups, theming, plugins,
etc.

My Own Content Management System
================================

It wasn\'t a full [\[CMS\]](#CMS){.citation}, because actually it was a
blogging system. I can publish posts dynamically, it was made with PHP
and MySQL. It was useful to:

-   Publish posts (with several problems).
-   I realized that a developer needs a designer.
-   I don\'t like the [PHP](https://www.php.net/) syntax.
-   I began to understand the importance of [\[DRY\]](#DRY){.citation}.

[Drupal](https://drupal.org/)
-----------------------------

A full [\[CMS\]](#CMS){.citation}, I liked it until things began to
\"break\" (Maybe I broke some of them). But
[Drupal](https://drupal.org/) has everything you expect from a
[\[CMS\]](#CMS){.citation} and more.

[Wordpress](https://wordpress.org/)
-----------------------------------

I don\'t know if it is better or worse than
[Drupal](https://drupal.org/), there are many discussions on the
Internet, but I can tell [Wordpress](https://wordpress.org/) is more
usable and easier to update than [Drupal](https://drupal.org/).

[CMSdj](https://bitbucket.org/carlosvin/cmsdj)
----------------------------------------------

It is my second attempt to create my own [\[CMS\]](#CMS){.citation}. I
had an idea in my mind about how to make the core design (the data
model), I still believe in that design. I had also discovered
[Django](https://www.djangoproject.com/), I liked this framework
developed in [Python](https://www.python.org), who can resist creating
their own [\[CMS\]](#CMS){.citation}?
[CMSdj](https://bitbucket.org/carlosvin/cmsdj) is in
[Bitbucket](https://bitbucket.org) and is working, it has its internal
search engine, theming, comment system, voting system,HTML5\_ +
[CSS3](https://www.w3.org/Style/CSS/current-work) views, but:

-   I didn\'t have enough time to develop it, two hours per week at
    most.
-   I still needed a designer.

So, I declared the project
[CMSdj](https://bitbucket.org/carlosvin/cmsdj) dead out of boredom,
although it was supporting my old blog, when I went to write something,
I saw my unfinished project, I didn\'t like it, so I decided to close it
and begin a new one.

[Nikola](https://getnikola.com/)
--------------------------------

I wanted a static website generator because they are trendy. I tried
[Jekyll](https://jekyllrb.com/) because it\'s the most famous, but I
prefer one written in [Python](https://www.python.org). So, after a
quick search I had three finalists: [Nikola](https://getnikola.com/),
[Mynt](https://mynt.mirroredwhite.com/) and
[Pelican](https://blog.getpelican.com/). I chose
[Nikola](https://getnikola.com/) because I discarded the others: \*
[Pelican](https://blog.getpelican.com/) throws some multi-lang problems
with the categories. I didn\'t want to spend time researching about how
to fix them. \* I love the simplicity of
[Mynt](https://mynt.mirroredwhite.com/), but you have to create your own
themes.

::: {#citations}

[CMS]{#CMS .citation-label}: Content Management System

[DRY]{#DRY .citation-label}: Don\'t Repeat Yourself, ´DRY in wiki´\_
:::

[^1]: [Github](https://www.github.com) hosts the generated site, the
    static files (html, css, images, js).

[^2]: [Travis](https://travis-ci.org/) is a continuous integration
    software (like [Jenkins](https://jenkins-ci.org/)). I use it to
    automate the site deployment: download the files when they change
    from [Github](https://www.github.com), re-generate and re-publish
    the static files.
