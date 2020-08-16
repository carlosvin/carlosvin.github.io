<script context="module" lang='ts'>
  export const preload: typeof SapperPreload = async function ({ path }) {
    const res = await this.fetch(`categories.json`);
    const categories = await res.json();
    return { categories, path };
  };
</script>

<script lang="ts">
  import { getSiteName } from "../../services/lang";
  import { categoryPath } from "../../services/url";
  import { jsonLdCategories } from "../../services/jsonld";

  import Index from "../../components/Index.svelte";
  import Entry from "../../components/Entry.svelte";
  import type { Category } from "../../services/interfaces";

// TODO move to external module in charge of jsonld. It should be executed in server side.
  
  const title = `${getSiteName()} - Categories`;
  const description = "Index of blog posts categories";
  export let categories: Category[];
  export let path: string;
  export let jsonLdStr = jsonLdCategories(categories, title, description, path);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  {@html jsonLdStr}
</svelte:head>

<h1>Categories</h1>
<Index>
  {#each categories as c}
    <Entry>
      <a rel="prefetch" href={categoryPath(c)}>{c.name}</a>
    </Entry>
  {/each}
  <Entry>
    <a href="/posts">All posts</a>
  </Entry>
  <Entry>
    <a href="/old">Old urls</a>
  </Entry>
</Index>
