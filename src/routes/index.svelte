<script context="module">
  export function preload() {
    return this.fetch(`index.json`)
      .then(r => r.json())
      .then(indexData => ({ ...indexData }));
  }
</script>

<script>
  import Index from "../components/posts/Index.svelte";

  export let index;
  export let name;
  export let description;
  export let ldScript;
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content="{description}" />
  {@html ldScript}
</svelte:head>

<Index posts={index} />
