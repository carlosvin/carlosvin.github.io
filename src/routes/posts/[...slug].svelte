<script context="module">
  import { path } from "../../services/url";
  import { IndexEntry } from "../../services/models";

  export async function preload({ params }) {
    const [slug, lang] = params.slug;
    const res = await this.fetch(`${path(slug, lang)  }.json`);
    const data = await res.json();
    const {entry, html} = data;
    if (res.status === 200) {
      if (lang) {
        return { post: new IndexEntry(entry), html };
      } else {
        this.redirect(302, path(slug, entry.lang));
      }
    } else {
      this.error(res.status, data.message);
    }
    return false;
  }
</script>

<script>
  import { onMount } from "svelte";
  import { url } from "../../services/url";
  import { getIsoDateStr } from "../../services/dates";
  import Share from "../../components/Share.svelte";
  import Details from "../../components/posts/Details.svelte";
  import Content from "../../components/posts/Content.svelte";

  // TODO remove workaround for this issue https://github.com/sveltejs/sapper/issues/904
  onMount(async () => {
    [...document.querySelectorAll('a[href^="#"]')].map(
      x => (x.href = document.location + new URL(x.href).hash)
    );
  });
  export let post;
  export let html;

  let ldScript = post.jsonLdScript;
</script>

<style>
  h1 {
    font-size: 2em;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
  }

  .share {
    font-size: 0.5em;
  }

  header {
    border-bottom: #e9e9e9 solid 1px;
    padding-bottom: 0.4em;
    margin-bottom: 1.2em;
  }

  .summary {
    margin: 0.2em 0 0.2em 0;
    color: #644d4d;
    line-height: 1.2em;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
  {@html ldScript}
  <meta name="date" content="{getIsoDateStr(post.date)}" scheme="YYYY-MM-DD" />
  <meta name="description" content="{post.summary}" />
  {#if post.otherLangs && post.otherLangs.length > 0}
      {#each post.otherLangs as lang}
          <link rel="alternate" hreflang="{lang}" href="{path(post.slug, lang)}" />
      {/each}
  {/if}
  <link
    rel="preload"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/styles/default.min.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'" />
  <noscript>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/styles/default.min.css" />
  </noscript>
</svelte:head>

<header>
  <h1>{post.title}
    <span class='share'>
    <Share
      title={post.title}
      keywords={post.keywords}
      text={post.summary}
      url={url(post.slug, post.lang)} />
    </span>
  </h1>
  <p class="summary">{post.summary}</p>
  <Details {post}/>
</header>

<Content>
  {@html html}
</Content>
