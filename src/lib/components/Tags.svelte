<script lang="ts">
    import Tag from '$lib/components/Tag.svelte';
    
    export let tagList: string[] = [];
    export let lang: string;
</script>

<style>
.tags {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    font-size: 1.1em;
}
</style>

{#if tagList}
    <span class='tags'>
    {#each tagList as t}
        <Tag title={t} lang={lang}/>
    {/each}
    </span>
{/if}