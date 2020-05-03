<script context="module">
  import { categoryPath } from "../../services/url";

  export async function preload({ params, query }) {
    const res = await this.fetch(`${categoryPath(params.slug)}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return data;
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { onMount } from "svelte";
  import { path } from "../../services/url";
  import { getIsoDateStr } from "../../services/dates";
  import Index from "../../components/posts/Index.svelte";

  export let category;
  export let posts;
</script>

<style></style>

<svelte:head>
  <title>{category}</title>
  <meta name="description" content={`Posts related with ${category}`} />
</svelte:head>
<h1>{`Posts related with ${category}`}</h1>

<Index {posts}/>
