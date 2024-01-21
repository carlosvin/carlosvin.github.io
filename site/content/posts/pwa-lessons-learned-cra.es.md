# Crear una PWA con Create React App: Lecciones aprendidas

Empezé trabajando con {React} hace unos años, siempre he comenzado los proyectos desde cero, sin utilizar ninguna plantilla o generador de proyectos. En lo que ser refiere a los empaquetadores, normalmente utilizo {Webpack} en el trabajo o [Parcel](https://parceljs.org) en proyectos personales.

Hace unos meses, quería comenzar un proyecto personal para hacer un seguimiento de mis gastos durante mi año sabático, [Budget Tracker,window=_blank](https://btapp.netlify.com) lo llamé. Llevaba un poco de prisa, porque en ese momento llevaba ya unos 4 meses viajando y quería centrarme cuanto antes en implementar la funcionalidad principal y tener algo funcionando cuanto antes, un [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) (minimum viable product), estaba en la situación perfecta para probar {CRALong} o {CRA}.

**📌 NOTE**\
{CRA} te permite crear una {PWA} en {React} lista para producción en un momento, lo que es impresionante. Solo tienes el esqueleto de la aplicación, tampoco hace milagros, el resto lo tienes que programar tú. {CRA} se encarga de la gestión de dependencias de desarrollo y configuración de el empaquetador, {Webpack} en este caso.

Como decía antes, quería implementar la lógica del programa cuanto antes, así que junto con la utilización de {CRA}, tambien tomé otras decisiones y atajos, condicionados por la necesidad de acelerar el proceso de desarrollo, hablaré sobre todas estas decisiones a lo largo de este artículo.

## Tecnologías escogidas para crear https://btapp.netlify.com[Budget Tracker,window=_blank]

* {CRA}
* {React}
* {Typescript}
* [Material UI,window=_blank](https://material-ui.com)
* [Victory](https://formidable.com/open-source/victory) [Frappe charts,window=_blank](https://frappe.io/charts)
* [Firestore,window=_blank](https://firebase.google.com/docs/firestore)
* [Firebase Authentication,window=_blank](https://firebase.google.com/docs/auth)

Estoy bastante contento con el resultado, pero teniendo en cuenta lo aprendido durante el desarrollo de este proyecto, **en el futuro y con el tiempo suficiente, lo más seguro es que no volviese a elegir este mismo conjunto**.

Puedes evaluar el resultado de usar este conjunto de tecnologías abriendo [Budget Tracker,window=_blank](https://btapp.netlify.com).

A continuación, haré un análisis más detallado de algunos de los beneficios e inconvenientes de las decisiones y atajos que tomé durante el desarrollo de [Budget Tracker,window=_blank](https://btapp.netlify.com).

## Create React Application: {CRA}

{CRALong} no ofrece soporte para [Web Workers,window=_blank](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) ni permite modificar la implementación del [Service Worker,window=_blank](https://developers.google.com/web/fundamentals/primers/service-workers) sin [expulsar (eject)](https://stackoverflow.com/questions/49737652/what-does-eject-do-in-create-react-app) la configuración.

**📌 NOTE**\
¿Qué significa explusar o <q>eject</q> en {CRA}? Básicamente es que la configuración de tu proyecto ya no está gestionada por {CRA}, por lo que tienes que te tienes que hacer cargo de ella, mantener las dependencias y configuración de todos los aspectos de tu proyecto como las pruebas, el análisis estático de código, la configuración de Babel y la lista continúa.

### Service worker

Es posible que necesites modificar el comportamiento de tu [Service Worker,window=_blank](https://developers.google.com/web/fundamentals/primers/service-workers) para enviar/recibir [mensajes post](https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage), para realizar [sincronización en segundo plano](https://wicg.github.io/BackgroundSync/spec/) o [mostrar notificaciones web](https://developer.mozilla.org/en/docs/Web/API/notification). En ese caso tendrá que [extraer tu proyecto (eject)](https://stackoverflow.com/questions/49737652/what-does-eject-do-in-create-react-app) y mantener la configuración por tí misma/mismo, lo cual puede suponer algún que otro dolor de cabeza innecesario.

Hay [otras opciones para evitar extraer CRA](https://www.freecodecamp.org/news/how-to-customize-service-workers-with-create-react-app-4424dda6210c/), pero son un poco complicadas para mi gusto.

### Web worker

Cuando necesitas ejecutar algún procesamiento sin bloquear el hilo principal, puedes enviarlo a un [Web Workers,window=_blank](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), lo malo es que tampoco están soportados por {CRA}. El [Web Workers,window=_blank](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) también puebe comunicarse con el hilo principal usando [mensajes post](https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage) y también puede mostrar [notificaciones web](https://medium.com/young-coder/a-simple-introduction-to-web-workers-in-javascript-b3504f9d9d1c).

También hay [otras opciones para evitar extraer la configuración de CRA](https://medium.com/@danilog1905/how-to-use-web-workers-with-react-create-app-and-not-ejecting-in-the-attempt-3718d2a1166b), pero requieren un poco de trabajo extra.

### Webpack

{Webpack} es el empaquetador utilizado por {CRA}. Cuando utilizas {CRA}, no necesitas saber mucho sobre éste, pero cuando tienes que [extraer tu proyecto (eject)](https://stackoverflow.com/questions/49737652/what-does-eject-do-in-create-react-app), entonces tendrás que lidiar con el [archivo de configuracion de Webpack](https://webpack.js.org/configuration/).

## Firebase

[Budget Tracker,window=_blank](https://btapp.netlify.com) permite sincronizar tus presupuestos entre distintos dispositivos, por lo que esta aplicación necesita un lado [backend](https://en.wikipedia.org/wiki/Front_and_back_ends) para gestionar la autenticación y guardar/leer los datos. Consideré dos opciones: [Firebase,window=_blank](https://firebase.google.com/) implementar una API [REST](https://en.wikipedia.org/wiki/Representational_state_transfer).

Elegí [Firebase,window=_blank](https://firebase.google.com/) porque no hay que implementar nada en el lado servidor, sólo hay que configurar los [métodos de autenticación](https://support.google.com/firebase/answer/6400716?hl=en) y las [reglas de seguridad](https://firebase.google.com/docs/firestore/security/get-started) en [Firestore,window=_blank](https://firebase.google.com/docs/firestore).

Pero [Firebase,window=_blank](https://firebase.google.com/) viene con algunos inconvenientes que debes conocer antes de elegirlo.

### Inconvenientes

#### Tamaño de la librería

Me sorprendió mucho la primera vez que analicé el tamaño de la aplicación [Budget Tracker,window=_blank](https://btapp.netlify.com) justo después de integrarla con [Firebase,window=_blank](https://firebase.google.com/), **¡creció un 39%!**.

* 27% por la librería [Firestore,window=_blank](https://firebase.google.com/docs/firestore).
* 12% por la librería [Firebase Authentication,window=_blank](https://firebase.google.com/docs/auth).

Afortunadamente [Budget Tracker,window=_blank](https://btapp.netlify.com) está implementado particionando el código ([code-splitting](https://reactjs.org/docs/code-splitting.html)), lo que permite cargar solo las partes necesarias de la aplicación, así que, la experiencia de usuario no se vió gravemente afectada. Lo malo es que el usuario, en algún momento, tendrá que descargar ese **39% extra** (**539KB**).

#### No realmente primero offline

**❗ IMPORTANT**\
Esto no es relevante, si para tu caso de uso no tienes que vincular los datos al usuario.

[Firestore,window=_blank](https://firebase.google.com/docs/firestore) necesita un usuario identificado para realizar lecturas y escrituras, pero [permite trabajar con usuarios anónimos](https://firebase.google.com/docs/auth/web/anonymous-auth), esta característica es muy interesante si no quieres forzar al usuario a identificarse para utilizar la aplicación.

Otra característica muy útil es que [soporta modo offline](https://firebase.google.com/docs/firestore/manage-data/enable-offline), lo que permite guardar y leer información cuando no hay conexión a Internet.

Los usuarios anónimos junto con el modo offline, casi permiten tener una aplicación que funcione completamente offline.

Entonces… ¿Qué es esto de [No realmente primero offline](#no-realmente-primero-offline)? Esto significa, que la primera vez que la aplicación es abierta, [Firebase,window=_blank](https://firebase.google.com/) necesita identificar al usuario, para ello, en este momento, el dispositivo del usuario debe estar conectado a Internet, en este caso, **debes considerar el siguiente escenario**:

1. La {PWA} está instalada en tu dispositivo.
2. El usuario no está identificado.
3. El dipositivo no tiene acceso a Internet.
4. El usuario abre la {PWA} e intenta guardar o leer datos.
5. **La información no se podrá guardar correctamente**, porque se desconoce el usuario al que pertenece esta información y tampoco se puede vincular a un usuario anónimo, porque se necesita conexión para crearlo.

Esto no es un problema importane, la aplicación funcionará perfectamente en la mayoría de casos. Si, aún así quieres resolver este caso, a continuación explicaré cómo lo he solucionado en [Budget Tracker,window=_blank](https://btapp.netlify.com).

##### Convertir Budget Tracker como offline first

Antes de nada, me gustaría remarcar que esto **podría no ser necesario para tu caso de uso**, porque sólo ocurrirá la primera vez que arranque la aplicación y no tenga conexión a Internet. En el caso de [Budget Tracker,window=_blank](https://btapp.netlify.com) me aseguré de que funcionase en todo momento en modo offline porque traía otros beneficios que más adelante enumeraré.

###### Detalles de implementación

* Crear dos capas de persistencia: Local ([IndexedDB,window=_blank](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)) y Remota ([Firestore,window=_blank](https://firebase.google.com/docs/firestore)).
* Guardar los datos siempre de forma local, independientemente de si el usuario está identificado o no.
* Si hay un usuario que ya está identificado, después de actuar sobre el almacenamiento local, realizar exactamente la misma acción sobre la capa de almacenamiento remoto [Firestore,window=_blank](https://firebase.google.com/docs/firestore) de forma asíncrona.

###### Beneficios

* Si el usuario no se ha identificado, [Budget Tracker,window=_blank](https://btapp.netlify.com) no cargará la librería cliente de [Firestore,window=_blank](https://firebase.google.com/docs/firestore). Como ya comenté antes, ésta supone un 27% del tamaño de la aplicación.
* Las escrituras y lecturas son algo más rápidas, porque el almacenamiento primario es local.
* **Aclaración**: La interación con [Firestore,window=_blank](https://firebase.google.com/docs/firestore) también es rápida, porque también almacena la información localmente, pero también hace unas cuantas cosas más que simplemente interactuar con [IndexedDB,window=_blank](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) y necesitas un usuario identificado.

Puedes encontrar un [informe más detallado sobre el rendimiento](https://github.com/carlosvin/budget-tracker/blob/master/doc/preformance.md#desktop-slow-clear-storage-0-budgets-1), donde se analizan tres escenarios diferentes:

1. [Firestore,window=_blank](https://firebase.google.com/docs/firestore) como única capa de persistencia.
2. Dos capas de persistencia, una local ([IndexedDB,window=_blank](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)) y otra remota ([Firestore,window=_blank](https://firebase.google.com/docs/firestore)),
3. Igual que la anterior, pero se interactúa con [Firestore,window=_blank](https://firebase.google.com/docs/firestore) desde un service worker.

En general, se obtienen mejores resultados con la opción 2.

#### Modelo de Datos

La API de [Firestore,window=_blank](https://firebase.google.com/docs/firestore) es fácil e intuitiva, me encanta, pero no asumas que tendrá todas las características que ofrecen otras bases de datos documentales o relacionales (SQL).

Comprueba que las [limitaciones de Firestore](https://googleapis.github.io/google-cloud-dotnet/docs/Google.Cloud.Firestore/datamodel.html) encajan con tu modelo de datos, o si no es demasiado tarde, diseña tu modelo de datos siguiendo la guía de [buenas prácticas de Firestore](https://cloud.google.com/firestore/docs/best-practices).

### Alternativas a Firebase

A parte de implementar una API [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) para tu aplicación, hay otros servicios similares a [Firebase,window=_blank](https://firebase.google.com/) con un tamaño menor de la librería cliente y otras características que pueden adaptarse mejor a tus necesidades.

Algunas alternativas a considerar:

* Basado en [Apache CouchDB](http://couchdb.apache.org/): [PouchDB](https://pouchdb.com), [Cloudant](https://en.wikipedia.org/wiki/Cloudant).
* Basado en [Parse server](https://parseplatform.org/): [back4apps](https://www.back4app.com).

## Librería de componentes de interfaz de usuario: https://material-ui.com[Material UI,window=_blank]

Elegí [Material UI,window=_blank](https://material-ui.com).

Componentes de React para un desarrollo web más rápido y sencillo. Construya su propio sistema de diseño, o empiece con Material Design.

Hay dos razones principales por las que elegí una libreria de componentes UI:

* Es laborioso crear tus propios componentes de interfaz de usuario que sean accesibles, que se adapten correctamente a distintos dispositivos y con un diseño estéticamente correcto.
* [Material UI,window=_blank](https://material-ui.com) tiene un conjunto de iconos SVG, [Material Icons](https://material-ui.com/components/material-icons/). Esto me venía muy bien para [Budget Tracker,window=_blank](https://btapp.netlify.com), porque permite crear categorías para gastos y asignar un icono a éstas categorías.

Hay algunos **problemas**, no muy importantes en mi opinión, quizá el que me resulta más molesto es el primero:

* [Jest Snapshots](https://jestjs.io/docs/en/snapshot-testing) + [Material UI,window=_blank](https://material-ui.com): Los [Jest Snapshots](https://jestjs.io/docs/en/snapshot-testing) guardan también las classes CSS utilizadas por [Material UI,window=_blank](https://material-ui.com), pero el orden de estas clases podría no ser determinístico, por lo que el resultado de una prueba podría ser satisfactorio en tu portátil, pero podría fallar en cualquier otro sitio, como en la máquina donde se ejecuta el servidor de integración continua ([CI](https://en.wikipedia.org/wiki/Continuous_integration)). Están trabajando en solucionar [este problema, más información en Github](https://github.com/mui-org/material-ui/issues/14357).
* Rendimiento: Hay algunos [problemas de rendimiento en Github](https://github.com/mui-org/material-ui/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+performance). A lo largo de los últimos meses, mientras he utilizado esta librería, puedo decir que el equipo de desarrollo está trabajando duro en mejorar esta librería y supongo que los solucionarán pronto.
* Las librerías de componentes de interfaz de usuario son complejas y hacen muchas cosas, por ello la mayoría son bastante pesadas. [El tamaño de Material UI reducido son 304.2kB](https://bundlephobia.com/result?p=@material-ui/core@4.5.2). Puedes encontrar [recomendaciones para reducir el tamaño de tu aplicación al utilizar Material UI en su documentación](https://material-ui.com/guides/minimizing-bundle-size).

## Librerías de gráficas

Muchas de las librerías que he encontrado son muy potentes y completas, pero también ocupan bastante, entre otras cosas porque dependen en otras librerías como [D3](https://d3js.org/).

Inicialmente elegí [Victory](https://formidable.com/open-source/victory), pero me dí cuenta de que sólamente necesitaba gráficos para mostrar porcentajes y series temporales. Otro hecho relevante es que [Victory](https://formidable.com/open-source/victory) tiene un [tamaño de 468KB](https://bundlephobia.com/result?p=victory@33.1.2) y yo no estaba utilizando la mayor parte de ese código.

Después de una búsqueda rápida en Internet, encontré otras alternativas mucho más ligeras y más que suficientes para mis necesidades:

* [Frappe charts,window=_blank](https://frappe.io/charts): [63KB](https://bundlephobia.com/result?p=frappe-charts@1.3.0).
* [Chartist](https://gionkunz.github.io/chartist-js): [39KB](https://bundlephobia.com/result?p=chartist@0.11.4).

Probé las dos y me encantaron las dos, finalmente elegí [Frappe charts,window=_blank](https://frappe.io/charts) porque su esquema de colores se ajusta mejor al tema de [Budget Tracker,window=_blank](https://btapp.netlify.com).

Ambas librerías traen más tipos de gráficos que los de ejes de coordenadas XY o gráfico de barras. Echa un vistazo a sus sitios web si quieres saber un poco más.

## Conclusión

Intentaré llegar a una conclusión algo mejor que _"Depende"_, _"Tu caso de uso te dirá"_, etc. Dicho esto, depende de lo que necesites :p.

Ya en serio, voy a listar las conclusiones en la forma _"No utilices … si …"_.

### No utilices CRA si

* Si tienes que modificar el [Service Worker,window=_blank](https://developers.google.com/web/fundamentals/primers/service-workers) para realizar [Background sync](https://developers.google.com/web/updates/2015/12/background-sync) o para [mostrar notificaciones web](https://developer.mozilla.org/en/docs/Web/API/notification).
* Si tienes que utilizar [Web Workers,window=_blank](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

### No utilices Firestore si

* Si esperas que tu aplicación sea utilizada por muchos usuarios y no tienes idea de la cantidad de lecturas y escrituras que necesitas por usuario, te podrías llevar un sorpresa en la factura que te pase Google. [Firestore,window=_blank](https://firebase.google.com/docs/firestore) escala perfectamente, pero tu presupuesto quizá no.
* Si el tamaño de tu aplicación web es algo crítico. Recuerda que el tamaño de tu aplicación, si se trata de una {PWA}, no es tan importante, porque los archivos normalmente estará cacheados para que la aplicación pueda abrirse offline.

### No elijas la mejor librería de gráficos

Antes de nada, analiza qué tipos de gráficos necesitas. En muchos casos, es más que suficiente con gráficos XY, de tarta o de barras. Puedes fácilmente reducir el tamaño de tu aplicación utilizando librerías como [Frappe charts,window=_blank](https://frappe.io/charts) or [Chartist](https://gionkunz.github.io/chartist-js)

**💡 TIP**\
Simplemente asegúrate de que tus requisitos son compatibles con las limitaciones o problemas de los que acabo de hablar. Si no estás segura o seguro, las [Budget Tracker,window=_blank](#Tecnologías escogidas para crear )(https://btapp.netlify.com)[] debería ser suficiente para cualquier {PWA}.

## ¿Y ahora qué?

Mi próxima apuesta para el lado [frontend](https://en.wikipedia.org/wiki/Front_and_back_ends) es {Svelte}/{Sapper}. Es un proyecto prometedor que ha cambiado el paradigma de framework en tiempo de ejecución a framework en tiempo de compilación. Hasta ahora, los resultados en proyectos pequeños son impresionantes, sobre todo en lo relacionado con el tamaño de la aplicación generada y con lo fácil e intuitivo que resulta el desarrollo con {Svelte}.

He creado una sencilla {PWA} para [calcular el dinero que pierdes](https://currency-loss.netlify.com) cuando vas a una casa de cambio: [currency-loss.netlify.com](https://currency-loss.netlify.com).

Terminé esta aplicación en pocas horas gracias a {Svelte}.
