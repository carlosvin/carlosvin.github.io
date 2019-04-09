.. title: Create SPA: React + Typescript + Parcel
.. slug: react-typescript-parcel
.. date: 2019/01/01 13:30:02
.. tags: React, Typescript, Parcel, SPA
.. link: https://github.com/carlosvin/react-typescript-parcel-template
.. description: Example project how to create a Single Page Application with React, Typescript and Parcel.

I was about to start yet another personal project, it consists of a SPA (Single Page Application) for a travel journal.

Some time ago I tried [Parcel](https://parceljs.org), I really loved how simple it was to create a simple project from scratch, using [Typescript](https://www.typescriptlang.org/) + [React](https://reactjs.org) stack. I've decided to create this template or base project, so next time I want to create a new SPA with my favorite frontend stack, I will only have to:

```bash
git clone https://github.com/carlosvin/react-typescript-parcel-template.git
```
[TOC]

# Quick start

## Development server

```bash
git clone https://github.com/carlosvin/react-typescript-parcel-template.git
cd react-typescript-parcel-template
yarn install
yarn start
```
<!--TEASER_END-->
Last `yarn start` command will:
- start a development server at http://localhost:1234 with [hot module replacement](https://en.parceljs.org/hmr.html)
- build automatically development javascript files with source maps

!!! type "As abstract"
    Each time you save a file, you will see automatically the result at http://localhost:1234 without refreshing the page


## Build production bundle

```bash
yarn build
```
[Parcel's default optimizations](https://en.parceljs.org/production.html#optimisations) will be applied to generated files.

Files are saved at `dist` folder.
Inside `dist` folder there is also a file with information about bundle content sizes: `dist/report.html`.

# Step by step project creation
In this section I will describe how I created this project.

Firstly, create `package.json` with [yarn init](https://yarnpkg.com/lang/en/docs/cli/init/) command.

```bash
yarn init
```

## Add required dependencies

Add react dependencies.
```bash
yarn add @types/react @types/react-dom react react-dom
```
Previous command modifies `package.json` file adding `dependencies` section and will also install React packages in `node_modules` folder.

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

Add [Typescript](https://www.typescriptlang.org/) compiler as development dependency.

```bash
yarn add --dev typescript
```

We also need [Parcel bundler](https://parceljs.org/).

```bash
yarn add --dev parcel-bundler
```

I've added a non-required dependency, it is a plugin to generate a report of generated bundle contents (the parcel version of webpack-bundle-analyzer).

```bash
yarn add --dev parcel-plugin-bundle-visualiser
```

## Create application source code
First we create the React application in `src/index.tsx` file.
```tsx
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

Parcel can take `index.html` file as entry file and it figures out how to build the application, so let's create `src/index.html` as follows:

```html
<html>
  <body>
    <div id="app"></div>
    <script src="./index.tsx"></script>
  </body>
</html>
```

We need `div` tag for React to inject the DOM elements. 
The `script` declaration is used by Parcel to find entry point to build.

## Add commands build the project

I've added the commands:
 
- `build`: Check "Build production bundle" section.
- `start`: Check "Development server" section.

```json
    "scripts": {
        "start": "parcel src/index.html",
        "build": "parcel build src/index.html"
    }
```

Then to it is really easy to:
 
 - run development server: `yarn start`
 - generate a production bundle: `yarn build`

There is another approach described in [Parcel documentation](https://en.parceljs.org/getting_started.html) that consists of installing Parcel globally. 

I've opted for more isolated approach that affects only project you are working on, you just install Parcel as `devDependency`. There is a tiny drawback, you can't just run `parcel index.html`, because it is not installed in your system, but in `node_modules`.

There is a simple way to run any binary installed in `node_modules`, you can just run `npx parcel index.html`.

I like more to define build steps in `package.json` file, so you can have well defined commands more suited to build your project. You can also use these commands as documentation how to build your project.

## Configure Typescript (optional)
Create a `tsconfig.json` file.
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

With this configuration, Typescript compiler will:
 
- Generate files in `dist` folder.
- Generate [source maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map).
- Will not allow to declare `any` type, for example following declaration is not allowed: `const elements: any;`
- Generated module code will be [CommonJs](https://requirejs.org/docs/commonjs.html).
- Generated code will be [ECMAScript](https://es.wikipedia.org/wiki/ECMAScript) 5 compliant.
- Support [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) in .tsx files.

# Full source code

You can find full example at: [https://github.com/carlosvin/react-typescript-parcel-template](https://github.com/carlosvin/react-typescript-parcel-template).

Or you can directly download the source code:

 - [zip](https://github.com/carlosvin/react-typescript-parcel-template/archive/1.0.zip)
 - [tar.gz](https://github.com/carlosvin/react-typescript-parcel-template/archive/1.0.tar.gz)
