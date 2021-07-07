<script lang="ts">
import type { PostProps } from "$lib/models/interfaces";

  import Entry from "../Entry.svelte";
  import Details from "./Details.svelte";
  export let post: PostProps;
</script>

<style>
  .summary {
    color: #676767;
  }
  .description {
    display: flex;
  }

  .description > .content {
    flex-grow: 1;
    width: 0;
  }

  .title {
    font-size: 1.2em;
  }
</style>

{#if post}
  <Entry>
    <div class="container">
      <a sveltekit:prefetch href="{post.path}" class="title">{post.title}</a>
      {#if post.summary}
      <div class="description">
        <div class="content">
            <span class="summary">{post.summary}.</span>
        </div>
      </div>
      {/if}
      <Details {post}/>
    </div>
  </Entry>
{/if}
