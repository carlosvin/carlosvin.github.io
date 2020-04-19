<script context="module">
  import { BLOG_BASE_PATH } from "../conf";
  import { getSiteName, getDescription } from "../services/lang";

  export function preload({ params, query }) {
    this.fetch(`rss`);
    this.fetch('sitemap.xml');
    return this.fetch(`index.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;

  $: numPosts = posts ? posts.length : 0;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 0.5em 1em;
  }
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
  header {
    display: flex;
    flex-flow: row;
  }
  h1 {
    flex-grow: 1;
  }
</style>

<svelte:head>
  <title>{getSiteName()}</title>
  <meta name="description" content={getDescription()} />
</svelte:head>

<header>

{#if numPosts > 0}
  <h1>Recent posts</h1>
  <span>Total {numPosts}</span>
{:else}
  <h1>There are no posts</h1>
{/if}
</header>
<ul>
  {#each posts as { summary, title, date, slug, lang, otherLangs }}
    <li>
      <a rel="prefetch" href="{BLOG_BASE_PATH}/{slug}">
        {title}
        <span class="date">{new Date(date).toLocaleDateString()}</span>
      </a>
      <div>
        {#if summary}
          <span class="summary">{summary}.</span>
        {/if}
        <span class="langs summary">
          Available in 
          <span class="lang">
            <a href="{BLOG_BASE_PATH}/{slug}/{lang}">{lang}</a>
          </span>
          {#each otherLangs as lang}
            <span class="lang">
              <a href="{BLOG_BASE_PATH}/{slug}/{lang}">{lang}</a>
            </span>
          {/each}
        </span>
      </div>
    </li>
  {/each}
</ul>
