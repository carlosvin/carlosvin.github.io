<script context="module" lang="ts">
  import { getFeedUrl } from "../services/lang";
  interface IndexResponse {
    index: IndexEntry[];
    langs: string[];
  }

  export async function preload() {
    const r: IndexResponse = await (await this.fetch('index.json')).json();
    r.langs.forEach((l) => this.fetch(getFeedUrl(l)));
    return {posts: r.index};
  }
</script>

<script lang="ts">
  import Entry from "../components/Entry.svelte";
  import Index from "../components/Index.svelte";
  import type { IndexEntry } from "../services/interfaces";
  import { getSiteName, getDescription } from "../services/lang";
  import { path } from "../services/url";

  function oldPath({lang, slug}: Partial<IndexEntry>) {
    return `${lang}/posts/${slug}`;
  }
  export let posts: IndexEntry[];
</script>

<svelte:head>
  <title>{getSiteName()} - Old index</title>
  <meta name="description" content={`Old index - ${getDescription()}`} />
</svelte:head>

<Index>
  {#each posts as post}
    <Entry>
      <a rel="prefetch" href={oldPath(post)} class="title">
        {post.title} - {post.lang}
      </a>
    </Entry>
    <Entry>
      <a rel="prefetch" href={path(post.slug, post.path)} class="title">
        {post.title} - Redirection
      </a>
    </Entry>
    {#if post.otherLangs}
      {#each post.otherLangs as lang}
        <Entry>
          <a
            rel="alternate"
            hreflang={lang}
            href={oldPath({ ...post, lang })}
            class="title">
            {post.title} - {lang}
          </a>
        </Entry>
      {/each}
    {/if}
  {/each}
</Index>
