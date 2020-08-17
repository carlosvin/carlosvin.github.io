<script context="module">
  export async function preload() {
    return await (await this.fetch('index.json')).json();
  }
</script>

<script lang="ts">
  import Index from "../components/posts/Index.svelte";
  import type {IndexEntry} from "../services/interfaces";

  export let index: IndexEntry[];
  export let name: string;
  export let description: string;
  export let ldScript: string;
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content="{description}" />
  {@html ldScript}
</svelte:head>

<Index posts={index} />
