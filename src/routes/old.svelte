<script context="module">
  export function preload() {
    return this.fetch(`index.json`)
      .then(r => r.json())
      .then(posts => ({ posts }));
  }
</script>

<script>
  import { getSiteName, getDescription } from "../services/lang";
  import Entry from "../components/Entry.svelte";
  import Index from "../components/Index.svelte";

  function oldPath({slug, lang}) {
      return `${lang}/posts/${slug}`;
  }
  export let posts;
</script>

<svelte:head>
  <title>{getSiteName()} - Old index</title>
  <meta name="description" content="{`Old index - ${getDescription()}`}" />
</svelte:head>

{#if posts}
<Index>
  {#each posts as post}
      <Entry><a rel="prefetch" href="{oldPath(post)}" class="title">{post.title} - {post.lang}</a></Entry>
      {#if post.otherLangs}
        {#each post.otherLangs as lang}
          <Entry>
            <a rel="alternate" hreflang="{lang}" href="{oldPath({...post, lang})}" class="title">{post.title} - {lang}</a>
          </Entry>
        {/each}
      {/if}
  {/each}
</Index>
{/if}
