<script context="module" lang="ts">
    // import { jsonLdCategories, jsonLdScript} from "../../services/jsonld";
    import type { IndexResponse, Category } from "$lib/models/interfaces";

    export async function load({fetch, params}) {
		const lang = {params};
        const resp: IndexResponse<Category> = await (await fetch(`/${lang}/categories/json`)).json();
        // TODO const jsonLd = jsonLdScript(jsonLdCategories(categories, title, description, request.path));
        resp.title = `${resp.title} - Categories`;
        resp.description = "Index of blog categories";

		return { props: {...resp, lang} };
	}
  </script>
  
  <script lang="ts">
    import { categoryPath } from "$lib/services/url";

    import Index from "$lib/components/Index.svelte";
    import Entry from "$lib/components/Entry.svelte";
    
    export let index: Category[];
    export let title: string;
    export let description: string;
    export let lang: string;
  </script>
  
  <svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </svelte:head>
  
  <h1>Categories</h1>
  {#if index}
  <Index>
    {#each index as c}
      <Entry>
        <a sveltekit:prefetch href={categoryPath(lang, c.slug)}>{c.name}</a>
      </Entry>
    {/each}
    <Entry>
      <a href="/posts">All posts</a>
    </Entry>
  </Index>
  {:else}
  <p>Loading...</p>
  {/if}