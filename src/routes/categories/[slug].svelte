<script context="module">
  import { categoryPath } from "../../services/url";

  export async function preload({ params }) {
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
  import Index from "../../components/posts/Index.svelte";

  export let category;
  export let posts;

  $: title = `Posts related with ${category}`;
</script>

<style></style>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={title} />
</svelte:head>

<h1>{title}</h1>

<Index {posts}/>
