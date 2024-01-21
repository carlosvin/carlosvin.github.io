# This is Sapper!

He migrado el stack the tecnologías utilizado en mi blog de [Nikola,window='_blank'](https://getnikola.com) + [reStructuredText,window='_blank'](https://en.wikipedia.org/wiki/ReStructuredText) a [Sapper,window='_blank'](https://sapper.svelte.dev/) + [Asciidoctor,window='_blank'](https://asciidoctor.org/).

## Por qué dejar https://getnikola.com[Nikola,window='_blank']?

Este blog ha sido generado por [Nikola,window='_blank'](https://getnikola.com) desde 2014, cuando el término [JAMStack,window='_blank'](https://jamstack.org) ni existía. Funcionó muy bien estos años y tiene todas las características que necesitaba por defecto:

* Soporte multi-idioma.
* [reStructuredText,window='_blank'](https://en.wikipedia.org/wiki/ReStructuredText), el cual prefiero sobre [Markdown,window='_blank'](https://en.wikipedia.org/wiki/Markdown). 
* Está desarrollado en [Python,window='_blank'](https://python.org), uno de mis lenguajes de programación preferidos.

Pero tuve algunos **problemillas** que me molestaban desde el principio:

* El fichero de configuración estaba un poco hinchado y era algo confuso.
* No era fácil para mí crear, modificar on encontrar templates que me convenciesen.
* El rendimiento del sitio era algo mediocre, el último informe que generé con [Lighthouse audits,window='_blank'](https://developers.google.com/web/tools/lighthouse) era alrededor de 80, excepto por la sección SEO que era 96.

## Por qué Sapper?

### DX: Developer experience
Ya había utilizado [Sapper,window='_blank'](https://sapper.svelte.dev/) para crear algunas pequeñas [PWA,window='_blank'](https://web.dev/progressive-web-apps)s footnote:[Progressive Web Application], aquí puedes encontrar 2 ejemplos que desarrollé con {Svelte} y {Sapper}:

* **[Currency Exchage Loss Calculator,window=_blank](https://currency-loss.netlify.app)**\
Una aplicación útil para viajeros que utilizan casas de cambio. Dependiendo en el cambio que ofrezcan en ese momento y la cantidad de dinero que quieras cambiar, te muestra la cantidad de dinero que estás perdiendo en esta transacción de cambio.
* **[COVID-19 Stats,window=_blank](https://covid-stats-pwa.netlify.app)**\
Muestra estadísticas actualizadas sobre el COVID-19 por país y por fecha.

Durante la creación de estas [PWA,window='_blank'](https://web.dev/progressive-web-apps)s, la experiencia de desarrollo con [Sapper,window='_blank'](https://sapper.svelte.dev/)& [Svelte,window='_blank'](https://svelte.dev) ha sido bastante impresionante. 

### UX: La experiencia de usuario con Sapper
Últimament me he encontrado con algunos blogs utilizando [Sapper,window='_blank'](https://sapper.svelte.dev/) como el propio blog de [Sapper,window='_blank'](https://sapper.svelte.dev/), [Coding with Jessie,window=_blank](https://www.codingwithjesse.com/blog/statically-generating-a-blog-with-svelte-sapper/) or [swyx.io,window=_blank](https://www.swyx.io/writing/svelte-static/). La experiencia de usuario me ha parecido similar a Gatsby, quizá algo más ligeros y más originales.

**📌 NOTE**\
[Sapper,window='_blank'](https://sapper.svelte.dev/) está inspirado en [Next.js](https://nextjs.org/), aquí puedes encontrar [una comparación con este conocido framework](https://sapper.svelte.dev/docs#Comparison_with_Next_js).

## https://asciidoctor.org/[Asciidoctor,window='_blank']
No tengo una preferencia clara sobre [Asciidoctor,window='_blank'](https://asciidoctor.org/) o [reStructuredText,window='_blank'](https://en.wikipedia.org/wiki/ReStructuredText), estoy cómo con ambos, pero hay más soporte para  [Asciidoctor,window='_blank'](https://asciidoctor.org/) en otros lenguajes de programación como [JavaScript,window='_blank'](https://en.wikipedia.org/wiki/JavaScript). Así que, básicamente he cambiado a [Asciidoctor,window='_blank'](https://asciidoctor.org/) prque no encontré una librería [JavaScript,window='_blank'](https://en.wikipedia.org/wiki/JavaScript) que convirtiese correctamente [reStructuredText,window='_blank'](https://en.wikipedia.org/wiki/ReStructuredText) a [HTML,window=_blank](https://developer.mozilla.org/en-US/docs/Web/HTML).

El principal problema de no utilizar [Markdown,window='_blank'](https://en.wikipedia.org/wiki/Markdown) fue la falta de plugins de [Rollup,window='_blank'](https://rollupjs.org) para convertir [Asciidoctor,window='_blank'](https://asciidoctor.org/) a [HTML,window=_blank](https://developer.mozilla.org/en-US/docs/Web/HTML), así que creé uno, [rollup-plugin-asciidoc,window=_blank](https://github.com/carlosvin/rollup-plugin-asciidoc). La implementación fue muy sencilla, el plugin simplemente utiliza la librería [Asciidoctor.js,window=_blank](https://asciidoctor.org/docs/asciidoctor.js/) para convertir un texto de entrada en formato [Asciidoctor,window='_blank'](https://asciidoctor.org/) a [HTML,window=_blank](https://developer.mozilla.org/en-US/docs/Web/HTML). 

### https://github.com/carlosvin/rollup-plugin-asciidoc[rollup-plugin-asciidoc,window=_blank] al rescate
**💡 TIP**\
Con [rollup-plugin-asciidoc,window=_blank](https://github.com/carlosvin/rollup-plugin-asciidoc) podemos importar [Asciidoctor,window='_blank'](https://asciidoctor.org/) archivos de nuestro blog y [Rollup,window='_blank'](https://rollupjs.org) los convertirá a [HTML,window=_blank](https://developer.mozilla.org/en-US/docs/Web/HTML).

#### Ejemplo

**a-blog-post.adoc**

```adoc
= Post title
:date: 2019-11-11

Such a post!
```

**Con [rollup-plugin-asciidoc,window=_blank](https://github.com/carlosvin/rollup-plugin-asciidoc) podemos importar archivos [Asciidoctor,window='_blank'](https://asciidoctor.org/) uno por uno.**

```javascript
import doc from './a-blog-post.adoc';

console.log(doc);
```

**Salida**

```javascript
{
  meta: {
    title: "Post title",
    date: "2019-11-11"
  },
  html: "<p>Such a post!</p>"
}
```

Pero importar ficheros uno por uno no es útil para un blog donde tenemos muchos archivos, los cuales no queremos importart manualmente uno por uno.

### https://www.npmjs.com/package/rollup-plugin-glob[rollup-plugin-glob,window=_blank] al rescate

Con [rollup-plugin-glob,window=_blank](https://www.npmjs.com/package/rollup-plugin-glob) podemos importar todos los ficheros que estén en un directorio por extensión, esto significa que ya tenemos todos los posts de nuestro blog convertidos a [HTML,window=_blank](https://developer.mozilla.org/en-US/docs/Web/HTML) en un par de líneas de código.

```javascript
import allAdoc from '../posts/**/*.adoc';

allAdoc.forEach(post => console.log(post));
```

**Output: List of posts already converted to HTML**

```javascript
{ meta: { title: "Post title", date: "2019-11-11" },
  html: "<p>Post 1.</p>"
}
{ meta: { title: "Post title", date: "2020-02-22" },
  html: "<h2>Title post</h2><p>This is a sample post...</p>"
}
// ...
```

## Resaltado de sintáxis para el código fuente
El tema principal de mi blog es la Ingeniería del Software, así que el resaltado de sintáxis es uno de los requisitos más importantes que un generador de sitios web estáticos debe cumplir.

Al principio utilicé [la librería highlightjs desde un CDN,window=_blank](https://highlightjs.org/usage/), que consiste en importar un fichero javascript para analizar el código fuente y un fichero CSS para aplicar el resaltado.

Más tarde me dí cuenta, de que el trabajo de análisis del código fuente lo podemos hacer tiempo de compilación, cuando convertimos [Asciidoctor,window='_blank'](https://asciidoctor.org/) a [HTML,window=_blank](https://developer.mozilla.org/en-US/docs/Web/HTML) en la implementación del [rollup-plugin-asciidoc,window=_blank](https://github.com/carlosvin/rollup-plugin-asciidoc), de esta forma el usuario no tendrá que descargar el fichero [JavaScript,window='_blank'](https://en.wikipedia.org/wiki/JavaScript) ni procesar el código fuente en su navegador. 

**💡 TIP**\
Haciendo el resaltado de sintáxis mientra construimos el sitio web, mejoramos el rendimiento del blog y reducimos los datos que el usuario tiene que descargar.

La generación del resaltado de sintáxis en la construcción del sitio web tiene 2 grandes beneficios:

* Reducir el tamaño del sitio web: no necesitamos descargar los 27KB del fichero [highlightjs javascript library](https://highlightjs.org/usage/).
* Mejora de rendimiento: el análisis del código fuente se hace solo una vez, mientras se construye el sitio web.

## Resultado
Todavía hay [algunos problemas o mejoras que hacer=_blank](https://github.com/carlosvin/carlosvin.github.io/issues), pero hasta ahora tenemos un blog con las siguientes características:

* Generación automática de [Sitemap](/sitemap.xml) and [Atom feeds](/langs/en/rss).
* Soporte multi-idioma (todavía faltan muchas traducciones).
* Resaltado de código.
* Puntuación de 100 en [Lighthouse audits,window='_blank'](https://developers.google.com/web/tools/lighthouse), aunque todavía hay algunas páginas con menos de 100.
  
image::/posts/lighthouse-results.webp[alt=lighthouse score,width="95%"]

## Pruebas
Soy un ferviente defensor de las pruebas automáticas, no me gusta escribirlas, pero creo que es la mejor forma de saber que todo funciona como se espera.

El template de [Sapper,window='_blank'](https://sapper.svelte.dev/) trae preconfigurado un test de integración muy simple. Utiliza [Cypress,window=_blank](https://www.cypress.io/), un framework de pruebas E2E footnote:[End to end], más sencillo que [Selenium,window=_blank](https://www.selenium.dev/), aunque creo que todavía no podemos hablar de [the Selenium Killer,window=_blank](https://blog.logrocket.com/cypress-io-the-selenium-killer/).

**📌 NOTE**\
En muchos casos no puede reemplazar a [Selenium,window=_blank](https://www.selenium.dev/): La principal razón es que [Cypress,window=_blank](https://www.cypress.io/) por diseño no tiene algunas funcionalidades que podrías necesitar, depende del proyecto, como por ejemplo soporte para pruebas en casi cualquier navegador y plataforma, como el proporcionado por [Selenium grid,window=_blank](https://www.selenium.dev/documentation/en/grid/components_of_a_grid/).

He añadido algunas pruebas para este blog (y añadiré más), como verificar que la información del header es correcta, que funcionan las redirecciones, que los principales flujos de navegación funcionan... Todo ello en un par de horas, incluyendo correcciones de errores encontrados. Por esto me encanta escribir pruebas con [Cypress,window=_blank](https://www.cypress.io/), por su productividad.

### Escribiendo una prueba

Funciona de forma similar a Selenium:
. Abre una página.
. Accede a un elemento utilizando [HTML identifier,window=_blank](https://developer.mozilla.org/en-US/docs/Web/API/Element/id) (`#element-id`), [XPath,window=_blank](https://en.wikipedia.org/wiki/XPath) (`/a[@title='link title']`) or [CSS selector,window=_blank](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) (`div > a.cssClass`).
. Interactuar con el elemento seleccionado.
. Validar que todo se comporta de forma esperada.

Puedes encontrar ejemplos de pruebas en la carpeta [cypress/integration](https://github.com/carlosvin/carlosvin.github.io/tree/site/cypress/integration).

**Ejemplo simple**

```javascript
it('Header', () => {
  cy.visit('/posts/this-is-sapper/en') ①
  cy.get('.subtitle .date').contains('28/08/2020') ②
});
```
1. Navega al path de un post.
2. Comprueba que la fecha que aparece en el subtítulo es correcta.

## Typescript
Finalmente [el soporte de Svelte para Typescript está terminado](https://svelte.dev/blog/svelte-and-typescript) y después de más trabajo del esperado, he migrado [este blog utlizando Sapper con Javascript a Sapper con Typescript](https://github.com/carlosvin/carlosvin.github.io). 
Te animo a que utilices este proyecto como ejemplo o template para tu blog, si encuentras algún problema, el feedback es bienvenido. Hay todavía [algunos problemas](https://github.com/carlosvin/carlosvin.github.io/issues), como averiguar que si utilizar [eslint,window=_blank](https://eslint.org/) o [svelte-check,window=_blank](https://github.com/sveltejs/language-tools) o ambos.
