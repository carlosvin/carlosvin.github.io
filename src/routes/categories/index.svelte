<script context="module">
  export function preload({ params, query }) {
    
    return this.fetch(`categories.json`)
      .then(r => r.json())
      .then(categories => {
        console.log(categories);
        return { categories };
      }).catch(e => console.error(e));
  }
</script>

<script>
  import { CATEGORIES_BASE_PATH } from "../../conf";
  import { getSiteName } from "../../services/lang";
  
  export let categories;
</script>

<style>
</style>

<svelte:head>
  <title>{getSiteName()} - Categories</title>
  <meta name="description" content="Index of blog posts categories" />
</svelte:head>

<h1>Categories</h1>
<ul>
  {#each categories as [slug, name]}
    <li>
      <a rel="prefetch" href="{CATEGORIES_BASE_PATH}/{slug}">
      {name}
      </a>
    </li>
  {/each}
</ul>
