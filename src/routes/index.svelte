<script context="module">
  export function preload() {
    this.fetch(`rss`);
    this.fetch('sitemap.xml');
    return this.fetch(`index.json`)
      .then(r => r.json())
      .then(indexData => ({ ...indexData }));
  }
</script>

<script>
  import Index from "../components/posts/Index.svelte";
  import Header from "../components/posts/Header.svelte";

  export let index;
  export let name;
  export let description;
  export let ldScript;
  $: numPosts = index ? index.length : 0;
</script>

<sapper:head>
  <title>{name}</title>
  <meta name="description" content={description} />
  {@html ldScript}
</sapper:head>

<Header {numPosts}/>
<Index posts={index}/>
