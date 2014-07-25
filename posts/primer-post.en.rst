.. title: First post with Nikola
.. slug: primer-post
.. date: 2014/03/27 13:30:02
.. description: My first post with Nikola
.. type: text

I guess that most people come from dynamic content management systems based on:

* send data from browser to server 
* process the received data, then it stores the processed info into a database (or files) 
* the server generate dynamically an answer that is sent to the browser as HTML

  * the answer is usually built reading info from a database or files.

This process is managed by a software installed on server, this is our content management system.

Now I've changed the paradigm to "static web site generator", specifically I'm going to use Nikola_, 
although this time, I'm not going to install on a remote server. 

In a next post I'll tell you how I've automated the publication process using Github_ [#]_ and Travis_ [#]_.


.. contents:: Path to Nikola_

.. TEASER_END

PhpNuke_
--------
My first content management system, yes it still exists. It based on PHP+MySQL, multi-lang, user management, user groups, theming, plugins, etc. 

My Own Content Management System
--------------------------------
It wasn't a full [CMS]_, because actually it was a blogging system. I can publish posts dynamically, it was made with PHP and MySQL. It was useful to: 

* Publish posts (with several problems). 
* I realized that a developer needs a designer. 
* I don't like the PHP_ syntax. 
* I began to understand the importance of [DRY]_.

Drupal_
========
A full [CMS]_, I liked it until things began to "break" (I shared the blame with Drupal_). But Drupal_ has everything you expect from a [CMS]_ and more. 

Wordpress_
==========
I don't know if it is better or worse than Drupal_, there are many discussions on the Internet, but I can tell Wordpress_ is more usable and easier to update than Drupal_. 

CMSdj_
=======
It is my second attempt to create my own [CMS]_. I had an idea in my mind about how to make the core design (the data model), I still believe in that design. I had also discovered Django_, I liked this framework developed in Python_, who can resist creating their own [CMS]_? 
CMSdj_ is in Bitbucket_ and is working, it has its internal search engine, theming, comment system, voting system,HTML5_ + CSS3_ views, but: 

* I haven't enough time to develop it, two hours per week at most. 
* I still needed a designer.

So, I declared the project CMSdj_ dead out of boredom, although it was supporting my old blog, when I went to write something, I saw my unfinished project, I didn't like it, so I decided to close it and begin a new one.

Nikola_
=======
I wanted a static website generator because they are trendy. 
I tried Jekyll_ because it's the most famous, but I prefer one written in Python_. So, after a quick search I had three finalists: Nikola_, Mynt_ and Pelican_. I chose Nikola_  because I discarded the others:
* Pelican_ throws some multi-lang problems with the categories. I didn't want to spend time researching about how to fix them. 
* I love the simplicity of Mynt_, but you have to create your own themes, I never want to miss a designer. 


.. [#] Github_ hosts the generated site, the static files (html, css, images, js).
.. [#] Travis_ is a continuous integration software (like Jenkins_). I use it to automate the site deployment: download the files when they change from Github_, re-generate and re-publish the static files.

.. [DRY] Don't Repeat Yourself, ´DRY in wiki´_
.. [CMS] Content Management System

.. _´DRY in wiki´: http://en.wikipedia.org/wiki/Don't_repeat_yourself
.. _PhpNuke: https://www.phpnuke.org/
.. _Drupal: https://drupal.org/
.. _Wordpress: https://wordpress.org/
.. _PHP: http://www.php.net/
.. _Python: http://www.python.org
.. _Django: https://www.djangoproject.com/
.. _CMSdj: https://bitbucket.org/carlosvin/cmsdj
.. _Bitbucket: https://bitbucket.org
.. _Nikola: http://getnikola.com/
.. _Jekyll: http://jekyllrb.com/
.. _Pelican: http://blog.getpelican.com/
.. _Mynt: http://mynt.mirroredwhite.com/
.. _Travis: https://travis-ci.org/
.. _Github: http://www.github.com
.. _CSS3: http://www.w3.org/Style/CSS/current-work
.. _HTML5: http://www.w3.org/html/
.. _Jenkins: http://jenkins-ci.org/

