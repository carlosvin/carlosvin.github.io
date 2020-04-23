<script context="module">
  export function preload({ params, query }) {
    
    return this.fetch(`categories.json`)
      .then(r => r.json())
      .then(categories => {
        return { categories };
      }).catch(e => console.error(e));
  }
</script>

<script>
  import { CATEGORIES_BASE_PATH } from "../../conf";
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
      <a rel="prefetch" href="{CATEGORIES_BASE_PATH}/{slug}">
      {name}
      </a>
    </Entry>
  {/each}
</Index>
