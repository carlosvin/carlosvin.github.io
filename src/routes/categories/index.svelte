<script context="module">

    export async function preload(req) {
        const res = await this.fetch(`categories.json`);
        const categories = await res.json();
        return { categories, path: req.path };
    }
</script>

<script>
    import { getSiteName } from "../../services/lang";
    import Index from "../../components/Index.svelte";
    import Entry from "../../components/Entry.svelte";
    import {jsonLdScript} from '../../services/html';

    function jsonLd (categories, title, description, path) {
        return jsonLdScript(JSON.stringify({
            "@context": "https://www.schema.org",
            "type": "Itemlist",
            "name": title,
            "description": description,
            "url": path,
            "itemlistElement": categories.map(c => c.jsonLd) 
        }));
    }
    const title = `${getSiteName()} - Categories`;
    const description = "Index of blog posts categories";
    export let categories;
    export let path;
    export let jsonLdStr = jsonLd(categories, title, description, path);
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
      <a rel="prefetch" href={c.path}>{c.name}</a>
    </Entry>
  {/each}
  <Entry>
    <a href="/posts">All posts</a>
  </Entry>
  <Entry>
    <a href="/old">Old urls</a>
  </Entry>
</Index>
