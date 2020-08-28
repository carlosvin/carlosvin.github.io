<script lang="ts">
    import { path } from "../../services/url";
    import type { IndexEntry } from "../../services/interfaces";

    export let post: IndexEntry;
</script>

<style>
.lang {
    padding-right: 0.2em;
    padding-left: 0.2em;
    color: #333;
}
.lang:not(:last-child)::after {
    content: ", ";
}
</style>

{#if post.otherLangs && post.otherLangs.length > 0}
<span class="langs summary">
    Available in
    {#each post.otherLangs as lang}
    <span class="lang">
        <a rel="alternate" hreflang="{lang}" href="{path(post.slug, lang)}">{lang}</a>
    </span>
    {/each}
</span>
{/if}