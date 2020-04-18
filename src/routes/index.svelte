<script context="module">
  import { BLOG_BASE_PATH } from "../conf";
  import { getSiteName } from "../services/lang";

  export function preload({ params, query }) {
    return this.fetch(`index.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;
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
    color: gray;
  }
  .date::before {
    content: " - ";
  }
  .summary {
    color: gray;
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

<svelte:head>
  <title>{getSiteName()}</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
  {#each posts as { summary, title, date, slug, lang, otherLangs }}
    <li>
      <a rel="prefetch" href="{BLOG_BASE_PATH}/{slug}/{lang}">
        {title}
        <span class="date">{new Date(date).toLocaleDateString()}</span>
      </a>
      <div>
        {#if summary}
          <span class="summary">{summary}.</span>
        {/if}
        {#if otherLangs && otherLangs.length > 0}
          <span class="langs summary">
            Also available in
            {#each otherLangs as lang}
              <span class="lang">
                <a href="{BLOG_BASE_PATH}/{slug}/{lang}">{lang}</a>
              </span>
            {/each}
          </span>
        {/if}
      </div>
    </li>
  {/each}
</ul>
