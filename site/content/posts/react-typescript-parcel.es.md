# SPA: React + Typescript + Parcel

Estaba a punto de empezar otro proyecto personal para crear una aplicación web de página única ([SPA - Single Page App](https://es.wikipedia.org/wiki/Single-page_application)) en la que gestionar mi blog de viaje.

Tenía claras las tecnologías a utilizar, porque últimamente he trabajado bastante con [React,window=_blank](https://reactjs.org) y [Typescript,window=_blank](https://www.typescriptlang.org/) y me encuentro muy cómodo con esta pareja de tecnologías. Normalmente uso [Webpack,window=_blank](https://webpack.js.org/) como empaquetador, pero hace algún tiempo había probado [Parcel,window=_blank](https://parceljs.org) y me encantó lo simple y rápido que era crear un proyecto desde cero utilizando [Typescript,window=_blank](https://www.typescriptlang.org/) y [React,window=_blank](https://reactjs.org).

He decidido crear un proyecto base, para poder reutilizarlo la próxima vez que quiera crear una [SPA](https://es.wikipedia.org/wiki/Single-page_application) con mis tecnologías frontend favoritas, al menos hasta ahora. De esta forma, la próxima vez que quiera empezar un proyecto nuevo solamente tengo que:

```bash
git clone https://github.com/carlosvin/react-typescript-parcel-template.git
```

O simplemente descargar el [archivo ZIP con el proyecto](https://github.com/carlosvin/react-typescript-parcel-template/archive/1.0.zip).

## Leer antes: Parcel no es tan maduro como Webpack

Si quieres crear una aplicación React lista para producción, utiliza [Webpack,window=_blank](https://webpack.js.org/) o mejor aún utiliza [create-react-app,window=_blank](https://facebook.github.io/create-react-app/) que viene con todo lo que necesitas para crear una [PWA](https://developers.google.com/web/progressive-web-apps/) con React y Typescript, aquí puedes encontrar un ejemplo de una applicación que estoy desarrollando: https://github.com/carlosvin/budget-tracker.

Parcel esta en desarrollo y para mí todavía hay problemas por los que no lo considero para proyectos serios. Una de las razones es que el soporte para Typescript deja bastante que desear, por ejemplo mira este [problema en github #1378](https://github.com/parcel-bundler/parcel/issues/1378).

Creo que sigue siendo un proyecto prometedor, por la simplicidad y rapided que trae al mundo de los empaquetadores para Javascript, pero de momento no está listo para producción, al menos para aplicaciones desarrolladas con React y Typescript.

Volveré a probarlo cuando Parcel 2 esté listo: [Estado actual de Parcel 2](https://github.com/parcel-bundler/parcel/projects/5).

## Inicio Rápido

### Servidor de Desarrollo

```bash
git clone https://github.com/carlosvin/react-typescript-parcel-template.git
cd react-typescript-parcel-template
yarn install
yarn start
```

El último comando `yarn start`:

* Arrancará un servidor de desarrollo en `http://localhost:1234` con [reemplazo de módulos en caliente](https://en.parceljs.org/hmr.html).
* Construirá automáticamente el proyecto cada vez que guardemos los cambios.

**💡 TIP**\
Cada vez que guardes tus cambios, verás el resultado en `http://localhost:1234+` sin tener que refrescar la página.

### Generar un paquete listo para producción

Simplemente ejecuta `yarn build`.

Las [optimizaciones que Parcel aplica por defecto](https://en.parceljs.org/production.html#optimisations) serán aplicadas a los archivos generados, los cuales son guardados en la carpeta `dist`.

Dentro de la carpeta `dist` hay un informe sobre el tamaño de los archivos generados y el tamaño de las dependencias: `dist/report.html`, siempre está bien conocer cuán pesada es tu aplicación.

## Creación del proyecto paso a paso

Si simplemente quieres utilizar el proyecto puedes saltarte esta sección, aquí voy a describir paso a paso lo que hice para crear este proyecto base.

Comenzamos creando el archivo `package.json` con el comando [yarn init](https://yarnpkg.com/lang/en/docs/cli/init/).

```bash
yarn init
```

### Añadir dependencias

Dependencias [React,window=_blank](https://reactjs.org).

```bash
yarn add @types/react @types/react-dom react react-dom
```

El comando anterior modifica el archivo `package.json` en la sección `dependencies` e instalará esos paquetes en la carpeta `node_modules` para que posteriormente puedan ser utilizados por nuestro proyecto.

```json
{
  "name": "project_name",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@types/react": "^16.7.18",
    "@types/react-dom": "^16.0.11",
    "react": "^16.7.0",
    "react-dom": "^16.7.0"
  }
}
```

También necesitamos el compilador de [Typescript,window=_blank](https://www.typescriptlang.org/) como dependencia de desarrollo, esto significa que cuando empaquetemos nuestra aplicación para producción, estas dependencias de desarrollo no serán incluidas.

```bash
yarn add --dev typescript
```

También necesitamos como dependencia de desarrollo nuestro empaquetador [Parcel](https://parceljs.org/).

```bash
yarn add --dev parcel-bundler
```

He añadido una dependencia opcional, se trata del plugin para Parcel, para generar el informe del contenido del paquete. Es muy útil para detectar casos en los que añadimos una dependencia para, por ejemplo, comparar vectores de números, pero resulta que esta librería ocupa más que nuestra propia aplicación. En este caso hay que considerar otras librerías que hagan lo mismo y sean más ligeras.

Este plugin es la versión para Parcel de [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

```bash
yarn add --dev parcel-plugin-bundle-visualiser
```

### Código fuente de la aplicación

Primero creamos el punto de entrada de aplicación básica React en el archivo `src/index.tsx`.

```jsx
import * as React from "react";
import * as ReactDOM from "react-dom";

class App extends React.PureComponent {
    render() {
        return <h1>Hello world!</h1>;
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);
```

Parcel puede utilizar un archivo `index.html` como punto de entrada a la aplicación y descubrir qué otros archivos tiene que procesar. Vamos a crear `src/index.html` como sigue:

```html
<html>
  <body>
    <div id="app"></div>
    <script src="./index.tsx"></script>
  </body>
</html>
```

Necesitamos la etiqueta `div` para que React pueda inyectar el DOM virtual que utiliza para trabajar. La declaración `script` es utilizada por Parcel para saber que tiene que empezar construyendo el archivo `index.tsx`.

### Comandos para construir el proyecto

* `build`: Descrito en la sección _"Generar un paquete listo para producción"_.
* `start`: Descrito en _"Servidor de desarrollo"_.

```json
    "scripts": {
        "start": "parcel src/index.html",
        "build": "parcel build src/index.html"
    }
```

Ahora es realmente fácil:

* Arrancar el servidor de desarrollo: `yarn start`.
* Generar un paquete para producción: `yarn build`.

Hay otra forma descrita en la [documentación de Parcel](https://en.parceljs.org/getting_started.html) que se basa en instalar Parcel de forma global en tu sistema.

Yo he optado por añadir Parcel como parte del proyecto, de esta forma el proyecto es menos dependiente del sistema y puedes utilizar diferentes versiones de Parcel en distintos proyectos.

No instalar Parcel globalmente en tu sistema tiene un pequeño inconveniente, no puedes ejecutar directamente desde consola `parcel index.html`, porque Parcel está instalado en la carpeta `node_modules` de tu proyecto.

Pero digo que es un pequeño inconveniente, porque hay una forma de ejecutar aplicaciones instaladas en `node_modules`:

```bash
npx parcel index.html
```

Yo normalemente prefiero definir los comandos de construcción en el archivo `package.json`, porque así queda documentado en el código la forma en que debemos construir el proyecto.

### Configurar Typescript (opcional)

**Crear un archivo `tsconfig.json`**

```json
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    }
}
```

Con esta configuración indicamos al compilador de Typescript lo siguiente:

* Los archivos se generan en la carpeta `dist`.
* Vamos a generar [source maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map), así podemos depurar directamente sobre los archivos typescript.
* No permitir usar el tipo `any`, por ejemplo, la siguiente declaración no está permitida: `const elements: any;`
* El código utilizará [CommonJs](https://requirejs.org/docs/commonjs.html) como sistema de módulos.
* El código generado seguirá el estándar [ECMAScript](https://es.wikipedia.org/wiki/ECMAScript).
* Soportar la sintáxis [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) en los archivos `.tsx`.

## Código fuente completo

El ejemplo completo se encuentra en: https://github.com/carlosvin/react-typescript-parcel-template.

También puedes descargarlo directamente en los siguientes formatos:

* [zip](https://github.com/carlosvin/react-typescript-parcel-template/archive/1.0.zip)
* [tar.gz](https://github.com/carlosvin/react-typescript-parcel-template/archive/1.0.tar.gz)
