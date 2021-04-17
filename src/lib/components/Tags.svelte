<script lang="ts">
    import Tag from './Tag.svelte';
    
    export let tagList: string[] = [];
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
        <Tag title={t} />
    {/each}
    </span>
{/if}