---
title: Creando REST URLs
lang: es
date: 2015/07/26 18:00:00
tags: REST, API, Web Services
description: "Crear REST API: URLs"
type: text
---

Las primeras veces que me puse a diseñar una
[API](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones)
[REST](https://es.wikipedia.org/wiki/Representational_State_Transfer)
cometí unos cuantos errores, por supuesto. A continuación os voy a
contar algunos de los errores que cometí y lo que he entendido hasta hoy
sobre la construcción de
[URLs](https://es.wikipedia.org/wiki/Localizador_de_recursos_uniforme)
[REST](https://es.wikipedia.org/wiki/Representational_State_Transfer)
con ejemplos.

::: {.contents}
:::

Fundamentos [REST](https://es.wikipedia.org/wiki/Representational_State_Transfer)
=================================================================================

-   Utilizamos
    [URLs](https://es.wikipedia.org/wiki/Localizador_de_recursos_uniforme)
    para acceder a recursos.
-   Utilizamos *verbos* para modificar recursos.
-   Nuestros *verbos* están proporcionados por el protocolo
    [HTTP](https://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
-   Los *verbos* tienen un equivalente directo con las operaciones
    [CRUD](https://es.wikipedia.org/wiki/CRUD)[^1].
-   Para acceder a un recurso existente necesitamos su identificador.

Verbos [REST](https://es.wikipedia.org/wiki/Representational_State_Transfer)
----------------------------------------------------------------------------

POST: (**C**) Utilizado para **crear** nuevos recursos.

GET: (**R**) Utilizado para **leer** un recursos existentes en el
    sistema.

PUT: (**U**) Utilizado para **actualizar** recursos existentes.

DELETE: (**D**) Utilizado para **borrar** recursos existentes.

En una tabla quedará más claro

  Verbo [REST](https://es.wikipedia.org/wiki/Representational_State_Transfer)   Acción [CRUD](https://es.wikipedia.org/wiki/CRUD)   Debe exisitir el recurso
  ----------------------------------------------------------------------------- --------------------------------------------------- --------------------------
  POST                                                                          Crear                                               No
  GET                                                                           Leer                                                Sí
  PUT                                                                           Actualizar                                          Sí
  DELETE                                                                        Borrar                                              Sí

Acceso a Recursos
-----------------

Un recurso es *a lo que quieres acceder*. Por ejemplo, un coche.

Para poder acceder a un coche no es suficiente con esta información, no
puedes ir a un concesionario y preguntar por un coche en general, tienes
que decir qué coche quieres. Así que llegas al concesionario y dices:

*Hola, buenos días. Quiero información sobre el Fiat Bravo 1.9 Emotion
120CV*.

De esta forma el dependiente sabe cuál es y te puede dar la información.

\"Fiat Bravo 1.9 Emotion 120CV\" es nuestro **identificador**.

Trasladando el ejemplo a las
[APIs](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones)
[REST](https://es.wikipedia.org/wiki/Representational_State_Transfer):

    GET   https://tiendadecoches.es/api/coches/fiat-bravo-19-emotion-120cv

De esta forma nuestra
[API](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones)
nos puede proporcionar información del coche.

Esto es un ejemplo muy simplificado, pero realmente cuando accedemos a
un recurso concreto solemos utilizar algo que lo identifique de forma
unívoca. Una práctica común y recomendable es utilizar
[UUID](https://es.wikipedia.org/wiki/Universally_unique_identifier).

    GET  https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f

Pero nuestra
[API](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones),
al igual que una tienda, no tiene por qué ser tan estricta, podemos
preguntar por los coches que tienen ciertas caracteríticas, podemos ir
al concesionario y decir:

*Hola buenos días, quiero un Fiat Bravo*.

Y el dependiente, amablemente, te mostrará todos los Fiat Bravo que
tiene. Veamos cómo podemos decir esto a nuestra
[API](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones).

    GET  https://tiendadecoches.es/api/coches/?marca=fiat&modelo=bravo

Nuestra
[API](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones)
nos devolverá todos los coches que son marca Fiat y modelo Bravo.

Marca y modelo en este caso son lo que llamamos **parámetros de
consulta** (query parameters).

Como os habréis dado cuenta durante el ejemplo, para obtener información
de un recurso siempre hemos utilizado el *verbo* **GET**.

Modificar Recursos
------------------

Nuestra
[API](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones)
también nos puede permitir modificar un recurso, al igual que para pedir
información, para modificar un recurso necesitamos especificar qué
recurso queremos modificar, así que necesitamos otra vez un
*identificador*.

Antes queríamos información (leer) y utilizábamos nuestro verbo GET,
ahora lo único que cambia es el verbo, queremos **modificar** así que
utilizamos el verbo equivalente que nos proporciona el protocolo
[HTTP](https://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol):
**PUT**.

    PUT   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f

Pero nos falta algo, tenemos que decir qué queremos cambiar del coche,
por ejemplo, imaginemos que queremos cambiar la cilintrada y poner
100CV.

Tenemos que enviar la nueva cilindrada a esta
[URL](https://es.wikipedia.org/wiki/Localizador_de_recursos_uniforme)
<https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f>
por [HTTP](https://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol)
utilizando el verbo **PUT**.

El protocolo
[HTTP](https://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol) nos
permite enviar información en un mensaje PUT, así que solo nos falta
pensar en el formato en que lo vamos a enviar.

Podemos enviarlo en [JSON](https://es.wikipedia.org/wiki/JSON) o
[XML](https://es.wikipedia.org/wiki/XML) o como queramos, solo tenemos
que estar seguros de que el formato que enviamos es lo que espera
recibir el servidor.

::: {.note}
::: {.title}
Note
:::

Cuando definimos una
[API](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones)
[REST](https://es.wikipedia.org/wiki/Representational_State_Transfer)
tenemos que definir también el formato en que vamos a enviar los datos.
:::

Ejemplo en [JSON](https://es.wikipedia.org/wiki/JSON):

    { cilindrada: 100 }

Borrar Recursos
---------------

Continuando con el ejemplo de los coches, imaginemos que ahora somos el
concesionario, y que ya no queremos vender más ese Fiat Bravo
(concretamente el cce05bee-386b-11e5-a151-feff819cdc9f). Seguiremos
manteniendo la
[URL](https://es.wikipedia.org/wiki/Localizador_de_recursos_uniforme)
que identifica el recurso, pero cambiamos el verbo, no queremos leer
(GET), ni modificar (PUT), queremos **borrar (DELETE)**.

    DELETE   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f

En el caso del borrado, no hay que proporcionar ninguna información
adicional, con el verbo (DELETE) y el recurso es suficiente.

Crear Recursos
--------------

Y nos queda último verbo, crear (POST). En este caso no hay que
identificar el recurso, porque no existe todavía.

    POST   https://tiendadecoches.es/api/coches/

Lo que sí que tenemos que enviar son los datos del recurso que vamos a
crear.

En nuestro ejemplo, queremos crear un coche, así que ponemos toda la
información necesaria para crear un coche dentro de la llamada POST de
[HTTP](https://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol), algo
muy parecido como hemos hecho en el apartado [Modificar
Recursos](#modificar-recursos), pero en este caso mandamos **toda la
información necesaria**, no solo la cilindrada.

Ejemplo en [JSON](https://es.wikipedia.org/wiki/JSON):

    {
    "marca": "Fiat",
    "modelo": "Bravo"
    "anio": 2010
    "puertas": 5,
    "cilindrada": 120,
    "version": "Emotion",
    "climatizador": true,
    "ac": false,
    "fuel": "Diesel"
    }

Podemos delegar en el sistema, para que cuando pidamos la creación de un
recurso nuevo, nos asigne un nuevo **identificador**, o simplemente
enviarlo con el resto de información:

    {
    "identificador": "cce05bee-386b-11e5-a151-feff819cdc9f"
    "marca": "Fiat",
    "modelo": "Bravo"
    "anio": 2010
    "puertas": 5,
    "cilindrada": 120,
    "version": "Emotion",
    "climatizador": true,
    "ac": false,
    "fuel": "Diesel"
    }

Colecciones
-----------

Algo que no quiero pasar por alto, porque al menos para mí no fue obvio,
es el manejo de colecciones. Realmente ya está explicado, porque todas
las acciones que hemos visto previamente sobre los coches, estaba
aplicando realmente a una colección de coches.

Pero, ¿qué pasa si un recurso tiene a su vez una colección? Siguiendo
con los coches, un coche puede tener una lista de aceites con los que
puede funcionar, así que nuestra
[API](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones)
debería permitir obtener, modificar, borrar o crear elementos en la
lista.

::: {.note}
::: {.title}
Note
:::

Para el ejemplo asumiremos que el identificador del aceite es el
atributo tipo.
:::

### Añadir un elemento a la colección

Si queremos añadir un elemento a la colección de coches lo que vamos a
hacer es crear un nuevo coche, así que estamos en el caso de [Crear
Recursos](#crear-recursos).

Para añadir un nuevo aceite al coche
cce05bee-386b-11e5-a151-feff819cdc9f, que ya existe:

    POST   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/

    {
    "tipo": "5W30",
    "otros_datos": "este es el mejor del mundo para este coche"
    }

Si queremos añadir otro aceite:

    POST   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/

    {
    "tipo": "10W30",
    "otros_datos": "otras cosas sobre aceites de coche",
    }

### Modificar un elemento de la colección

Si queremos modificar los datos del aceite *5W30* del coche
*cce05bee-386b-11e5-a151-feff819cdc9f*:

    PUT   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/5W30/

    {
    "tipo": "5W30",
    "otros_datos": "este ya no es el mejor del mundo para este coche"
    }

### Borrar un elemento de la colección

Para borrar un aceite *10W30* del coche
*cce05bee-386b-11e5-a151-feff819cdc9f*:

    DELETE   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/10W30

### Leer un elemento de la colección

Para obtener la información del aceite *10W30* del coche
*cce05bee-386b-11e5-a151-feff819cdc9f*:

    GET   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/10W30

### Listar elementos de la colección

Como hemos visto en [Leer un elemento de la
colección](#leer-un-elemento-de-la-colección), podemos obtener
información de cualquier elemento de la colección, pero también podemos
obtener varios elementos de la colección, ordenarlos, paginarlos y
aplicar cualquier tipo de acciones típicas de una colección.

Podemos obtener todos los aceites soportados por el coche
*cce05bee-386b-11e5-a151-feff819cdc9f*, es tan simple como:

    GET   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/

Pero también podemos proporcionar otras funcionalidades en nuestra
[API](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones),
como obtener los resultados ordenados:

    GET   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/?ordenar_por=tipo&orden=ascendente

Podemos pedir al
[API](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones)
que nos devuelva los 10 primeros aceites del coche
*cce05bee-386b-11e5-a151-feff819cdc9f*:

    GET   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/?numero_de_elementos=10

Cuando no queremos mostrar toda la lista completa, podemos proporcionar
un sistema de paginación:

    GET   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/?pagina=3&numero_de_elementos=3

En la petición de arriba, estamos diciendo que nos devuelva la página 3
de los aceites del coche *cce05bee-386b-11e5-a151-feff819cdc9f* y que
nos muestre 3 aceites por página. Si quisiéramos ir a la página
siguiente:

    GET   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/?pagina=4&numero_de_elementos=3

Todas estas funcionalidades, son posibles gracias a los **parámetros de
consulta**.

Típico error
============

La primera vez que intenté diseñar un
[API](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones)
[REST](https://es.wikipedia.org/wiki/Representational_State_Transfer) lo
que hice fué otra cosa, era una
[API](https://es.wikipedia.org/wiki/Interfaz_de_programaci%C3%B3n_de_aplicaciones),
pero no
[REST](https://es.wikipedia.org/wiki/Representational_State_Transfer).

Mi principal error fue en la construción de las
[URLs](https://es.wikipedia.org/wiki/Localizador_de_recursos_uniforme),
incluí *verbos* sin tener en cuenta que los verbos ya me los
proporcionaba el protocolo
[HTTP](https://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol).

Por ejemplo, creaba
[URLs](https://es.wikipedia.org/wiki/Localizador_de_recursos_uniforme)
del tipo:

    POST    https://example.com/api/coches/seat-ibiza/borrar-rueda/3

Cuando lo correcto sería

    DELETE  https://example.com/api/coches/seat-ibiza/ruedas/3

Video Tutoriales
================

Estos tutoriales me fueron de gran ayuda y os recomiendo que los veáis
enteros:

<https://www.youtube.com/watch?v=NjpKwiRORI4>
<https://www.youtube.com/watch?v=gYKJqUZXuBw>

[^1]: Create, Read, Update, Delete
