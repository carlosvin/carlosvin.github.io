<script context="module" lang="ts">
    import {getFeedUrl} from '../../services/lang';

    export async function preload () {
        const langs = (await (await this.fetch('../langs.json')).json())
            .map((l: string) => [l, getFeedUrl(l)]);
        return { langs };
    }
</script>

<script lang="ts">
    export let langs: [string, string] [];
    // TODO get translated title
    const title = "Available feeds";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="{title}" />
</svelte:head>

<style>
.inline {
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    font-size: larger;
}
</style>

<h1>{title}</h1>
<span class="inline">
{#each langs as [lang, url]}
    <a href="{url}" title="Feed - {lang}">Feed - {lang}</a>
{/each}
</span>