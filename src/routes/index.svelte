<script context="module">
  export function preload({ params, query }) {
    this.fetch(`rss`);
    this.fetch('sitemap.xml');
    return this.fetch(`index.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import Index from "../components/posts/Index.svelte";
  import Header from "../components/posts/Header.svelte";
  import { getSiteName, getDescription } from "../services/lang";

  export let posts;

  $: numPosts = posts ? posts.length : 0;
</script>

<style>
</style>

<svelte:head>
  <title>{getSiteName()}</title>
  <meta name="description" content={getDescription()} />
</svelte:head>

<Header {numPosts}/>
<Index {posts}/>
