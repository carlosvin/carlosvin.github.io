<script>
  import { path } from "../../services/url";
  import Entry from "../Entry.svelte";
  import OtherLangs from "./OtherLangs.svelte";
  export let post;
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

  .subtitle {
    font-size: small;
    font-family: 'Courier New', Courier, monospace;
  }

  .title {
    font-size: 1.2em;
  }
</style>

{#if post}
  <Entry>
    <div class="container">
      <a rel="prefetch" href={path(post.slug)} class="title">{post.title}</a>
      <div class='subtitle'>
        <span class="date">{new Date(post.date).toLocaleDateString()}</span>
        <OtherLangs {post}/>
      </div>
      <div class="description">
        <div class="content">
          {#if post.summary}
            <span class="summary">{post.summary}.</span>
          {/if}
        </div>
      </div>
    </div>
  </Entry>
{/if}
