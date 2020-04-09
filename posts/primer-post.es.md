---
title: Primer Post utilizando Nikola

date: 2014/03/27 13:30:02

tags: Python, Static Sites

description: Cómo he llegado hasta Nikola
lang: es
type: text
---

Supongo que, como la mayoría, vengo del concepto de software de gestión
de blogs o gestores de contenidos dinámicos, basados en:

-   enviar información desde un navegador a un servidor
-   procesar y almacenar la información en una base de datos o en
    ficheros
-   el servidor genera una respuesta dinámicamente que se envía al
    navegador en forma de HTML
    -   para generar esta respuesta se suele leer de la base de datos o
        de los ficheros

De todo este proceso se encarga un software instalado en el servidor,
nuestro gestor de contenidos.

Ahora he cambiado al paradigma de \"generador de sitios web estáticos\",
en concreto voy a utilizar [Nikola](https://getnikola.com/), aunque esta
vez no lo voy a instalar en ningún servidor. En otro post os contaré
cómo he montado esto con [Github](https://www.github.com)[^1] y
[Travis](https://travis-ci.org/)[^2].

Mi camino para llegar hasta los generadores de sitios web estáticos ha
pasado por las etapas que os cuento abajo (me he saltado alguna menos
importante).

::: {.contents}
Camino hasta [Nikola](https://getnikola.com/)
:::

[PhpNuke](https://www.phpnuke.org/)
===================================

Sí, sigue existiendo. Aquí entramos un gestor de contenido basado
PHP+MySQL, multi-idioma, gestión de usuarios, grupos de usuarios,
ampliable con temas, plugins, etc.

Mi propio gestor de contenidos
==============================

Que no era tal, porque se quedó en un blog en el que podía publicar
contenidos dinámicamente, también hecho en PHP y MySQL. Me sirvió para:

-   Publicar posts con problemas.
-   Darme cuenta de que un programador necesita a un diseñador.
-   [PHP](https://www.php.net/) a nivel sintáctico, es feo (cuestión de
    gustos).
-   Empezar a entender la importancia de
    [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself)[^3].

[Drupal](https://drupal.org/)
=============================

Un gestor de contenidos muy completo, que me gustó mucho, hasta que se
empezaron a \"romper\" cosas (comparto culpa con
[Drupal](https://drupal.org/)) y me cansé. Pero quiero remarcar que
tiene todo lo que yo podía esperar de un gestor de contenidos y más.

[Wordpress](https://wordpress.org/)
===================================

Ya no voy a entrar en si es mejor o peor que
[Drupal](https://drupal.org/), que de eso hay mucho por Internet.
Simplemente es mucho más usable y fácil de actualizar.

[CMSdj](https://bitbucket.org/carlosvin/cmsdj)
==============================================

Mi segundo intento de creación de mi propio gestor de contenidos. Tenía
una idea en la cabeza, de cómo debería ser un diseño del modelo de un
gestor de contenidos, todavía la tengo. Y recientemente había
descubierto [Django](https://www.djangoproject.com/), un framework que
me encantó hecho con un lenguaje que me encanta,
[Python](https://www.python.org), ¿quién se puede resistir ahora a crear
su propio CMS[^4]? [CMSdj](https://bitbucket.org/carlosvin/cmsdj) está
por ahí en [Bitbucket](https://bitbucket.org) y funciona, tiene su
propio buscador, gestión de templates, sistema de comentarios, sistema
de votación, acercamiento a [HTML5](https://www.w3.org/html/) +
[CSS3](https://www.w3.org/Style/CSS/current-work) y algunas cosillas
más, pero:

-   Ya no sacaba tiempo para desarrollar, un par de horas a la semana,
    como mucho, y gastaba una hora en recordar por donde iba.
-   Seguía necesitando un diseñador.

Así que declaré este proyecto muerto por aburrimiento, aunque seguí
utilizándolo para publicar mis cosillas, pero cada vez que iba a
escribir algo en mi blog y veía todo a medio hacer, me ponía malo, así
que decidí cerrar y empezar de nuevo.

[Nikola](https://getnikola.com/)
================================

Tengo que decir que quería un generador de sitios estáticos, porque
están de moda y toda la gente escribe sobre sus bondades y me
convencieron. Probé [Jekyll](https://jekyllrb.com/) para que no me lo
contaran, que es el más famoso. Pero prefería uno hecho en
[Python](https://www.python.org) por si quería meter mano alguna vez.
Así que después de buscar un poco, me quedé entre
[Nikola](https://getnikola.com/),
[Mynt](https://mynt.mirroredwhite.com/) y
[Pelican](https://blog.getpelican.com/). Me quedé con
[Nikola](https://getnikola.com/) por descarte: \*
[Pelican](https://blog.getpelican.com/) me dió algunos problemas en la
utilización de varios idiomas y en las categorías, aunque de primeras
fue el que más me convenció. De hecho, es posible que esos problemas los
crease yo, pero no quería gastar mucho tiempo en investigar. \*
[Mynt](https://mynt.mirroredwhite.com/) me encantó por su sencillez,
aunque tienes que hacerte tus propios templates y no quiero darme cuenta
otra vez de lo que necesito a un diseñador.

lang: es

[^1]: En [Github](https://www.github.com) alojo el sitio generado, toda
    la parte estática (las páginas en HTML, imágenes, etc.)

[^2]: [Travis](https://travis-ci.org/) es un software the integración
    contínua (como [Jenkins](https://jenkins-ci.org/)), yo lo utilizo
    para automatizar el despliegue del sitio, esto es, para descargar el
    sitio cada vez que lo cambie en [Github](https://www.github.com),
    volver a generarlo y publicarlo otra vez.

[^3]: Don\'t Repeat Yourself (En español, \"no te repitas\")

[^4]: Content Management System (\"Sistema de gestión de contenidos\")
