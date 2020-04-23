
<script>
  import {path} from '../../services/models';
  import Entry from '../Entry.svelte'
  export let post;
</script>

<style>
  .date {
    font-size: small;
    color: #676767;
  }
  .date::before {
    content: " - ";
  }
  .summary {
    color: #676767;
  }
  .lang {
    padding-right: 0.2em;
    padding-left: 0.2em;
    color: #333;
  }
  .lang:not(:last-child)::after {
    content: ", ";
  }
</style>

{#if post}
<Entry>
  <a rel="prefetch" href={path(post.slug)}>
    {post.title}
    <span class="date">{new Date(post.date).toLocaleDateString()}</span>
  </a>
  <div>
    {#if post.summary}
      <span class="summary">{post.summary}.</span>
    {/if}
    <span class="langs summary">
      Available in 
      <span class="lang">
        <a href={path(post.slug, post.lang)}>{post.lang}</a>
      </span>
      {#if post.otherLangs}
      {#each post.otherLangs as lang}
        <span class="lang">
          <a href={path(post.slug, lang)}>{lang}</a>
        </span>
      {/each}
      {/if}
    </span>
  </div>
</Entry>
{/if}