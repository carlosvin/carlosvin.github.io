.. title: Create SPA: React + Typescript + Parcel
.. slug: react-typescript-parcel
.. date: 2019/01/01 13:30:02
.. tags: React, Typescript, Parcel, SPA
.. link: https://github.com/carlosvin/react-typescript-parcel-template
title: react-typescript-parcel
slug: react-typescript-parcel
date: 2019-01-01 16:00:00 UTC
tags: React, Typescript, Parcel, SPA
link: https://github.com/carlosvin/react-typescript-parcel-template

# Create SPA: React + Typescript + Parcel

I was about to start yet another personal project, it consists of a SPA (Single Page Application) for a travel journal.

Some time ago a tried [Parcel](https://parceljs.org), I really loved how simple was to create a simple project from scratch using [Typescript](https://www.typescriptlang.org/) + [React](https://reactjs.org) stack. I've decided to create this template project, so next time I want to create a new SPA with my favorite frontend stack, I will only have to `git clone https://github.com/carlosvin/react-typescript-parcel-template.git`.

# Quick start

## Development server

```bash
git clone https://github.com/carlosvin/react-typescript-parcel-template.git
cd react-typescript-parcel-template
yarn install
yarn start
```
Last `yarn start` command will:
- start a development server at http://localhost:1234 with [hot module replacement](https://en.parceljs.org/hmr.html)
- build automatically development javascript files with source maps

Basically each time you save a file, you will see automatically the result at http://localhost:1234 without refreshing the page.

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
First we create the React application in `index.tsx` file.
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

Parcel can take index.html file as entry file and it figures out how to build the application.

```html
<html>
  <body>
    <div id="app"></div>
    <script src="./index.tsx"></script>
  </body>
</html>
```

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
- Support [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) in .tsx files, in this case React type.
