<script context="module" lang="ts">
  import { getSiteName } from "../../services/lang";
  import { jsonLdCategories, jsonLdScript} from "../../services/jsonld";
  import { categoryPath } from "../../services/url";

  export async function preload (request: {path: string}) {
    const res = await this.fetch('categories.json');
    const categories = await res.json();
    const title = `${getSiteName()} - Categories`;
    const description = "Index of blog categories";
    const jsonLd = jsonLdScript(jsonLdCategories(categories, title, description, request.path));
    return { categories, jsonLd, title, description };
  };
</script>

<script lang="ts">

  import Index from "../../components/Index.svelte";
  import Entry from "../../components/Entry.svelte";
  import type { Category } from "../../services/interfaces";  
  
  export let categories: Category[];
  export let title: string;
  export let description: string;
  export let jsonLd: string;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  {@html jsonLd }
</svelte:head>

<h1>Categories</h1>
{#if categories}
<Index>
  {#each categories as c}
    <Entry>
      <a rel="prefetch" href={categoryPath(c.slug)}>{c.name}</a>
    </Entry>
  {/each}
  <Entry>
    <a href="/posts">All posts</a>
  </Entry>
</Index>
{:else}
<p>Loading...</p>
{/if}