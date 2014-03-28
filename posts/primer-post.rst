.. title: Primer Post utilizando Nikola
.. slug: primer-post
.. date: 2014/03/27 13:30:02
.. tags: python, static, site
.. link: 
.. description: Cómo he llegado hasta Nikola
.. type: text

Supongo que, como la mayoría, vengo del concepto de software de gestión de blogs o gestores de contenidos dinámicos, basados en:

* enviar información desde un navegador a un servidor 
* procesar y almacenar la información en una base de datos o en ficheros
* el servidor genera una respuesta dinámicamente que se envía al navegador en forma de HTML
  
  * para generar esta respuesta se suele leer de la base de datos o de los ficheros

De todo este proceso se encarga un software instalado en el servidor, nuestro gestor de contenidos.

Ahora he cambiado al paradigma de "generador de sitios web estáticos", en concreto voy a utilizar Nikola_, aunque esta vez no lo voy a instalar en ningún servidor. 
En otro post os contaré cómo he montado esto con Github_ y Travis_.

Mi camino para llegar hasta los generadores de sitios web estáticos ha pasado por las etapas que os cuento abajo (me he saltado alguna menos importante).

.. contents:: Camino hasta Nikola_

PhpNuke_
===============
Sí, sigue existiendo. Aquí entramos un gestor de contenido basado PHP+MySQL, multi-idioma, gestión de usuarios, grupos de usuarios, ampliable con temas, plugins, etc. 


Mi propio gestor de contenidos
==============================
Que no era tal, porque se quedó en un blog en el que podía publicar contenidos dinámicamente, también hecho en PHP y MySQL. Me sirvió para: 

* Publicar posts con problemas. 
* Darme cuenta de que un programador necesita a un diseñador. 
* PHP_ a nivel sintáctico, es feo (cuestión de gustos). 
* Empezar a entender la importancia de DRY_ [#]_.

Drupal_
========
Un gestor de contenidos muy completo, que me gustó mucho, hasta que se empezaron a "romper" cosas (comparto culpa con Drupal_) y me cansé. Pero quiero remarcar que tiene todo lo que yo podía esperar de un gestor de contenidos y más. 

Wordpress_
==========
Ya no voy a entrar en si es mejor o peor que Drupal_, que de eso hay mucho por Internet. Simplemente es mucho más usable y fácil de actualizar. 

CMSdj_
=======
Mi segundo intento de creación de mi propio gestor de contenidos. Tenía una idea en la cabeza, de cómo debería ser un diseño del modelo de un gestor de contenidos, todavía la tengo. Y recientemente había descubierto Django_, un framework que me encantó hecho con un lenguaje que me encanta, Python_, ¿quién se puede resistir ahora a crear su propio CMS [#]_? 
CMSdj_ está por ahí en Bitbucket_ y funciona, tiene su propio buscador, gestión de templates, sistema de comentarios, sistema de votación, acercamiento a HTML5_ + CSS3_ y algunas cosillas más, pero: 

* Ya no sacaba tiempo para desarrollar, un par de horas a la semana, como mucho, y gastaba una hora en recordar por donde iba. 
* Seguía necesitando un diseñador.

Así que declaré este proyecto muerto por aburrimiento, aunque seguí utilizándolo para publicar mis cosillas, pero cada vez que iba a escribir algo en mi blog y veía todo a medio hacer, me ponía malo, así que decidí cerrar y empezar de nuevo. 

Nikola_
=======
Tengo que decir que quería un generador de sitios estáticos, porque están de moda y toda la gente escribe sobre sus bondades y me convencieron. Probé Jekyll_ para que no me lo contaran, que es el más famoso. Pero prefería uno hecho en Python_ por si quería meter mano alguna vez. Así que después de buscar un poco, me quedé entre Nikola_, Mynt_ y Pelican_. Me quedé con Nikola_  por descarte:
* Pelican_ me dió algunos problemas en la utilización de varios idiomas y en las categorías, aunque de primeras fue el que más me convenció. De hecho, es posible que esos problemas los crease yo, pero no quería gastar mucho tiempo en investigar. 
* Mynt_ me encantó por su sencillez, aunque tienes que hacerte tus propios templates y no quiero darme cuenta otra vez de lo que necesito a un diseñador. 



.. [#] En Github_ alojo el sitio generado, toda la parte estática (las páginas en HTML, imágenes, etc.)
.. [#] Travis_ es un software the integración contínua (como Jenkins_), yo lo utilizo para automatizar el despliegue del sitio, esto es, para descargar el sitio cada vez que lo cambie en Github_, volver a generarlo y publicarlo otra vez.
.. [#] Don't Repeat Yourself (En español, "no te repitas")
.. [#] Content Management System ("Sistema de gestión de contenidos")

.. _DRY: http://en.wikipedia.org/wiki/Don't_repeat_yourself
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
