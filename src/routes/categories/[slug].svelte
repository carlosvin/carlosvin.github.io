<script context="module">
  import { categoryPath } from "../../services/url";

  export async function preload({ params }) {
    const res = await this.fetch(`${categoryPath(params.slug)}.json`);
    const data = await res.json();
    return res.status === 200 ? data : this.error(res.status, data.message);
  }
</script>

<script>
  import Index from "../../components/posts/Index.svelte";

  export let category;
  export let posts;

  let title = `Posts related with ${category.name}`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="{title}" />
</svelte:head>

<Index {posts} {title}/>
