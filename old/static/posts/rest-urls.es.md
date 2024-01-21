# Creando REST URLs

Las primeras veces que me puse a diseñar una {API} {REST} cometí unos cuantos errores, por supuesto. A continuación os voy a contar algunos de los errores que cometí y lo que he entendido hasta hoy sobre la construcción de {URL}s {REST} con ejemplos.

## Fundamentos {REST}

* Utilizamos {URL}s para acceder a recursos.
* Utilizamos _verbos_ para modificar recursos.
* Nuestros _verbos_ están proporcionados por el protocolo {HTTP}.
* Los _verbos_ tienen un equivalente directo con las operaciones {CRUD}footnote:[Create, Read, Update, Delete].
* Para acceder a un recurso existente necesitamos su identificador.

### Verbos {REST}

* **POST**\
(**Create**) Utilizado para **crear** nuevos recursos.
* **GET**\
(**Read**) Utilizado para **leer** un recursos existentes en el sistema.
* **PUT**\
(**Update**) Utilizado para **actualizar** recursos existentes.
* **DELETE**\
(**Delete**) Utilizado para **borrar** recursos existentes.

En una tabla quedará más claro

|     |     |     |
| --- | --- | --- |
| Verbo {REST} | Acción {CRUD} | Debe exisitir el recurso |
| POST | Crear | No |
| GET | Leer | Sí |
| PUT | Actualizar | Sí |
| DELETE | Borrar | Sí |

### Acceso a Recursos

Un recurso es _a lo que quieres acceder_. Por ejemplo, un coche.

Para poder acceder a un coche no es suficiente con esta información, no puedes ir a un concesionario y preguntar por un coche en general, tienes que decir qué coche quieres. Así que llegas al concesionario y dices:

_Hola, buenos días. Quiero información sobre el Fiat Bravo 1.9 Emotion 120CV_.

De esta forma el dependiente sabe cuál es y te puede dar la información.

"Fiat Bravo 1.9 Emotion 120CV" es nuestro **identificador**.

Trasladando el ejemplo a las {API}s {REST}:

```
GET   https://tiendadecoches.es/api/coches/fiat-bravo-19-emotion-120cv
```

De esta forma nuestra {API} nos puede proporcionar información del coche.

Esto es un ejemplo muy simplificado, pero realmente cuando accedemos a un recurso concreto solemos utilizar algo que lo identifique de forma unívoca. Una práctica común y recomendable es utilizar {UUID}.

```
GET  https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f
```

Pero nuestra {API}, al igual que una tienda, no tiene por qué ser tan estricta, podemos preguntar por los coches que tienen ciertas caracteríticas, podemos ir al concesionario y decir:

_Hola buenos días, quiero un Fiat Bravo_.

Y el dependiente, amablemente, te mostrará todos los Fiat Bravo que tiene. Veamos cómo podemos decir esto a nuestra {API}.

```
GET  https://tiendadecoches.es/api/coches/?marca=fiat&modelo=bravo
```

Nuestra {API} nos devolverá todos los coches que son marca Fiat y modelo Bravo.

Marca y modelo en este caso son lo que llamamos **parámetros de consulta** (query parameters).

Como os habréis dado cuenta durante el ejemplo, para obtener información de un recurso siempre hemos utilizado el _verbo_ **GET**.

### Modificar Recursos

Nuestra {API} también nos puede permitir modificar un recurso, al igual que para pedir información, para modificar un recurso necesitamos especificar qué recurso queremos modificar, así que necesitamos otra vez un _identificador_.

Antes queríamos información (leer) y utilizábamos nuestro verbo GET, ahora lo único que cambia es el verbo, queremos **modificar** así que utilizamos el verbo equivalente que nos proporciona el protocolo {HTTP}: **PUT**.

```
PUT   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f
```

Pero nos falta algo, tenemos que decir qué queremos cambiar del coche, por ejemplo, imaginemos que queremos cambiar la cilintrada y poner 100CV.

Tenemos que enviar la nueva cilindrada a esta {URL} https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f por {HTTP} utilizando el verbo **PUT**.

El protocolo {HTTP} nos permite enviar información en un mensaje PUT, así que solo nos falta pensar en el formato en que lo vamos a enviar.

Podemos enviarlo en {JSON} o link:[XML] o como queramos, solo tenemos que estar seguros de que el formato que enviamos es lo que espera recibir el servidor.

**📌 NOTE**\
Cuando definimos una {API} {REST} tenemos que definir también el formato en que vamos a enviar los datos.

**Ejemplo en {JSON}**

```json
{ cilindrada: 100 }
```

### Borrar Recursos

Continuando con el ejemplo de los coches, imaginemos que ahora somos el concesionario, y que ya no queremos vender más ese Fiat Bravo (concretamente el cce05bee-386b-11e5-a151-feff819cdc9f). Seguiremos manteniendo la {URL} que identifica el recurso, pero cambiamos el verbo, no queremos leer (GET), ni modificar (PUT), queremos **borrar (DELETE)**.

```
DELETE   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f
```

En el caso del borrado, no hay que proporcionar ninguna información adicional, con el verbo (DELETE) y el recurso es suficiente.

### Crear Recursos

Y nos queda último verbo, **crear (POST)**. En este caso no hay que identificar el recurso, porque no existe todavía.

```
POST   https://tiendadecoches.es/api/coches/
```

Lo que sí que tenemos que enviar son los datos del recurso que vamos a crear.

En nuestro ejemplo, queremos crear un coche, así que ponemos toda la información necesaria para crear un coche dentro de la llamada POST de {HTTP}, algo muy parecido como hemos hecho en el apartado [Modificar Recursos](#modificar-recursos), pero en este caso mandamos **toda la información necesaria**, no solo la cilindrada.

**Ejemplo en {JSON}**

```json
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
```

Podemos delegar en el sistema, para que cuando pidamos la creación de un recurso nuevo, nos asigne un nuevo **identificador**, o simplemente enviarlo con el resto de información:

```json
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
```

### Colecciones

Algo que no quiero pasar por alto, porque al menos para mí no fue obvio, es el manejo de colecciones. Realmente ya está explicado, porque todas las acciones que hemos visto previamente sobre los coches, estaba aplicando realmente a una colección de coches.

Pero, ¿qué pasa si un recurso tiene a su vez una colección? Siguiendo con los coches, un coche puede tener una lista de aceites con los que puede funcionar, así que nuestra {API} debería permitir obtener, modificar, borrar o crear elementos en la lista.

**📌 NOTE**\
Para el ejemplo asumiremos que el identificador del aceite es el atributo tipo.

#### Añadir un elemento a la colección

Si queremos añadir un elemento a la colección de coches lo que vamos a hacer es crear un nuevo coche, así que estamos en el caso de [Crear Recursos](#crear-recursos).

Para añadir un nuevo aceite al coche cce05bee-386b-11e5-a151-feff819cdc9f, que ya existe:

**Petición**

```http
POST   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/
```

**Respuesta**

```json
{
  "tipo": "5W30",
  "otros_datos": "este es el mejor del mundo para este coche"
}
```

Si queremos añadir otro aceite:

**Petición**

```http
POST   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/
```

**Respuesta**

```json
{
  "tipo": "10W30",
  "otros_datos": "otras cosas sobre aceites de coche",
}
```

#### Modificar un elemento de la colección

Si queremos modificar los datos del aceite _5W30_ del coche _cce05bee-386b-11e5-a151-feff819cdc9f_:

**Petición**

```http
PUT   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/5W30/
```

**Respuesta**

```json
{
  "tipo": "5W30",
  "otros_datos": "este ya no es el mejor del mundo para este coche"
}
```

#### Borrar un elemento de la colección

Para borrar un aceite _10W30_ del coche _cce05bee-386b-11e5-a151-feff819cdc9f_:

**Petición**

```http
DELETE   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/10W30
```

#### Leer un elemento de la colección

Para obtener la información del aceite _10W30_ del coche _cce05bee-386b-11e5-a151-feff819cdc9f_:

**Petición**

```http
GET   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/10W30
```

#### Listar elementos de la colección

Como hemos visto en [Leer un elemento de la colección](#leer-un-elemento-de-la-colección), podemos obtener información de cualquier elemento de la colección, pero también podemos obtener varios elementos de la colección, ordenarlos, paginarlos y aplicar cualquier tipo de acciones típicas de una colección.

Podemos obtener todos los aceites soportados por el coche _cce05bee-386b-11e5-a151-feff819cdc9f_, es tan simple como:

**Petición**

```http
GET   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/
```

Pero también podemos proporcionar otras funcionalidades en nuestra {API}, como obtener los resultados ordenados:

**Petición**

```http
GET   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/?ordenar_por=tipo&orden=ascendente
```

Podemos pedir al {API} que nos devuelva los 10 primeros aceites del coche _cce05bee-386b-11e5-a151-feff819cdc9f_:

**Petición**

```http
GET   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/?numero_de_elementos=10
```

Cuando no queremos mostrar toda la lista completa, podemos proporcionar un sistema de paginación:

**Petición**

```http
GET   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/?pagina=3&numero_de_elementos=3
```

En la petición de arriba, estamos diciendo que nos devuelva la página 3 de los aceites del coche _cce05bee-386b-11e5-a151-feff819cdc9f_ y que nos muestre 3 aceites por página. Si quisiéramos ir a la página siguiente:

**Petición**

```http
GET   https://tiendadecoches.es/api/coches/cce05bee-386b-11e5-a151-feff819cdc9f/aceites/?pagina=4&numero_de_elementos=3
```

Todas estas funcionalidades, son posibles gracias a los **parámetros de consulta**.

## Típico error

La primera vez que intenté diseñar un {API} {REST} lo que hice fué otra cosa, era una {API}, pero no {REST}.

Mi principal error fue en la construción de las {URL}s, incluí _verbos_ sin tener en cuenta que los verbos ya me los proporcionaba el protocolo {HTTP}.

Por ejemplo, creaba {URL}s del tipo:

**Incorrecto**

```http
POST    https://example.com/api/coches/seat-ibiza/borrar-rueda/3
```

Cuando lo correcto sería

**Correcto**

```http
DELETE  https://example.com/api/coches/seat-ibiza/ruedas/3
```
