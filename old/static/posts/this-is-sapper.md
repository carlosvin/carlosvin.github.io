# This is Sapper!

I’ve migrated my blog infrastructure from [Nikola,window='_blank'](https://getnikola.com) + [reStructuredText,window='_blank'](https://en.wikipedia.org/wiki/ReStructuredText) to [Sapper,window='_blank'](https://sapper.svelte.dev/) + [Asciidoctor,window='_blank'](https://asciidoctor.org/).

## Why leaving https://getnikola.com[Nikola,window='_blank']

This blog was powered by [Nikola,window='_blank'](https://getnikola.com) since 2014, when [JAMStack,window='_blank'](https://jamstack.org) term didn’t even exist. It really did the job, it has out-of-the-box features that I needed:

* Simple multi-lang support.
* [reStructuredText,window='_blank'](https://en.wikipedia.org/wiki/ReStructuredText) which I prefer over [Markdown,window='_blank'](https://en.wikipedia.org/wiki/Markdown). 
* It was developed in [Python,window='_blank'](https://python.org), a programming language that I know and I enjoy.

But, I faced some **issues** which annoyed me for quite some time:

* My config file got bloated.
* It was not easy to modify or create templates, neither to find templates I liked.
* Site performance was not awesome, my last [Lighthouse audits,window='_blank'](https://developers.google.com/web/tools/lighthouse) report was around 80, depending on the section. Except SEO section, which was 96.

## Why Sapper

### DX: Developer experience

I already used [Sapper,window='_blank'](https://sapper.svelte.dev/) for creating some tiny [PWA,window='_blank'](https://web.dev/progressive-web-apps)s footnote:[Progressive Web Application], here 2 examples I developed to learn {Svelte} and {Sapper}:

* **[Currency Exchage Loss Calculator,window=_blank](https://currency-loss.netlify.app)**\
It is a helpful application for travelers visiting currency exchange houses. Based on the rate they offer and the money you want ot change it calculates the amount of money that you are losing in that transaction.
* **[COVID-19 Stats,window=_blank](https://covid-stats-pwa.netlify.app)**\
It shows COVID-19 statistics by country and date.

While creating those [PWA,window='_blank'](https://web.dev/progressive-web-apps)s, developing experience with [Sapper,window='_blank'](https://sapper.svelte.dev/)& [Svelte,window='_blank'](https://svelte.dev) was quite impressive. 

### UX: Final result of blogs in Sapper
Lately I’ve stumbled upon with some blogs using [Sapper,window='_blank'](https://sapper.svelte.dev/) like the own [Sapper,window='_blank'](https://sapper.svelte.dev/) blog, [Coding with Jessie,window=_blank](https://www.codingwithjesse.com/blog/statically-generating-a-blog-with-svelte-sapper/) or [swyx.io,window=_blank](https://www.swyx.io/writing/svelte-static/). Check those blogs by yourself, IMHO user experience is pretty good in all of them. 

**📌 NOTE**\
[Sapper,window='_blank'](https://sapper.svelte.dev/) is inspired in [Next.js](https://nextjs.org/), here you can find [a comparison with this better known JAMStack framework](https://sapper.svelte.dev/docs#Comparison_with_Next_js).

## https://asciidoctor.org/[Asciidoctor,window='_blank']
I don’t have a strong opinion about using [Asciidoctor,window='_blank'](https://asciidoctor.org/) or [reStructuredText,window='_blank'](https://en.wikipedia.org/wiki/ReStructuredText), I am comfortable with both of them, but there is more support for [Asciidoctor,window='_blank'](https://asciidoctor.org/) in other programming languages, like [JavaScript,window='_blank'](https://en.wikipedia.org/wiki/JavaScript). So basically I switched to [Asciidoctor,window='_blank'](https://asciidoctor.org/) because I didn’t find a [JavaScript,window='_blank'](https://en.wikipedia.org/wiki/JavaScript) library able to properly convert [reStructuredText,window='_blank'](https://en.wikipedia.org/wiki/ReStructuredText) to [HTML,window=_blank](https://developer.mozilla.org/en-US/docs/Web/HTML).

The main issue I found not using [Markdown,window='_blank'](https://en.wikipedia.org/wiki/Markdown) was the lack of [Rollup,window='_blank'](https://rollupjs.org) plugins to convert [Asciidoctor,window='_blank'](https://asciidoctor.org/) to [HTML,window=_blank](https://developer.mozilla.org/en-US/docs/Web/HTML), so I just created one, [rollup-plugin-asciidoc,window=_blank](https://github.com/carlosvin/rollup-plugin-asciidoc). Implementation was quite simple, the plugin is just using [Asciidoctor.js,window=_blank](https://asciidoctor.org/docs/asciidoctor.js/) [JavaScript,window='_blank'](https://en.wikipedia.org/wiki/JavaScript) library to convert the [Asciidoctor,window='_blank'](https://asciidoctor.org/) text input to [HTML,window=_blank](https://developer.mozilla.org/en-US/docs/Web/HTML). 

### https://github.com/carlosvin/rollup-plugin-asciidoc[rollup-plugin-asciidoc,window=_blank] to the rescue
**💡 TIP**\
With [rollup-plugin-asciidoc,window=_blank](https://github.com/carlosvin/rollup-plugin-asciidoc) we can import [Asciidoctor,window='_blank'](https://asciidoctor.org/) files in our blog and [Rollup,window='_blank'](https://rollupjs.org) will convert them to [HTML,window=_blank](https://developer.mozilla.org/en-US/docs/Web/HTML).

#### Example

**a-blog-post.adoc**

```adoc
= Post title
:date: 2019-11-11

Such a post!
```

**With [rollup-plugin-asciidoc,window=_blank](https://github.com/carlosvin/rollup-plugin-asciidoc) we can import [Asciidoctor,window='_blank'](https://asciidoctor.org/) files one by one.**

```javascript
import doc from './a-blog-post.adoc';

console.log(doc);
```

**Output**

```javascript
{
  meta: {
    title: "Post title",
    date: "2019-11-11"
  },
  html: "<p>Such a post!</p>"
}
```

Importing files one by one is not really convenient for a blog where we have many files which we don’t want to import manually.

### https://www.npmjs.com/package/rollup-plugin-glob[rollup-plugin-glob,window=_blank] to the rescue

With [rollup-plugin-glob,window=_blank](https://www.npmjs.com/package/rollup-plugin-glob) we can import all the files in a directory by extension, so now we have our index of posts automatically converted to [HTML,window=_blank](https://developer.mozilla.org/en-US/docs/Web/HTML).

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

## Syntax highlighting
My blog is mainly about Software Engineering, so I have a strong requirement, code highlighting. 

At the begging I started using [highlightjs library from a CDN,window=_blank](https://highlightjs.org/usage/) for source code highlighting. We use imported library to parse the source code and for styling the result we need to import also a CSS file. 

Later I realized that we can do the parsing work when we compile [Asciidoctor,window='_blank'](https://asciidoctor.org/) to [HTML,window=_blank](https://developer.mozilla.org/en-US/docs/Web/HTML) in [rollup-plugin-asciidoc,window=_blank](https://github.com/carlosvin/rollup-plugin-asciidoc) implementation, so we don’t have to download the [JavaScript,window='_blank'](https://en.wikipedia.org/wiki/JavaScript) file.

**💡 TIP**\
Doing code highlighting transformation during the site building phase we are improving application performance and reducing bundle size.

Code highlighting transformation during site build step bring 2 great benefits:

* Reducing bundle size: we don’t need the 27KB of [highlightjs javascript library](https://highlightjs.org/usage/).
* Improving performance: source code parsing is done only once while site is built.

## Result
I still have some [work to do,window=_blank](https://github.com/carlosvin/carlosvin.github.io/issues), but so far I have a blog with following features:

* Automated generation of [Sitemap](/sitemap.xml) and [RSS feed](/langs/en/rss).
* Multi-language support (I still have to translate some texts).
* Syntax highlighting.
* 100 score in [Lighthouse audits,window='_blank'](https://developers.google.com/web/tools/lighthouse).
  
image::/posts/lighthouse-results.webp[alt=lighthouse score,width="95%"]

## Testing
I am a big fan of automated testing, I don’t love writing them, but I think they are the best way to know if your software is behaving as expected.

[Sapper,window='_blank'](https://sapper.svelte.dev/) template brings a pre-configured simple end to end test. It is using [Cypress,window=_blank](https://www.cypress.io/), an E2E footnote:[End to end] testing framework which has a nicer developer experience than [Selenium,window=_blank](https://www.selenium.dev/), although I think it is still far of being [the Selenium Killer,window=_blank](https://blog.logrocket.com/cypress-io-the-selenium-killer/). 

**📌 NOTE**\
Not yet a [Selenium,window=_blank](https://www.selenium.dev/) killer: The main reason is that [Cypress,window=_blank](https://www.cypress.io/) lacks of some features you might need, depending on the project, like cross-browser and cross-platform testing offered by [Selenium grid,window=_blank](https://www.selenium.dev/documentation/en/grid/components_of_a_grid/).

I’ve added some tests for this blog (and I plan to add more), I’ve tested that post header information is correct, that redirection logic is working, main navigation works and metadata is correct, in a couple of hour and including bugfixes! That’s why I love writing tests with [Cypress,window=_blank](https://www.cypress.io/), the productivity.

### Writing a test

It works pretty much as Selenium.
. Opens a page
. Access to an element using [HTML identifier,window=_blank](https://developer.mozilla.org/en-US/docs/Web/API/Element/id) (`#element-id`), [XPath,window=_blank](https://en.wikipedia.org/wiki/XPath) (`/a[@title='link title']`) or [CSS selector,window=_blank](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) (`div > a.cssClass`).
. Interact with selected element on the page.
. Validate expectations.

You can find this blog tests at [cypress/integration](https://github.com/carlosvin/carlosvin.github.io/tree/site/cypress/integration) folder.

**Simple test example**

```javascript
it('Header', () => {
  cy.visit('/posts/this-is-sapper/en') ①
  cy.get('.subtitle .date').contains('28/08/2020') ②
});
```
1. It navigates to the post absolute path
2. It checks that date is correct in subtitle

## Typescript
Finally [Svelte support for Typescript is completed](https://svelte.dev/blog/svelte-and-typescript) and after quite few some work, I’ve migrated [this Blog supported by Sapper to Typescript also](https://github.com/carlosvin/carlosvin.github.io). Feel free to use it as template or example, there are still some caveats, like clarify wether keep using eslint or svelte-check or both.
