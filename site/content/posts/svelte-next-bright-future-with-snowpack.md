# Svelte, a bright future with Snowpack

Today I finally got some time to watch the video [Rich Harris: Futuristic Web Development,window=_blank](https://www.youtube.com/watch?v=qSfdtmcZ4d0) recorded at [Svelte Summit 2020,window=_blank](https://sveltesummit.com/). If you have 20 minutes, just stop reading and [watch it,window=_blank](https://www.youtube.com/watch?v=qSfdtmcZ4d0).

**💡 TIP**\
If you have 20 minutes, just stop reading and watch [Rich Harris: Futuristic Web Development,window=_blank](https://www.youtube.com/watch?v=qSfdtmcZ4d0) video.

## Sapper 1.0 is not going to happen
As you might know, this blog is powered by [Sapper,window=_blank](https://sapper.svelte.dev). I am already quite happy with it, so when I hear this announcement, I felt like when they cancel a TV Series that I am enjoying.

Happily, there is a good reason, there is going to be a better [Sapper,window=_blank](https://sapper.svelte.dev), I think they will call it svelte-kit, it is solving some issues and improving some aspects of [Sapper,window=_blank](https://sapper.svelte.dev), but the main benefit, in my opinion, is that you won’t have to choose between [Sapper,window=_blank](https://sapper.svelte.dev) or [Svelte,window=_blank](https://svelte.dev/) when you start a new application, everything will be supported by the [Svelte,window=_blank](https://svelte.dev/) ecosystem.

## Snowpack

[Snowpack,window=_blank](https://www.snowpack.dev) will become the default [Svelte,window=_blank](https://svelte.dev/) builder. It is not a regular bundler like [Webpack,window=_blank](https://webpack.js.org) or [Rollup,window=_blank](https://rollupjs.org/). It relies on [Javascript modules,window=_blank](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) so your application delegate the modules loading on the web browser; traditionally the chunks are loaded by the bundler (or by source code injected by the bundler).

## Example

**📌 NOTE**\
This example is just a copy from the [Rich Harris: Futuristic Web Development,window=_blank](https://www.youtube.com/watch?v=qSfdtmcZ4d0) video.

**How to create the sample project**

```bash
mkdir svelte-next-sample
cd svelte-next-sample
npm init svelte@next
npm install
```

**Start development server**

```bash
npm run dev

[snowpack] > Listening on http://localhost:3000
```

You will find many similarities with [Sapper,window=_blank](https://sapper.svelte.dev), like the `routes` and `components` folders.

### Build

**Build the project for production**

```bash
npm run build
```

#### SSR
By default the project is configured with SSR rendering enabled.

**SSR with nodejs server and client**

```bash
npm run build
...

> Optimizing...
  ✔ server
  ✔ client

> Generating app...
  Using @sveltejs/adapter-node ①
  Prerendering static pages...
  ✔ done
```
1. This is the default adapter to generate SSR application with a nodejs server and a client.

#### Pure static site
This blog is a pure static website, it doesn’t require a server. With [Sapper,window=_blank](https://sapper.svelte.dev) we have the option to execute `sapper export` and it generates the app with no server required.

With this new approach, to generate a static site, we just have to use a different adapter:

```bash
npm i -D @sveltejs/adapter-static
```

**svelte.config.js**

```javascript
module.exports = {
	adapter: '@sveltejs/adapter-static'
};
```

```bash
npm run build

> Generating app...
  Using @sveltejs/adapter-static ①
  ✔ done
```
1. The static adapter is selected

But we are not yet done, because the build step is not generating the html file that we can use as entry point. We have to execute one command more: `svelte-kit adapt`, [thanks Joshua for pointing this out,window=_blank](https://github.com/carlosvin/carlosvin.github.io/issues/39#issuecomment-774200641).

**We can add it to the package.json scripts section**

```diff
	"scripts": {
		"dev": "svelte-kit dev",
		"build": "svelte-kit build",
		"start": "svelte-kit start",
+		"adapt": "svelte-kit adapt"
	},
```

```bash
npm run adapt ①
> svelte-kit adapt


> Using @sveltejs/adapter-static
  ✔ done

ls build ②
_app  favicon.ico  index.html  robots.txt
```

1. It generates the static entry point, index.html in build directory.
2. Listing the content of build directory
