<script>
    import { path } from "../../services/url";
    export let post;
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
        <a rel="prefetch" href={path(post.slug, lang)}>{lang}</a>
    </span>
    {/each}
</span>
{/if}