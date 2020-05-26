<script context="module">
  export function preload() {
    
    return this.fetch(`categories.json`)
      .then(r => r.json())
      .then(categories => ({ categories })).catch(e => console.error(e));
  }
</script>

<script>
  import { categoryPath } from "../../services/url";
  import { getSiteName } from "../../services/lang";
  import Index from "../../components/Index.svelte";
  import Entry from "../../components/Entry.svelte";
  
  export let categories;
</script>

<style>
</style>

<svelte:head>
  <title>{getSiteName()} - Categories</title>
  <meta name="description" content="Index of blog posts categories" />
</svelte:head>

<h1>Categories</h1>
<Index>
  {#each categories as [slug, name]}
    <Entry>
      <a rel="prefetch" href={categoryPath(slug)}>
      {name}
      </a>
    </Entry>
  {/each}
  <Entry><a href='/posts'>All posts</a></Entry>
  <Entry><a href='/old'>Old urls</a></Entry>
</Index>
