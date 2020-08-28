<script context="module" lang="ts">
  import { categoryPath } from "../../services/url";

  export async function preload({ params }: {params: {slug: string}}) {
    const res = await this.fetch(`${categoryPath(params.slug)}.json`);
    const data = await res.json();
    return res.status === 200 ? data : this.error(res.status, data.message);
  }
</script>

<script lang="ts">
  import Index from "../../components/posts/Index.svelte";
  import type{ IndexEntry, Category } from "../../services/interfaces";

  export let category: Category;
  export let posts: IndexEntry[];

  let title = `Posts related with ${category.name}`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="{title}" />
</svelte:head>

<Index {posts} {title}/>
